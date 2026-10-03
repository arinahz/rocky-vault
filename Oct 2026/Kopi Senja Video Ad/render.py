"""Render the Kopi Senja 60s Meta video ad (9:16, 1080x1920, 30fps).

Usage: python3 render.py [hook1|hook2|hook3|all] [--preview]
Needs: pillow, ffmpeg. Output goes to ./output/.
"""
import os
import subprocess
import sys

from PIL import Image, ImageDraw, ImageFilter, ImageFont

HERE = os.path.dirname(os.path.abspath(__file__))
A = os.path.join(HERE, "assets")
OUT = os.path.join(HERE, "output")
W, H, FPS, DUR = 1080, 1920, 30, 60.0

BROWN = (59, 36, 24)
CREAM = (245, 234, 216)
ORANGE = (242, 163, 58)
WHITE = (255, 255, 255)
GREY = (150, 130, 115)

_fonts = {}


def font(weight, size):
    key = (weight, size)
    if key not in _fonts:
        _fonts[key] = ImageFont.truetype(os.path.join(A, f"M{weight}.ttf"), size)
    return _fonts[key]


IMGS = {n: Image.open(os.path.join(A, f"{n}.jpg")).convert("RGB")
        for n in ("pour", "sunset", "three-bottles")}


# ---------- helpers ----------

def clamp(x, a=0.0, b=1.0):
    return max(a, min(b, x))


def ease(x):
    x = clamp(x)
    return 1 - (1 - x) ** 3


def cover(name, t, t0, t1, cx, cy=0.5, z0=1.0, z1=1.10):
    """Full-bleed Ken Burns crop of a square image. cx/cy = focus point (0..1)."""
    im = IMGS[name]
    p = clamp((t - t0) / (t1 - t0))
    z = z0 + (z1 - z0) * p
    s = H / im.height * z
    vw, vh = W / s, H / s
    x = clamp(cx * im.width - vw / 2, 0, im.width - vw)
    y = clamp(cy * im.height - vh / 2, 0, im.height - vh)
    return im.resize((W, H), Image.BILINEAR, box=(x, y, x + vw, y + vh))


_grad = {}


def shade(base, top=0.55, mid=0.45, bottom=0.65):
    """Darken image with a vertical gradient so white text reads."""
    key = (top, mid, bottom)
    if key not in _grad:
        g = Image.new("L", (1, H))
        for yy in range(H):
            f = yy / H
            a = top + (mid - top) * (f / 0.5) if f < 0.5 else mid + (bottom - mid) * ((f - 0.5) / 0.5)
            g.putpixel((0, yy), int(255 * a))
        _grad[key] = g.resize((W, H))
    dark = Image.new("RGB", (W, H), (20, 12, 8))
    return Image.composite(dark, base, _grad[key])


def wrap(text, f, maxw):
    lines, cur = [], ""
    for word in text.split():
        trial = (cur + " " + word).strip()
        if f.getlength(trial) <= maxw:
            cur = trial
        else:
            if cur:
                lines.append(cur)
            cur = word
    if cur:
        lines.append(cur)
    return lines


def text(layer, s, y, size, weight=800, color=WHITE, t=0, t0=0, maxw=900,
         align="center", lh=1.18, shadow=True, x=None):
    """Draw wrapped text that fades and slides up from t0. Returns bottom y."""
    a = ease((t - t0) / 0.35)
    if a <= 0:
        return y
    f = font(weight, size)
    d = ImageDraw.Draw(layer)
    dy = int((1 - a) * 40)
    yy = y + dy
    for line in s.split("\n"):
        for ln in wrap(line, f, maxw):
            w = f.getlength(ln)
            xx = (W - w) / 2 if align == "center" else (x or 90)
            if shadow:
                d.text((xx + 3, yy + 4), ln, font=f, fill=(0, 0, 0, int(110 * a)))
            d.text((xx, yy), ln, font=f, fill=color + (int(255 * a),))
            yy += int(size * lh)
    return yy - dy


def pill(layer, cx, cy, s, size, bg, fg, t, t0, weight=800, padx=44, pady=22):
    a = ease((t - t0) / 0.3)
    if a <= 0:
        return
    f = font(weight, size)
    d = ImageDraw.Draw(layer)
    w = f.getlength(s)
    sc = 0.85 + 0.15 * a
    bw, bh = (w + padx * 2) * sc, (size + pady * 2) * sc
    d.rounded_rectangle((cx - bw / 2, cy - bh / 2, cx + bw / 2, cy + bh / 2),
                        radius=bh / 2, fill=bg + (int(255 * a),))
    asc, desc = f.getmetrics()
    d.text((cx - w / 2, cy - (asc + desc) / 2 + 2), s, font=f, fill=fg + (int(255 * a),))


def sun_logo(layer, cx, cy, r, a=1.0):
    """Kopi Senja mark: half sun over three horizon lines."""
    d = ImageDraw.Draw(layer)
    col = ORANGE + (int(255 * a),)
    d.pieslice((cx - r, cy - r, cx + r, cy + r), 180, 360, fill=col)
    for i, k in enumerate((1.25, 0.95, 0.65)):
        yy = cy + 10 + i * r * 0.22
        d.rounded_rectangle((cx - r * k, yy, cx + r * k, yy + r * 0.1), radius=4, fill=col)


def strike(layer, cx, y, s, size, color, t, t0):
    a = ease((t - t0) / 0.3)
    if a <= 0:
        return
    f = font(700, size)
    d = ImageDraw.Draw(layer)
    w = f.getlength(s)
    d.text((cx - w / 2, y), s, font=f, fill=color + (int(255 * a),))
    p = ease((t - t0 - 0.35) / 0.3)
    if p > 0:
        d.line((cx - w / 2 - 8, y + size * 0.62, cx - w / 2 - 8 + (w + 16) * p, y + size * 0.62),
               fill=(200, 60, 40, 255), width=7)


def arrow_down(layer, cx, cy, size, color, t):
    bob = int(12 * abs(((t * 2) % 2) - 1))
    d = ImageDraw.Draw(layer)
    y = cy + bob
    d.polygon([(cx - size, y), (cx + size, y), (cx, y + size * 1.1)], fill=color + (255,))


def compose(base, layer):
    out = base.convert("RGBA")
    out.alpha_composite(layer)
    return out.convert("RGB")


def new_layer():
    return Image.new("RGBA", (W, H), (0, 0, 0, 0))


# ---------- hooks (0-5s) ----------

def hook1(t):  # Duit: kos kopi cafe
    base = shade(cover("pour", t, 0, 5, 0.6, 0.55, 1.15, 1.0), 0.6, 0.55, 0.7)
    L = new_layer()
    text(L, "RM15 sehari", 520, 130, 800, ORANGE, t, 0.1)
    text(L, "untuk kopi cafe.", 690, 84, 800, WHITE, t, 0.5)
    text(L, "Cuba kira berapa sebulan.", 900, 56, 600, CREAM, t, 2.0)
    return compose(base, L)


def hook2(t):  # POV relatable pagi kerja
    base = shade(cover("sunset", t, 0, 5, 0.3, 0.45, 1.2, 1.05), 0.6, 0.5, 0.7)
    L = new_layer()
    pill(L, W / 2, 470, "POV", 52, ORANGE, BROWN, t, 0.05)
    text(L, "8 pagi. Dah lewat.", 590, 92, 800, WHITE, t, 0.3)
    text(L, "Tapi otak tak jalan tanpa kopi.", 820, 76, 800, ORANGE, t, 1.6, maxw=880)
    return compose(base, L)


def hook3(t):  # Laju + tiada gula tambahan
    base = shade(cover("pour", t, 0, 5, 0.58, 0.45, 1.35, 1.15), 0.55, 0.45, 0.7)
    L = new_layer()
    text(L, "Iced latte", 500, 120, 800, WHITE, t, 0.1)
    text(L, "tanpa gula tambahan.", 650, 70, 800, ORANGE, t, 0.5, maxw=980)
    text(L, "Siap dalam 30 saat. Di rumah, bukan di cafe.", 880, 56, 600, CREAM, t, 1.9, maxw=860)
    return compose(base, L)


HOOKS = {"hook1": hook1, "hook2": hook2, "hook3": hook3}


# ---------- shared body + CTA (5-60s) ----------

def s_cost(t):  # 5-11
    base = shade(cover("sunset", t, 5, 11, 0.62, 0.5, 1.05, 1.15), 0.65, 0.6, 0.75)
    L = new_layer()
    text(L, "Kopi cafe:", 420, 64, 600, CREAM, t, 5.1)
    text(L, "RM12 hingga RM18 secawan", 510, 78, 800, WHITE, t, 5.4, maxw=860)
    text(L, "22 hari kerja sebulan =", 820, 60, 600, CREAM, t, 7.6)
    text(L, "sampai RM396", 900, 112, 800, ORANGE, t, 8.0)
    return compose(base, L)


def s_intro(t):  # 11-17
    base = shade(cover("sunset", t, 11, 17, 0.32, 0.55, 1.0, 1.08), 0.7, 0.2, 0.75)
    L = new_layer()
    text(L, "Kenalkan", 300, 56, 600, CREAM, t, 11.1)
    a = ease((t - 11.4) / 0.4)
    sun_logo(L, W / 2, 470, 70, a)
    text(L, "KOPI SENJA", 520, 120, 800, WHITE, t, 11.4)
    text(L, "Cold brew concentrate 500ml", 1180, 58, 700, WHITE, t, 12.6)
    text(L, "Satu botol, lebih kurang 8 cawan", 1260, 48, 600, ORANGE, t, 13.4)
    return compose(base, L)


def s_how(t):  # 17-29
    base = shade(cover("pour", t, 17, 29, 0.55, 0.5, 1.02, 1.14), 0.6, 0.35, 0.6)
    L = new_layer()
    text(L, "Cara buat:", 330, 60, 700, CREAM, t, 17.1)
    pill(L, W / 2, 520, "1. Tuang concentrate", 54, WHITE, BROWN, t, 17.5)
    pill(L, W / 2, 670, "2. Campur air atau susu", 54, WHITE, BROWN, t, 20.5)
    pill(L, W / 2, 820, "3. Tambah ais", 54, WHITE, BROWN, t, 23.5)
    text(L, "Siap dalam", 1000, 70, 700, WHITE, t, 26.0)
    text(L, "30 saat.", 1090, 140, 800, ORANGE, t, 26.3)
    return compose(base, L)


def s_benefit(t):  # 29-36
    base = shade(cover("sunset", t, 29, 36, 0.52, 0.6, 1.25, 1.4), 0.6, 0.4, 0.65)
    L = new_layer()
    text(L, "Tiada gula", 430, 110, 800, WHITE, t, 29.1)
    text(L, "tambahan.", 560, 110, 800, ORANGE, t, 29.4)
    text(L, "Kawal sendiri manis macam mana.", 740, 54, 600, CREAM, t, 30.6, maxw=860)
    text(L, "Simpan dalam peti sejuk.", 960, 66, 800, WHITE, t, 32.6)
    text(L, "Tuang bila nak.", 1050, 66, 800, WHITE, t, 33.2)
    return compose(base, L)


def s_compare(t):  # 36-46
    base = Image.new("RGB", (W, H), CREAM)
    L = new_layer()
    d = ImageDraw.Draw(L)
    text(L, "Kira sendiri", 300, 92, 800, BROWN, t, 36.1, shadow=False)
    text(L, "Harga secawan", 420, 48, 600, GREY, t, 36.3, shadow=False)
    # bars: cafe RM15 vs Kopi Senja ~RM5.60
    maxw = 560
    for i, (label, val, col, t0) in enumerate((("Kopi cafe", 15.0, (170, 150, 135), 36.8),
                                              ("Kopi Senja", 5.6, BROWN, 38.0))):
        y = 560 + i * 230
        a = ease((t - t0) / 0.3)
        if a <= 0:
            continue
        text(L, label, y, 50, 700, BROWN, t, t0, align="left", x=160, shadow=False)
        p = ease((t - t0 - 0.2) / 0.6)
        bw = maxw * val / 15.0 * p
        d.rounded_rectangle((160, y + 75, 160 + max(bw, 30), y + 165), radius=22, fill=col + (int(255 * a),))
        price = "RM15" if val == 15.0 else "~RM5.60"
        f = font(800, 56)
        d.text((160 + max(bw, 30) + 24, y + 88), price, font=f,
               fill=(col if val == 15.0 else ORANGE) + (int(255 * p),))
    text(L, "Jimat lebih", 1060, 64, 700, BROWN, t, 40.0, shadow=False)
    text(L, "RM200 sebulan*", 1140, 92, 800, ORANGE, t, 40.3, shadow=False)
    text(L, "*Anggaran: 22 hari kerja, kopi cafe RM15 secawan", 1290, 34, 400, GREY, t, 40.6,
         shadow=False, maxw=900)
    return compose(base, L)


def s_offer(t):  # 46-53
    base = Image.new("RGB", (W, H), BROWN)
    im = IMGS["three-bottles"]
    p = clamp((t - 46) / 7)
    z = 1.0 + 0.06 * p
    size = int(W * z)
    sq = im.resize((size, size), Image.BILINEAR)
    off = (size - W) // 2
    sq = sq.crop((off, off, off + W, off + W))
    base.paste(sq, (0, 560))
    L = new_layer()
    d = ImageDraw.Draw(L)
    pill(L, W / 2, 300, "TAWARAN 3 BOTOL", 50, ORANGE, BROWN, t, 46.1)
    strike(L, W / 2, 360, "RM135", 56, CREAM, t, 46.4)
    text(L, "RM119", 420, 140, 800, WHITE, t, 46.8)
    # band over bottom of image
    a = ease((t - 48.0) / 0.3)
    if a > 0:
        d.rectangle((0, 1460, W, 1640), fill=BROWN + (int(235 * a),))
    text(L, "Penghantaran PERCUMA", 1480, 66, 800, ORANGE, t, 48.0)
    text(L, "Bawah RM5 secawan", 1565, 50, 600, CREAM, t, 49.2)
    return compose(base, L)


def s_cta(t):  # 53-60
    base = shade(cover("sunset", t, 53, 60, 0.38, 0.55, 1.08, 1.0), 0.65, 0.35, 0.7)
    L = new_layer()
    sun_logo(L, W / 2, 330, 56, ease((t - 53.1) / 0.4))
    text(L, "KOPI SENJA", 370, 90, 800, WHITE, t, 53.1)
    text(L, "Order hari ini", 560, 84, 800, WHITE, t, 53.6)
    text(L, "WhatsApp atau Shopee", 670, 60, 700, ORANGE, t, 54.2)
    pill(L, W / 2, 1050, "Tekan Shop Now", 64, ORANGE, BROWN, t, 55.2, padx=60, pady=30)
    if t > 55.5:
        arrow_down(L, W / 2, 1150, 34, ORANGE, t)
    return compose(base, L)


TIMELINE = [(5, 11, s_cost), (11, 17, s_intro), (17, 29, s_how), (29, 36, s_benefit),
            (36, 46, s_compare), (46, 53, s_offer), (53, 60.01, s_cta)]


def frame(hook, t):
    if t < 5:
        return HOOKS[hook](t)
    for t0, t1, fn in TIMELINE:
        if t0 <= t < t1:
            return fn(t)


def render(hook):
    os.makedirs(OUT, exist_ok=True)
    path = os.path.join(OUT, f"kopi-senja-60s-{hook}.mp4")
    cmd = ["ffmpeg", "-y", "-loglevel", "error",
           "-f", "rawvideo", "-pix_fmt", "rgb24", "-s", f"{W}x{H}", "-r", str(FPS), "-i", "-",
           "-f", "lavfi", "-i", "anullsrc=r=48000:cl=stereo",
           "-shortest", "-c:v", "libx264", "-preset", "medium", "-crf", "21",
           "-pix_fmt", "yuv420p", "-c:a", "aac", "-b:a", "128k", "-movflags", "+faststart", path]
    proc = subprocess.Popen(cmd, stdin=subprocess.PIPE)
    n = int(DUR * FPS)
    for i in range(n):
        proc.stdin.write(frame(hook, i / FPS).tobytes())
    proc.stdin.close()
    proc.wait()
    print("wrote", path)


def preview(hook, times):
    os.makedirs(OUT, exist_ok=True)
    thumbs = [frame(hook, t).resize((270, 480)) for t in times]
    sheet = Image.new("RGB", (270 * len(thumbs), 480))
    for i, th in enumerate(thumbs):
        sheet.paste(th, (i * 270, 0))
    p = os.path.join(OUT, f"preview-{hook}.jpg")
    sheet.save(p, quality=85)
    print("wrote", p)


if __name__ == "__main__":
    which = sys.argv[1] if len(sys.argv) > 1 else "all"
    hooks = list(HOOKS) if which == "all" else [which]
    for h in hooks:
        if "--preview" in sys.argv:
            preview(h, [3.5, 10, 16, 28, 35, 45, 52, 59])
        else:
            render(h)
