function safeParseJSON(json) {
    try {
        return JSON.parse(json);
    } catch {
        return null;
    }
}

function getCurrentDate() {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function getShippedDate(orderDate) {
    const orderDateObj = new Date(orderDate);
    orderDateObj.setDate(orderDateObj.getDate() + 3);
    const year = orderDateObj.getFullYear();
    const month = String(orderDateObj.getMonth() + 1).padStart(2, '0');
    const day = String(orderDateObj.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function displayOrder() {
    const orders = safeParseJSON(localStorage.getItem('orders')) || [];
    const orderItemsContainer = document.getElementById('order-items');
    orderItemsContainer.innerHTML = '';

    if (orders.length === 0) {
        orderItemsContainer.innerHTML = '<p>Je hebt geen bestellingen geplaatst.</p>';
        return;
    }

    orders.forEach((order, index) => {
        const orderDate = order.orderDate || getCurrentDate();
        const shippedDate = order.shippedDate || getShippedDate(orderDate);
        const status = order.status || 'Nog niet verzonden';

        const orderItemElement = document.createElement('div');
        orderItemElement.classList.add('order-item');
        orderItemElement.innerHTML = `
            <img src="${order.image}" alt="${order.name}" class="order-image">
            <div class="order-content">
                <h3>${order.name}</h3>
                <p>Aantal: ${order.quantity}</p>
                <p>Prijs per stuk: €${order.price}</p>
                <p><strong>Totaal: €${(order.quantity * order.price).toFixed(2)}</strong></p>
                <button onclick="viewOrderDetails(${index})">Bekijk Details</button>
                <div id="order-details-${index}" class="order-details" style="display: none;">
                    <p><strong>Besteld op:</strong> ${orderDate}</p>
                    <p><strong>Status:</strong> ${status}</p>
                    <p><strong>Verzonden op:</strong> ${shippedDate}</p>
                </div>
            </div>
        `;
        orderItemsContainer.appendChild(orderItemElement);
    });
}

function viewOrderDetails(index) {
    const orderDetails = document.getElementById(`order-details-${index}`);
    orderDetails.style.display = orderDetails.style.display === "block" ? "none" : "block";
}

function deleteOrder() {
    localStorage.removeItem('orders');
    displayOrder();
}

document.addEventListener('DOMContentLoaded', displayOrder);
