document.addEventListener("DOMContentLoaded", () => {
  // --- Efeito de Scroll no Header ---
  const header = document.querySelector(".header");
  const logo = document.getElementById("siteLogo");
  const headerButton = document.querySelector(".header__actions .button");

  if (header && logo && headerButton) {
    window.addEventListener("scroll", function () {
      const scrolled = window.scrollY > 50;
      header.classList.toggle("header-blur", scrolled);

      if (scrolled) {
        logo.src = "assets/svg/logo/logo-escuro.svg";
      } else {
        logo.src = "assets/svg/logo/logo-claro.svg";
      }
    });
  }

  // --- Lógica do Modal com <dialog> ---
  const modalTriggers = document.querySelectorAll("[data-modal-trigger]");

  //para cada modal na lista faça isso
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
});
