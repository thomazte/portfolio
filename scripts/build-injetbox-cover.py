"""Capa InjetBox — gradiente igual ao ícone + logo centralizada (estilo Organizaê)."""

from __future__ import annotations

import math
from collections import deque
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "assets" / "projects" / "injetbox-logo-source.png"
OUTPUT = ROOT / "assets" / "projects" / "injetbox-cover.png"

# Cores amostradas do fundo do ícone InjetBox
GRAD_LIGHT = (45, 195, 252)   # brilho ciano no topo
GRAD_MID = (2, 120, 248)      # azul elétrico
GRAD_EDGE = (0, 40, 100)      # borda escura do ícone

COVER_W, COVER_H = 1920, 1080
GRAD_CX, GRAD_CY = COVER_W / 2, COVER_H * 0.36


def is_outer_black(r: int, g: int, b: int) -> bool:
    return r <= 18 and g <= 18 and b <= 25


def flood_transparent(px, w: int, h: int, seeds: list[tuple[int, int]], match) -> None:
    visited = [[False] * w for _ in range(h)]
    queue: deque[tuple[int, int]] = deque()

    for x, y in seeds:
        if x < 0 or y < 0 or x >= w or y >= h:
            continue
        r, g, b, a = px[x, y]
        if a == 0 or not match(r, g, b):
            continue
        visited[y][x] = True
        queue.append((x, y))

    while queue:
        x, y = queue.popleft()
        px[x, y] = (0, 0, 0, 0)

        for nx, ny in ((x - 1, y), (x + 1, y), (x, y - 1), (x, y + 1)):
            if nx < 0 or ny < 0 or nx >= w or ny >= h or visited[ny][nx]:
                continue
            r, g, b, a = px[nx, ny]
            if a == 0 or not match(r, g, b):
                continue
            visited[ny][nx] = True
            queue.append((nx, ny))


def lerp(a: float, b: float, t: float) -> float:
    return a + (b - a) * t


def lerp_rgb(c1: tuple[int, int, int], c2: tuple[int, int, int], t: float) -> tuple[int, int, int]:
    return (
        int(lerp(c1[0], c2[0], t)),
        int(lerp(c1[1], c2[1], t)),
        int(lerp(c1[2], c2[2], t)),
    )


def sample_icon_gradient(x: int, y: int) -> tuple[int, int, int]:
    """Réplica do gradiente radial do ícone."""
    dx = (x - GRAD_CX) / (COVER_W * 0.55)
    dy = (y - GRAD_CY) / (COVER_H * 0.65)
    dist = math.sqrt(dx * dx + dy * dy)
    t = min(1.0, dist)

    if t < 0.45:
        local = t / 0.45
        return lerp_rgb(GRAD_LIGHT, GRAD_MID, local)
    local = (t - 0.45) / 0.55
    return lerp_rgb(GRAD_MID, GRAD_EDGE, local)


def build_background() -> Image.Image:
    img = Image.new("RGB", (COVER_W, COVER_H))
    px = img.load()
    for y in range(COVER_H):
        for x in range(COVER_W):
            px[x, y] = sample_icon_gradient(x, y)
    return img


def remove_outer_black(source: Image.Image) -> Image.Image:
    rgba = source.convert("RGBA")
    w, h = rgba.size
    px = rgba.load()
    flood_transparent(
        px, w, h,
        [(0, 0), (w - 1, 0), (0, h - 1), (w - 1, h - 1)],
        is_outer_black,
    )
    return rgba


def rgb_to_hex(r: int, g: int, b: int) -> str:
    return f"#{r:02x}{g:02x}{b:02x}"


def css_gradient() -> tuple[str, str]:
    light = rgb_to_hex(*GRAD_LIGHT)
    mid = rgb_to_hex(*GRAD_MID)
    edge = rgb_to_hex(*GRAD_EDGE)
    gradient = (
        f"radial-gradient(ellipse 160% 130% at 50% 36%, {light} 0%, "
        f"{mid} 45%, {edge} 100%)"
    )
    return edge, gradient


def build_cover(source: Path) -> Image.Image:
    icon = remove_outer_black(Image.open(source))
    canvas = build_background()

    target_h = int(COVER_H * 0.74)
    scale = target_h / icon.height
    target_w = int(icon.width * scale)
    icon = icon.resize((target_w, target_h), Image.Resampling.LANCZOS)

    x = (COVER_W - target_w) // 2
    y = (COVER_H - target_h) // 2
    canvas.paste(icon, (x, y), icon)
    return canvas


def main() -> None:
    if not SOURCE.exists():
        raise SystemExit(f"Logo fonte não encontrada: {SOURCE}")

    cover = build_cover(SOURCE)
    cover.save(OUTPUT, "PNG", optimize=True)

    capa_color, capa_gradient = css_gradient()
    print(f"Capa: {OUTPUT} ({COVER_W}x{COVER_H})")
    print(f"capaColor: {capa_color}")
    print(f"capaGradient: {capa_gradient}")


if __name__ == "__main__":
    main()
