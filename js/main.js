const header = document.querySelector(".header");
const logo = document.getElementById("siteLogo");

window.addEventListener("scroll", function () {
  const scrolled = window.scrollY > 50;
  header.classList.toggle("header-blur", scrolled);

  if (scrolled) {
    logo.src = "assets/svg/logo/logo-escuro.svg";
  } else {
    logo.src = "assets/svg/logo/logo-claro.svg";
  }
});
