 const filters = document.querySelectorAll('.filter');
  filters.forEach(btn => {
    btn.addEventListener('click', () => {
      filters.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-pressed', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-pressed', 'true');
    });
  });



   
// ==========================================
// 1. CATEGORY & SEARCH LOGIC
// ==========================================

function filterCategory(category) {
  // Get current URL parameters
  const urlParams = new URLSearchParams(window.location.search);
  
  // If a category is clicked, set it (or remove it if clicking "All")
  if (category === "All") {
    urlParams.delete('category');
  } else {
    urlParams.set('category', category);
  }
  
  // Redirect with the updated parameters (keeps the search query intact)
  window.location.href = `/listing?${urlParams.toString()}`;
}

// Handle Search Form Submission
const searchForm = document.getElementById('searchForm');
if (searchForm) {
  searchForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent default page reload
    const searchInput = document.getElementById('searchInput').value;
    
    const urlParams = new URLSearchParams(window.location.search);
    
    if (searchInput.trim() !== "") {
      urlParams.set('search', searchInput);
    } else {
      urlParams.delete('search');
    }
    
    // Redirect with the updated parameters (keeps the category intact)
    window.location.href = `/listing?${urlParams.toString()}`;
  });
}

// ==========================================
// 2. TAX TOGGLE LOGIC
// ==========================================

const taxContainer = document.getElementById("tax");

if (taxContainer) {
  const taxCheckbox = taxContainer.querySelector('input[type="checkbox"]');
  const taxRate = 0.18; // 18% GST

  // Function to calculate and update prices
  function updatePrices() {
    const prices = document.querySelectorAll('.price-value');
    
    prices.forEach(priceElement => {
      const basePrice = parseFloat(priceElement.getAttribute('data-base-price'));
      
      // If checked, add tax. Otherwise, use base price.
      const finalPrice = taxCheckbox.checked 
        ? basePrice + (basePrice * taxRate) 
        : basePrice;

      priceElement.innerText = Math.round(finalPrice).toLocaleString('en-IN');
    });
  }

  // Remember the state across page reloads
  if (localStorage.getItem("displayTax") === "true") {
    taxCheckbox.checked = true;
    updatePrices(); 
  }

  // Listen for clicks on the checkbox
  taxCheckbox.addEventListener('change', () => {
    localStorage.setItem("displayTax", taxCheckbox.checked);
    updatePrices();
  });
}