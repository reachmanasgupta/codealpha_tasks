const API_URL = 'http://localhost:5000/api/products';
let cart = JSON.parse(localStorage.getItem('cart')) || [];

const updateCartCount = () => {
    const cartCountSpan = document.getElementById('cart-count');
    if (cartCountSpan) {
        cartCountSpan.innerText = cart.length;
    }
};

const fetchProducts = async () => {
    try {
        const response = await fetch(API_URL);
        const products = await response.json();

        const productList = document.getElementById('product-list');
        productList.innerHTML = ''; 

        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.classList.add('product-card');

            const escapedName = product.name.replace(/'/g, "\\'");

            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <p><strong>₹${product.price}</strong></p>
                <button onclick="addToCart('${product._id}', '${escapedName}', ${product.price})">Add to Cart</button>
            `;

            productList.appendChild(productCard);
        });
    } catch (error) {
        document.getElementById('product-list').innerHTML = '<p>Error loading products.</p>';
    }
};

const addToCart = (id, name, price) => {
    cart.push({ id, name, price });
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    alert(`${name} added to cart!`);
};

window.onload = () => {
    fetchProducts();
    updateCartCount();
};
const checkAuth = () => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const loginLink = document.getElementById('login-link');
    
    if (userInfo && loginLink) {
        // Agar user login hai, toh uska naam dikhayein aur logout ka option dein
        loginLink.innerText = `Logout (${userInfo.name})`;
        loginLink.href = "#"; 
        
        // Logout par click karne ka logic
        loginLink.addEventListener('click', (e) => {
            e.preventDefault(); 
            localStorage.removeItem('userInfo'); // Local storage se data delete karna
            alert('Logged out successfully!');
            window.location.reload(); 
        });
    }
};

// Purane window.onload ko replace karke is naye wale ko daal dijiye:
window.onload = () => {
    fetchProducts();
    updateCartCount();
    checkAuth(); 
};