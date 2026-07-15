// Function to handle tab navigation
function updatePage() {
  let hash = window.location.hash || "#home";
  
  document.querySelectorAll('.active').forEach(el => el.classList.remove('active'));
  
  let targetPage = document.querySelector(hash);
  if (targetPage) targetPage.classList.add('active');
  
  let navLink = document.querySelector(`a[href="${hash}"]`);
  if (navLink) navLink.classList.add('active');
}

// Function to generate the paper lists
function renderPapers() {
  if (typeof paperData === 'undefined') {
    console.error("Error: paperData is missing! papers.js failed to load.");
    return;
  }

  const categories = ["publications", "recent", "seminars", "unpublished"];
  
  categories.forEach(cat => {
    const listElement = document.getElementById(`list-${cat}`);
    if (!listElement || !paperData[cat]) return; 
    
    // Explicitly tell the browser the starting number for this specific list
    listElement.start = paperData[cat].length;
    
    paperData[cat].forEach((paper, index) => {
      const li = document.createElement('li');
      
      // Force the exact descending number on the <li>
      li.value = paperData[cat].length - index;
      
      // Back to the original, clean HTML structure!
      const abstractHTML = paper.abstract 
        ? `<div class="abstract">${paper.abstract}</div>`
        : '';

      li.innerHTML = `
        <a href="${paper.url}" class="title">${paper.title}</a>
        ${paper.metadata}
        ${abstractHTML}
      `;
      
      listElement.appendChild(li);
    });
  });
}

// Run when the page loads
window.addEventListener('DOMContentLoaded', () => {
  renderPapers();
  updatePage();
});

// Run when the user hits the back button or clicks a nav link
window.addEventListener('hashchange', updatePage);

// ==========================================
// MOBILE TOOLTIP LOGIC (Tap once to read, tap twice to open)
// ==========================================
document.addEventListener('click', function(e) {
  // 1. Only intercept clicks if the user is on a touch device
  if (!window.matchMedia("(any-hover: none)").matches) return;

  // 2. If the user taps INSIDE the abstract box (to highlight text, etc.), do nothing
  if (e.target.closest('.abstract')) return;

  const titleLink = e.target.closest('.title');

  if (titleLink) {
    const isShowing = titleLink.classList.contains('show-tooltip');

    if (!isShowing) {
      // FIRST TAP: Prevent navigation, hide any other open tooltips, and show this one.
      e.preventDefault(); 
      document.querySelectorAll('.show-tooltip').forEach(el => el.classList.remove('show-tooltip'));
      titleLink.classList.add('show-tooltip');
    } 
    // SECOND TAP: 'isShowing' is true, so we do nothing and let the browser go to the PDF!
    
  } else {
    // If the user taps blank space on the page, close all open tooltips
    document.querySelectorAll('.show-tooltip').forEach(el => el.classList.remove('show-tooltip'));
  }
});