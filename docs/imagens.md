# Imagens

## Capas e foto

As capas ficam em `assets/projects/` e a foto em `assets/profile.webp`, todas em WebP. O card tem cerca de 360 × 200 px e a capa do modal tem 180 px de altura, então 480 px no lado maior bastam para telas de alta densidade. A capa do InjetBox, que já vem com o fundo pronto, tem 960 × 540.

Para uma capa nova, converta com o Pillow:

```bash
python3 -c "from PIL import Image; im = Image.open('origem.png'); im.thumbnail((480, 480)); im.save('assets/projects/nome-cover.webp', quality=88, method=6)"
```

## Scripts das capas

As capas seguem o padrão da do Organizaê: a logo centralizada sobre a cor da marca, sem moldura visível. Quando a imagem é transparente, a cor vem do `capaGradient` do projeto em `js/projects.js`.

Algumas capas são geradas a partir de imagens em `scripts/source/`. Os scripts nunca sobrescrevem a origem.

```bash
pip install -r scripts/requirements.txt
python3 scripts/build-injetbox-cover.py
python3 scripts/build-organizae-cover.py
python3 scripts/build-covers.py
```

- `build-injetbox-cover.py`: remove o preto em volta do ícone, aplica o gradiente do próprio ícone e imprime o `capaColor` e o `capaGradient` para o `projects.js`.
- `build-organizae-cover.py`: mantém só a logo branca, com fundo transparente.
- `build-covers.py`: desenha as logos brancas do Pactto e do Redis (ícone e nome na fonte Ubuntu Bold, no mesmo enquadramento do Organizaê), reduz o ícone do Cleiton, que emenda no fundo preto, e transforma a arte do Memes num ícone de cantos arredondados. A fonte vem de `/usr/share/fonts/truetype/ubuntu/`; em outro sistema, ajuste a constante `FONT`.

## Imagem de prévia (Open Graph)

As redes sociais leem `assets/og-image.png` (1200 × 630) pela URL absoluta `https://zamoht.vercel.app/assets/og-image.png`. LinkedIn, WhatsApp, X e Facebook não aceitam SVG.

`assets/og-image.svg` é a origem editável. Depois de alterá-lo, gere o PNG de novo renderizando o SVG num navegador, com as fontes Inter, Space Grotesk e JetBrains Mono embutidas. Sem as fontes, o texto sai na fonte padrão.
