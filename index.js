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
      
      // Force the exact descending number on the <li> so the browser doesn't get confused
      li.value = paperData[cat].length - index;
      
      // Generate BOTH the desktop thought-bubble and the mobile dropdown
      const abstractHTML = paper.abstract 
        ? `
           <div class="abstract desktop-only">${paper.abstract}</div>
           
           <details class="mobile-only">
             <summary>Abstract</summary>
             <div class="abstract-text">${paper.abstract}</div>
           </details>
          `
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