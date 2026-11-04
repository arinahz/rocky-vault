"""Build index.html for the 5 flu vaccine myths video (English).

- cuts the footage to the kept transcript cues (long pauses and dropped lines removed)
- word-by-word captions (word times spread across each Descript cue by word length)
- myth cards, "SALAH" stamps, doctor lower third, hook card and CTA end card
Run: python3 tools/build.py   (edit tools/index.template.html for styling)
"""
import json
import os
import sys

sys.path.insert(0, os.path.dirname(__file__))
from transcript import CUES, MYTHS  # noqa: E402

PAD_IN, PAD_OUT, MERGE_GAP = 0.06, 0.12, 0.30
CTA_LEN = 5.0
SRC = "assets/video/dr-munirah-vaksin-en.mp4"

# ---- segments: kept cues, merged when the pause between them is short ----
segs = []
for s, e, _ in CUES:
    a, b = s - PAD_IN, e + PAD_OUT
    if segs and a - segs[-1][1] < MERGE_GAP:
        segs[-1][1] = b
    else:
        segs.append([a, b])
segs = [(round(a, 3), round(b, 3)) for a, b in segs]


def out_t(src):
    t = 0.0
    for a, b in segs:
        if src < a:
            return round(t, 3)  # inside a removed gap: snap to next kept segment
        if src <= b:
            return round(t + src - a, 3)
        t += b - a
    return round(t, 3)


talk = round(sum(b - a for a, b in segs), 3)
total = round(talk + CTA_LEN, 3)

# ---- captions: chunks of max 5 words, each word with its own start ----
chunks = []
for s, e, text in CUES:
    words = text.split()
    weights = [len(w) + 2 for w in words]
    tot, acc, times = sum(weights), 0, []
    for w in weights:
        times.append(s + (e - s) * acc / tot)
        acc += w
    n = len(words)
    k = max(1, -(-n // 5))  # number of chunks
    size = -(-n // k)
    for i in range(0, n, size):
        ws = words[i:i + size]
        ts = [out_t(x) for x in times[i:i + size]]
        end = out_t(times[i + size]) if i + size < n else out_t(e)
        chunks.append({"w": ws, "t": ts, "end": end})
# hold each chunk until the next one starts if the gap is small
for a, b in zip(chunks, chunks[1:]):
    if b["t"][0] - a["end"] < 0.5:
        a["end"] = b["t"][0]

myths = [{"n": i + 1, "in": out_t(s), "salah": out_t(x), "text": txt} for i, (s, x, txt) in enumerate(MYTHS)]

videos, t = [], 0.0
for i, (a, b) in enumerate(segs):
    d = round(b - a, 3)
    cls = "clip seg punch" if i % 2 else "clip seg"
    videos.append(f'      <video id="seg{i}" class="{cls}" src="{SRC}" data-start="{round(t, 3)}" data-duration="{d}" '
                  f'data-media-start="{a}" data-has-audio="true" data-track-index="{1 + i % 2}" playsinline></video>')
    t += d

tpl = open(os.path.join(os.path.dirname(__file__), "index.template.html")).read()
html = (tpl.replace("{{VIDEOS}}", "\n".join(videos))
           .replace("{{TOTAL}}", str(total)).replace("{{TALK}}", str(talk)).replace("{{CTA_LEN}}", str(CTA_LEN))
           .replace("{{T_POP}}", str(round(talk + 0.4, 3))).replace("{{T_DING}}", str(round(talk + 1.2, 3)))
           .replace("{{DATA}}", json.dumps({"chunks": chunks, "myths": myths, "talk": talk}, ensure_ascii=False)))
html = html.replace("{{MYTH_SFX}}", "\n".join(
    f'      <audio id="sfx-m{m["n"]}" src="assets/sfx/pop.wav" data-start="{m["in"]}" data-duration="0.15" data-volume="0.5" data-track-index="11"></audio>\n'
    f'      <audio id="sfx-s{m["n"]}" src="assets/sfx/ding.wav" data-start="{m["salah"]}" data-duration="0.9" data-volume="0.35" data-track-index="12"></audio>'
    for m in myths))
open(os.path.join(os.path.dirname(__file__), "..", "index.html"), "w").write(html)
print(f"segments {len(segs)}  talk {talk}s  total {total}s  chunks {len(chunks)}")
for m in myths:
    print("myth", m)
