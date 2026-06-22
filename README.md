# Portfólio — Thomaz Arthur (zamoht.exe)

Portfólio profissional de desenvolvedor em formação. Visual dark minimalista, construído com **HTML5 semântico**, **CSS3 moderno** e **JavaScript Vanilla**, com animações via **GSAP** e **ScrollTrigger**.

## Estrutura

```
portfolio/
├── index.html          # Página única (navbar, hero, sobre, skills, projetos, contato)
├── css/
│   └── style.css       # Estilos, design tokens e responsividade
├── js/
│   ├── projects.js     # Dados dos projetos (+ integração opcional com GitHub)
│   ├── main.js         # Render dinâmico, navbar, menu mobile, navegação ativa
│   └── animations.js   # Animações GSAP + ScrollTrigger
└── assets/
    ├── favicon.svg
    └── og-image.svg
```

## Como rodar

Basta abrir o `index.html` no navegador. Para evitar restrições de CORS (caso use a API do GitHub), sirva localmente:

```bash
# Python
python -m http.server 5500
# ou Node
npx serve
```

## Adicionar um novo projeto

Edite `js/projects.js` e adicione um objeto à lista `PROJECTS`:

```js
{
  nome: "Nome do Projeto",
  descricao: "Descrição curta do projeto.",
  tecnologias: ["Java", "Spring Boot"],
  github: "https://github.com/usuario/repo",
  demo: "",            // URL da demo (deixe "" se não houver)
  imagem: ""           // caminho da capa (deixe "" para usar placeholder)
}
```

Os cards são gerados automaticamente — não é preciso mexer no HTML.

## Carregar projetos do GitHub (opcional)

A função `fetchGithubRepos(usuario)` em `projects.js` já está pronta. Em `js/main.js`, dentro de `init()`, troque o uso da lista estática pelo bloco comentado que chama a API.

## Personalização rápida

- **Cores e fontes:** variáveis no topo de `css/style.css` (`:root`).
- **Skills:** array `SKILLS` em `js/main.js`.
- **Textos e links (email, GitHub, LinkedIn):** diretamente no `index.html`.

## Acessibilidade

Respeita `prefers-reduced-motion`: usuários com redução de movimento ativada veem o conteúdo sem animações.
