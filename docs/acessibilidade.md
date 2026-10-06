# Acessibilidade

- **Movimento reduzido:** com `prefers-reduced-motion: reduce`, nada é animado e o cursor customizado não é ativado.
- **Sem JavaScript ou sem GSAP:** o conteúdo continua visível. A classe `js-anim`, que esconde os elementos antes da animação, é removida se o GSAP não carregar.
- **Modal:** ao abrir, o foco vai para o botão de fechar e o Tab circula só dentro do modal. Cabeçalho, conteúdo e rodapé da página ficam `inert`. Esc fecha e o foco volta ao card que abriu o modal.
- **Filtros e abas do modal:** são botões com `aria-pressed` indicando o item ativo.
- **Cursor customizado:** só em dispositivos com mouse. O cursor nativo só é escondido depois do primeiro movimento, quando o customizado já está seguindo o ponteiro.
