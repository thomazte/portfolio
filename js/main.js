/* =========================================================
   main.js
   Lógica da interface: renderização dinâmica de skills e
   projetos, navbar com efeito de scroll, menu mobile e
   navegação ativa.
   ========================================================= */

(function () {
  "use strict";

  /* Sinaliza ao CSS que o JS está ativo (esconde elementos
     que serão animados). Sem JS, tudo permanece visível. */
  document.documentElement.classList.add("js-anim");

  /* ---------------------------------------------------------
     Ícones (SVG inline) das tecnologias.
     Mantidos monocromáticos (currentColor) para combinar
     com a estética minimalista. Marca/destaque vem do hover.
  --------------------------------------------------------- */
  const ICONS = {
    code: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>',
    spring:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a10 10 0 1 0 9.5 6.9"/><path d="M7 13c2 3 6 3 8 0"/><circle cx="18" cy="6" r="2"/></svg>',
    js: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 12v4a1.5 1.5 0 0 1-3 0"/><path d="M17 12a1.5 1.5 0 0 0-3 0c0 1.5 3 1.5 3 3a1.5 1.5 0 0 1-3 0"/></svg>',
    html: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="m4 3 1.6 16.2L12 21l6.4-1.8L20 3z"/><path d="M8 8h8l-.5 6L12 15l-3.5-1"/></svg>',
    css: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="m4 3 1.6 16.2L12 21l6.4-1.8L20 3z"/><path d="M8 7h8M8 11h8l-.5 5L12 17l-3.5-1"/></svg>',
    db: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v6c0 1.7 3.6 3 8 3s8-1.3 8-3V5"/><path d="M4 11v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6"/></svg>',
    git: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="9" r="3"/><path d="M6 9v6M15.7 7.3 8.3 14.7"/><path d="M18 12v1a3 3 0 0 1-3 3H9"/></svg>',
    python:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3c-3 0-4 1-4 3v2h5"/><path d="M8 8H6c-2 0-3 1-3 4s1 4 3 4h2v-3c0-1.5 1-2.5 2.5-2.5H14c1.5 0 2-1 2-2.5V6c0-2-1-3-4-3"/><circle cx="9.5" cy="5.5" r=".6" fill="currentColor"/><path d="M12 21c3 0 4-1 4-3v-2h-5"/><path d="M16 16h2c2 0 3-1 3-4"/><circle cx="14.5" cy="18.5" r=".6" fill="currentColor"/></svg>',
    postgres:
      '<svg viewBox="0 0 432.071 445.383" fill="currentColor"><path d="M402.395,271.23c-50.302,10.376-53.76-6.655-53.76-6.655c53.111-78.808,75.313-178.843,56.153-203.326c-52.27-66.785-142.752-35.2-144.262-34.38l-0.486,0.087c-9.938-2.063-21.06-3.292-33.56-3.496c-22.761-0.373-40.026,5.967-53.127,15.902c0,0-161.411-66.495-153.904,83.63c1.597,31.938,45.776,241.657,98.471,178.312c19.26-23.163,37.869-42.748,37.869-42.748c9.243,6.14,20.308,9.272,31.908,8.147l0.901-0.765c-0.28,2.876-0.152,5.689,0.361,9.019c-13.575,15.167-9.586,17.83-36.723,23.416c-27.459,5.659-11.328,15.734-0.796,18.367c12.768,3.193,42.307,7.716,62.266-20.224l-0.796,3.188c5.319,4.26,9.054,27.711,8.428,48.969c-0.626,21.259-1.044,35.854,3.147,47.254c4.191,11.4,8.368,37.05,44.042,29.406c29.809-6.388,45.256-22.942,47.405-50.555c1.525-19.631,4.976-16.729,5.194-34.28l2.768-8.309c3.192-26.611,0.507-35.196,18.872-31.203l4.463,0.392c13.517,0.615,31.208-2.174,41.587-7c22.362-10.376,35.622-27.7,13.572-23.148z"/></svg>',
    supabase:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M11 3 4 12h6.5L7 21l9-9H9.5L11 3z"/></svg>',
  };

  /* Lista de tecnologias exibidas na seção Skills */
  const SKILLS = [
    { name: "Java", icon: "code" },
    { name: "Spring Boot", icon: "spring" },
    { name: "JavaScript", icon: "js" },
    { name: "HTML", icon: "html" },
    { name: "CSS", icon: "css" },
    { name: "SQL Server", icon: "db" },
    { name: "PostgreSQL", icon: "postgres" },
    { name: "Supabase", icon: "supabase" },
    { name: "Git", icon: "git" },
    { name: "Python", icon: "python" },
  ];

  /* ---------------------------------------------------------
     Helpers
  --------------------------------------------------------- */
  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];

  // Escapa texto para evitar injeção ao montar HTML
  const escapeHTML = (str = "") =>
    String(str).replace(/[&<>"']/g, (c) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
    }[c]));

  /* ---------------------------------------------------------
     Renderização: Skills
  --------------------------------------------------------- */
  function renderSkills() {
    const list = $("[data-skills]");
    if (!list) return;

    list.innerHTML = SKILLS.map(
      (skill) => `
      <li class="skill" data-stagger-item>
        <span class="skill__icon">${ICONS[skill.icon] || ICONS.code}</span>
        <span class="skill__name">${escapeHTML(skill.name)}</span>
      </li>`
    ).join("");
  }

  /* ---------------------------------------------------------
     Projetos: estado + filtros
  --------------------------------------------------------- */
  let allProjects = [];
  let activeFilter = "Todos";

  const categoryColor = (categoria) =>
    (window.CATEGORY_COLORS && window.CATEGORY_COLORS[categoria]) || "var(--text-dim)";

  function dot(color) {
    return `<span class="category-label__dot" style="background:${color}"></span>`;
  }

  const COVER_GRADIENT =
    "radial-gradient(ellipse 160% 130% at 50% 36%, #3d8cff 0%, #2474f7 45%, #1866fa 100%)";

  function coverMarkup(project, className) {
    const { nome, imagem, capaColor, capaContain } = project;
    if (imagem) {
      const bg = capaContain ? "" : capaColor ? `background-color:${capaColor};` : "";
      const containClass = capaContain ? `${className}--contain` : "";
      return `<div class="${className} ${containClass}" style="${bg}">
                <img src="${escapeHTML(imagem)}" alt="Capa do projeto ${escapeHTML(nome)}" loading="lazy" />
              </div>`;
    }
    return `<div class="${className} project-card__cover--placeholder">
              <span>${escapeHTML((nome || "?").charAt(0))}</span>
            </div>`;
  }

  function renderFilters() {
    const container = $("[data-filters]");
    if (!container) return;

    const categorias = [...new Set(allProjects.map((p) => p.categoria).filter(Boolean))];
    const options = ["Todos", ...categorias];

    container.innerHTML = options
      .map((opt) => {
        const isActive = opt === activeFilter;
        const color = opt === "Todos" ? "var(--accent)" : categoryColor(opt);
        return `<button class="filter-btn${isActive ? " is-active" : ""}" role="tab"
                  aria-selected="${isActive}" data-filter="${escapeHTML(opt)}">
                  <span class="filter-btn__dot" style="color:${color}"></span>${escapeHTML(opt)}
                </button>`;
      })
      .join("");

    $$(".filter-btn", container).forEach((btn) =>
      btn.addEventListener("click", () => {
        activeFilter = btn.dataset.filter;
        renderFilters();
        renderProjects();
      })
    );
  }

  function renderProjects() {
    const grid = $("[data-projects]");
    if (!grid) return;

    const list =
      activeFilter === "Todos"
        ? allProjects
        : allProjects.filter((p) => p.categoria === activeFilter);

    if (!list.length) {
      grid.innerHTML = `<p class="section__lead">Nenhum projeto nesta categoria.</p>`;
      return;
    }

    grid.innerHTML = list.map(createProjectCard).join("");

    // Abre o modal ao clicar no card
    $$(".project-card", grid).forEach((card) => {
      const index = Number(card.dataset.index);
      card.addEventListener("click", () => openModal(allProjects[index]));
    });

    // Anima a entrada dos cards (re-render dos filtros)
    if (typeof window.revealProjects === "function") window.revealProjects();
  }

  function createProjectCard(project) {
    const { nome, categoria, descricao, tecnologias = [] } = project;
    const index = allProjects.indexOf(project);

    const tags = tecnologias
      .map((t) => `<span class="tag">${escapeHTML(t)}</span>`)
      .join("");

    const categoryLabel = categoria
      ? `<span class="category-label">${dot(categoryColor(categoria))}${escapeHTML(categoria)}</span>`
      : "";

    return `
      <button type="button" class="project-card" data-stagger-item data-index="${index}"
        aria-label="Ver detalhes do projeto ${escapeHTML(nome)}">
        ${coverMarkup(project, "project-card__cover")}
        <div class="project-card__body">
          ${categoryLabel}
          <h3 class="project-card__title">${escapeHTML(nome)}</h3>
          <p class="project-card__desc">${escapeHTML(descricao)}</p>
          <div class="project-card__tags">${tags}</div>
          <span class="project-card__more">
            Ver detalhes
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
          </span>
        </div>
      </button>`;
  }

  /* ---------------------------------------------------------
     Modal de projeto
  --------------------------------------------------------- */
  let lastFocused = null;

  const toParas = (v) =>
    (Array.isArray(v) ? v : [v]).filter(Boolean).map((p) => `<p>${escapeHTML(p)}</p>`).join("");

  function renderArquitetura(value) {
    const stack = (value.stack || [])
      .map(
        (row) =>
          `<div class="arch-row">
            <span class="arch-label">${escapeHTML(row.label)}</span>
            <span class="arch-value">${escapeHTML(row.value)}</span>
          </div>`
      )
      .join("");

    const estrutura = (value.estrutura || [])
      .map(
        (item) =>
          `<div class="arch-structure__item">
            <code class="arch-path">${escapeHTML(item.path)}</code>
            <p class="arch-desc">${escapeHTML(item.desc)}</p>
          </div>`
      )
      .join("");

    const decisoes = (value.decisoes || [])
      .map((d) => `<li>${escapeHTML(d)}</li>`)
      .join("");

    const secoes = (value.secoes || [])
      .map(
        (s) =>
          `<h4>${escapeHTML(s.titulo)}</h4>${toParas(s.texto)}`
      )
      .join("");

    return `
      ${stack ? `<h4>Stack principal</h4><div class="arch-stack">${stack}</div>` : ""}
      ${estrutura ? `<h4>Estrutura do sistema</h4><div class="arch-structure">${estrutura}</div>` : ""}
      ${decisoes ? `<h4>Decisões técnicas</h4><ul class="arch-list">${decisoes}</ul>` : ""}
      ${secoes}`;
  }

  function renderDetailSection(value) {
    // arquitetura estruturada (stack, estrutura, decisões, seções)
    if (
      value &&
      typeof value === "object" &&
      !Array.isArray(value) &&
      (value.stack || value.estrutura || value.decisoes || value.secoes)
    ) {
      return renderArquitetura(value);
    }

    // visaoGeral tem formato próprio (objeto com chaves específicas)
    if (value && value.oQueE !== undefined) {
      const funcs = (value.funcionalidades || [])
        .map((f) => `<li>${escapeHTML(f)}</li>`)
        .join("");

      return `
        <h4>O que é</h4>
        <p>${escapeHTML(value.oQueE)}</p>
        <h4>Problema resolvido</h4>
        ${toParas(value.problemaResolvido)}
        ${funcs ? `<h4>Principais funcionalidades</h4><ul>${funcs}</ul>` : ""}`;
    }

    // testes: cobertura (parágrafos) + cenários (checklist)
    if (value && (value.cobertura !== undefined || value.cenarios !== undefined)) {
      const cenarios = (value.cenarios || [])
        .map((c) => `<li>${escapeHTML(c)}</li>`)
        .join("");
      return `
        ${value.cobertura ? `<h4>Cobertura atual</h4>${toParas(value.cobertura)}` : ""}
        ${cenarios ? `<h4>Cenários validados</h4><ul class="check-list">${cenarios}</ul>` : ""}`;
    }

    // MER: entidades (tabelas) + relacionamentos
    if (value && value.entidades) {
      const entidades = value.entidades
        .map((ent) => {
          const campos = (ent.campos || [])
            .map(
              ([chave, nome]) =>
                `<li>${chave ? `<span class="mer-key">${escapeHTML(chave)}</span>` : ""}${escapeHTML(nome)}</li>`
            )
            .join("");
          return `<div class="mer-entity">
                    <div class="mer-entity__name">${escapeHTML(ent.nome)}</div>
                    <ul class="mer-entity__fields">${campos}</ul>
                  </div>`;
        })
        .join("");
      const rel = (value.relacionamentos || [])
        .map((r) => `<li>${escapeHTML(r)}</li>`)
        .join("");
      return `
        ${value.intro ? `<p>${escapeHTML(value.intro)}</p>` : ""}
        <div class="mer">${entidades}</div>
        ${rel ? `<h4>Relacionamentos</h4><ul class="mer-rel">${rel}</ul>` : ""}`;
    }

    // Demais abas: string, array de strings ou { texto, imagem }
    let texto = value;
    let imagem = "";
    if (value && typeof value === "object" && !Array.isArray(value)) {
      texto = value.texto;
      imagem = value.imagem || "";
    }
    const paragrafos = (Array.isArray(texto) ? texto : [texto])
      .filter(Boolean)
      .map((p) => `<p>${escapeHTML(p)}</p>`)
      .join("");
    const img = imagem
      ? `<img src="${escapeHTML(imagem)}" alt="Ilustração da seção" loading="lazy" />`
      : "";

    return paragrafos + img;
  }

  function openModal(project) {
    const modal = $("[data-modal]");
    if (!modal || !project) return;

    lastFocused = document.activeElement;

    // Capa
    const cover = $("[data-modal-cover]");
    if (project.imagem) {
      if (project.capaContain) {
        cover.style.backgroundColor = "#1866fa";
        cover.style.backgroundImage = `url('${project.imagem}'), ${COVER_GRADIENT}`;
        cover.style.backgroundSize = "contain, cover";
        cover.style.backgroundPosition = "center, center";
        cover.style.backgroundRepeat = "no-repeat, no-repeat";
        cover.classList.add("modal__cover--contain");
      } else {
        cover.style.backgroundImage = `url('${project.imagem}')`;
        cover.style.backgroundSize = "cover";
        cover.style.backgroundPosition = "center";
        cover.style.backgroundRepeat = "no-repeat";
        cover.style.backgroundColor = project.capaColor || "";
        cover.classList.remove("modal__cover--contain");
      }
    } else {
      cover.style.backgroundImage = "";
      cover.style.backgroundColor = "";
      cover.classList.remove("modal__cover--contain");
    }

    // Cabeçalho
    $("[data-modal-title]").textContent = project.nome;
    $("[data-modal-category]").innerHTML = project.categoria
      ? `${dot(categoryColor(project.categoria))}${escapeHTML(project.categoria)}`
      : "";
    $("[data-modal-tags]").innerHTML = (project.tecnologias || [])
      .map((t) => `<span class="tag">${escapeHTML(t)}</span>`)
      .join("");

    // Abas (apenas as que têm conteúdo)
    const detalhes = project.detalhes || {};
    const tabs = (window.DETAIL_TABS || []).filter(
      (t) => detalhes[t.key] !== undefined && detalhes[t.key] !== null && detalhes[t.key] !== ""
    );

    const nav = $("[data-modal-nav]");
    const content = $("[data-modal-content]");

    const showTab = (key) => {
      content.innerHTML = renderDetailSection(detalhes[key]);
      content.scrollTop = 0;
      $$(".modal__nav-btn", nav).forEach((b) =>
        b.classList.toggle("is-active", b.dataset.tab === key)
      );
    };

    if (tabs.length) {
      nav.innerHTML = tabs
        .map(
          (t) =>
            `<button class="modal__nav-btn" data-tab="${t.key}">${escapeHTML(t.label)}</button>`
        )
        .join("");
      nav.style.display = "";
      $$(".modal__nav-btn", nav).forEach((b) =>
        b.addEventListener("click", () => showTab(b.dataset.tab))
      );
      showTab(tabs[0].key);
    } else {
      // Sem detalhes: mostra a descrição curta
      nav.innerHTML = "";
      nav.style.display = "none";
      content.innerHTML = `<p>${escapeHTML(project.descricao || "")}</p>`;
    }

    // Rodapé (Deploy / GitHub)
    const footer = $("[data-modal-footer]");
    const demoBtn = project.demo
      ? `<a href="${escapeHTML(project.demo)}" target="_blank" rel="noopener" class="btn btn--primary">
           <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><path d="M15 3h6v6M10 14 21 3"/></svg>
           Deploy
         </a>`
      : "";
    const githubBtn = project.github
      ? `<a href="${escapeHTML(project.github)}" target="_blank" rel="noopener" class="btn btn--ghost">
           <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.27-.01-1-.02-1.96-3.2.7-3.88-1.54-3.88-1.54-.52-1.33-1.28-1.68-1.28-1.68-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.23-1.28-5.23-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.06.78 2.14 0 1.55-.01 2.8-.01 3.18 0 .31.21.68.8.56A11.51 11.51 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5Z"/></svg>
           Ver GitHub
         </a>`
      : "";
    footer.innerHTML = demoBtn + githubBtn;
    footer.style.display = demoBtn || githubBtn ? "" : "none";

    // Abre
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    $("[data-modal] .modal__close").focus();
  }

  function closeModal() {
    const modal = $("[data-modal]");
    if (!modal || !modal.classList.contains("is-open")) return;
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    if (lastFocused && typeof lastFocused.focus === "function") lastFocused.focus();
  }

  function initModal() {
    const modal = $("[data-modal]");
    if (!modal) return;

    $$("[data-modal-close]").forEach((el) =>
      el.addEventListener("click", closeModal)
    );

    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeModal();
    });
  }

  /* ---------------------------------------------------------
     Navbar: efeito de transparência/blur no scroll
  --------------------------------------------------------- */
  function initNavbar() {
    const navbar = $("[data-navbar]");
    if (!navbar) return;

    const onScroll = () => {
      navbar.classList.toggle("is-scrolled", window.scrollY > 24);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---------------------------------------------------------
     Menu mobile
  --------------------------------------------------------- */
  function initMobileMenu() {
    const toggle = $("[data-nav-toggle]");
    const menu = $("[data-mobile-menu]");
    if (!toggle || !menu) return;

    const setOpen = (open) => {
      toggle.classList.toggle("is-open", open);
      menu.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
      document.body.style.overflow = open ? "hidden" : "";
    };

    toggle.addEventListener("click", () => {
      setOpen(!menu.classList.contains("is-open"));
    });

    // Fecha ao clicar em um link
    $$("[data-mobile-link]").forEach((link) =>
      link.addEventListener("click", () => setOpen(false))
    );

    // Fecha com a tecla Esc
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") setOpen(false);
    });
  }

  /* ---------------------------------------------------------
     Navegação ativa: destaca o link da seção visível
  --------------------------------------------------------- */
  function initActiveNav() {
    const links = $$(".nav__link");
    const sections = links
      .map((link) => $(link.getAttribute("href")))
      .filter(Boolean);
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const id = entry.target.id;
          links.forEach((link) =>
            link.classList.toggle("is-active", link.getAttribute("href") === `#${id}`)
          );
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );

    sections.forEach((section) => observer.observe(section));
  }

  /* ---------------------------------------------------------
     Ano atual no footer
  --------------------------------------------------------- */
  function initYear() {
    const el = $("[data-year]");
    if (el) el.textContent = new Date().getFullYear();
  }

  /* ---------------------------------------------------------
     Inicialização
  --------------------------------------------------------- */
  function init() {
    renderSkills();

    // Usa a lista estática. Para puxar do GitHub automaticamente,
    // troque pelo bloco comentado abaixo.
    allProjects = window.PROJECTS || [];
    renderFilters();
    renderProjects();
    initModal();

    /*
    // --- Opção: carregar projetos do GitHub ---
    fetchGithubRepos("thomazte").then((repos) => {
      allProjects = repos && repos.length ? repos : (window.PROJECTS || []);
      renderFilters();
      renderProjects();
    });
    */

    initNavbar();
    initMobileMenu();
    initActiveNav();
    initYear();

    // Avisa animations.js que o conteúdo dinâmico está pronto
    document.dispatchEvent(new CustomEvent("content:ready"));
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
