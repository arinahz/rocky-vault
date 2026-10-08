import sys, wave
import numpy as np

SR = 44100
DUR = 21.0
N = int(SR * DUR)
mix = np.zeros(N)
rng = np.random.default_rng(7)  # fixed seed, deterministic output

def add(sig, t, gain=1.0):
    i = int(t * SR)
    j = min(N, i + len(sig))
    mix[i:j] += sig[: j - i] * gain

def env(n, a=0.002, d=0.1):
    t = np.arange(n) / SR
    return np.minimum(1, t / a) * np.exp(-t / d)

def tone(f0, f1, dur, d=0.08):
    n = int(dur * SR)
    f = np.linspace(f0, f1, n)
    ph = 2 * np.pi * np.cumsum(f) / SR
    return np.sin(ph) * env(n, 0.002, d)

def noise(dur):
    return rng.standard_normal(int(dur * SR))

def lowpass(x, k):
    # one-pole lowpass, k in (0,1): smaller = darker
    y = np.empty_like(x); acc = 0.0
    for i, v in enumerate(x):
        acc += k * (v - acc); y[i] = acc
    return y

def kick():
    return tone(150, 45, 0.35, 0.12)

def hat():
    n = noise(0.05); n = n - lowpass(n, 0.3)
    return n * env(len(n), 0.001, 0.015)

def pop():
    return tone(500, 1100, 0.09, 0.03)

def blip():
    return tone(1500, 1500, 0.08, 0.025) + 0.5 * tone(2250, 2250, 0.08, 0.02)

def whoosh(dur=0.45, rising=True):
    n = noise(dur); L = len(n)
    k = np.linspace(0.02, 0.35, L) if rising else np.linspace(0.35, 0.02, L)
    y = np.empty(L); acc = 0.0
    for i in range(L):
        acc += k[i] * (n[i] - acc); y[i] = acc
    shape = np.sin(np.linspace(0, np.pi, L)) ** 2
    return y * shape * 2.5

def scratch():
    n = noise(0.22); n = n - lowpass(n, 0.15)
    return n * env(len(n), 0.005, 0.07) * 0.8

def thud():
    return tone(90, 40, 0.5, 0.2) * 1.4 + lowpass(noise(0.5), 0.05) * env(int(0.5 * SR), 0.001, 0.05) * 2

def ding(f=1320):
    n = int(1.2 * SR); t = np.arange(n) / SR
    s = sum(np.sin(2 * np.pi * f * m * t) / m ** 1.4 for m in (1, 2.01, 3.02))
    return s * env(n, 0.002, 0.35) * 0.5

def riser(dur=0.8):
    n = int(dur * SR)
    t = np.arange(n) / SR
    f = np.linspace(200, 1400, n)
    s = np.sin(2 * np.pi * np.cumsum(f) / SR) * 0.25 + lowpass(noise(dur), 0.2) * 0.6
    return s * (t / dur) ** 2

def boom():
    body = tone(80, 30, 1.4, 0.5) * 1.6
    hit = lowpass(noise(1.0), 0.03) * env(int(1.0 * SR), 0.002, 0.25) * 3
    body[: len(hit)] += hit
    return body

# beat bed at 120 bpm, dropped during the pain scene for contrast
bpm = 120; beat = 60 / bpm
t = 0.0
while t < DUR - 0.3:
    if not (7.4 <= t < 10.6):
        add(kick(), t, 0.55)
        add(hat(), t + beat / 2, 0.25)
    t += beat

# scene 1: support-local posts
for s in (0.25, 0.85, 1.35):
    add(pop(), s, 0.6)
add(whoosh(0.3), 2.0, 0.4); add(pop(), 2.25, 0.7)

# scene 2: DM flood
add(whoosh(0.4), 3.35, 0.6)
for i in range(7):
    add(blip(), 3.7 + i * 0.32, 0.45)
add(thud(), 6.1, 0.9)
add(pop(), 6.6, 0.5)

# scene 3: strike-throughs
add(whoosh(0.4), 7.15, 0.6)
for i in range(3):
    add(scratch(), 7.75 + i * 0.55, 0.9)
add(riser(0.9), 9.7, 0.8)

# scene 4: logo reveal
add(boom(), 10.6, 0.8)
add(ding(1320), 10.95, 0.7)
add(pop(), 12.1, 0.5)

# scene 5: link + features
add(whoosh(0.4), 13.55, 0.6)
for i in range(20):
    add(tone(2600, 2600, 0.02, 0.006), 13.9 + i * 0.04, 0.3)
for i in range(3):
    add(ding(990 + i * 220), 14.8 + i * 0.4, 0.45)

# scene 6: launch date
add(whoosh(0.4), 17.35, 0.6)
add(boom(), 17.8, 1.0)
add(ding(1760), 19.2, 0.5)

# master: soft clip and normalise
mix = np.tanh(mix * 0.9)
mix /= max(1e-9, np.abs(mix).max()) / 0.89
fade = int(0.6 * SR)
mix[-fade:] *= np.linspace(1, 0, fade)

pcm = (mix * 32767).astype(np.int16)
with wave.open(sys.argv[1], "wb") as w:
    w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR)
    w.writeframes(pcm.tobytes())
print("wrote", sys.argv[1])
