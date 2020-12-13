const sideNav = document.querySelector(".side-bar");
const btnBurger = document.querySelector(".burger");

btnBurger.addEventListener("click", () => {
  sideNav.classList.toggle("nav-open");
});
