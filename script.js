// Obtener los elementos del DOM
const productList = document.getElementById('product-list');
const cartCountElement = document.getElementById('cart-count');
const cartModalOverlay = document.getElementById('cart-modal-overlay');
const cartItemsContainer = document.getElementById('cart-items-container');
const cartSummary = document.getElementById('cart-summary');
const clearCartBtn = document.getElementById('clear-cart-btn');
const checkoutBtn = document.getElementById('checkout-btn');

// Array para el carrito
let cart = [];
let allProducts = [];

// Función para cargar los productos desde el JSON
const loadProducts = async () => {
    try {
        const response = await fetch('productos.json');
        allProducts = await response.json();
        renderProducts(allProducts);
    } catch (error) {
        console.error('Error al cargar los productos:', error);
    }
};

// Función para renderizar los productos en la página
const renderProducts = (products) => {
    productList.innerHTML = '';
    products.forEach(product => {
        const productItem = document.createElement('div');
        productItem.classList.add('product-item', 'fade-in');

        // Agregar un dataset para identificar el producto al hacer clic en la imagen
        productItem.dataset.id = product.id;

        productItem.innerHTML = `
            <img src="${product.imagen}" alt="${product.nombre}" onerror="this.onerror=null;this.src='https://placehold.co/200x200/cccccc/333333?text=Sin+Imagen';" class="product-image">
            <h3>${product.nombre}</h3>
            <p>$${product.precio.toFixed(2)}</p>
            <button class="add-to-cart-btn" data-id="${product.id}">Añadir al carrito</button>
        `;
        productList.appendChild(productItem);
    });

    // Añadir el listener para mostrar la información del producto
    document.querySelectorAll('.product-image').forEach(image => {
        image.addEventListener('click', (e) => {
            const productId = e.target.closest('.product-item').dataset.id;
            const product = allProducts.find(p => p.id == productId);
            if (product) {
                showProductModal(product);
            }
        });
    });
};

// Función para mostrar el modal de detalles del producto
const showProductModal = (product) => {
    const productModal = document.createElement('div');
    productModal.classList.add('product-modal-overlay');
    productModal.innerHTML = `
        <div class="product-modal">
            <button class="product-modal-close-btn">&times;</button>
            <div class="product-modal-content">
                <img src="${product.imagen}" alt="${product.nombre}" class="product-modal-img">
                <div class="product-modal-info">
                    <h2>${product.nombre}</h2>
                    <p class="product-modal-price">$${product.precio.toFixed(2)}</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                    <button class="add-to-cart-btn" data-id="${product.id}">Añadir al carrito</button>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(productModal);

    // Añadir listener para cerrar el modal
    productModal.querySelector('.product-modal-close-btn').addEventListener('click', () => {
        productModal.remove();
    });

    // Añadir listener para añadir al carrito desde el modal
    productModal.querySelector('.add-to-cart-btn').addEventListener('click', (e) => {
        const productId = e.target.dataset.id;
        addToCart(productId);
        productModal.remove(); // Cerrar el modal después de añadir al carrito
    });

    // Cerrar el modal haciendo clic fuera de él
    productModal.addEventListener('click', (e) => {
        if (e.target === productModal) {
            productModal.remove();
        }
    });
};

// Función para añadir productos al carrito
const addToCart = (productId) => {
    const product = allProducts.find(p => p.id == productId);
    if (product) {
        const existingItem = cart.find(item => item.id == productId);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        updateCart();
    }
};

// Función para actualizar el carrito
const updateCart = () => {
    renderCart();
    updateCartCount();
    saveCart();
};

// Función para renderizar los productos en el modal del carrito
const renderCart = () => {
    cartItemsContainer.innerHTML = '';
    let total = 0;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>El carrito está vacío.</p>';
        cartSummary.textContent = `Total: $0.00`;
        clearCartBtn.style.display = 'none';
        checkoutBtn.style.display = 'none';
        return;
    }

    clearCartBtn.style.display = 'block';
    checkoutBtn.style.display = 'block';

    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <img src="${item.imagen}" alt="${item.nombre}">
            <div class="cart-item-info">
                <h4>${item.nombre}</h4>
                <p>$${item.precio.toFixed(2)} x ${item.quantity}</p>
            </div>
            <button class="remove-from-cart-btn" data-id="${item.id}">Eliminar</button>
        `;
        cartItemsContainer.appendChild(cartItem);
        total += item.precio * item.quantity;
    });

    cartSummary.textContent = `Total: $${total.toFixed(2)}`;

    // Añadir listener para eliminar productos del carrito
    document.querySelectorAll('.remove-from-cart-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = e.target.dataset.id;
            removeFromCart(productId);
        });
    });
};

// Función para eliminar productos del carrito
const removeFromCart = (productId) => {
    cart = cart.filter(item => item.id != productId);
    updateCart();
};

// Función para actualizar el contador del carrito
const updateCartCount = () => {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCountElement.textContent = totalItems;
    cartCountElement.style.animation = 'none';
    void cartCountElement.offsetWidth; // Forzar reflow para reiniciar la animación
    cartCountElement.style.animation = 'pop 0.4s ease-in-out';
};

// Función para limpiar el carrito
const clearCart = () => {
    cart = [];
    updateCart();
    cartModalOverlay.classList.remove('visible');
};

// Función para guardar el carrito en el localStorage
const saveCart = () => {
    localStorage.setItem('pet-shop-cart', JSON.stringify(cart));
};

// Función para cargar el carrito desde el localStorage
const loadCart = () => {
    const storedCart = localStorage.getItem('pet-shop-cart');
    if (storedCart) {
        cart = JSON.parse(storedCart);
        updateCartCount();
    }
};

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
    loadCart();

    // Evento para añadir al carrito
    productList.addEventListener('click', (e) => {
        if (e.target.classList.contains('add-to-cart-btn')) {
            const productId = e.target.dataset.id;
            addToCart(productId);
        }
    });

    // Evento para abrir el modal del carrito
    document.getElementById('view-cart-btn').addEventListener('click', () => {
        cartModalOverlay.classList.add('visible');
        renderCart();
    });

    // Evento para cerrar el modal del carrito
    document.querySelector('.cart-modal-close-btn').addEventListener('click', () => {
        cartModalOverlay.classList.remove('visible');
    });

    // Evento para limpiar el carrito
    clearCartBtn.addEventListener('click', clearCart);

    // Evento para procesar el pago
    checkoutBtn.addEventListener('click', () => {
        alert('¡Gracias por tu compra!');
        clearCart();
    });
});
