"""Capas no estilo da do Organizaê: logo centralizada sobre a cor da marca, sem moldura.

- Pactto e Redis: ícone e nome em branco, com fundo transparente. O gradiente
  vem do campo capaGradient em js/projects.js.
- Cleiton: o ícone já tem fundo preto puro; a capa usa fundo preto e emenda.
- Memes: a arte ocupa o quadrado inteiro; vira um ícone de cantos arredondados.
"""

from __future__ import annotations

from math import cos, pi, sin
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "scripts" / "source"
OUT = ROOT / "assets" / "projects"

SIZE = 480
SS = 4  # desenha em 4x e reduz, para suavizar as bordas
WHITE = (255, 255, 255, 255)

# Fonte do nome. A Ubuntu vem instalada no Ubuntu; em outro sistema, troque o caminho.
FONT = Path("/usr/share/fonts/truetype/ubuntu/Ubuntu[wdth,wght].ttf")

# Mesmo enquadramento da logo do Organizaê: ícone em cima, nome embaixo.
ICON_BOX = (116, 55, 377, 345)
TEXT_TOP, TEXT_HEIGHT = 373, 70


def s(v: float) -> int:
    return round(v * SS)


def canvas() -> tuple[Image.Image, ImageDraw.ImageDraw]:
    img = Image.new("RGBA", (SIZE * SS, SIZE * SS), (0, 0, 0, 0))
    return img, ImageDraw.Draw(img)


def rounded_polygon(points: list[tuple[float, float]], radius: float) -> list[tuple[int, int]]:
    """Pontos (em escala) de um polígono com os cantos arredondados."""
    out = []
    n = len(points)
    for i in range(n):
        px, py = points[i - 1]
        cx, cy = points[i]
        nx, ny = points[(i + 1) % n]
        v1 = (px - cx, py - cy)
        v2 = (nx - cx, ny - cy)
        l1 = (v1[0] ** 2 + v1[1] ** 2) ** 0.5
        l2 = (v2[0] ** 2 + v2[1] ** 2) ** 0.5
        r = min(radius, l1 / 2, l2 / 2)
        a = (cx + v1[0] / l1 * r, cy + v1[1] / l1 * r)
        b = (cx + v2[0] / l2 * r, cy + v2[1] / l2 * r)
        for k in range(17):  # curva de Bézier quadrática com o vértice como controle
            t = k / 16
            x = (1 - t) ** 2 * a[0] + 2 * (1 - t) * t * cx + t ** 2 * b[0]
            y = (1 - t) ** 2 * a[1] + 2 * (1 - t) * t * cy + t ** 2 * b[1]
            out.append((s(x), s(y)))
    return out


def wordmark(draw: ImageDraw.ImageDraw, text: str) -> None:
    font = ImageFont.truetype(str(FONT), s(TEXT_HEIGHT))
    font.set_variation_by_name("Bold")
    left, top, right, bottom = draw.textbbox((0, 0), text, font=font)
    x = (SIZE * SS - (right - left)) / 2 - left
    y = s(TEXT_TOP) - top
    draw.text((x, y), text, font=font, fill=WHITE)


def save(img: Image.Image, name: str) -> None:
    img = img.resize((SIZE, SIZE), Image.Resampling.LANCZOS)
    path = OUT / name
    img.save(path, "WEBP", quality=90, method=6)
    print(f"Capa: {path}")


def pactto() -> None:
    """Proposta comercial: folha com itens e valores, assinatura no pé e selo de R$."""
    img, d = canvas()
    stroke = s(24)
    clear = (0, 0, 0, 0)
    x0, y0, x1, y1 = 128, 58, 318, 330
    fold = 70
    # Folha com o canto superior direito cortado: forma cheia menos o miolo
    d.polygon(rounded_polygon([(x0, y0), (x1 - fold, y0), (x1, y0 + fold), (x1, y1), (x0, y1)], 28),
              fill=WHITE)
    inset = 24
    d.polygon(rounded_polygon([(x0 + inset, y0 + inset), (x1 - fold - inset * 0.41, y0 + inset),
                               (x1 - inset, y0 + fold + inset * 0.41), (x1 - inset, y1 - inset),
                               (x0 + inset, y1 - inset)], 10), fill=clear)
    # Orelha dobrada: contorno em L ligando as pontas do corte
    ear = [(x1 - fold + 2, y0 + 12), (x1 - fold + 2, y0 + fold - 2), (x1 - 12, y0 + fold - 2)]
    d.line([(s(x), s(y)) for x, y in ear], fill=WHITE, width=s(20), joint="curve")
    # Itens da proposta: descrição à esquerda, valor à direita
    for i, (desc, valor) in enumerate(((70, 34), (52, 46), (62, 30))):
        top = 140 + i * 36
        d.rounded_rectangle((s(x0 + 34), s(top), s(x0 + 34 + desc), s(top + 16)),
                            radius=s(8), fill=WHITE)
        d.rounded_rectangle((s(x1 - 34 - valor), s(top), s(x1 - 34), s(top + 16)),
                            radius=s(8), fill=WHITE)
    # Assinatura cursiva: laços para cima que diminuem, terminando num traço
    scribble = []
    for i in range(0, 241):
        t = i / 240 * 5 * pi
        fade = 1 - 0.35 * t / (5 * pi)
        x = x0 + 40 + 6 * t - 16 * fade * sin(t)
        y = 262 - 15 * fade * cos(t)
        scribble.append((x, y))
    d.line([(s(x), s(y)) for x, y in scribble], fill=WHITE, width=s(6), joint="curve")
    d.rounded_rectangle((s(x0 + 32), s(286), s(x0 + 150), s(296)), radius=s(5), fill=WHITE)
    # Selo de R$ sobrepondo o canto inferior direito
    cx, cy, r = 330, 292, 60
    d.ellipse((s(cx - r - 12), s(cy - r - 12), s(cx + r + 12), s(cy + r + 12)), fill=clear)
    d.ellipse((s(cx - r), s(cy - r), s(cx + r), s(cy + r)), fill=WHITE)
    font = ImageFont.truetype(str(FONT), s(54))
    font.set_variation_by_name("Bold")
    left, top, right, bottom = d.textbbox((0, 0), "R$", font=font)
    d.text((s(cx) - (left + right) / 2, s(cy) - (top + bottom) / 2), "R$", font=font, fill=clear)
    wordmark(d, "pactto")
    save(img, "pactto-cover.webp")


def redis() -> None:
    """Replicação: dois bancos (master e réplica) ligados por uma seta."""
    img, d = canvas()
    stroke = s(22)

    def cylinder(cx: float, top: float, w: float, h: float) -> None:
        ry = w * 0.2
        left, right = cx - w / 2, cx + w / 2
        d.ellipse((s(left), s(top), s(right), s(top + 2 * ry)), outline=WHITE, width=stroke)
        d.line([(s(left), s(top + ry)), (s(left), s(top + h))], fill=WHITE, width=stroke)
        d.line([(s(right), s(top + ry)), (s(right), s(top + h))], fill=WHITE, width=stroke)
        d.arc((s(left), s(top + h - ry), s(right), s(top + h + ry)), 0, 180, fill=WHITE, width=stroke)
        d.arc((s(left), s(top + h / 2 - ry), s(right), s(top + h / 2 + ry)), 0, 180, fill=WHITE, width=stroke)

    cylinder(160, 100, 120, 190)
    cylinder(320, 100, 120, 190)
    # Seta do master para a réplica, acima dos bancos
    d.line([(s(185), s(70)), (s(295), s(70))], fill=WHITE, width=s(18))
    d.polygon([(s(310), s(70)), (s(282), s(50)), (s(282), s(90))], fill=WHITE)
    wordmark(d, "redis")
    save(img, "redis-cover.webp")


def cleiton() -> None:
    icon = Image.open(SOURCE / "cleiton-icon.jpg").convert("RGB")
    icon.thumbnail((SIZE, SIZE), Image.Resampling.LANCZOS)
    path = OUT / "cleiton-cover.webp"
    icon.save(path, "WEBP", quality=88, method=6)
    print(f"Capa: {path}")


def memes() -> None:
    art = Image.open(SOURCE / "memes-favicon.png").convert("RGBA")
    inner = 330
    art = art.resize((s(inner), s(inner)), Image.Resampling.LANCZOS)
    mask = Image.new("L", art.size, 0)
    ImageDraw.Draw(mask).rounded_rectangle((0, 0, *art.size), radius=s(64), fill=255)
    img, _ = canvas()
    offset = s((SIZE - inner) / 2)
    img.paste(art, (offset, offset), mask)
    save(img, "memes-cover.webp")


def main() -> None:
    pactto()
    redis()
    cleiton()
    memes()


if __name__ == "__main__":
    main()
