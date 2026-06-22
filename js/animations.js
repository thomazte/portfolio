/* =========================================================
   animations.js
   Animações com GSAP + ScrollTrigger.
   ---------------------------------------------------------
   - Entrada do hero em sequência (fade + movimento)
   - Reveal das seções ao rolar
   - Cards subindo com leve escala e atraso (stagger)
   - Parallax suave no brilho de fundo e na janela de código
   - Respeita prefers-reduced-motion via gsap.matchMedia()
   ========================================================= */

(function () {
  "use strict";

  // Se o GSAP não carregar, garante que tudo fique visível.
  if (typeof window.gsap === "undefined") {
    document.documentElement.classList.remove("js-anim");
    return;
  }

  const gsap = window.gsap;
  if (window.ScrollTrigger) gsap.registerPlugin(window.ScrollTrigger);

  /* Anima os cards de projeto após uma troca de filtro (re-render).
     Exposto globalmente para o main.js chamar. */
  window.revealProjects = function () {
    const grid = document.querySelector("[data-projects]");
    if (!grid) return;
    const items = grid.querySelectorAll("[data-stagger-item]");
    if (!items.length) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      gsap.set(items, { opacity: 1, y: 0, scale: 1, clearProps: "all" });
      return;
    }

    gsap.fromTo(
      items,
      { opacity: 0, y: 28, scale: 0.98 },
      { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "power3.out", stagger: 0.06 }
    );
  };

  function setupCustomCursor() {
    const dot = document.querySelector("[data-cursor-dot]");
    const ring = document.querySelector("[data-cursor-ring]");
    if (!dot || !ring) return;

    const mm = gsap.matchMedia();
    const HOVER_SELECTOR =
      "a, button, [role='button'], input, textarea, select, label, .project-card, .skill, .contact-link, .filter-btn, .modal__tab, .nav__link, .mobile-menu__link";

    mm.add("(prefers-reduced-motion: no-preference) and (hover: hover) and (pointer: fine)", () => {
      document.body.classList.add("has-custom-cursor");

      const dotX = gsap.quickSetter(dot, "x", "px");
      const dotY = gsap.quickSetter(dot, "y", "px");
      const ringX = gsap.quickTo(ring, "x", { duration: 0.18, ease: "power2.out" });
      const ringY = gsap.quickTo(ring, "y", { duration: 0.18, ease: "power2.out" });

      gsap.set([dot, ring], { xPercent: -50, yPercent: -50 });

      const move = (e) => {
        dotX(e.clientX);
        dotY(e.clientY);
        ringX(e.clientX);
        ringY(e.clientY);
      };

      const show = () => gsap.to([dot, ring], { opacity: 1, duration: 0.2 });
      const hide = () => gsap.to([dot, ring], { opacity: 0, duration: 0.2 });

      const onOver = (e) => {
        if (e.target.closest(HOVER_SELECTOR)) document.body.classList.add("is-cursor-hover");
      };

      const onOut = (e) => {
        if (e.target.closest(HOVER_SELECTOR)) document.body.classList.remove("is-cursor-hover");
      };

      const onDown = () => document.body.classList.add("is-cursor-press");
      const onUp = () => document.body.classList.remove("is-cursor-press");

      window.addEventListener("mousemove", move);
      document.documentElement.addEventListener("mouseenter", show);
      document.documentElement.addEventListener("mouseleave", hide);
      document.addEventListener("mouseover", onOver);
      document.addEventListener("mouseout", onOut);
      document.addEventListener("mousedown", onDown);
      document.addEventListener("mouseup", onUp);

      return () => {
        document.body.classList.remove("has-custom-cursor", "is-cursor-hover", "is-cursor-press");
        window.removeEventListener("mousemove", move);
        document.documentElement.removeEventListener("mouseenter", show);
        document.documentElement.removeEventListener("mouseleave", hide);
        document.removeEventListener("mouseover", onOver);
        document.removeEventListener("mouseout", onOut);
        document.removeEventListener("mousedown", onDown);
        document.removeEventListener("mouseup", onUp);
      };
    });
  }

  function setupAnimations() {
    const mm = gsap.matchMedia();

    /* === Movimento completo (usuário não pediu redução) === */
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      setupCustomCursor();
      /* --- Hero: entrada em sequência --- */
      const heroItems = gsap.utils.toArray("[data-hero-anim]");
      gsap.set(heroItems, { opacity: 0, y: 28 });

      const introTl = gsap.timeline({
        defaults: { ease: "power3.out", duration: 0.9 },
      });

      introTl.to(heroItems, {
        opacity: 1,
        y: 0,
        stagger: 0.12,
        delay: 0.15,
      });

      /* --- Reveal das seções ao rolar --- */
      gsap.utils.toArray("[data-reveal]").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      });

      /* --- Grupos com stagger (cards de skills/projetos/sobre) --- */
      gsap.utils.toArray("[data-stagger]").forEach((group) => {
        const items = group.querySelectorAll("[data-stagger-item]");
        gsap.fromTo(
          items,
          { opacity: 0, y: 44, scale: 0.97 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            ease: "power3.out",
            stagger: 0.1,
            scrollTrigger: {
              trigger: group,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      });

      /* Skills e projetos são renderizados dinamicamente:
         seus itens têm data-stagger-item mas o container não
         tem data-stagger. Animamos esses grids separadamente. */
      ["[data-skills]", "[data-projects]"].forEach((selector) => {
        const grid = document.querySelector(selector);
        if (!grid) return;
        const items = grid.querySelectorAll("[data-stagger-item]");
        if (!items.length) return;

        gsap.fromTo(
          items,
          { opacity: 0, y: 44, scale: 0.97 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            ease: "power3.out",
            stagger: 0.08,
            scrollTrigger: {
              trigger: grid,
              start: "top 82%",
              toggleActions: "play none none none",
            },
          }
        );
      });

      /* --- Parallax suave no brilho de fundo --- */
      const glow = document.querySelector("[data-glow]");
      if (glow) {
        gsap.to(glow, {
          yPercent: 30,
          ease: "none",
          scrollTrigger: {
            trigger: document.body,
            start: "top top",
            end: "bottom bottom",
            scrub: 1,
          },
        });
      }

      // Recalcula posições após carregar imagens/fontes
      if (window.ScrollTrigger) {
        window.addEventListener("load", () => window.ScrollTrigger.refresh());
      }
    });

    /* === Movimento reduzido: apenas torna tudo visível === */
    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set("[data-hero-anim], [data-reveal], [data-stagger-item]", {
        opacity: 1,
        y: 0,
        scale: 1,
        clearProps: "all",
      });
    });
  }

  // O conteúdo dinâmico (skills/projetos) já foi renderizado por main.js
  // antes deste script (carregados em ordem com defer). Mas, por segurança,
  // aguardamos o evento caso a ordem mude no futuro.
  if (document.querySelector("[data-projects] .project-card, [data-skills] .skill")) {
    setupAnimations();
  } else {
    document.addEventListener("content:ready", setupAnimations, { once: true });
    // Fallback: garante execução mesmo sem o evento
    window.addEventListener("load", () => {
      if (!window.__animsReady) setupAnimations();
    });
  }
  window.__animsReady = true;
})();
