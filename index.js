function menuListener(e) {
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
}

document.querySelector("#nav-bar").addEventListener("click", menuListener);
document.querySelector("#nav-title").addEventListener("click", menuListener);
