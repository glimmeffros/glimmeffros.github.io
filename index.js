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
  // 1. SAFEGUARD: Check if papers.js actually loaded successfully
  if (typeof paperData === 'undefined') {
    console.error("Error: paperData is missing! papers.js failed to load.");
    return;
  }

  const categories = ["publications", "recent", "seminars", "unpublished"];
  
  categories.forEach(cat => {
    const listElement = document.getElementById(`list-${cat}`);
    
    // 2. Check if the HTML list and the data both exist
    if (!listElement || !paperData[cat]) return; 
    
    paperData[cat].forEach(paper => {
      const li = document.createElement('li');
      
      // If there is an abstract, wrap it in a dropdown. If not, omit it.
      const abstractHTML = paper.abstract 
        ? `<details>
             <summary>Abstract</summary>
             <div class="abstract-text">${paper.abstract}</div>
           </details>`
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