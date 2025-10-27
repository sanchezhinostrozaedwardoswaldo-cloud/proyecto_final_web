
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
    if (confirm('¿Estás seguro de que quieres vaciar el carrito?')) {
        cart = [];
        updateCart();
        showNotification('Carrito vaciado');
    }
}

function checkout() {
    if (cart.length === 0) {
        alert('Tu carrito está vacío');
        return;
    }

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const items = cart.map(item => `${item.quantity}x ${item.name}`).join('\n');

    alert(`Procesando pago...\n\nProductos:\n${items}\n\nTotal: S/ ${total.toFixed(2)}\n\n¡Gracias por tu compra!`);

    cart = [];
    updateCart();
    toggleCart();
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
        const name = button.dataset.name;
        const price = parseFloat(button.dataset.price);
        addToCart(name, price);
    });
});



