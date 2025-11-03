
// Initialize AOS
AOS.init({
    duration: 800,
    once: true
});

// Cart functionality
let cart = [];

function addToCart(name, price) {
    const existingItem = cart.find(item => item.name === name);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            name: name,
            price: price,
            quantity: 1
        });
    }

    updateCart();
    showNotification('Producto agregado al carrito');
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

function updateQuantity(index, change) {
    cart[index].quantity += change;
    if (cart[index].quantity <= 0) {
        removeFromCart(index);
    } else {
        updateCart();
    }
}

function updateCart() {
    const cartCount = document.getElementById('cartCount');
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    cartCount.textContent = totalItems;
    cartCount.style.display = totalItems > 0 ? 'block' : 'none';

    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="text-center text-muted">Tu carrito está vacío</p>';
    } else {
        cartItems.innerHTML = cart.map((item, index) => `
          <div class="cart-item">
            <div class="flex-grow-1">
              <h6 class="mb-1">${item.name}</h6>
              <p class="mb-2" style="color: var(--primary-orange); font-weight: 600;">S/ ${item.price.toFixed(2)}</p>
              <div class="quantity-controls">
                <button class="quantity-btn" onclick="updateQuantity(${index}, -1)">-</button>
                <span class="mx-2">${item.quantity}</span>
                <button class="quantity-btn" onclick="updateQuantity(${index}, 1)">+</button>
                <button class="btn-remove ms-3" onclick="removeFromCart(${index})">
                  <i class="bi bi-trash"></i>
                </button>
              </div>
            </div>
          </div>
        `).join('');
    }

    cartTotal.textContent = `S/ ${totalPrice.toFixed(2)}`;
}

function toggleCart() {
    const sidebar = document.getElementById('cartSidebar');
    const overlay = document.getElementById('cartOverlay');

    sidebar.classList.toggle('active');
    overlay.classList.toggle('active');
}

function clearCart() {
    showClearCartModal();
}

function confirmClearCart() {
    cart = [];
    updateCart();
    closeClearCartModal();
    showNotification('Carrito vaciado');
}

function showClearCartModal() {
    document.getElementById('clearCartModal').style.display = 'flex';
}

function closeClearCartModal() {
    document.getElementById('clearCartModal').style.display = 'none';
}

function checkout() {
    if (cart.length === 0) {
        alert('Tu carrito está vacío');
        return;
    }

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const items = cart.map(item => `
        <div class="checkout-item">
            <span class="item-quantity">${item.quantity}x</span>
            <span class="item-name">${item.name}</span>
            <span class="item-price">S/ ${(item.price * item.quantity).toFixed(2)}</span>
        </div>
    `).join('');

    document.getElementById('checkoutItems').innerHTML = items;
    document.getElementById('checkoutTotal').textContent = `S/ ${total.toFixed(2)}`;
    document.getElementById('checkoutModal').style.display = 'flex';
}

function confirmCheckout() {
    closeCheckoutModal();
    showPaymentModal();
}

function closeCheckoutModal() {
    document.getElementById('checkoutModal').style.display = 'none';
}

function showPaymentModal() {
    document.getElementById('paymentModal').style.display = 'flex';
    // Seleccionar tarjeta por defecto
    selectPaymentMethod('card');
}

function closePaymentModal() {
    document.getElementById('paymentModal').style.display = 'none';
    // Limpiar formulario
    document.getElementById('paymentForm').reset();
}

function selectPaymentMethod(method) {
    // Remover clase active de todos
    document.querySelectorAll('.payment-method-option').forEach(option => {
        option.classList.remove('active');
    });
    
    // Agregar clase active al seleccionado
    document.querySelector(`[data-method="${method}"]`).classList.add('active');
    
    // Ocultar todos los formularios
    document.querySelectorAll('.payment-form-content').forEach(form => {
        form.style.display = 'none';
    });
    
    // Mostrar formulario seleccionado
    document.getElementById(`${method}Form`).style.display = 'block';
}

function processPayment() {
    const activeMethod = document.querySelector('.payment-method-option.active');
    const methodName = activeMethod.querySelector('.payment-method-name').textContent;
    
    // Aquí validarías los datos del formulario
    // Por ahora solo mostramos mensaje de éxito
    
    closePaymentModal();
    cart = [];
    updateCart();
    toggleCart();
    showSuccessModal(methodName);
}

function showSuccessModal(method) {
    document.getElementById('successMethod').textContent = method;
    document.getElementById('successModal').style.display = 'flex';
    
    setTimeout(() => {
        closeSuccessModal();
    }, 3000);
}

function closeSuccessModal() {
    document.getElementById('successModal').style.display = 'none';
}

function goBackToCheckout() {
    closePaymentModal();
    checkout();
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--primary-orange);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 9999;
        animation: slideIn 0.3s ease;
      `;
    notification.innerHTML = `
        <i class="bi bi-check-circle me-2"></i>${message}
      `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 2000);
}

// Add animation styles
const style = document.createElement('style');
style.textContent = `
      @keyframes slideIn {
        from {
          transform: translateX(400px);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }
      
      @keyframes slideOut {
        from {
          transform: translateX(0);
          opacity: 1;
        }
        to {
          transform: translateX(400px);
          opacity: 0;
        }
      }
      
      .text-orange {
        color: var(--primary-orange);
      }
      
      .scroll-top {
        background: var(--primary-orange);
        color: white;
      }
      
      .scroll-top:hover {
        background: var(--dark-orange);
      }
    `;
document.head.appendChild(style);

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Scroll to top button
const scrollTop = document.getElementById('scroll-top');
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollTop.style.display = 'flex';
    } else {
        scrollTop.style.display = 'none';
    }
});

scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

//para el navbad
document.addEventListener("DOMContentLoaded", function () {
    const navToggle = document.querySelector('.mobile-nav-toggle');
    const navMenu = document.getElementById('navmenu');

    navToggle.addEventListener('click', function () {
        document.body.classList.toggle('mobile-nav-active');
        // Opcional: cambiar el icono de hamburguesa a cruz
        this.classList.toggle('bi-list');
        this.classList.toggle('bi-x');
    });

    // Cerrar menú al hacer clic en un enlace
    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (document.body.classList.contains('mobile-nav-active')) {
                document.body.classList.remove('mobile-nav-active');
                navToggle.classList.add('bi-list');
                navToggle.classList.remove('bi-x');
            }
        });
    });
});

document.querySelectorAll('.btn-add-cart').forEach(button => {
    button.addEventListener('click', () => {
        // Solo ejecutar si tiene data-name (para evitar duplicados con onclick)
        if (button.dataset.name) {
            const name = button.dataset.name;
            const price = parseFloat(button.dataset.price);
            addToCart(name, price);
        }
    });
});



