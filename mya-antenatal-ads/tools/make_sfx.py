"""Generate every sound in public/sfx (antenatal ads) from scratch (numpy synthesis only, no samples).

Run: python3 tools/make_sfx.py
All sounds are synthesized here, so there are no copyright issues.
"""
import os
import wave

import numpy as np

SR = 44100
OUT = os.path.join(os.path.dirname(__file__), "..", "public", "sfx")
rng = np.random.default_rng(7)  # fixed seed: same files every run


def t(dur):
    return np.arange(int(SR * dur)) / SR


def env(n, a=0.002, d=0.2, curve=4.0):
    x = np.arange(n) / SR
    att = np.clip(x / max(a, 1e-6), 0, 1)
    dec = np.exp(-curve * np.clip(x - a, 0, None) / max(d, 1e-6))
    return att * dec


def lowpass(x, cutoff):
    # one-pole lowpass, cutoff may be scalar or per-sample array
    c = np.broadcast_to(np.asarray(cutoff, float), x.shape)
    a = 1 - np.exp(-2 * np.pi * c / SR)
    y = np.zeros_like(x)
    s = 0.0
    for i in range(len(x)):
        s += a[i] * (x[i] - s)
        y[i] = s
    return y


def highpass(x, cutoff):
    return x - lowpass(x, cutoff)


def save(name, x, peak=0.9):
    x = np.asarray(x, float)
    if x.ndim == 1:
        x = np.stack([x, x], axis=1)
    m = np.max(np.abs(x)) or 1
    x = x / m * peak
    pcm = (x * 32767).astype(np.int16)
    with wave.open(os.path.join(OUT, name), "wb") as w:
        w.setnchannels(2)
        w.setsampwidth(2)
        w.setframerate(SR)
        w.writeframes(pcm.tobytes())


# ---------- one-shots ----------

def kick():
    tt = t(0.35)
    f = 48 + 110 * np.exp(-tt * 28)
    ph = 2 * np.pi * np.cumsum(f) / SR
    return np.sin(ph) * env(len(tt), 0.001, 0.32, 5) + 0.3 * np.sin(ph * 2) * env(len(tt), 0.001, 0.03)


def clap():
    tt = t(0.25)
    n = rng.standard_normal(len(tt))
    n = highpass(lowpass(n, 3500), 900)
    e = np.zeros(len(tt))
    for off in (0, 0.011, 0.022):
        i = int(off * SR)
        e[i:] += env(len(tt) - i, 0.001, 0.02 if off < 0.02 else 0.14, 4)
    return n * e


def hat(open_=False):
    tt = t(0.12 if not open_ else 0.25)
    n = highpass(rng.standard_normal(len(tt)), 7000)
    return n * env(len(tt), 0.001, 0.03 if not open_ else 0.12, 5)


def pluck(freq, dur=0.4):
    tt = t(dur)
    x = sum(np.sin(2 * np.pi * freq * k * tt) / k ** 1.4 for k in range(1, 6))
    return lowpass(x, 2600) * env(len(tt), 0.004, dur * 0.7, 4)


def bass(freq, dur=0.45):
    tt = t(dur)
    x = np.sin(2 * np.pi * freq * tt) + 0.25 * np.sin(4 * np.pi * freq * tt)
    return x * env(len(tt), 0.005, dur, 3)


def place(buf, x, at, gain=1.0):
    i = int(at * SR)
    j = min(len(buf), i + len(x))
    buf[i:j] += x[: j - i] * gain


def beat_bed(dur, bars_chords):
    """~120 BPM pop bed: kick on beats, clap on 2 & 4, 8th hats, offbeat chord plucks, bass."""
    bpm = 120
    b = 60 / bpm
    buf = np.zeros(int(SR * (dur + 0.6)))
    K, C, H, HO = kick(), clap(), hat(), hat(True)
    n_beats = int(round(dur / b))
    for i in range(n_beats):
        at = i * b
        place(buf, K, at, 0.95)
        if i % 4 in (1, 3):
            place(buf, C, at, 0.45)
        place(buf, H, at, 0.12)
        place(buf, HO if i % 2 else H, at + b / 2, 0.16)
        chord = bars_chords[(i // 4) % len(bars_chords)]
        for f in chord:
            place(buf, pluck(f, 0.32), at + b / 2, 0.13)
        place(buf, bass(chord[0] / 2, b * 0.9), at, 0.32)
    buf = buf[: int(SR * dur)]
    fade = int(SR * 0.04)
    buf[-fade:] *= np.linspace(1, 0, fade)
    return buf


# F maj7 -> A min7 -> B flat maj7 -> C : bright, friendly
CH = [
    [174.61, 220.0, 261.63, 329.63],
    [220.0, 261.63, 329.63, 392.0],
    [233.08, 293.66, 349.23, 440.0],
    [261.63, 329.63, 392.0, 493.88],
]


def pop():
    tt = t(0.12)
    f = 380 + 900 * np.exp(-tt * 60)
    x = np.sin(2 * np.pi * np.cumsum(f) / SR)
    return x * env(len(tt), 0.001, 0.06, 5)


def blip():
    tt = t(0.13)
    x = np.sin(2 * np.pi * 1320 * tt) * (tt < 0.05) + np.sin(2 * np.pi * 1760 * tt) * (tt >= 0.05)
    return x * env(len(tt), 0.002, 0.12, 3)


def whoosh(dur=0.5):
    tt = t(dur)
    n = rng.standard_normal(len(tt))
    sweep = 400 + 5000 * np.sin(np.pi * tt / dur) ** 2
    x = highpass(lowpass(n, sweep), 250)
    e = np.sin(np.pi * tt / dur) ** 1.5
    pan = np.linspace(-0.7, 0.7, len(tt))
    return np.stack([x * e * (1 - pan) / 2, x * e * (1 + pan) / 2], axis=1)


def scratch():
    """Vinyl-scratch style: band-passed noise + saw with fast back-and-forth pitch."""
    dur = 0.42
    tt = t(dur)
    wob = np.sin(2 * np.pi * 7.5 * tt) * np.exp(-tt * 1.5)
    f = 300 + 650 * np.abs(wob)
    ph = 2 * np.pi * np.cumsum(f) / SR
    saw = 2 * ((ph / (2 * np.pi)) % 1) - 1
    n = highpass(lowpass(rng.standard_normal(len(tt)), 2400 + 2000 * np.abs(wob)), 500)
    x = 0.55 * lowpass(saw, 2200) + 0.6 * n
    gate = 0.3 + 0.7 * np.abs(wob)
    return x * gate * env(len(tt), 0.003, dur, 2.5)


def riser(dur=1.4):
    tt = t(dur)
    n = rng.standard_normal(len(tt))
    x = highpass(lowpass(n, 500 + 9000 * (tt / dur) ** 2), 300)
    f = 180 * 2 ** (2.5 * tt / dur)
    tone = np.sin(2 * np.pi * np.cumsum(f) / SR) * 0.35
    e = (tt / dur) ** 2.2
    return (x * 0.8 + tone) * e


def boom():
    tt = t(1.6)
    f = 38 + 70 * np.exp(-tt * 9)
    x = np.sin(2 * np.pi * np.cumsum(f) / SR) * env(len(tt), 0.002, 1.5, 3)
    n = lowpass(rng.standard_normal(len(tt)), 900) * env(len(tt), 0.001, 0.25, 5) * 0.8
    sh = highpass(rng.standard_normal(len(tt)), 6000) * env(len(tt), 0.001, 0.6, 4) * 0.12
    return x + n + sh


def ding():
    tt = t(0.9)
    x = (np.sin(2 * np.pi * 1568 * tt) + 0.5 * np.sin(2 * np.pi * 2349 * tt)
         + 0.25 * np.sin(2 * np.pi * 3136 * tt) * np.exp(-tt * 8))
    return x * env(len(tt), 0.002, 0.8, 4)


def soft_bed(dur, chords, bpm=96):
    """Gentle bed for an FAQ/explainer: soft kick on 1 and 3, shaker 8ths, warm chord plucks."""
    b = 60 / bpm
    buf = np.zeros(int(SR * (dur + 0.8)))
    K, H = kick(), hat()
    for i in range(int(dur / b) + 1):
        at = i * b
        if i % 2 == 0:
            place(buf, K, at, 0.45)
        place(buf, H, at + b / 2, 0.07)
        chord = chords[(i // 4) % len(chords)]
        for k, f in enumerate(chord):
            place(buf, pluck(f, 0.6), at + k * 0.03, 0.10)
        if i % 4 == 0:
            place(buf, bass(chord[0] / 2, b * 3.5), at, 0.22)
    buf = buf[: int(SR * dur)]
    fade = int(SR * 1.2)
    buf[-fade:] *= np.linspace(1, 0, fade)
    return buf


if __name__ == "__main__":
    os.makedirs(OUT, exist_ok=True)
    save("bed-soft.wav", soft_bed(24.0, CH), 0.7)  # placeholder music, swap for licensed track
    save("pop.wav", pop())
    save("blip.wav", blip())
    save("whoosh.wav", whoosh())
    save("ding.wav", ding())
    print("sfx written to", os.path.abspath(OUT))
