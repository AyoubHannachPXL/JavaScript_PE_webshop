function displayCart() {
    const cartContainer = document.getElementById('cart-items');
    cartContainer.innerHTML = '';

    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    let totalPrice = 0;

    if (cart.length === 0) {
        cartContainer.innerHTML = '<p>Je winkelwagen is leeg.</p>';
        return;
    }

    cart.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('cart-item');
        itemElement.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="cart-item-image">
            <div class="cart-item-details">
                <h4>${item.name}</h4>
                <p>Prijs: €${item.price}</p>
                <p>
                    Aantal: <input type="number" value="${item.quantity}" min="1" max="${item.stock}" onchange="updateQuantity(${item.id}, this.value)">
                </p>
                <p>Subtotaal: €${(item.price * item.quantity).toFixed(2)}</p>
                <button class="remove-btn" onclick="removeFromCart(${item.id})">Verwijderen</button>
            </div>
        `;
        cartContainer.appendChild(itemElement);
        totalPrice += item.price * item.quantity;
    });

    const totalElement = document.createElement('div');
    totalElement.classList.add('cart-total');
    totalElement.innerHTML = `<h4>Totaal: €${totalPrice.toFixed(2)}</h4>`;
    cartContainer.appendChild(totalElement);
}

function updateQuantity(productId, newQuantity) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const product = cart.find(p => p.id === productId);

    if (product) {
        const newQty = parseInt(newQuantity);

        if (newQty >= 1 && newQty <= product.stock) {
            product.quantity = newQty;
            localStorage.setItem('cart', JSON.stringify(cart));
            displayCart();
        } else {
            alert("Aantal moet tussen 1 en de voorraad liggen.");
        }
    }
}

function removeFromCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(p => p.id !== productId);

    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();

    alert("Product is verwijderd uit de winkelwagen.");
}

function checkout() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart.length === 0) {
        alert("Je winkelwagen is leeg.");
        return;
    }

    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    orders.push(...cart);

    localStorage.setItem('orders', JSON.stringify(orders));
    localStorage.removeItem('cart');

    alert("Je bestelling is succesvol afgerond!");
    window.location.href = 'order-overview.html';
}
document.addEventListener('DOMContentLoaded', displayCart);
