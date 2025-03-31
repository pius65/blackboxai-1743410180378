document.addEventListener('DOMContentLoaded', () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartTableBody = document.getElementById('cart-table-body');
    const cartEmpty = document.getElementById('cart-empty');
    const cartItems = document.getElementById('cart-items');
    const subtotalElement = document.getElementById('subtotal');
    const taxElement = document.getElementById('tax');
    const totalElement = document.getElementById('total');

    function renderCart() {
        // Clear existing rows
        cartTableBody.innerHTML = '';

        if (cart.length === 0) {
            cartEmpty.classList.remove('hidden');
            cartItems.classList.add('hidden');
            return;
        }

        cartEmpty.classList.add('hidden');
        cartItems.classList.remove('hidden');

        let subtotal = 0;

        cart.forEach((item, index) => {
            const row = document.createElement('tr');
            row.className = 'border-b border-gray-200 hover:bg-gray-50';
            row.innerHTML = `
                <td class="py-4 px-6">
                    <div class="flex items-center">
                        <img src="${item.image}" alt="${item.name}" class="w-16 h-16 object-cover rounded">
                        <div class="ml-4">
                            <h4 class="font-medium">${item.name}</h4>
                        </div>
                    </div>
                </td>
                <td class="py-4 px-6">$${item.price.toFixed(2)}</td>
                <td class="py-4 px-6">
                    <div class="flex items-center">
                        <button class="quantity-btn decrease" data-index="${index}">
                            <i class="fas fa-minus text-gray-500 hover:text-blue-600"></i>
                        </button>
                        <span class="mx-2">${item.quantity}</span>
                        <button class="quantity-btn increase" data-index="${index}">
                            <i class="fas fa-plus text-gray-500 hover:text-blue-600"></i>
                        </button>
                    </div>
                </td>
                <td class="py-4 px-6">$${(item.price * item.quantity).toFixed(2)}</td>
                <td class="py-4 px-6">
                    <button class="remove-btn text-red-500 hover:text-red-700" data-index="${index}">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            `;
            cartTableBody.appendChild(row);

            subtotal += item.price * item.quantity;
        });

        // Calculate totals
        const tax = subtotal * 0.1; // 10% tax
        const shipping = 5.99;
        const total = subtotal + tax + shipping;

        // Update summary
        subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
        taxElement.textContent = `$${tax.toFixed(2)}`;
        totalElement.textContent = `$${total.toFixed(2)}`;
    }

    // Handle quantity changes
    document.addEventListener('click', (e) => {
        if (e.target.closest('.quantity-btn')) {
            const btn = e.target.closest('.quantity-btn');
            const index = parseInt(btn.dataset.index);
            const isIncrease = btn.classList.contains('increase');

            if (isIncrease) {
                cart[index].quantity += 1;
            } else {
                if (cart[index].quantity > 1) {
                    cart[index].quantity -= 1;
                } else {
                    cart.splice(index, 1);
                }
            }

            localStorage.setItem('cart', JSON.stringify(cart));
            renderCart();
            updateCartCount();
        }

        if (e.target.closest('.remove-btn')) {
            const btn = e.target.closest('.remove-btn');
            const index = parseInt(btn.dataset.index);
            
            cart.splice(index, 1);
            localStorage.setItem('cart', JSON.stringify(cart));
            renderCart();
            updateCartCount();
        }
    });

    function updateCartCount() {
        const count = cart.reduce((total, item) => total + item.quantity, 0);
        const cartCountElement = document.getElementById('cart-count');
        if (cartCountElement) {
            cartCountElement.textContent = count;
        }
    }

    // Initial render
    renderCart();
});