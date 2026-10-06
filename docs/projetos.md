# Projetos

Os cards e o modal de detalhes saem do array `PROJECTS` em `js/projects.js`. Não é preciso mexer no HTML.

## Campos do card

| Campo | Tipo | Uso |
| --- | --- | --- |
| `nome` | string | Título |
| `categoria` | string | Um dos valores de `CATEGORY_FILTERS` (`Acadêmicos`, `Ferramentas`, `Projeto Comercial`) |
| `descricao` | string | Texto curto do card |
| `tecnologias` | string[] | Tags |
| `github` | string | Link do repositório; vazio esconde o botão |
| `demo` | string | Link do deploy; vazio esconde o botão "Deploy" |
| `imagem` | string | Caminho da capa; vazio mostra a inicial do nome |
| `capaColor` | string | Cor de fundo da capa |
| `capaGradient` | string | Gradiente CSS atrás da capa (com `capaContain`) |
| `capaContain` | bool | `true` mostra a imagem inteira sobre o gradiente, sem cortar |

## Detalhes (modal)

O objeto `detalhes` tem uma chave por aba. Abas sem conteúdo não aparecem. A ordem vem de `DETAIL_TABS`.

- `visaoGeral`: `{ oQueE, problemaResolvido, funcionalidades }`
- `arquitetura` e `fluxogramas`: texto, lista de parágrafos, `{ texto, imagem }` ou `{ stack, estrutura, decisoes, secoes }`
- `testes`: `{ cobertura, cenarios }`. Só inclua quando o projeto tiver testes de fato.
- `mer`: `{ intro, entidades: [{ nome, campos: [[chave, nome]] }], relacionamentos }`

O comentário no topo de `js/projects.js` mostra o formato de cada um.

## Carregar do GitHub

`fetchGithubRepos(usuario)` busca os repositórios públicos mais recentes no formato de card, sem detalhes. Para usar, troque a lista estática pelo bloco comentado em `init()`, no `js/main.js`.

A API não informa a categoria. Um repositório só entra num filtro se tiver um tópico com o nome da categoria em minúsculas, sem acento e com hífen: `academicos`, `ferramentas` ou `projeto-comercial`. Sem tópico, aparece só em "Todos".
