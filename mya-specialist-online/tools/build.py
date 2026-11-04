"""Build index.html for "Specialist Consult Online" (English).

The 5 raw clips are patched together: 4 silent b-roll clips (trimmed, with on-screen text so the
story reads without sound) then the talking head IMG_8381 with retakes removed.
Transcript from Descript project "Mya Clinic - Specialist Consult Online (transcript)".
Run: python3 tools/build.py
"""
import json
import os

V = "assets/video/"
# b-roll: (file, src_in, src_out, on-screen line)
BROLL = [
    ("IMG_8372.mp4", 1.0, 3.7, "Unwell and too tired<br>to leave the house..."),
    ("IMG_8373.mp4", 0.9, 3.5, "The clinic feels<br>so far away..."),
    ("IMG_8377.mp4", 0.2, 2.8, "Even getting up<br>is a struggle..."),
    ("IMG_8378.mp4", 0.4, 3.1, "What if a specialist<br>could see you at home?"),
]
# talking head IMG_8381: kept ranges (source seconds). Dropped: "Hi." (0.9s), first take of
# "You can consult with us online." + false start "We can..." (13.1-17.2s), and the first of
# two "Book an appointment today." takes (25.5-26.8s).
TALK_FILE = "IMG_8381.mp4"
TALK = [(1.44, 12.62), (18.58, 24.62), (28.20, 29.70)]
# caption cues in IMG_8381 source seconds (Descript timings, "Maya" -> "Mya")
CUES = [
    (1.501, 6.718, "Do you know that now at Mya Clinic Melawati, we offer online consults with"),
    (6.718, 12.509, "our family medicine specialist, whether you're in Melawati or Kuantan or wherever."),
    (18.645, 20.362, "You can consult with us online."),
    (20.654, 24.518, "We can arrange your medication delivery, and you're sorted."),
    (28.258, 29.515, "Book an appointment today."),
]
# info cards (source time in IMG_8381 when they appear, how long, html)
CARDS = [
    (3.9, 4.6, '<span class="tag">NOW AT MYA CLINIC MELAWATI</span><div class="t">Online consult with a<br>Family Medicine Specialist</div>'),
    (9.3, 3.2, '<div class="t">Melawati · Kuantan · Anywhere</div>'),
    (20.9, 3.6, '<div class="t">Medication delivered<br>to your door</div>'),
]
CTA_LEN = 4.5

broll_len = round(sum(b - a for _, a, b, _ in BROLL), 3)
talk_len = round(sum(b - a for a, b in TALK), 3)
end_talk = round(broll_len + talk_len, 3)
total = round(end_talk + CTA_LEN, 3)


def out_t(src):
    """Map an IMG_8381 source time to output time."""
    t = broll_len
    for a, b in TALK:
        if src < a:
            return round(t, 3)
        if src <= b:
            return round(t + src - a, 3)
        t += b - a
    return round(t, 3)


videos, broll, t = [], [], 0.0
for i, (f, a, b, line) in enumerate(BROLL):
    d = round(b - a, 3)
    videos.append(f'      <video id="b{i}" class="clip seg" src="{V}{f}" data-start="{round(t, 3)}" data-duration="{d}" '
                  f'data-media-start="{a}" muted data-track-index="1" playsinline></video>')
    broll.append({"t": round(t, 3), "d": d, "line": line})
    t += d
for i, (a, b) in enumerate(TALK):
    d = round(b - a, 3)
    cls = "clip seg punch" if i % 2 else "clip seg"
    videos.append(f'      <video id="s{i}" class="{cls}" src="{V}{TALK_FILE}" data-start="{round(t, 3)}" data-duration="{d}" '
                  f'data-media-start="{a}" data-has-audio="true" data-track-index="2" playsinline></video>')
    t += d

chunks = []
for s, e, text in CUES:
    words = text.split()
    weights = [len(w) + 2 for w in words]
    tot, acc, times = sum(weights), 0, []
    for w in weights:
        times.append(s + (e - s) * acc / tot)
        acc += w
    n = len(words)
    k = max(1, -(-n // 5))
    size = -(-n // k)
    for i in range(0, n, size):
        ts = [out_t(x) for x in times[i:i + size]]
        end = out_t(times[i + size]) if i + size < n else out_t(e)
        chunks.append({"w": words[i:i + size], "t": ts, "end": end})
for a, b in zip(chunks, chunks[1:]):
    if b["t"][0] - a["end"] < 0.5:
        a["end"] = b["t"][0]

cards = [{"t": out_t(s), "d": d, "html": h} for s, d, h in CARDS]
data = {"broll": broll, "chunks": chunks, "cards": cards, "talkStart": broll_len, "talkEnd": end_talk}

tpl = open(os.path.join(os.path.dirname(__file__), "index.template.html")).read()
sfx = []
for i, b in enumerate(broll):
    sfx.append(f'      <audio id="sfx-w{i}" src="assets/sfx/whoosh.wav" data-start="{max(0, round(b["t"] - 0.15, 3))}" data-duration="0.5" data-volume="0.35" data-track-index="11"></audio>')
for i, c in enumerate(cards):
    sfx.append(f'      <audio id="sfx-c{i}" src="assets/sfx/pop.wav" data-start="{c["t"]}" data-duration="0.15" data-volume="0.5" data-track-index="12"></audio>')
sfx.append(f'      <audio id="sfx-cta" src="assets/sfx/ding.wav" data-start="{round(end_talk + 1.1, 3)}" data-duration="0.9" data-volume="0.45" data-track-index="13"></audio>')
html = (tpl.replace("{{VIDEOS}}", "\n".join(videos)).replace("{{SFX}}", "\n".join(sfx))
        .replace("{{TOTAL}}", str(total)).replace("{{BROLL}}", str(broll_len)).replace("{{TALK_END}}", str(end_talk))
        .replace("{{CTA_LEN}}", str(CTA_LEN)).replace("{{BED2_LEN}}", str(round(total - broll_len, 3)))
        .replace("{{DATA}}", json.dumps(data, ensure_ascii=False)))
open(os.path.join(os.path.dirname(__file__), "..", "index.html"), "w").write(html)
print(f"broll {broll_len}s  talk {talk_len}s  total {total}s  chunks {len(chunks)}")
print("cards", [(c["t"], c["d"]) for c in cards])
