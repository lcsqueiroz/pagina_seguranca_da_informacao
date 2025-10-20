document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".header");
  const logo = document.getElementById("siteLogo");
  const headerButton = document.querySelector(".header__actions .button");

  const headerLinks = document.querySelectorAll(".header__nav-item a");

  // querySelectorAll retorna Node
  if (header && logo && headerButton && headerLinks.length > 0) {
    const onScroll = () => {
      const scrolled = window.scrollY > 50;

      header.classList.toggle("header-blur", scrolled);
      headerButton.classList.toggle("button--secondary", scrolled);

      // Troca do logo
      logo.src = scrolled
        ? "assets/svg/logo/logo-escuro.svg"
        : "assets/svg/logo/logo-claro.svg";

      // Ajuste de cor inline (se precisar vencer !important, use setProperty com "important")
      headerLinks.forEach((link) => {
        // link.style.color = scrolled ? "#fff" : ""; // básico
        link.style.setProperty("color", scrolled ? "#fff" : "", "important");
      });
    };

    window.addEventListener("scroll", onScroll);
    // Executa uma vez na carga para refletir o estado inicial
    onScroll();
  } else {
    console.warn("Seletores não encontrados ou sem links suficientes:", {
      header: !!header,
      logo: !!logo,
      headerButton: !!headerButton,
      headerLinksCount: headerLinks?.length ?? 0,
    });
  }
});

const modalTriggers = document.querySelectorAll("[data-modal-trigger]");

modalTriggers.forEach((trigger) => {
  const modalId = trigger.getAttribute("data-modal-trigger");
  const modal = document.getElementById(modalId);

  if (modal) {
    const closeModalButton = modal.querySelector(".modal__close-button");

    // Abrir o modal
    trigger.addEventListener("click", () => {
      modal.showModal();
    });

    // Fechar o modal pelo botão
    if (closeModalButton) {
      closeModalButton.addEventListener("click", () => {
        modal.close();
      });
    }

    // Fechar o modal ao clicar fora do conteúdo (no backdrop)
    modal.addEventListener("click", (event) => {
      if (event.target === modal) {
        modal.close();
      }
    });
  }
});
