"""Capa Organizaê — mantém só a logo branca, com fundo transparente."""

from __future__ import annotations

from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "scripts" / "source" / "organizae-logo.png"
OUTPUT = ROOT / "assets" / "projects" / "organizae-cover.webp"

COVER_SIZE = 480


def is_foreground(r: int, g: int, b: int) -> bool:
    total = r + g + b
    if total > 620:
        return True
    if r > 200 and g > 200 and b > 195:
        return True
    return r > 170 and g > 170 and b > 170 and total > 520


def main() -> None:
    if not SOURCE.exists():
        raise SystemExit(f"Logo fonte não encontrada: {SOURCE}")

    logo = Image.open(SOURCE).convert("RGBA")
    px = logo.load()
    for y in range(logo.height):
        for x in range(logo.width):
            r, g, b, _ = px[x, y]
            px[x, y] = (r, g, b, 255) if is_foreground(r, g, b) else (0, 0, 0, 0)
    logo.thumbnail((COVER_SIZE, COVER_SIZE), Image.Resampling.LANCZOS)
    logo.save(OUTPUT, "WEBP", quality=88, method=6)
    print(f"Capa: {OUTPUT} ({logo.width}x{logo.height})")


if __name__ == "__main__":
    main()
