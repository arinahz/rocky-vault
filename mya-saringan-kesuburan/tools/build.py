"""Build index.html: cut the raw talking-head into tight segments + new hook and CTA.

Segments are the speech regions of assets/video/saringan-kesuburan-raw.mp4 with long
pauses removed (from ffmpeg silencedetect). The opening "penatlah raya ni" is dropped
because the Raya reference is out of season.
"""
import os

SEGS = [(5.28, 13.21), (13.50, 24.08), (24.47, 25.16), (25.40, 26.09), (26.45, 27.30),
        (27.66, 28.33), (28.71, 36.73), (37.59, 44.52), (44.77, 47.70)]
CTA_LEN = 5.0


def out_time(src):
    """Map a source timestamp to the output timeline."""
    t = 0.0
    for a, b in SEGS:
        if a <= src <= b:
            return round(t + src - a, 3)
        t += b - a
    raise ValueError(src)


talk = round(sum(b - a for a, b in SEGS), 3)
total = round(talk + CTA_LEN, 3)

videos, t = [], 0.0
for i, (a, b) in enumerate(SEGS):
    d = round(b - a, 3)
    zoom = " punch" if i % 2 else ""
    videos.append(
        f'      <video id="seg{i}" class="clip seg{zoom}" src="assets/video/saringan-kesuburan-raw.mp4" '
        f'data-start="{round(t, 3)}" data-duration="{d}" data-media-start="{a}" data-has-audio="true" '
        f'data-track-index="{1 + i % 2}" playsinline></video>')
    t += d

sk_in, sk_out = out_time(30.33), out_time(36.73)
tpl = open(os.path.join(os.path.dirname(__file__), "index.template.html")).read()
html = (tpl.replace("{{VIDEOS}}", "\n".join(videos))
           .replace("{{TOTAL}}", str(total)).replace("{{TALK}}", str(talk))
           .replace("{{CTA_LEN}}", str(CTA_LEN))
           .replace("{{T_POP}}", str(round(talk + 0.35, 3))).replace("{{T_DING}}", str(round(talk + 1.4, 3)))
           .replace("{{SK_IN}}", str(sk_in)).replace("{{SK_LEN}}", str(round(sk_out - sk_in, 3))))
open(os.path.join(os.path.dirname(__file__), "..", "index.html"), "w").write(html)
print("talk", talk, "total", total, "saringan pill", sk_in, sk_out)
