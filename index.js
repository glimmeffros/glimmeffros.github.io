let menuBar = document.querySelector("#nav-bar");
let menuTitle = document.querySelector("#nav-title");

menuBar.addEventListener("click", function(e) {
  e.preventDefault();

  let underlined = document.querySelector(".active");
  if (underlined) {
    underlined.classList.remove("active");
  }
  let selected = e.target;
  selected.classList.add("active");
  
  let targetPage = selected.getAttribute("href");
  if (targetPage) {
    let visible = document.querySelector(".page.active");
    if (visible) {
      visible.classList.remove("active");
    }
    let target = document.querySelector(targetPage);
    target.classList.add("active");
  }
});

menuTitle.addEventListener("click", function(e) {
  e.preventDefault();

  let underlined = document.querySelector(".active");
  if (underlined) {
    underlined.classList.remove("active");
  }
  let selected = e.target;
  selected.classList.add("active");
  
  let targetPage = selected.getAttribute("href");
  if (targetPage) {
    let visible = document.querySelector(".page.active");
    if (visible) {
      visible.classList.remove("active");
    }
    let target = document.querySelector(targetPage);
    target.classList.add("active");
  }
});
