# Estrutura

```
portfolio/
├── index.html          # Página única: navbar, hero, sobre, skills, projetos e contato
├── css/style.css       # Estilos, tokens de design (:root) e responsividade
├── js/
│   ├── projects.js     # Dados dos projetos, filtros e abas do modal
│   ├── main.js         # Render de skills e projetos, filtros, modal, navbar e menu mobile
│   └── animations.js   # Animações GSAP + ScrollTrigger e cursor customizado
├── assets/             # Favicon, foto, imagem de prévia e capas (assets/projects/)
├── scripts/            # Geração das capas (fora do deploy)
│   └── source/         # Imagens de origem usadas pelos scripts
└── docs/
```

A ordem de carregamento importa: `projects.js` expõe os dados em `window`, `main.js` renderiza o conteúdo e dispara o evento `content:ready`, e `animations.js` anima o que já está na página. Os três usam `defer`.

## Personalização

- **Cores e fontes:** variáveis no topo de `css/style.css`.
- **Skills:** array `SKILLS` em `js/main.js`.
- **Textos e links de contato:** direto no `index.html`.

## Deploy

A Vercel publica a branch `main` pela integração com o Git. O `.vercelignore` tira `scripts/` e `.github/` do site publicado.

## CI

`.github/workflows/ci.yml` roda em push na `main` e em pull requests: confere se os arquivos principais existem e roda `node --check` em cada script de `js/`.
