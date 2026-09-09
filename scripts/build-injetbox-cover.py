"""Gera capa InjetBox no estilo Organizaê: logo transparente + cor sólida do ícone."""

from __future__ import annotations

from collections import deque
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "assets" / "projects" / "injetbox-logo-source.png"
OUTPUT = ROOT / "assets" / "projects" / "injetbox-cover.png"


def is_outer_black(r: int, g: int, b: int) -> bool:
    return r <= 18 and g <= 18 and b <= 22


def is_icon_background(r: int, g: int, b: int) -> bool:
    if is_outer_black(r, g, b):
        return True

    total = r + g + b
    if total < 28:
        return True
    if total > 190:
        return False

    # Navy do fundo do ícone (gradiente escuro azulado)
    if b >= r and g >= r - 8 and r < 85 and g < 95 and b < 130:
        return total < 175

    return False


def flood_transparent(
    px,
    w: int,
    h: int,
    seeds: list[tuple[int, int]],
    match,
) -> None:
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


def rgb_to_hex(r: int, g: int, b: int) -> str:
    return f"#{r:02x}{g:02x}{b:02x}"


def sample_bg_color(img: Image.Image) -> tuple[int, int, int]:
    w, h = img.size
    px = img.load()
    seeds = [
        (w // 2, int(h * 0.12)),
        (int(w * 0.12), int(h * 0.18)),
        (int(w * 0.88), int(h * 0.18)),
        (w // 2, int(h * 0.88)),
        (int(w * 0.15), int(h * 0.85)),
        (int(w * 0.85), int(h * 0.85)),
    ]

    samples: list[tuple[int, int, int]] = []
    for x, y in seeds:
        r, g, b, a = px[x, y]
        if a > 0 and is_icon_background(r, g, b):
            samples.append((r, g, b))

    if not samples:
        return (12, 28, 52)

    r = sum(c[0] for c in samples) // len(samples)
    g = sum(c[1] for c in samples) // len(samples)
    b = sum(c[2] for c in samples) // len(samples)
    return r, g, b


def trim_transparent(img: Image.Image, padding: int = 8) -> Image.Image:
    bbox = img.getbbox()
    if not bbox:
        return img
    x0, y0, x1, y1 = bbox
    x0 = max(0, x0 - padding)
    y0 = max(0, y0 - padding)
    x1 = min(img.width, x1 + padding)
    y1 = min(img.height, y1 + padding)
    return img.crop((x0, y0, x1, y1))


def add_transparent_padding(img: Image.Image, ratio: float = 0.18) -> Image.Image:
    """Espaço transparente ao redor — mesma proporção visual do Organizaê (~75%)."""
    bbox = img.getbbox()
    if not bbox:
        return img

    cropped = img.crop(bbox)
    w, h = cropped.size
    pad_x = int(w * ratio)
    pad_y = int(h * ratio)
    canvas = Image.new("RGBA", (w + pad_x * 2, h + pad_y * 2), (0, 0, 0, 0))
    canvas.paste(cropped, (pad_x, pad_y), cropped)
    return canvas


def build_logo(source: Path) -> tuple[Image.Image, tuple[int, int, int]]:
    rgba = source.convert("RGBA")
    w, h = rgba.size
    px = rgba.load()

    flood_transparent(
        px,
        w,
        h,
        [(0, 0), (w - 1, 0), (0, h - 1), (w - 1, h - 1)],
        is_outer_black,
    )

    bg = sample_bg_color(rgba)

    flood_transparent(
        px,
        w,
        h,
        [
            (w // 2, int(h * 0.12)),
            (int(w * 0.1), int(h * 0.2)),
            (int(w * 0.9), int(h * 0.2)),
            (int(w * 0.1), int(h * 0.82)),
            (int(w * 0.9), int(h * 0.82)),
            (w // 2, int(h * 0.86)),
        ],
        is_icon_background,
    )

    logo = trim_transparent(rgba)
    logo = add_transparent_padding(logo)
    return logo, bg


def main() -> None:
    if not SOURCE.exists():
        raise SystemExit(f"Logo fonte não encontrada: {SOURCE}")

    logo, bg = build_logo(Image.open(SOURCE))
    logo.save(OUTPUT, "PNG", optimize=True)

    hex_color = rgb_to_hex(*bg)
    print(f"Logo: {OUTPUT} ({logo.width}x{logo.height})")
    print(f"capaColor sugerida: {hex_color}")


if __name__ == "__main__":
    main()
