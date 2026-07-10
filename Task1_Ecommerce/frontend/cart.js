let cart = JSON.parse(localStorage.getItem('cart')) || [];

const updateCartCount = () => {
    const cartCountSpan = document.getElementById('cart-count');
    if (cartCountSpan) {
        cartCountSpan.innerText = cart.length;
    }
};

const renderCart = () => {
    const cartItemsContainer = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');
    const checkoutBtn = document.getElementById('checkout-btn');

    cartItemsContainer.innerHTML = '';
    let total = 0;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
        checkoutBtn.style.display = 'none';
        totalPriceElement.innerText = '0';
        return;
    }

    cart.forEach((item, index) => {
        total += item.price;
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('cart-item');
        itemDiv.innerHTML = `
            <span>${item.name}</span>
            <span>₹${item.price}</span>
            <button class="remove-btn" onclick="removeFromCart(${index})">Remove</button>
        `;
        cartItemsContainer.appendChild(itemDiv);
    });

    totalPriceElement.innerText = total;
    checkoutBtn.style.display = 'inline-block';
};

const removeFromCart = (index) => {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    renderCart();
};

document.getElementById('checkout-btn')?.addEventListener('click', () => {
    alert('Order placed successfully!');
    localStorage.removeItem('cart');
    cart = [];
    updateCartCount();
    renderCart();
    window.location.href = 'index.html';
});

window.onload = () => {
    updateCartCount();
    renderCart();
};