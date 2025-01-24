document.addEventListener('DOMContentLoaded', () => {

    const selectedProduct = JSON.parse(localStorage.getItem('selectedProduct'));

    if (selectedProduct) {
        const container = document.getElementById('product-detail-container');

        container.innerHTML = `
            <img src="${selectedProduct.image}" alt="${selectedProduct.name}">
            <h2>${selectedProduct.name}</h2>
            <p>${selectedProduct.description}</p>
            <p>Prijs: €${selectedProduct.price}</p>
            <p>Voorraad: ${selectedProduct.stock}</p>
            <p>Kleur: ${selectedProduct.color}</p>
            <p>Categorie: ${selectedProduct.category}</p>
            <button id="add-to-cart-button">Toevoegen aan winkelwagen</button>
        `;

        document.getElementById('add-to-cart-button').addEventListener('click', () => {
            addToCart(selectedProduct);
        });
    } else {
        document.getElementById('product-detail-container').innerHTML = '<p>Geen productinformatie gevonden.</p>';
    }
});
function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    const existingProduct = cart.find(item => item.id === product.id);

    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({...product, quantity: 1});
    }
    localStorage.setItem('cart', JSON.stringify(cart));

    alert(`${product.name} is toegevoegd aan de winkelwagen!`);
}