const prices = {
    "Paracetamol": 300.00,
    "Ibuprofen": 120.00,
    "Aspirin": 200.00,
    "Codeine": 450.00,
    "Tramadol": 520.00,
    "Naproxen": 230.00,
    "Amoxicillin": 120.00,
    "Ciprofloxacin": 110.00,
    "Doxycycline": 160.00,
    "Azithromycin": 190.00,
    "Clindamycin": 220.00,
    "Levofloxacin": 60.00,
    "Fluoxetine": 230.00,
    "Sertraline": 350.00,
    "Escitalopram": 95.00,
    "Paroxetine": 400.00,
    "Venlafaxine": 1125.00,
    "Amitriptyline": 175.00,
    "Diphenhydramine": 600.00,
    "Loratadine": 520.00,
    "Cetirizine": 1000.00,
    "Fexofenadine": 800.00,
    "Chlorpheniramine": 1020.00,
    "Levocetirizine": 1200.00,
    "Amlodipine": 120.00,
    "Losartan": 135.00,
    "Lisinopril": 60.00,
    "Hydrochlorothiazide": 250.00,
    "Metoprolol": 490.00,
    "Clonidine": 310.00,
};

function updateTotalPrice() {
    const cartRows = document.querySelectorAll("#cartTable tbody tr");
    let totalPrice = 0;
    let productQuantity = 0;

    cartRows.forEach(row => {
        const price = parseFloat(row.querySelector(".price").textContent);
        const quantity = parseFloat(row.querySelector(".quantity").textContent); // Fixed: Added quantity
        totalPrice += price;
        productQuantity += quantity; // Fixed: Accumulating quantity
    });

    document.getElementById("totalPrice").textContent = totalPrice.toFixed(2);
}

// From this method it will add up some items to the cart.
function addToCart(category, productId, amountId) {
    const productSelect = document.getElementById(productId);
    const amountInput = document.getElementById(amountId);

    const product = productSelect.value;
    const amount = parseFloat(amountInput.value);

    if (!product || isNaN(amount) || amount <= 0) {
        alert("Please select a valid product and amount.");
        return;
    }

    const price = prices[product] * amount;

    const cartTable = document.getElementById("cartTable").querySelector("tbody");
    const newRow = cartTable.insertRow();

    newRow.innerHTML = `
        <td>${category}</td>
        <td>${product}</td>
        <td class="quantity">${amount}</td> <!-- Fixed: Added a 'quantity' class -->
        <td class="price">${price.toFixed(2)}</td>
    `;

    updateTotalPrice();
}

// These are some methods which will add products to the cart when the button is clicked.
document.getElementById("analgesics-button").addEventListener("click", () => addToCart("Analgesics", "analgesics-gproduct", "analgesics-gamount"));
document.getElementById("antibiotics-button").addEventListener("click", () => addToCart("Antibiotics", "antibiotics-gproduct", "antibiotics-gamount"));
document.getElementById("antidepressants-button").addEventListener("click", () => addToCart("Antidepressants", "antidepressants-gproduct", "antidepressants-gamount"));
document.getElementById("antihistamines-button").addEventListener("click", () => addToCart("Antihistamines", "antihistamines-gproduct", "antihistamines-gamount"));
document.getElementById("antihypertensives-button").addEventListener("click", () => addToCart("Antihypertensives", "antihypertensives-gproduct", "antihypertensives-gamount"));

function saveToFavorites() {
    const cartRows = document.querySelectorAll("#cartTable tbody tr");
    const favorites = [];

    cartRows.forEach(row => {
        const category = row.cells[0].textContent;
        const item = row.cells[1].textContent;
        const amount = row.cells[2].textContent;
        const price = row.cells[3].textContent;

        favorites.push({ category, item, amount, price });
    });

    localStorage.setItem("favorites", JSON.stringify(favorites));
    alert("Cart saved to favorites.");
}

function applyFavorites() {
    const cartTable = document.getElementById("cartTable").querySelector("tbody");
    cartTable.innerHTML = "";

    const favorites = JSON.parse(localStorage.getItem("favorites"));

    if (!favorites || favorites.length === 0) {
        alert("No favorites found.");
        return;
    }

    favorites.forEach(fav => {
        const newRow = cartTable.insertRow();

        newRow.innerHTML = `
            <td>${fav.category}</td>
            <td>${fav.item}</td>
            <td class="quantity">${fav.amount}</td> <!-- Fixed: Added quantity for correct display -->
            <td class="price">${parseFloat(fav.price).toFixed(2)}</td> <!-- Fixed: Ensured price is treated as a number -->
        `;
    });

    updateTotalPrice();
}

// This will save cart to the local storage and navigate
function navigateToOrderPage() {
    const cartRows = document.querySelectorAll("#cartTable tbody tr");
    const cart = [];

    cartRows.forEach(row => {
        const category = row.cells[0].textContent;
        const item = row.cells[1].textContent;
        const amount = row.cells[2].textContent;
        const price = row.cells[3].textContent;

        cart.push({ category, item, amount, price });
    });

    localStorage.setItem("cart", JSON.stringify(cart));
    window.location.href = "OrderSummary.html";
}

document.querySelector(".button.add-to-favorites").addEventListener("click", saveToFavorites);
document.querySelector(".button.apply-favorites").addEventListener("click", applyFavorites);
document.querySelector(".button.buy-now").addEventListener("click", navigateToOrderPage);
