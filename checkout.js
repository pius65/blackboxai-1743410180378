document.addEventListener('DOMContentLoaded', () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const checkoutItems = document.getElementById('checkout-items');
    const subtotalElement = document.getElementById('checkout-subtotal');
    const taxElement = document.getElementById('checkout-tax');
    const totalElement = document.getElementById('checkout-total');
    const placeOrderBtn = document.getElementById('place-order-btn');
    const successModal = document.getElementById('success-modal');
    const shippingForm = document.getElementById('shipping-form');

    function renderOrderSummary() {
        checkoutItems.innerHTML = '';
        
        if (cart.length === 0) {
            window.location.href = 'products.html';
            return;
        }

        let subtotal = 0;

        cart.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'flex justify-between py-2 border-b border-gray-200';
            itemElement.innerHTML = `
                <div class="flex items-center">
                    <img src="${item.image}" alt="${item.name}" class="w-12 h-12 object-cover rounded mr-3">
                    <div>
                        <h4 class="font-medium">${item.name}</h4>
                        <p class="text-sm text-gray-600">Qty: ${item.quantity}</p>
                    </div>
                </div>
                <span>$${(item.price * item.quantity).toFixed(2)}</span>
            `;
            checkoutItems.appendChild(itemElement);

            subtotal += item.price * item.quantity;
        });

        const tax = subtotal * 0.1; // 10% tax
        const shipping = 5.99;
        const total = subtotal + tax + shipping;

        subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
        taxElement.textContent = `$${tax.toFixed(2)}`;
        totalElement.textContent = `$${total.toFixed(2)}`;
    }

    function validateForm() {
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const address = document.getElementById('address').value.trim();
        const city = document.getElementById('city').value.trim();
        const zip = document.getElementById('zip').value.trim();

        if (!name || !email || !address || !city || !zip) {
            alert('Please fill in all required fields');
            return false;
        }

        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            alert('Please enter a valid email address');
            return false;
        }

        return true;
    }

    function placeOrder() {
        if (!validateForm()) return;

        // In a real app, you would send this data to your backend
        const order = {
            customer: {
                name: document.getElementById('name').value.trim(),
                email: document.getElementById('email').value.trim(),
                address: document.getElementById('address').value.trim(),
                city: document.getElementById('city').value.trim(),
                zip: document.getElementById('zip').value.trim()
            },
            items: cart,
            total: totalElement.textContent,
            date: new Date().toISOString()
        };

        // Clear cart and show success
        localStorage.removeItem('cart');
        successModal.classList.remove('hidden');
        updateCartCount();
    }

    placeOrderBtn.addEventListener('click', placeOrder);

    // Initial render
    renderOrderSummary();
});

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    const cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
        cartCountElement.textContent = count;
    }
}