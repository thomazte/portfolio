/* =========================================================
   projects.js
   Fonte de dados dos projetos do portfólio.
   ---------------------------------------------------------
   Cada projeto tem dados de card + detalhes para o modal.

   CAMPOS DO CARD:
   - nome         (string)  Título do projeto
   - categoria    (string)  Categoria usada nos filtros
                            ("Caso de estudo" | "Projeto Acadêmico" | "Projeto Comercial")
   - descricao    (string)  Descrição curta (card)
   - tecnologias  (array)   Lista de tecnologias
   - github       (string)  URL do repositório ("" oculta o botão)
   - demo         (string)  URL do deploy/demo ("" oculta o botão)
   - imagem       (string)  Caminho da capa ("" usa placeholder)
   - capaColor    (string)  Cor de fundo da capa (ex.: "#1866FA")
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
    nome: "Organizaê",
    categoria: "Caso de estudo",
    descricao:
      "Planner financeiro pessoal para controlar gastos, metas e recorrências. Offline-first (PWA) com sync opcional via Supabase.",
    tecnologias: ["React", "TypeScript", "Supabase", "PWA"],
    github: "https://github.com/thomazte/organizae",
    demo: "",
    imagem: "assets/projects/organizae-cover.png",
    capaColor: "#1866FA",
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
    categoria: "Projeto Comercial",
    descricao:
      "Ferramenta para analistas de suporte que realizam atendimentos via acesso remoto, agilizando a resolução de chamados.",
    tecnologias: ["Python", "PowerShell"],
    github: "https://github.com/thomazte/remote-resolution",
    demo: "",
    imagem: "",
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
    imagem: "",
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

/* Cores dos marcadores de categoria (usadas nos cards/filtros/modal) */
const CATEGORY_COLORS = {
  "Caso de estudo": "#60a5fa",
  "Projeto Acadêmico": "#34d399",
  "Projeto Comercial": "#fbbf24",
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
window.CATEGORY_COLORS = CATEGORY_COLORS;
window.DETAIL_TABS = DETAIL_TABS;
window.fetchGithubRepos = fetchGithubRepos;
