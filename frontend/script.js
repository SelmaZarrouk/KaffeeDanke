// ---------------------------
// CART SYSTEM
// ---------------------------
let cart = JSON.parse(localStorage.getItem("cart")) || [];
updateCartCount();

// Add to cart buttons
document.querySelectorAll(".add-to-cart")?.forEach(btn => {
  btn.addEventListener("click", () => {
    const name = btn.dataset.name;
    const price = parseFloat(btn.dataset.price);

    cart.push({ name, price });
    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartCount();
    alert(`${name} added to cart!`);
  });
});

function updateCartCount() {
  let badge = document.getElementById("cartCount");
  if (badge) badge.textContent = cart.length;
}

// ---------------------------
// CART PAGE LOGIC (cart.html)
// ---------------------------
if (document.location.pathname.includes("cart.html")) {
  loadCart();
}

function loadCart() {
  const container = document.getElementById("cartContainer");

  if (cart.length === 0) {
    container.innerHTML = `<h4 class="text-center">Your cart is empty ☕</h4>`;
    return;
  }

  let html = `
    <table class="table table-striped">
      <thead>
        <tr>
          <th>Item</th>
          <th class="text-end">Price</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
  `;

  cart.forEach((item, index) => {
    html += `
      <tr>
        <td>${item.name}</td>
        <td class="text-end">£${item.price.toFixed(2)}</td>
        <td>
          <button class="btn btn-sm btn-danger" onclick="removeItem(${index})">Remove</button>
        </td>
      </tr>
    `;
  });

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  html += `
      </tbody>
    </table>
    <h4 class="text-end">Total: <strong>£${total.toFixed(2)}</strong></h4>
  `;

  container.innerHTML = html;

  
}



// Remove from cart
function removeItem(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  loadCart();
}

// ---------------------------
// CHECKOUT PAGE LOGIC
// ---------------------------
if (document.location.pathname.includes("checkout.html")) {
  loadSummary();
  document.getElementById("checkoutForm").addEventListener("submit", placeOrder);
}


function loadSummary() {
  let summaryList = document.getElementById("orderSummary");

  summaryList.innerHTML = "";

  let total = 0;

  cart.forEach(item => {
    total += item.price;
    summaryList.innerHTML += `
      <li class="list-group-item d-flex justify-content-between">
        ${item.name}
        <span>£${item.price.toFixed(2)}</span>
      </li>
    `;
  });

  summaryList.innerHTML += `
    <li class="list-group-item d-flex justify-content-between fw-bold">
      Total
      <span>£${total.toFixed(2)}</span>
    </li>
  `;
}

// Simulate placing an order (Level 1)
function placeOrder(e) {
  e.preventDefault();

  alert("Order placed! (Backend connection coming in Level 2)");

  // Clear cart
  cart = [];
  localStorage.setItem("cart", JSON.stringify(cart));

  window.location.href = "index.html";
}
