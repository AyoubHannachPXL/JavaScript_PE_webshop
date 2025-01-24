const products = [
    { id: 1, name: "Nike Sportschoenen", description: "Perfect voor sportactiviteiten.", price: 150, stock: 15, color: "Grijs", category: "Sportschoenen", image: "img/1.jpg" },
    { id: 2, name: "Nike Dunk Low", description: "Stijlvol en comfortabel.", price: 130, stock: 10, color: "Blauw", category: "Casual", image: "img/2.jpg" },
    { id: 3, name: "Adidas UltraBoost", description: "Maximale demping en stijl.", price: 120, stock: 20, color: "Wit", category: "Hardloopschoenen", image: "img/3.jpg" },
    { id: 4, name: "Nike Air Jordan 1 Low", description: "Retro sneakers met een moderne twist.", price: 130, stock: 12, color: "Geel", category: "Retro", image: "img/4.jpg" },
    { id: 5, name: "Nike Air Jordan 1 High", description: "Een echte klassieker voor elke dag.", price: 180, stock: 25, color: "Grijs", category: "Retro", image: "img/5.jpg" },
    { id: 6, name: "Nike Air Jordan 1 Low", description: "Iconisch ontwerp dat nooit uit de mode raakt.", price: 120, stock: 18, color: "Wit, Grijs", category: "Casual", image: "img/6.jpg" },
    { id: 7, name: "Nike Air Force 1", description: "De beste keuze voor hardlopers.", price: 140, stock: 8, color: "Bruin", category: "Hardloopschoenen", image: "img/7.jpg" },
    { id: 8, name: "Nike Air Jordan 1 Mid", description: "Voor een casual en sportieve look.", price: 115, stock: 14, color: "Blauw", category: "Casual", image: "img/8.jpg" },
    { id: 9, name: "Nike Air Force 1", description: "Authentiek en trendy.", price: 150, stock: 20, color: "Wit", category: "Retro", image: "img/9.jpg" },
    { id: 10, name: "Adidas", description: "Innovatieve schoenen voor topprestaties.", price: 110, stock: 10, color: "Grijs", category: "Hardloopschoenen", image: "img/10.jpg" },
    { id: 11, name: "Nike Air Jordan 1 Low", description: "Robuuste en opvallende stijl.", price: 145, stock: 12, color: "Grijs", category: "Casual", image: "img/11.jpg" },
    { id: 12, name: "Nike Air Jordan 1 Mid", description: "Minimalistisch en elegant.", price: 135, stock: 22, color: "Beige", category: "Casual", image: "img/12.jpg" },
    { id: 13, name: "Nike Air Max 270", description: "Luchtig comfort en stijl.", price: 130, stock: 9, color: "Beige", category: "Sportschoenen", image: "img/13.jpg" },
    { id: 14, name: "Nike Air Jordan 1 Low", description: "Een retro-sportieve look.", price: 145, stock: 16, color: "Wit, Rood, Grijs", category: "Retro", image: "img/14.jpg" },
    { id: 15, name: "Nike Air Max", description: "Voor energieke prestaties.", price: 190, stock: 7, color: "Groen", category: "Sportschoenen", image: "img/15.jpg" },
    { id: 16, name: "Saucony Jazz Original", description: "Comfort en stijl in één.", price: 90, stock: 13, color: "Wit", category: "Casual", image: "img/16.jpg" },
    { id: 17, name: "Vans Old School", description: "Topprestaties voor hardlopers.", price: 95, stock: 6, color: "Zwart", category: "Hardloopschoenen", image: "img/17.jpg" },
    { id: 18, name: "Louis Vuitton Slippers", description: "Moderne stijl met een retro-touch.", price: 139, stock: 10, color: "Zwart", category: "Retro", image: "img/18.jpg" },
];

let currentPage = 1;
const productsPerPage = 6;
let filteredProducts = [...products];

function displayProducts() {
    const productContainer = document.getElementById('products');
    productContainer.innerHTML = '';

    const start = (currentPage - 1) * productsPerPage;
    const end = start + productsPerPage;
    const productsToShow = filteredProducts.slice(start, end);

    productsToShow.forEach(product => {
        const productElement = document.createElement('div');
        productElement.classList.add('product-small');
        productElement.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <p>Prijs: €${product.price}</p>
            <p>Voorraad: ${product.stock}</p>
            <p>Kleur: ${product.color}</p>
            <p>Categorie: ${product.category}</p>
            <button onclick="addToCart(${product.id})">Toevoegen aan winkelwagen</button>
            <button class="view-details-btn" data-id="${product.id}">Bekijk details</button>
        `;
        productContainer.appendChild(productElement);

        attachViewDetailsEvent();
        displayPagination();
    });

    function viewProduct(productId) {
        const selectedProduct = products.find(product => product.id === productId);

        if (selectedProduct) {
            localStorage.setItem('selectedProduct', JSON.stringify(selectedProduct));
            window.location.href = 'productinfo.html';
        } else {
            console.error("Product niet gevonden");
        }
    }

    function attachViewDetailsEvent() {
        const detailButtons = document.querySelectorAll('.view-details-btn');
        detailButtons.forEach(button => {
            button.addEventListener('click', (event) => {
                const productId = parseInt(event.target.getAttribute('data-id'), 10);
                viewProduct(productId);
            });
        });
    }
    displayPagination();
}

function displayPagination() {
    const paginationContainer = document.getElementById('pagination');
    paginationContainer.innerHTML = '';

    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

    for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement('button');
        button.textContent = i;
        button.classList.toggle('active', i === currentPage);
        button.addEventListener('click', () => {
            currentPage = i;
            displayProducts();
        });
        paginationContainer.appendChild(button);
    }
}

function applyFilters() {
    const nameFilter = document.getElementById('filter-name').value.toLowerCase();
    const priceFilter = parseFloat(document.getElementById('filter-price').value);
    const stockFilter = parseInt(document.getElementById('filter-stock').value, 10);
    const colorFilter = document.getElementById('filter-color').value;
    const categoryFilter = document.getElementById('filter-category').value;
    const sortOption = document.getElementById('sort-options').value;

    filteredProducts = products.filter(product => {
        const matchesName = nameFilter ? product.name.toLowerCase().includes(nameFilter) : true;
        const matchesPrice = priceFilter ? product.price <= priceFilter : true;
        const matchesStock = stockFilter ? product.stock >= stockFilter : true;
        const matchesColor = colorFilter ? product.color === colorFilter : true;
        const matchesCategory = categoryFilter ? product.category === categoryFilter : true;

        return matchesName && matchesPrice && matchesStock && matchesColor && matchesCategory;
    });

    if (sortOption) {
        filteredProducts.sort((a, b) => {
            switch (sortOption) {
                case "price-asc": return a.price - b.price;
                case "price-desc": return b.price - a.price;
                case "stock-asc": return a.stock - b.stock;
                case "stock-desc": return b.stock - a.stock;
                default: return 0;
            }
        });
    }

    currentPage = 1;
    displayProducts();
}

function resetFilters() {
    document.getElementById('filter-name').value = '';
    document.getElementById('filter-price').value = '';
    document.getElementById('filter-stock').value = '';
    document.getElementById('filter-color').value = '';
    document.getElementById('filter-category').value = '';
    document.getElementById('sort-options').value = '';
    filteredProducts = [...products];
    currentPage = 1;
    displayProducts();
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const existingProduct = cart.find(p => p.id === productId);
        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        alert(`${product.name} toegevoegd aan winkelwagen!`);
    }
}

document.getElementById('apply-filters').addEventListener('click', applyFilters);
document.getElementById('clear-filters').addEventListener('click', resetFilters);
document.addEventListener('DOMContentLoaded', displayProducts);