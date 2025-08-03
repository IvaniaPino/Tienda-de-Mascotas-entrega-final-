document.addEventListener('DOMContentLoaded', () => {
    let productos = [];
    const productList = document.getElementById('product-list');
    const viewCartBtn = document.getElementById('view-cart-btn');
    const cartCountSpan = document.getElementById('cart-count');
    const cartModalOverlay = document.createElement('div');
    cartModalOverlay.classList.add('cart-modal-overlay');
    document.body.appendChild(cartModalOverlay);

    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    // Función para obtener los productos del archivo JSON
    const fetchProductos = async () => {
        try {
            const response = await fetch('productos.json');
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            const data = await response.json();
            productos = data;
            renderProducts(productos);
        } catch (error) {
            console.error('Error al cargar los productos:', error);
            productList.innerHTML = '<p>Error al cargar los productos. Por favor, inténtalo de nuevo más tarde.</p>';
        }
    };

    // Función para renderizar los productos
    const renderProducts = (productsToRender) => {
        productList.innerHTML = '';
        if (productsToRender.length === 0) {
            productList.innerHTML = '<p class="text-center text-gray-500 mt-10 text-xl font-semibold">No se encontraron productos.</p>';
            return;
        }

        productsToRender.forEach(producto => {
            const productItem = document.createElement('div');
            productItem.classList.add('product-item');
            productItem.innerHTML = `
                <img src="${producto.imagen}" alt="${producto.nombre}" onerror="this.onerror=null;this.src='https://placehold.co/180x180/E0E0E0/333333?text=Sin+Imagen';" />
                <h3>${producto.nombre}</h3>
                <p>$${producto.precio.toFixed(2)}</p>
                <button class="add-to-cart-btn" data-id="${producto.id}">Agregar al carrito</button>
            `;
            productList.appendChild(productItem);
        });

        document.querySelectorAll('.add-to-cart-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const productId = parseInt(e.target.dataset.id);
                const productoSeleccionado = productos.find(p => p.id === productId);
                if (productoSeleccionado) agregarAlCarrito(productoSeleccionado);
            });
        });
    };

    const updateCartCount = () => {
        const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0);
        cartCountSpan.textContent = totalItems;
    };

    const agregarAlCarrito = (producto) => {
        const itemExistente = carrito.find(item => item.id === producto.id);
        if (itemExistente) {
            itemExistente.cantidad++;
        } else {
            carrito.push({ ...producto, cantidad: 1 });
        }
        localStorage.setItem('carrito', JSON.stringify(carrito));
        updateCartCount();
        Toastify({
            text: `${producto.nombre} añadido al carrito`,
            duration: 3000,
            gravity: "bottom",
            position: "right",
            style: {
                background: "#4CAF50",
            }
        }).showToast();
    };

    const renderCart = () => {
        cartModalOverlay.innerHTML = '';
        const cartModal = document.createElement('div');
        cartModal.classList.add('cart-modal');

        const closeBtn = document.createElement('button');
        closeBtn.classList.add('cart-modal-close-btn');
        closeBtn.innerHTML = '&times;';
        closeBtn.addEventListener('click', () => {
            cartModalOverlay.classList.remove('visible');
        });

        const modalTitle = document.createElement('h2');
        modalTitle.textContent = 'Tu Carrito de Compras';

        const cartItemsContainer = document.createElement('div');
        cartItemsContainer.classList.add('cart-items-container');

        if (carrito.length === 0) {
            cartItemsContainer.innerHTML = '<p>El carrito está vacío.</p>';
        } else {
            carrito.forEach(item => {
                const cartItem = document.createElement('div');
                cartItem.classList.add('cart-item');
                cartItem.innerHTML = `
                    <img src="${item.imagen}" alt="${item.nombre}" />
                    <div class="cart-item-info">
                        <h4>${item.nombre}</h4>
                        <p>Precio: $${item.precio.toFixed(2)}</p>
                        <small>Cantidad: ${item.cantidad}</small>
                    </div>
                    <button class="remove-item-btn" data-id="${item.id}">Eliminar</button>
                `;
                cartItemsContainer.appendChild(cartItem);
            });
        }

        const total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
        const cartSummary = document.createElement('div');
        cartSummary.classList.add('cart-summary');
        cartSummary.innerHTML = `Total: $${total.toFixed(2)}`;

        const cartActions = document.createElement('div');
        cartActions.classList.add('cart-actions');
        cartActions.innerHTML = `
            <button id="clear-cart-btn">Vaciar Carrito</button>
            <button id="checkout-btn">Finalizar Compra</button>
        `;

        cartModal.appendChild(closeBtn);
        cartModal.appendChild(modalTitle);
        cartModal.appendChild(cartItemsContainer);
        cartModal.appendChild(cartSummary);
        cartModal.appendChild(cartActions);
        cartModalOverlay.appendChild(cartModal);

        document.querySelectorAll('.remove-item-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const productId = parseInt(e.target.dataset.id);
                eliminarDelCarrito(productId);
            });
        });

        document.getElementById('clear-cart-btn').addEventListener('click', vaciarCarrito);
        document.getElementById('checkout-btn').addEventListener('click', finalizarCompra);
    };

    const eliminarDelCarrito = (productId) => {
        carrito = carrito.filter(item => item.id !== productId);
        localStorage.setItem('carrito', JSON.stringify(carrito));
        updateCartCount();
        renderCart();
    };

    const vaciarCarrito = () => {
        carrito = [];
        localStorage.setItem('carrito', JSON.stringify(carrito));
        updateCartCount();
        renderCart();
    };

    const finalizarCompra = () => {
        if (carrito.length === 0) {
            Swal.fire({
                title: 'Carrito vacío',
                text: 'No hay productos en el carrito para comprar.',
                icon: 'warning',
                confirmButtonText: 'Ok'
            });
            return;
        }

        Swal.fire({
            title: 'Compra Exitosa',
            text: 'Tu compra ha sido procesada correctamente.',
            icon: 'success',
            confirmButtonText: 'Ok'
        }).then(() => {
            vaciarCarrito();
            cartModalOverlay.classList.remove('visible');
        });
    };

    viewCartBtn.addEventListener('click', () => {
        renderCart();
        cartModalOverlay.classList.add('visible');
    });

    const filterProducts = (category) => {
        let filteredProducts = [];

        switch (category) {
            case 'alimentos':
                filteredProducts = productos.filter(p => p.nombre.toLowerCase().includes('alimento'));
                break;
            case 'cuidados':
                filteredProducts = productos.filter(p =>
                    p.nombre.toLowerCase().includes('antipulgas') ||
                    p.nombre.toLowerCase().includes('shampoo') ||
                    p.nombre.toLowerCase().includes('caída')
                );
                break;
            case 'habitat':
                filteredProducts = productos.filter(p =>
                    p.nombre.toLowerCase().includes('casa') ||
                    p.nombre.toLowerCase().includes('jaula') ||
                    p.nombre.toLowerCase().includes('pecera') ||
                    p.nombre.toLowerCase().includes('arenero') ||
                    p.nombre.toLowerCase().includes('acuario')
                );
                break;
            case 'otros':
                filteredProducts = productos.filter(p =>
                    p.nombre.toLowerCase().includes('juguete') ||
                    p.nombre.toLowerCase().includes('correa')
                );
                break;
            default:
                filteredProducts = productos;
        }

        renderProducts(filteredProducts);
    };

    document.querySelectorAll('.main-nav a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const category = e.target.getAttribute('href').substring(1).toLowerCase();
            filterProducts(category);
        });
    });

    fetchProductos();
    updateCartCount();
});
