document.addEventListener("DOMContentLoaded", () => {
    loadCartOnSummaryPage();
    document.getElementById("submitOrderButton").addEventListener("click", submitOrder);
});

function loadCartOnSummaryPage() {
    const summaryTable = document.getElementById("summaryTable").querySelector("tbody");
    const cart = JSON.parse(localStorage.getItem("cart"));

    if (!cart || cart.length === 0) {
        alert("No items in the cart.");
        return;
    }

    cart.forEach(item => {
        const newRow = summaryTable.insertRow();

        newRow.innerHTML = `
            <td>${item.category}</td>
            <td>${item.item}</td>
            <td>${item.amount}</td>
            <td class="price">${item.price}</td>
        `;
    });

    updateSummaryTotalPrice();
}

function updateSummaryTotalPrice() {
    const summaryRows = document.querySelectorAll("#summaryTable tbody tr");
    let totalPrice = 0;

    summaryRows.forEach(row => {
        const price = parseFloat(row.querySelector(".price").textContent);
        totalPrice += price;
    });

    document.getElementById("orderTotal").textContent = totalPrice.toFixed(2);
}

function submitOrder() {
    document.getElementById("thankYouMessage").textContent = "Thank you for your order! Your Order will be Delivered in two weeks during working hours.";
    localStorage.removeItem("cart");
}
