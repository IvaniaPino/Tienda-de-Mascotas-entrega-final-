document.addEventListener('DOMContentLoaded', () => {
    const productListDiv = document.getElementById('product-list');
    const cartCountSpan = document.getElementById('cart-count');
    const viewCartBtn = document.getElementById('view-cart-btn');
    const categoriesMenuDiv = document.getElementById('categories-menu');
    const products = [
        { "id": 1, "nombre": "Alimento para Hamster", "precio": 3.75, "imagen": "images/hamsteralimento.jpg", "categoria": "alimentos", "descripcion": "Delicioso mix de semillas, cereales y frutas secas, diseñado para una nutrición completa y balanceada. Enriquecido con vitaminas y minerales para mantener a tu hamster activo y saludable. Su textura crujiente ayuda a desgastar los dientes de forma natural." },
        { "id": 2, "nombre": "Alimento para Peces", "precio": 6.25, "imagen": "images/ALIMENTO-PARA-PECES.png", "categoria": "alimentos", "descripcion": "Escamas y gránulos flotantes de alta calidad que proporcionan una dieta completa para peces de agua dulce. Fórmulado para realzar los colores vibrantes y promover un crecimiento saludable. Contiene probióticos para una mejor digestión y agua más limpia." },
        { "id": 3, "nombre": "Alimento para Perro", "precio": 12.50, "imagen": "images/alimentoperro.png", "categoria": "alimentos", "descripcion": "Croquetas premium con carne real como primer ingrediente, ofreciendo una fuente de proteína esencial. Contiene antioxidantes para un sistema inmunológico fuerte y omega 3 para un pelaje brillante y piel sana. Sin colorantes ni conservantes artificiales." },
        { "id": 4, "nombre": "Alimento para Gato", "precio": 10.00, "imagen": "images/alimentogato.png", "categoria": "alimentos", "descripcion": "Receta irresistible con sabor a salmón y pollo, ideal para gatos exigentes. Su fórmula especial ayuda a prevenir la formación de bolas de pelo y promueve la salud urinaria. Con taurina para una visión y corazón saludables." },
        { "id": 5, "nombre": "Alimento para Tortugas", "precio": 8.00, "imagen": "images/alimentotortugas.jpg", "categoria": "alimentos", "descripcion": "Palitos flotantes con una mezcla equilibrada de proteínas, calcio y vitamina D3 para el correcto desarrollo del caparazón. Su fórmula es fácilmente digerible, lo que reduce la contaminación del agua. Apto para tortugas acuáticas y semi-acuáticas." },
        { "id": 6, "nombre": "Antipulgas para Perro", "precio": 15.75, "imagen": "images/antipulgasperro.jpg", "categoria": "cuidados", "descripcion": "Tratamiento tópico de larga duración que elimina y previene pulgas, garrapatas y piojos. Proporciona protección durante todo el mes, manteniendo a tu perro libre de parásitos. Es fácil de aplicar y seguro para la piel sensible." },
        { "id": 7, "nombre": "Shampoo para Cachorro", "precio": 7.25, "imagen": "images/Shampoo_cachorro_.jpg", "categoria": "cuidados", "descripcion": "Fórmula suave y sin lágrimas, especialmente diseñada para la delicada piel y pelaje de los cachorros. Enriquecido con extractos naturales que limpian, hidratan y dejan un aroma fresco y duradero. Hipoalergénico y pH balanceado." },
        { "id": 8, "nombre": "Shampoo para Gato", "precio": 7.25, "imagen": "images/shampoogato.jpg", "categoria": "cuidados", "descripcion": "Champú en seco, perfecto para gatos que no disfrutan del agua. Absorbe la suciedad y el exceso de grasa, dejando el pelaje limpio y sedoso. Contiene ingredientes que neutralizan los olores desagradables de forma instantánea." },
        { "id": 9, "nombre": "Shampoo para Perro", "precio": 7.25, "imagen": "images/shampoo-perro.jpg", "categoria": "cuidados", "descripcion": "Champú revitalizante con aloe vera y avena, ideal para perros con piel seca o sensible. Calma la picazón, hidrata y acondiciona el pelaje, dejándolo suave y manejable. Con un aroma natural que perdura." },
        { "id": 10, "nombre": "Anticaída para Gatos", "precio": 9.50, "imagen": "images/antocaidapelosgatos.png", "categoria": "cuidados", "descripcion": "Suplemento en formato de deliciosos bocados que fortalece el pelaje y reduce la caída excesiva. Rico en ácidos grasos Omega 3 y 6 para una piel y pelo saludables. Mejora la vitalidad y brillo de su manto." },
        { "id": 11, "nombre": "Casa para Perro", "precio": 45.00, "imagen": "images/casaperro.jpg", "categoria": "habitat", "descripcion": "Casita de plástico resistente a la intemperie, ideal para exteriores e interiores. Proporciona un refugio seguro y cómodo para tu perro. Su diseño ventilado mantiene el aire fresco y evita la acumulación de humedad." },
        { "id": 12, "nombre": "Jaula para Hamster", "precio": 30.00, "imagen": "images/jaulahamster2.jpg", "categoria": "habitat", "descripcion": "Jaula espaciosa con múltiples niveles, ideal para hamsters y pequeños roedores. Incluye rueda de ejercicio, comedero y bebedero. Su base profunda facilita la limpieza y permite colocar más sustrato." },
        { "id": 13, "nombre": "Pecera", "precio": 55.00, "imagen": "images/pecsera1.jpg", "categoria": "habitat", "descripcion": "Acuario de vidrio de alta resistencia con capacidad de 20 litros. Incluye tapa, lámpara LED y un filtro interno. Crea un hábitat perfecto y seguro para tus peces, dándoles un hogar hermoso." },
        { "id": 14, "nombre": "Arenero para Gato", "precio": 20.00, "imagen": "images/areneros-para-gato.jpg", "categoria": "habitat", "descripcion": "Arenero cubierto con puerta batiente, que reduce la dispersión de arena y controla los olores. Su diseño espacible ofrece privacidad a tu gato. Incluye filtro de carbón para una máxima frescura." },
        { "id": 15, "nombre": "Kit Acuario", "precio": 75.00, "imagen": "images/Kit-acuario.png", "categoria": "habitat", "descripcion": "Kit completo para principiantes, que incluye un acuario de 50 litros, filtro potente, calentador, termómetro y alimento para peces. Todo lo necesario para empezar tu propio mundo acuático." },
        { "id": 16, "nombre": "Juguete Hueso", "precio": 4.50, "imagen": "images/huesito.jpeg", "categoria": "otros", "descripcion": "Juguete masticable de caucho natural con sabor a menta, que ayuda a limpiar los dientes y masajear las encías. Resistente y duradero, es perfecto para entretener a tu perro por horas. Flota en el agua." },
        { "id": 17, "nombre": "Correa para Perro", "precio": 8.00, "imagen": "images/correaperro.jpg", "categoria": "otros", "descripcion": "Correa retráctil de 5 metros con mango ergonómico y sistema de bloqueo rápido. Fabricada con materiales de alta calidad para mayor durabilidad y seguridad. Ideal para paseos en el parque y espacios abiertos." },
        { "id": 18, "nombre": "Bebedero para Aves", "precio": 6.50, "imagen": "images/bebederoaves.jpg", "categoria": "otros", "descripcion": "Bebedero de plástico transparente con capacidad de 1 litro, fácil de rellenar y limpiar. Se fija fácilmente a la jaula, garantizando agua fresca y limpia para tus pájaros durante todo el día." },
        { "id": 19, "nombre": "Rascador para Gatos", "precio": 25.00, "imagen": "images/rascador-para-gatos.jpg", "categoria": "otros", "descripcion": "Rascador vertical con base estable y forrado en cuerda de sisal natural. Satisface el instinto natural de tu gato de arañar, protegiendo tus muebles. Incluye una pelota colgante para diversión adicional." },
        { "id": 20, "nombre": "Limpiador de Acuario", "precio": 18.00, "imagen": "images/limpiaacuarios.png", "categoria": "cuidados", "descripcion": "Limpiador manual de acuarios con sifón y bomba de mano, ideal para cambios de agua y eliminación de residuos. Mantiene el agua cristalina sin alterar el hábitat de tus peces. Fácil de usar y de limpiar." },
        { "id": 21, "nombre": "Arena para Gato", "precio": 9.00, "imagen": "images/arena_5lts-e1725497303430.jpg", "categoria": "cuidados", "descripcion": "Arena aglomerante de alta absorción, que forma grumos sólidos para una fácil limpieza. Neutraliza eficazmente los olores y deja un ligero aroma a lavanda. Hecha de arcilla natural, es 99% libre de polvo." }
    ];
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let cartModalOverlay;
    let cartModal;
    let cartItemsContainer;
    let cartTotalSpan;
    let clearCartBtn;
    let checkoutBtn;

    function showToast(message, type = 'success') {
        let backgroundColor = '#10b981';
        if (type === 'info') backgroundColor = '#3b82f6';
        if (type === 'error') backgroundColor = '#ef4444';
        if (type === 'warning') backgroundColor = '#f59e0b';
        Toastify({
            text: message,
            duration: 2000,
            newWindow: true,
            close: false,
            gravity: "top",
            position: "right",
            stopOnFocus: true,
            style: {
                background: backgroundColor,
                borderRadius: "8px",
                fontSize: "0.9em"
            },
            onClick: function(){}
        }).showToast();
    }

    function renderProducts(productsToRender) {
        productListDiv.innerHTML = '';
        productsToRender.forEach(product => {
            const productItemDiv = document.createElement('div');
            productItemDiv.classList.add('product-item');
            productItemDiv.innerHTML = `
                <img src="${product.imagen}" alt="${product.nombre}" data-product-id="${product.id}">
                <h3>${product.nombre}</h3>
                <p>$${product.precio.toFixed(2)}</p>
                <button data-id="${product.id}">Agregar al Carrito</button>
            `;
            productListDiv.appendChild(productItemDiv);

            // Add event listener to the image for showing description
            const imgElement = productItemDiv.querySelector('img');
            imgElement.addEventListener('click', () => {
                Swal.fire({
                    title: product.nombre,
                    text: product.descripcion,
                    icon: 'info',
                    confirmButtonText: 'Cerrar'
                });
            });
        });

        document.querySelectorAll('.product-item button').forEach(button => {
            button.addEventListener('click', (event) => {
                const productId = parseInt(event.target.dataset.id);
                addToCart(productId);
            });
        });
    }

    function createCategoryMenu() {
        const uniqueCategories = ['todos', ...new Set(products.map(p => p.categoria))];
        categoriesMenuDiv.innerHTML = '';
        uniqueCategories.forEach(category => {
            const button = document.createElement('button');
            button.classList.add('px-4', 'py-2', 'rounded-full', 'font-semibold', 'transition-colors');
            button.textContent = category.charAt(0).toUpperCase() + category.slice(1);
            button.dataset.category = category;
            if (category === 'todos') {
                button.classList.add('bg-white', 'text-indigo-600');
            } else {
                button.classList.add('bg-indigo-500', 'hover:bg-indigo-400', 'text-white');
            }
            button.addEventListener('click', (event) => {
                const selectedCategory = event.target.dataset.category;
                const filteredProducts = selectedCategory === 'todos' ? products : products.filter(p => p.categoria === selectedCategory);
                renderProducts(filteredProducts);
                document.querySelectorAll('#categories-menu button').forEach(btn => {
                    btn.classList.remove('bg-white', 'text-indigo-600');
                    btn.classList.add('bg-indigo-500', 'hover:bg-indigo-400', 'text-white');
                });
                event.target.classList.remove('bg-indigo-500', 'hover:bg-indigo-400', 'text-white');
                event.target.classList.add('bg-white', 'text-indigo-600');
            });
            categoriesMenuDiv.appendChild(button);
        });
    }

    function addToCart(productId) {
        const existingItem = cart.find(item => item.id === productId);
        const productToAdd = products.find(p => p.id === productId);
        if (!productToAdd) {
            console.error('Producto no encontrado en el catálogo:', productId);
            showToast('Error: Producto no disponible.', 'error');
            return;
        }
        if (existingItem) {
            existingItem.quantity++;
            showToast(`${productToAdd.nombre} x${existingItem.quantity}`, 'success');
        } else {
            const now = luxon.DateTime.now().toLocaleString(luxon.DateTime.DATETIME_SHORT);
            cart.push({ ...productToAdd, quantity: 1, addedAt: now });
            showToast(`${productToAdd.nombre} añadido al carrito`, 'success');
        }
        saveCart();
        updateCartUI();
    }

    function removeFromCart(productId) {
        const removedItem = cart.find(item => item.id === productId);
        cart = cart.filter(item => item.id !== productId);
        saveCart();
        updateCartUI();
        if (removedItem) {
            showToast(`${removedItem.nombre} eliminado del carrito`, 'info');
        }
    }

    function clearCart() {
        if (cart.length === 0) {
            Swal.fire({
                icon: 'warning',
                title: 'Carrito vacío',
                text: 'No hay productos en el carrito para vaciar.',
                confirmButtonText: 'Entendido'
            });
            return;
        }
        Swal.fire({
            title: '¿Estás seguro?',
            text: "¡Estás a punto de vaciar todo el carrito! Esta acción no se puede deshacer.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, vaciarlo!',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                cart = [];
                saveCart();
                updateCartUI();
                Swal.fire(
                    '¡Vaciado!',
                    'Tu carrito ha sido vaciado.',
                    'success'
                );
                closeCartModal();
            }
        });
    }

    function saveCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    function updateCartUI() {
        cartCountSpan.textContent = cart.reduce((acc, item) => acc + item.quantity, 0);
        if (!cartModalOverlay || !cartItemsContainer) return;
        cartItemsContainer.innerHTML = '';
        let total = 0;
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p class="text-center italic text-gray-500">Tu carrito de mascotas está vacío.</p>';
        } else {
            cart.forEach(item => {
                const cartItemDiv = document.createElement('div');
                cartItemDiv.classList.add('cart-item');
                cartItemDiv.innerHTML = `
                    <img src="${item.imagen}" alt="${item.nombre}">
                    <div class="cart-item-info">
                        <h4>${item.nombre}</h4>
                        <p>${item.quantity} x $${item.precio.toFixed(2)}</p>
                        ${item.addedAt ? `<small class="text-gray-400">Añadido: ${item.addedAt}</small>` : ''}
                    </div>
                    <button data-id="${item.id}" class="bg-red-500 text-white font-semibold py-2 px-4 rounded-full">Eliminar</button>
                `;
                cartItemsContainer.appendChild(cartItemDiv);
                total += item.precio * item.quantity;
            });
            document.querySelectorAll('.cart-item button').forEach(button => {
                button.addEventListener('click', (event) => {
                    const productId = parseInt(event.target.dataset.id);
                    removeFromCart(productId);
                });
            });
        }
        cartTotalSpan.textContent = total.toFixed(2);
    }

    function createCartModal() {
        cartModalOverlay = document.createElement('div');
        cartModalOverlay.classList.add('cart-modal-overlay');
        cartModalOverlay.innerHTML = `
            <div class="cart-modal">
                <button class="cart-modal-close-btn">&times;</button>
                <h2>Mi Carrito de Compras</h2>
                <div class="cart-items-container">
                </div>
                <div class="cart-summary">
                    <strong>Total: $<span id="modal-cart-total">0.00</span></strong>
                </div>
                <div class="cart-actions">
                    <button id="clear-cart-btn" class="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded-full">Vaciar Carrito</button>
                    <button id="checkout-btn" class="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-full">Finalizar Compra</button>
                </div>
            </div>
        `;
        document.body.appendChild(cartModalOverlay);
        cartModal = cartModalOverlay.querySelector('.cart-modal');
        cartItemsContainer = cartModalOverlay.querySelector('.cart-items-container');
        cartTotalSpan = cartModalOverlay.querySelector('#modal-cart-total');
        clearCartBtn = cartModalOverlay.querySelector('#clear-cart-btn');
        checkoutBtn = cartModalOverlay.querySelector('#checkout-btn');
        cartModalOverlay.querySelector('.cart-modal-close-btn').addEventListener('click', closeCartModal);
        cartModalOverlay.addEventListener('click', (event) => {
            if (event.target === cartModalOverlay) {
                closeCartModal();
            }
        });
        clearCartBtn.addEventListener('click', clearCart);
        checkoutBtn.addEventListener('click', () => {
            if (cart.length === 0) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Carrito vacío',
                    text: 'No hay productos para comprar.',
                    confirmButtonText: 'Entendido'
                });
                return;
            }
            Swal.fire({
                icon: 'success',
                title: 'Compra realizada',
                text: 'Tu compra ha sido procesada con éxito. ¡Gracias por tu pedido!',
                confirmButtonText: 'Ok'
            }).then(() => {
                cart = [];
                saveCart();
                updateCartUI();
                closeCartModal();
            });
        });
    }

    function openCartModal() {
        if (!cartModalOverlay) {
            createCartModal();
        }
        updateCartUI();
        cartModalOverlay.classList.add('visible');
    }

    function closeCartModal() {
        if (cartModalOverlay) {
            cartModalOverlay.classList.remove('visible');
        }
    }

    function initializeApp() {
        renderProducts(products);
        createCategoryMenu();
        updateCartUI();
    }

    initializeApp();
    viewCartBtn.addEventListener('click', openCartModal);
});