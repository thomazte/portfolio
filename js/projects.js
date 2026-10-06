/* =========================================================
   projects.js
   Fonte de dados dos projetos do portfólio.
   ---------------------------------------------------------
   Cada projeto tem dados de card + detalhes para o modal.

   CAMPOS DO CARD:
   - nome         (string)  Título do projeto
   - categoria    (string)  Categoria usada nos filtros
                            ("Acadêmicos" | "Ferramentas" | "Projeto Comercial")
   - descricao    (string)  Descrição curta (card)
   - tecnologias  (array)   Lista de tecnologias
   - github       (string)  URL do repositório ("" oculta o botão)
   - demo         (string)  URL do deploy/demo ("" oculta o botão)
   - imagem       (string)  Caminho da capa ("" usa placeholder)
   - capaColor    (string)  Cor de fundo da capa (ex.: "#1866FA")
   - capaGradient (string)  Gradiente CSS da capa (usado com capaContain)
   - capaContain  (bool)    true = object-fit contain (logo completa)

   DETALHES (modal) — objeto "detalhes":
   Cada chave abaixo vira uma aba no modal. Inclua apenas
   as que tiver conteúdo; abas vazias não são exibidas.

   - visaoGeral: {
       oQueE: string,
       problemaResolvido: string | string[],
       funcionalidades: string[]
     }
   - arquitetura | fluxogramas:
       string  ->  um parágrafo
       string[] -> vários parágrafos
       { texto: string|string[], imagem: "assets/..." } -> texto + imagem
       {
         stack: [{ label: "Frontend", value: "React + TS" }],
         estrutura: [{ path: "domain/", desc: "..." }],
         decisoes: string[],
         secoes: [{ titulo: "...", texto: string | string[] }]
       }

   - testes: {
       cobertura: string | string[],  // parágrafos "Cobertura atual"
       cenarios: string[]             // checklist "Cenários validados"
     }

   - mer: {
       intro: string,                 // texto introdutório
       entidades: [                   // tabelas do modelo
         { nome: "usuarios", campos: [ ["PK","id"], ["","nome"], ["FK","x_id"] ] }
       ],
       relacionamentos: string[]      // ex.: "usuarios 1 — N transacoes"
     }
     // Também aceita { texto, imagem } caso prefira usar uma imagem pronta.
   ========================================================= */

const PROJECTS = [
  {
    nome: "Quebra-Código",
    categoria: "Acadêmicos",
    descricao:
      "Plataforma educacional web (TCC) com cursos, gamificação e mini-jogos. A lógica dos jogos roda no backend Java; o navegador cuida da interface.",
    tecnologias: ["Java 21", "Spring Boot", "PostgreSQL", "JavaScript", "Playwright"],
    github: "",
    demo: "",
    imagem: "assets/projects/quebracodigo-cover.webp",
    capaColor: "#0A0F2C",
    capaGradient:
      "linear-gradient(180deg, #0A0F2C 0%, #111A3A 20%, #1C2E6C 45%, #3A1F78 70%, #5C2D91 100%)",
    capaContain: true,
    detalhes: {
      visaoGeral: {
        oQueE:
          "Plataforma educacional para ensino de programação, desenvolvida como TCC de Análise e Desenvolvimento de Sistemas. Reúne cursos, progressão do aluno, gamificação (pontos, moedas e conquistas) e mini-jogos interativos.",
        problemaResolvido: [
          "Aprender lógica de programação costuma ser abstrato e pouco engajador quando fica só em texto e exercícios estáticos.",
          "O Quebra-Código combina cursos com jogos (Sudoku, Memória, Connect 4, 2048, Campo Minado) e um sistema de pontuação, para praticar de forma guiada e divertida.",
        ],
        funcionalidades: [
          "Cadastro, login, sessão HTTP e recuperação de senha (BCrypt)",
          "Cursos, lições e exercícios com acompanhamento de progresso",
          "Gamificação: pontos, moedas, conquistas e notificações",
          "Jogos com regras, validação e IA no backend Java",
          "Frontend em HTML, CSS e JavaScript (renderização e input)",
        ],
      },
      arquitetura: {
        stack: [
          { label: "Backend", value: "Java 21 + Spring Boot 3.3" },
          { label: "Banco", value: "PostgreSQL 15 + Flyway (schema app)" },
          { label: "Frontend", value: "HTML5, CSS3 e JavaScript" },
          { label: "Auth", value: "HTTP Session + BCrypt" },
          { label: "Testes", value: "Playwright (100 testes E2E/API)" },
        ],
        estrutura: [
          { path: "api/", desc: "Controllers REST — auth, cursos, progresso e gamificação" },
          { path: "service/", desc: "Regras de negócio, sessão e pontuação" },
          { path: "model/ + repo/", desc: "Entidades JPA e repositórios Spring Data" },
          { path: "game/", desc: "Sudoku, Memória, Connect 4, 2048, Campo Minado e Flow Free" },
          { path: "security/", desc: "Filtros de sessão e cache" },
          { path: "static/", desc: "Páginas, jogos e cursos no navegador" },
          { path: "scripts/", desc: "Suite Playwright com Page Object Model" },
        ],
        decisoes: [
          "Regras dos jogos no servidor — o frontend só renderiza e captura input",
          "Connect 4 stateless: o cliente envia o tabuleiro a cada jogada",
          "IA do Connect 4: vencer, bloquear ou preferir o centro",
          "Sudoku gerado por backtracking, com 3 dificuldades",
          "Flyway para versionar o schema no PostgreSQL",
          "Testes isolados com usuário único por execução",
        ],
        secoes: [
          {
            titulo: "Separação frontend / backend",
            texto: [
              "Sudoku, Memória e Connect 4 tinham a lógica no JavaScript. A migração levou geração de tabuleiro, validação, IA e pontuação para o Spring Boot.",
              "O navegador ficou responsável pela UI, animações e chamadas HTTP (fetch) aos endpoints REST.",
            ],
          },
        ],
      },
      testes: {
        cobertura: [
          "Suite Playwright com 100 testes: autenticação, navegação, smoke e jogos (desktop e mobile).",
          "Cobre API/contrato dos endpoints, fluxos E2E, validação de formulários e proteção de rotas sem sessão.",
        ],
        cenarios: [
          "Login, cadastro, logout e bloqueio de páginas protegidas",
          "Fluxo completo: cadastro → jogo → logout",
          "Sudoku: geração, conflitos e solver",
          "Memória: pares, virada de cartas e fórmula de score",
          "Connect 4: gravidade, vitória e resposta da CPU no mesmo request",
          "2048: movimentos, undo e restart",
          "Campo Minado: primeiro clique seguro, bandeiras e dica",
        ],
      },
      mer: {
        intro:
          "Modelo de dados principal (JPA). A migration Flyway cria usuarios; as demais tabelas seguem as entidades do domínio.",
        entidades: [
          { nome: "usuarios", campos: [["PK", "id"], ["", "nome"], ["", "email"], ["", "senha_hash"], ["", "pontos"], ["", "moedas"], ["", "user_role"]] },
          { nome: "cursos", campos: [["PK", "id"], ["FK", "autor_id"], ["", "titulo"], ["", "codigo"], ["", "publicado"]] },
          { nome: "licoes", campos: [["PK", "id"], ["FK", "curso_id"], ["FK", "jogo_id"], ["", "titulo"], ["", "ordem"]] },
          { nome: "exercicios", campos: [["PK", "id"], ["FK", "licao_id"], ["FK", "jogo_id"], ["", "enunciado"], ["", "dificuldade"], ["", "pontos"]] },
          { nome: "progresso", campos: [["PK", "id"], ["FK", "usuario_id"], ["FK", "licao_id"], ["", "status"], ["", "percentual"]] },
          { nome: "jogos", campos: [["PK", "id"], ["", "nome"], ["", "slug"], ["", "tipo"]] },
          { nome: "conquistas", campos: [["PK", "id"], ["FK", "usuario_id"], ["", "codigo"], ["", "titulo"]] },
          { nome: "assinaturas", campos: [["PK", "id"], ["FK", "usuario_id"], ["", "plano"], ["", "status"]] },
        ],
        relacionamentos: [
          "usuarios 1 — N cursos (autor)",
          "cursos 1 — N licoes",
          "licoes 1 — N exercicios",
          "usuarios 1 — N progresso",
          "licoes 1 — N progresso",
          "usuarios 1 — N conquistas",
          "usuarios 1 — N assinaturas",
          "jogos 1 — N licoes / exercicios (opcional)",
        ],
      },
    },
  },
  {
    nome: "MobQuebraCódigo",
    categoria: "Acadêmicos",
    descricao:
      "Versão mobile do Quebra-Código em Flutter: cursos com exercícios executáveis e seis jogos nativos, com login no mesmo backend Spring Boot da web.",
    tecnologias: ["Flutter", "Dart", "Spring Boot"],
    github: "https://github.com/thomazte/mobquebracodigo",
    demo: "",
    imagem: "assets/projects/quebracodigo-cover.webp",
    capaColor: "#0A0F2C",
    capaGradient:
      "linear-gradient(180deg, #0A0F2C 0%, #111A3A 20%, #1C2E6C 45%, #3A1F78 70%, #5C2D91 100%)",
    capaContain: true,
    detalhes: {
      visaoGeral: {
        oQueE:
          "Aplicativo Flutter que leva o Quebra-Código para o celular: trilhas de programação, jogos e perfil, autenticando no mesmo backend Spring Boot da plataforma web.",
        problemaResolvido: [
          "A plataforma web não é confortável para praticar no celular, que é onde boa parte dos alunos estuda.",
          "No app, os jogos e os exemplos dos cursos rodam no próprio aparelho, então a prática continua fluida mesmo com a conexão ruim.",
        ],
        funcionalidades: [
          "Login, cadastro e sessão no backend do Quebra-Código",
          "Cursos com exercícios de código conferidos pelo resultado",
          "Exemplos em Python, JavaScript, TypeScript, Java, C++, PHP, SQL e HTML",
          "Sudoku, Memória, Connect 4, 2048, Campo Minado e Flow Free (100 fases)",
          "Perfil com edição e tema claro ou escuro",
        ],
      },
      arquitetura: {
        stack: [
          { label: "App", value: "Flutter + Dart (Android, iOS e web)" },
          { label: "Backend", value: "API REST Spring Boot do Quebra-Código" },
          { label: "HTTP", value: "pacote http + sessão em SharedPreferences" },
          { label: "Testes", value: "flutter_test (unidade e widget)" },
        ],
        estrutura: [
          { path: "lib/views/", desc: "Telas — login, cadastro, home, cursos, jogos e perfil" },
          { path: "lib/controllers/", desc: "Lógica de cada tela" },
          { path: "lib/games/", desc: "Os seis jogos e os widgets compartilhados entre eles" },
          { path: "lib/courses/", desc: "Execução dos exemplos de código das lições" },
          { path: "lib/services/", desc: "Cliente HTTP, autenticação e sessão" },
          { path: "lib/config/", desc: "URL da API, com override por --dart-define" },
        ],
        decisoes: [
          "Mesmo backend da versão web para contas e sessão",
          "Jogos implementados em Dart no próprio app",
          "Exercício aceito quando o código produz o mesmo resultado do exemplo, não quando é idêntico",
          "URL da API trocável no build, para apontar para um backend local",
          "Fases do Flow Free validadas por teste",
        ],
      },
      testes: {
        cobertura: [
          "12 testes com flutter_test, entre unidade e widget: execução dos exemplos dos cursos, jogabilidade e as fases do Flow Free.",
        ],
        cenarios: [
          "Exercício aceito com código diferente e mesmo resultado",
          "Resultado diferente e código vazio recusados",
          "Exemplos de Python, JavaScript, TypeScript, Java, C++, PHP, SQL e HTML",
          "Connect 4 aceita a jogada e a CPU responde",
          "Campo Minado revela a primeira casa",
          "Flow Free: 100 fases válidas, únicas e progressivas, e avanço ao concluir",
        ],
      },
    },
  },
  {
    nome: "InjetBox",
    categoria: "Projeto Comercial",
    descricao:
      "Sistema B2B de controle de estoque para facilitar vendas. Multi-tenant, branding por empresa e distribuição web, desktop (Windows) e Android.",
    tecnologias: ["React", "TypeScript", "Supabase", "Electron", "Capacitor", "Tailwind CSS"],
    github: "https://github.com/thomazte/injetbox",
    demo: "",
    imagem: "assets/projects/injetbox-cover.webp",
    capaColor: "#002864",
    capaGradient:
      "radial-gradient(ellipse 160% 130% at 50% 36%, #2dc3fc 0%, #0278f8 45%, #002864 100%)",
    capaContain: true,
    detalhes: {
      visaoGeral: {
        oQueE:
          "Sistema de controle de estoque B2B pensado para facilitar vendas no dia a dia. Cada estabelecimento opera em ambiente isolado, com identidade visual própria (nome, logo e cores), disponível na web, desktop Windows e Android.",
        problemaResolvido: [
          "Pequenos negócios costumam controlar estoque em planilhas ou sistemas genéricos, sem histórico confiável nem alertas de reposição.",
          "O InjetBox centraliza peças, movimentações e alertas de baixo estoque em uma interface simples, com isolamento por empresa e builds prontos para demonstração comercial ou operação real.",
        ],
        funcionalidades: [
          "Cadastro e consulta de peças com filtros e busca",
          "Entrada, saída e ajuste de estoque com histórico auditável",
          "Alertas de baixo estoque e estoque zerado",
          "Branding por empresa (logo, cores e nome)",
          "Importação de planilhas (XLSX)",
          "Três modos no mesmo código: demo, operação e catálogo",
          "Distribuição web, desktop (Electron) e APK Android",
        ],
      },
      arquitetura: {
        stack: [
          { label: "Frontend", value: "React 19 + TypeScript + Vite 8 + Tailwind CSS 4" },
          { label: "Backend", value: "Supabase (Auth + PostgreSQL + RLS + Realtime)" },
          { label: "Desktop", value: "Electron (Windows portable)" },
          { label: "Mobile", value: "Capacitor (Android APK)" },
          { label: "CI", value: "GitHub Actions (lint + build)" },
        ],
        estrutura: [
          { path: "src/screens/", desc: "Telas — estoque, histórico, alertas, importação e branding" },
          { path: "src/components/", desc: "Componentes reutilizáveis da interface" },
          { path: "src/context/", desc: "Estado global — auth, tenant e tema por empresa" },
          { path: "src/lib/", desc: "Integração Supabase, movimentações e helpers" },
          { path: "supabase/", desc: "Schema SQL, migrações B2B e políticas RLS" },
          { path: "electron/", desc: "Empacotamento desktop Windows" },
          { path: "android/", desc: "Projeto Capacitor para build APK" },
        ],
        decisoes: [
          "Multi-tenant por tenant_id com isolamento via Row Level Security (RLS)",
          "Mesmo código-base com 3 modos controlados por VITE_APP_MODE",
          "Movimentações atômicas via RPC register_movement no PostgreSQL",
          "Branding dinâmico persistido em tenant_settings",
          "Realtime do Supabase para atualização de estoque em tempo real",
          "Release matriz por modo (demo, operação, catálogo) via GitHub Actions",
        ],
        secoes: [
          {
            titulo: "Modos de produto",
            texto: [
              "O app roda em demo (demonstração comercial), operação (gestão completa) ou catálogo (consulta sem movimentações), alternados por variável de ambiente no build.",
              "Isso permite entregar builds específicos para cada contexto comercial sem manter repositórios separados.",
            ],
          },
          {
            titulo: "Modelo B2B",
            texto:
              "Cada usuário pertence a um tenant (estabelecimento). Produtos e movimentos ficam isolados por RLS; platform admin gerencia tenants e personalização visual de cada cliente.",
          },
        ],
      },
      testes: {
        cobertura: [
          "Pipeline CI com lint (Oxlint) e build TypeScript + Vite a cada push e PR na main.",
          "Validação manual dos fluxos de estoque, importação e branding nos três modos de produto.",
        ],
        cenarios: [
          "Login e isolamento de dados entre tenants",
          "Entrada, saída e ajuste de estoque com bloqueio de saldo negativo",
          "Histórico de movimentações com usuário e quantidades anteriores",
          "Alertas de baixo estoque e estoque zerado",
          "Importação de planilha XLSX",
          "Build desktop (Electron) e APK Android",
        ],
      },
      mer: {
        intro:
          "Modelo de dados principal do InjetBox. Cada estabelecimento (tenant) possui produtos e movimentos isolados via RLS.",
        entidades: [
          { nome: "tenants", campos: [["PK", "id"], ["", "name"], ["", "created_at"]] },
          { nome: "profiles", campos: [["PK", "id"], ["FK", "tenant_id"], ["", "name"], ["", "is_admin"], ["", "is_platform_admin"]] },
          { nome: "tenant_settings", campos: [["PK", "tenant_id"], ["", "company_name"], ["", "logo_url"], ["", "primary_color"], ["", "background_color"]] },
          { nome: "products", campos: [["PK", "id"], ["FK", "tenant_id"], ["FK", "user_id"], ["", "code"], ["", "brand"], ["", "quantity"], ["", "min_quantity"]] },
          { nome: "movements", campos: [["PK", "id"], ["FK", "tenant_id"], ["FK", "product_id"], ["", "type"], ["", "quantity"], ["", "previous_quantity"], ["", "new_quantity"]] },
        ],
        relacionamentos: [
          "tenants 1 — N profiles",
          "tenants 1 — 1 tenant_settings",
          "tenants 1 — N products",
          "tenants 1 — N movements",
          "products 1 — N movements",
        ],
      },
    },
  },
  {
    nome: "Cleiton Bot",
    categoria: "Projeto Comercial",
    descricao:
      "Bot de figurinhas para WhatsApp: envie uma imagem, GIF, vídeo ou link e receba a figurinha na hora. Roda na WhatsApp Cloud API.",
    tecnologias: ["Node.js", "WhatsApp Cloud API", "Sharp", "FFmpeg", "Nginx"],
    github: "https://github.com/thomazte/cleitonbot",
    demo: "https://wa.me/556284818765",
    imagem: "assets/projects/cleiton-cover.webp",
    capaColor: "#000000",
    capaGradient: "linear-gradient(#000000, #000000)",
    capaContain: true,
    detalhes: {
      visaoGeral: {
        oQueE:
          "Bot de WhatsApp que transforma imagem, GIF ou vídeo em figurinha, esticada ou na proporção original, com nome de pacote e autor personalizáveis.",
        problemaResolvido: [
          "Fazer figurinha costuma exigir um app à parte, com anúncios, e passar o arquivo de um lado para o outro.",
          "No Cleiton basta mandar a mídia com !s na conversa, ou só o link do Tenor, do Giphy ou de um post do X.",
        ],
        funcionalidades: [
          "!s estica a mídia; !so mantém a proporção com fundo transparente",
          "Figurinhas estáticas e animadas no formato 512×512 do WhatsApp",
          "Links do Tenor, Giphy, posts do X e arquivos .gif, .mp4, .webm e .webp",
          "Pacote e autor personalizados (!s Pacote | Autor)",
          "Vídeos longos usam os primeiros 10 segundos",
        ],
      },
      arquitetura: {
        stack: [
          { label: "Runtime", value: "Node.js 20 (ES Modules)" },
          { label: "WhatsApp", value: "Cloud API (Graph v23.0) via webhook" },
          { label: "Mídia", value: "Sharp (imagem) + FFmpeg (GIF e vídeo)" },
          { label: "Metadados", value: "node-webpmux (EXIF de pacote e autor)" },
          { label: "Produção", value: "VPS Ubuntu, PM2, Nginx + Let's Encrypt" },
        ],
        estrutura: [
          { path: "src/webhook.js", desc: "Servidor HTTP — verificação do webhook, /health e mensagens" },
          { path: "src/cloud/", desc: "Comandos e cliente da Graph API (texto, mídia e figurinha)" },
          { path: "src/services/", desc: "Conversão para WebP e download de links de GIF" },
          { path: "src/utils/", desc: "Arquivos temporários e caminhos do FFmpeg" },
          { path: "scripts/", desc: "Validação dos modos fill e contain, local e na VPS" },
        ],
        decisoes: [
          "Cloud API oficial em produção; o cliente Baileys ficou no código, desligado",
          "Transporte separado da mídia: o webhook não conhece o FFmpeg e o serviço não conhece a Meta",
          "O webhook responde 200 antes de processar a mensagem",
          "Download de link recusa endereço local, porta fora de 80/443 e arquivo acima de 15 MB",
          "Alvos de tamanho do WhatsApp: estática até 100 KB, animada até 500 KB e 10 s",
        ],
        secoes: [
          {
            titulo: "Fluxo de uma figurinha",
            texto: [
              "A Meta entrega a mensagem no webhook HTTPS. O handler identifica o comando e o modo, baixa a mídia pela Graph API ou pelo link e passa ao serviço de figurinha.",
              "Imagens vão pelo Sharp; GIFs e vídeos pelo FFmpeg, com corte, fps limitado e compressão. O WebP final recebe o EXIF de pacote e autor e volta para a conversa.",
            ],
          },
        ],
      },
    },
  },
  {
    nome: "Organizaê",
    categoria: "Projeto Comercial",
    descricao:
      "Planner financeiro pessoal para controlar gastos, metas e recorrências. Offline-first (PWA) com sync opcional via Supabase.",
    tecnologias: ["React", "TypeScript", "Supabase", "PWA"],
    github: "https://github.com/thomazte/organizae",
    demo: "",
    imagem: "assets/projects/organizae-cover.webp",
    capaColor: "#1866FA",
    capaGradient:
      "radial-gradient(ellipse 160% 130% at 50% 36%, #3d8cff 0%, #2474f7 45%, #1866fa 100%)",
    capaContain: true,
    detalhes: {
      visaoGeral: {
        oQueE:
          "Planner financeiro pessoal para controle de gastos, metas e despesas recorrentes. Funciona offline-first como PWA, com sincronização opcional na nuvem via Supabase.",
        problemaResolvido: [
          "Controlar as finanças pessoais costuma exigir planilhas manuais ou aplicativos pagos e cheios de anúncios.",
          "O Organizaê centraliza gastos, metas e recorrências em uma interface simples, que funciona mesmo sem internet e sincroniza quando você quiser.",
        ],
        funcionalidades: [
          "Registro de gastos e receitas",
          "Metas financeiras com acompanhamento",
          "Despesas recorrentes automáticas",
          "Funcionamento offline (PWA) instalável",
          "Sincronização opcional via Supabase",
        ],
      },
      arquitetura: {
        stack: [
          { label: "Frontend", value: "React + TypeScript + Vite" },
          { label: "Backend", value: "Supabase (PostgreSQL + Auth)" },
          { label: "Mobile", value: "Capacitor (Android)" },
          { label: "Offline", value: "PWA + armazenamento local" },
        ],
        estrutura: [
          { path: "components/", desc: "Interface React — formulários, dashboards e listagens" },
          { path: "hooks/", desc: "Lógica reutilizável — CRUD, sync e autenticação" },
          { path: "services/", desc: "Integração com Supabase e persistência local" },
          { path: "domain/", desc: "Regras de negócio financeiras, cálculos e validações" },
          { path: "utils/", desc: "Formatação, helpers e utilitários compartilhados" },
        ],
        decisoes: [
          "Offline-first com sincronização opcional",
          "TypeScript para type safety em toda aplicação",
          "Separação entre domínio e interface",
          "Hooks reutilizáveis para autenticação e CRUD",
          "Componentização focada em manutenção",
          "Lazy loading das páginas principais",
        ],
        secoes: [
          {
            titulo: "Sincronização offline",
            texto: [
              "O app funciona integralmente offline usando armazenamento local. Quando o usuário opta por sincronizar, os dados são enviados ao Supabase sem duplicar registros.",
              "As regras de merge e consistência ficam centralizadas na camada de serviços para garantir previsibilidade.",
            ],
          },
          {
            titulo: "Segurança e dados",
            texto:
              "A autenticação é feita via Supabase Auth. Os dados de cada usuário ficam isolados por conta, com políticas de acesso no PostgreSQL (RLS) quando a sync está ativa.",
          },
        ],
      },
      testes: {
        cobertura: [
          "A cobertura foca nas regras de negócio financeiras e na consistência dos dados em modo offline.",
          "Os testes validam cálculos de saldo, metas e a sincronização entre o armazenamento local e o Supabase.",
        ],
        cenarios: [
          "Cálculo de saldo e totais por período",
          "Criação e acompanhamento de metas",
          "Geração correta de despesas recorrentes",
          "Persistência dos dados offline (PWA)",
          "Sincronização local ↔ Supabase sem duplicar registros",
        ],
      },
      mer: {
        intro:
          "Modelo de dados representativo (simplificado) do Organizaê, com as principais entidades e relacionamentos.",
        entidades: [
          { nome: "usuarios", campos: [["PK", "id"], ["", "nome"], ["", "email"], ["", "criado_em"]] },
          { nome: "categorias", campos: [["PK", "id"], ["FK", "usuario_id"], ["", "nome"], ["", "tipo"]] },
          { nome: "transacoes", campos: [["PK", "id"], ["FK", "usuario_id"], ["FK", "categoria_id"], ["", "valor"], ["", "tipo"], ["", "data"]] },
          { nome: "metas", campos: [["PK", "id"], ["FK", "usuario_id"], ["", "titulo"], ["", "valor_alvo"], ["", "prazo"]] },
          { nome: "recorrencias", campos: [["PK", "id"], ["FK", "usuario_id"], ["FK", "categoria_id"], ["", "valor"], ["", "frequencia"]] },
        ],
        relacionamentos: [
          "usuarios 1 — N transacoes",
          "usuarios 1 — N categorias",
          "usuarios 1 — N metas",
          "usuarios 1 — N recorrencias",
          "categorias 1 — N transacoes",
        ],
      },
    },
  },
  {
    nome: "Pactto",
    categoria: "Ferramentas",
    descricao:
      "App para o prestador de serviço montar uma proposta comercial no celular e entregar um PDF ao cliente. Sem conta e sem servidor.",
    tecnologias: ["Flutter", "Dart", "PDF"],
    github: "https://github.com/thomazte/pactto",
    demo: "",
    imagem: "assets/projects/pactto-cover.webp",
    capaColor: "#1d4ed8",
    capaGradient:
      "radial-gradient(ellipse 160% 130% at 50% 36%, #3b82f6 0%, #2563eb 45%, #1d4ed8 100%)",
    capaContain: true,
    detalhes: {
      visaoGeral: {
        oQueE:
          "Aplicativo com o qual o prestador monta uma proposta comercial no celular, confere a folha ao lado do formulário e entrega ao cliente um PDF A4 com itens, desconto, visita, validade e Pix.",
        problemaResolvido: [
          "Muito prestador ainda manda orçamento por mensagem solta ou monta o PDF à mão, com conta feita na calculadora.",
          "O Pactto calcula tudo em centavos inteiros, numera as propostas e gera um PDF padronizado com a marca da empresa, direto do celular.",
        ],
        funcionalidades: [
          "Itens com quantidade fracionada, valor e atalhos (hora de desenvolvimento, suporte, licença)",
          "Desconto percentual ou fixo e taxa de visita",
          "Pré-visualização da folha ao lado ou abaixo do formulário",
          "PDF A4 com logo, numeração e validade de 7 dias",
          "Dados da empresa e logo gravados no aparelho",
          "Máscara de telefone brasileiro e mensagens de erro em cada campo",
        ],
      },
      arquitetura: {
        stack: [
          { label: "App", value: "Flutter (Android e web)" },
          { label: "Domínio", value: "Pacote Dart puro, sem Flutter" },
          { label: "PDF", value: "pdf + printing, fontes DejaVu embutidas" },
          { label: "Dados", value: "SharedPreferences, sem conta nem servidor" },
        ],
        estrutura: [
          { path: "packages/dominio/", desc: "Dinheiro, arredondamento, validade, documentos e estados do orçamento" },
          { path: "apps/pactto/lib/models/", desc: "Empresa, item digitado, resumo e dados do PDF" },
          { path: "apps/pactto/lib/controllers/", desc: "Estado da proposta e ações do prestador" },
          { path: "apps/pactto/lib/services/", desc: "Gravação local, numeração e geração do PDF" },
          { path: "apps/pactto/lib/views/", desc: "Formulário, folha e composição da tela" },
        ],
        decisoes: [
          "Workspace Dart que separa a interface das regras de cálculo",
          "Valores em centavos inteiros e quantidade em milésimos, com arredondamento half-up",
          "Soma com BigInt antes de caber num inteiro de 64 bits",
          "O número da proposta só avança depois que o PDF é entregue",
          "Datas pelo dia civil de São Paulo",
          "Máquina de estados do orçamento já pronta no domínio para as próximas versões",
        ],
        secoes: [
          {
            titulo: "Cálculo",
            texto: [
              "A base do desconto é a soma das linhas; o percentual incide só sobre ela e a visita entra depois. Desconto acima de 100% ou maior que a base é recusado.",
              "A leitura aceita o formato brasileiro (1.234,50) e o teclado numérico sem vírgula: 10.5 vale 10,50.",
            ],
          },
        ],
      },
      testes: {
        cobertura: [
          "69 testes: 47 no pacote de domínio (dart test) e 22 no app (flutter test).",
          "O domínio concentra os casos de borda de dinheiro e arredondamento; o app cobre o controller, a leitura dos campos, a gravação local e o PDF.",
        ],
        cenarios: [
          "Arredondamento half-up e limites do cálculo em centavos",
          "Desconto percentual e fixo, com recusa acima da base",
          "Transições válidas e inválidas da máquina de estados",
          "Validade pelo dia civil de São Paulo",
          "CPF e CNPJ pelos dígitos verificadores",
          "Geração do PDF com várias páginas",
        ],
      },
    },
  },
  {
    nome: "Remote Resolution",
    categoria: "Ferramentas",
    descricao:
      "Ferramenta para analistas de suporte que realizam atendimentos via acesso remoto, agilizando a resolução de chamados.",
    tecnologias: ["Python", "PowerShell"],
    github: "https://github.com/thomazte/remote-resolution",
    demo: "",
    imagem: "assets/projects/remote-resolution-cover.webp",
    capaColor: "#071526",
    capaGradient:
      "radial-gradient(ellipse 160% 130% at 50% 36%, #0c3a66 0%, #092038 50%, #071526 100%)",
    capaContain: true,
    detalhes: {
      visaoGeral: {
        oQueE:
          "Ferramenta de apoio para analistas de suporte que realizam atendimentos via acesso remoto, automatizando tarefas repetitivas do dia a dia.",
        problemaResolvido: [
          "Atendimentos remotos envolvem muitos passos manuais e repetitivos, aumentando o tempo de resolução dos chamados.",
          "A ferramenta automatiza e centraliza essas rotinas, deixando o atendimento mais rápido e padronizado.",
        ],
        funcionalidades: [
          "Automação de rotinas de suporte",
          "Scripts utilitários para acesso remoto",
          "Padronização do atendimento",
        ],
      },
      arquitetura: {
        stack: [
          { label: "Core", value: "Python 3" },
          { label: "Automação", value: "PowerShell" },
          { label: "Ambiente", value: "Windows (acesso remoto)" },
        ],
        estrutura: [
          { path: "scripts/", desc: "Rotinas de automação executadas no atendimento" },
          { path: "modules/", desc: "Funções reutilizáveis e utilitários compartilhados" },
          { path: "config/", desc: "Parâmetros e configurações do ambiente" },
          { path: "logs/", desc: "Registro de execuções e tratamento de erros" },
        ],
        decisoes: [
          "Python para orquestração das rotinas principais",
          "PowerShell para tarefas nativas do Windows",
          "Scripts modulares e reutilizáveis",
          "Tratamento de erros em cada etapa do fluxo",
          "Padronização dos passos de atendimento remoto",
        ],
        secoes: [
          {
            titulo: "Fluxo de atendimento",
            texto: [
              "A ferramenta automatiza passos repetitivos do suporte remoto — conexão, diagnóstico e rotinas de resolução — reduzindo o tempo de cada chamado.",
              "Cada script é independente, permitindo combinar rotinas conforme o tipo de atendimento.",
            ],
          },
        ],
      },
      testes: {
        cobertura: [
          "A cobertura concentra-se nas rotinas de automação e no tratamento de erros durante o acesso remoto.",
        ],
        cenarios: [
          "Execução das rotinas de automação",
          "Tratamento de falhas de conexão",
          "Validação das entradas do usuário",
          "Padronização dos passos de atendimento",
        ],
      },
    },
  },
  {
    nome: "Agenda de Implantação",
    categoria: "Projeto Comercial",
    descricao:
      "Sistema de agenda compartilhada para organização e acompanhamento de implantações entre equipes.",
    tecnologias: ["Python"],
    github: "https://github.com/thomazte/agenda-implantacao",
    demo: "",
    imagem: "assets/projects/agenda-implantacao-cover.webp",
    capaColor: "#1a1412",
    capaGradient:
      "radial-gradient(ellipse 160% 130% at 50% 36%, #3a2218 0%, #1a1412 55%, #120e0c 100%)",
    capaContain: true,
    detalhes: {
      visaoGeral: {
        oQueE:
          "Sistema de agenda compartilhada para organizar e acompanhar implantações entre equipes.",
        problemaResolvido: [
          "Coordenar implantações entre times sem uma agenda central gera conflitos de datas e falta de visibilidade.",
          "O sistema oferece um calendário compartilhado para planejar e acompanhar cada implantação.",
        ],
        funcionalidades: [
          "Agenda compartilhada de implantações",
          "Acompanhamento de status",
          "Organização por equipe e data",
        ],
      },
      arquitetura: {
        stack: [
          { label: "Backend", value: "Python" },
          { label: "Interface", value: "CLI / interface local" },
          { label: "Persistência", value: "Arquivos locais ou banco embutido" },
        ],
        estrutura: [
          { path: "models/", desc: "Entidades de implantação, equipe e agendamento" },
          { path: "services/", desc: "Lógica de agendamento e controle de status" },
          { path: "views/", desc: "Exibição da agenda e filtros por equipe/data" },
          { path: "utils/", desc: "Validação de datas e detecção de conflitos" },
        ],
        decisoes: [
          "Modelo de dados centrado em implantações e equipes",
          "Validação de conflitos de data na camada de serviço",
          "Filtros por equipe e período",
          "Status de implantação rastreável",
          "Código modular para evolução futura",
        ],
        secoes: [
          {
            titulo: "Agenda compartilhada",
            texto: [
              "O sistema centraliza as implantações de múltiplas equipes em um único calendário, evitando conflitos de datas e falta de visibilidade.",
              "Cada implantação pode ser acompanhada por status, facilitando o planejamento entre times.",
            ],
          },
        ],
      },
      testes: {
        cobertura: [
          "A cobertura valida o agendamento e o controle de status das implantações.",
        ],
        cenarios: [
          "Criação e edição de agendamentos",
          "Detecção de conflitos de data",
          "Atualização de status das implantações",
          "Filtros por equipe e período",
        ],
      },
    },
  },
  {
    nome: "Memes",
    categoria: "Acadêmicos",
    descricao:
      "Aplicação web em Java para buscar, visualizar e baixar memes, com login, perfis de usuário e admin e busca no catálogo local, no Giphy e no Imgflip.",
    tecnologias: ["Java 18", "Jakarta Servlet", "Tomcat", "PostgreSQL"],
    github: "https://github.com/thomazte/memes",
    demo: "https://memes.137.131.137.227.sslip.io/login",
    imagem: "assets/projects/memes-cover.webp",
    capaColor: "#12237a",
    capaGradient:
      "radial-gradient(ellipse 160% 130% at 50% 36%, #3a8ff0 0%, #1c3fb8 50%, #12237a 100%)",
    capaContain: true,
    detalhes: {
      visaoGeral: {
        oQueE:
          "Projeto da disciplina de Desenvolvimento de Soluções WEB: uma aplicação server-side em Java para buscar, visualizar e baixar memes em imagem ou GIF.",
        problemaResolvido: [
          "A proposta era praticar o ciclo completo de uma aplicação web sem framework: rotas em Servlets, sessão, controle de acesso por perfil, banco relacional e consumo de APIs externas.",
          "O tema lúdico dos memes serviu de base para tudo isso, do cadastro ao deploy em HTTPS numa VPS.",
        ],
        funcionalidades: [
          "Cadastro e login com senha em BCrypt",
          "Redirecionamento por perfil: usuário vai ao feed, admin vai ao painel",
          "Busca no catálogo local, no Giphy (GIFs) e no Imgflip (templates)",
          "Download do meme com tela de confirmação",
          "Painel do admin para cadastrar memes no catálogo",
          "Exclusão de conta e logout",
        ],
      },
      arquitetura: {
        stack: [
          { label: "Backend", value: "Java 18 + Jakarta Servlet 6" },
          { label: "Servidor", value: "Tomcat 10.1 (WAR via Maven)" },
          { label: "Banco", value: "PostgreSQL (JDBC)" },
          { label: "APIs", value: "Giphy e Imgflip (HttpClient + Gson)" },
          { label: "Deploy", value: "VPS com Nginx + Let's Encrypt" },
        ],
        estrutura: [
          { path: "controller/", desc: "Servlets — login, cadastro, home, admin, busca e download" },
          { path: "model/", desc: "Entidades Usuario e Meme, DAOs e conexão" },
          { path: "service/", desc: "MemeBuscaService e clientes do Giphy e do Imgflip" },
          { path: "filter/", desc: "Cabeçalhos anti-cache nas rotas protegidas" },
          { path: "views/", desc: "Páginas HTML servidas pelo WAR" },
        ],
        decisoes: [
          "Servlets puros, sem framework, para expor o ciclo da requisição",
          "Sessão HTTP com controle de acesso por perfil",
          "Chave do Giphy fora do repositório (arquivo, variável de ambiente ou propriedade JVM)",
          "Nginx termina o HTTPS e o Tomcat marca o cookie de sessão como Secure (RemoteIpValve)",
          "Scripts de deploy local e na VPS, com backup e rollback",
        ],
      },
      mer: {
        intro:
          "O banco tem duas tabelas independentes: as contas e o catálogo local de memes.",
        entidades: [
          { nome: "usuarios", campos: [["PK", "id"], ["", "login"], ["", "senha"], ["", "status"], ["", "perfil"]] },
          { nome: "memes", campos: [["PK", "id"], ["", "titulo"], ["", "tags"], ["", "caminho"], ["", "tipo"], ["", "status"]] },
        ],
      },
    },
  },
  {
    nome: "Replicação com Redis",
    categoria: "Acadêmicos",
    descricao:
      "Prática de Sistemas Distribuídos: cluster Redis master-replica em duas VMs, com testes de replicação, réplica somente leitura e failover.",
    tecnologias: ["Redis", "Ubuntu Server", "VirtualBox", "Python"],
    github: "https://github.com/thomazte/redis",
    demo: "",
    imagem: "assets/projects/redis-cover.webp",
    capaColor: "#b82418",
    capaGradient:
      "radial-gradient(ellipse 160% 130% at 50% 36%, #f0503f 0%, #dc382c 45%, #b82418 100%)",
    capaContain: true,
    detalhes: {
      visaoGeral: {
        oQueE:
          "Prática da disciplina de Sistemas Distribuídos, feita em dupla com Lucas Gabriel: um cluster Redis com um master e uma réplica, cada um numa VM Ubuntu Server no VirtualBox.",
        problemaResolvido: [
          "Uma única instância de banco é um ponto único de falha e limita as leituras à capacidade de uma máquina.",
          "A prática monta a replicação, comprova que a réplica recebe os dados e recusa escritas, e promove a réplica a master para simular uma falha.",
        ],
        funcionalidades: [
          "Duas VMs com rede interna dedicada ao cluster",
          "Réplica somente leitura sincronizada com o master",
          "Failover manual com REPLICAOF NO ONE",
          "Script Python que repete os testes de ponta a ponta",
          "Relatório em PDF e site de apresentação",
        ],
      },
      arquitetura: {
        stack: [
          { label: "Banco", value: "Redis (master-replica)" },
          { label: "Sistema", value: "Ubuntu Server 26.04 LTS" },
          { label: "Virtualização", value: "Oracle VirtualBox" },
          { label: "Testes", value: "Python 3 + redis-py" },
        ],
        estrutura: [
          { path: "REDIS01", desc: "Master — 192.168.50.10:6379, recebe as escritas" },
          { path: "REDIS02", desc: "Réplica — 192.168.50.20:6379, somente leitura" },
          { path: "teste_redis.py", desc: "Validação do cluster pelo cliente Python" },
          { path: "apresentacao/", desc: "Site da apresentação (HTML, CSS e JS)" },
        ],
        decisoes: [
          "Duas placas por VM: NAT para pacotes, rede interna redis-net para o cluster",
          "IPs estáticos configurados pelo Netplan",
          "Réplica criada por clonagem completa da VM, com hostname e MAC novos",
          "Replicação assíncrona: prioriza disponibilidade, com consistência eventual",
        ],
        secoes: [
          {
            titulo: "Replicação e CAP",
            texto: [
              "Na primeira conexão a réplica recebe um snapshot RDB (full sync). Depois de uma queda curta, o PSYNC reenvia só o que ficou no backlog.",
              "O master confirma a escrita antes da réplica, então existe uma janela de atraso: se ele cair nesse intervalo, as escritas mais recentes podem se perder no failover.",
            ],
          },
        ],
      },
      testes: {
        cobertura: [
          "Os cenários foram validados no redis-cli, registrados no relatório, e repetidos pelo teste_redis.py contra o cluster no ar.",
        ],
        cenarios: [
          "Escrita no master e leitura da mesma chave na réplica",
          "Escrita na réplica recusada com ReadOnlyError",
          "Promoção da réplica a master (REPLICAOF NO ONE)",
          "Escrita aceita no novo master",
          "Volta da réplica à topologia original",
        ],
      },
    },
  },
];

/* Ordem fixa dos filtros (Todos fica sempre primeiro).
   Azul é exclusivo de "Todos" — definido em main.js via --accent. */
const CATEGORY_FILTERS = ["Todos", "Acadêmicos", "Ferramentas", "Projeto Comercial"];

/* Cores dos marcadores de categoria (cards, filtros e modal) */
const CATEGORY_COLORS = {
  Acadêmicos: "var(--cat-academicos)",
  Ferramentas: "var(--cat-ferramentas)",
  "Projeto Comercial": "var(--cat-comercial)",
};

/* Rótulos das abas do modal (ordem de exibição) */
const DETAIL_TABS = [
  { key: "visaoGeral", label: "Visão Geral" },
  { key: "arquitetura", label: "Arquitetura" },
  { key: "testes", label: "Testes" },
  { key: "fluxogramas", label: "Fluxogramas" },
  { key: "mer", label: "MER" },
];

/* ---------------------------------------------------------
   Integração futura com a API pública do GitHub.
   Retorna projetos no mesmo formato de card (sem detalhes).
--------------------------------------------------------- */
async function fetchGithubRepos(username, { perPage = 6 } = {}) {
  const endpoint = `https://api.github.com/users/${username}/repos?sort=updated&per_page=${perPage}`;

  try {
    const response = await fetch(endpoint, {
      headers: { Accept: "application/vnd.github+json" },
    });
    if (!response.ok) throw new Error(`GitHub API: ${response.status}`);

    const repos = await response.json();

    // A API não diz a categoria: o repositório só entra num filtro se tiver
    // um tópico com o nome dela (ex.: "academicos", "ferramentas").
    const categoriaPorTopico = (topics = []) =>
      CATEGORY_FILTERS.find(
        (cat) =>
          cat !== "Todos" &&
          topics.includes(cat.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, "-"))
      ) || "";

    return repos.map((repo) => ({
      nome: repo.name,
      categoria: categoriaPorTopico(repo.topics),
      descricao: repo.description || "Sem descrição disponível.",
      tecnologias:
        repo.topics && repo.topics.length
          ? repo.topics
          : [repo.language].filter(Boolean),
      github: repo.html_url,
      demo: repo.homepage || "",
      imagem: "",
      detalhes: null,
    }));
  } catch (error) {
    console.warn("Não foi possível carregar repositórios do GitHub:", error);
    return null;
  }
}

// Expõe globalmente (scripts são carregados sem módulos)
window.PROJECTS = PROJECTS;
window.CATEGORY_FILTERS = CATEGORY_FILTERS;
window.CATEGORY_COLORS = CATEGORY_COLORS;
window.DETAIL_TABS = DETAIL_TABS;
window.fetchGithubRepos = fetchGithubRepos;
