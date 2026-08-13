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
    imagem: "assets/projects/quebracodigo-cover.png",
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
    nome: "Organizaê",
    categoria: "Projeto Comercial",
    descricao:
      "Planner financeiro pessoal para controlar gastos, metas e recorrências. Offline-first (PWA) com sync opcional via Supabase.",
    tecnologias: ["React", "TypeScript", "Supabase", "PWA"],
    github: "https://github.com/thomazte/organizae",
    demo: "",
    imagem: "assets/projects/organizae-cover.png",
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
    nome: "Remote Resolution",
    categoria: "Ferramentas",
    descricao:
      "Ferramenta para analistas de suporte que realizam atendimentos via acesso remoto, agilizando a resolução de chamados.",
    tecnologias: ["Python", "PowerShell"],
    github: "https://github.com/thomazte/remote-resolution",
    demo: "",
    imagem: "assets/projects/remote-resolution-cover.png",
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
    imagem: "assets/projects/agenda-implantacao-cover.png",
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

    return repos.map((repo) => ({
      nome: repo.name,
      categoria: "Projeto Comercial",
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
