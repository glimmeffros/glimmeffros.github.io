let menuBar = document.querySelector("#nav-bar");

menuBar.addEventListener("click", function(e) {
  e.preventDefault();
  let nav = e.target;
  let targetPage = nav.getAttribute("href");
  if (targetPage) {
    let visible = document.querySelector(".page.active");
    if (visible) {
      visible.classList.remove("active");
    }
    let target = document.querySelector(targetPage);
    target.classList.toggle("active");
  }
});
