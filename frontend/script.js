// --- SEARCH ---
document.getElementById("searchBtn").addEventListener("click", () => {
  let query = document.getElementById("searchInput").value.toLowerCase();
  document.querySelectorAll(".menu-item").forEach(item => {
    let name = item.querySelector("h5").textContent.toLowerCase();
    item.style.display = name.includes(query) ? "block" : "none";
  });
});

// --- FILTER BY CATEGORY ---
document.querySelectorAll(".filter-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    let category = btn.dataset.category;
    document.querySelectorAll(".menu-item").forEach(item => {
      item.style.display = category === "all" || item.dataset.category === category ? "block" : "none";
    });
  });
});

// --- CART SYSTEM ---
let cart = JSON.parse(localStorage.getItem("cart")) || [];
updateCartCount();

document.querySelectorAll(".add-to-cart").forEach(btn => {
  btn.addEventListener("click", () => {
    const name = btn.dataset.name;
    const price = parseFloat(btn.dataset.price);

    cart.push({ name, price });
    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartCount();
  });
});

function updateCartCount() {
  document.getElementById("cartCount").textContent = cart.length;
}
