const prices = {
    "Apple": 300.00,
    "Banana": 120.00,
    "Orange": 200.00,
    "Grapes": 450.00,
    "Strawberry": 520.00,
    "Mango": 230.00,
    "Tomato": 120.00,
    "Potato": 110.00,
    "Carrot": 160.00,
    "Cabbage": 190.00,
    "Beetroot": 220.00,
    "Onions": 60.00,
    "Kotmale Fresh Milk": 230.00,
    "Happy Cow Cheese": 350.00,
    "Anchor Newdale Yogurt": 95.00,
    "Astra Butter": 400.00,
    "Anchor Milk Powder": 1125.00,
    "Munchee Milk Biscuits": 175.00,
    "Chicken": 600.00,
    "Fish": 520.00,
    "Beef": 1000.00,
    "Mutton": 800.00,
    "Prawns": 1020.00,
    "Crab": 1200.00,
    "Flour": 120.00,
    "Sugar": 135.00,
    "Eggs": 60.00,
    "Baking Powder": 250.00,
    "Whipping Cream": 490.00,
    "Vanilla essence": 310.00,
};



function updateTotalPrice() {
    const cartRows = document.querySelectorAll("#cartTable tbody tr");
    let totalPrice = 0;

    cartRows.forEach(row => {
        const price = parseFloat(row.querySelector(".price").textContent);
        totalPrice += price;
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
        <td>${amount}</td>
        <td class="price">${price.toFixed(2)}</td>
    `;

    updateTotalPrice();
}

// These are some methods which will add products to the cart when the button is clicked.
document.getElementById("fruits-button").addEventListener("click", () => addToCart("Fruits", "fruits-gproduct", "fruits-gamount"));
document.getElementById("vegetables-button").addEventListener("click", () => addToCart("Vegetables", "vegetables-gproduct", "vegetables-gamount"));
document.getElementById("dairy-button").addEventListener("click", () => addToCart("Dairy Produce", "dairy-gproduct", "dairy-gamount"));
document.getElementById("meat-button").addEventListener("click", () => addToCart("Meat and Seafood", "meat-gproduct", "meat-gamount"));
document.getElementById("Baking-button").addEventListener("click", () => addToCart("Baking and Cooking Ingredients", "baking-gproduct", "baking-gamount"));


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
            <td>${fav.amount}</td>
            <td class="price">${fav.price}</td>
        `;
    });

    updateTotalPrice();
}

// This will save cart to the local storage and navigates
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
