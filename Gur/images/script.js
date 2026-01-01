// Main JavaScript for Desi Mithas Website

// WhatsApp Configuration - Your Number
const whatsappNumber = "923494765335"; // Your WhatsApp number

// Product Prices
const productPrices = {
    "500gm": 349,
    "1kg": 699,
    "5kg": 3199
};

// Global variables
let selectedProduct = {
    name: "Desi Mithas Atta - 1kg Pack",
    price: 699,
    quantity: "1kg",
    deliveryCharge: 100
};

// Initialize on DOM Load
document.addEventListener('DOMContentLoaded', function() {
    // Update copyright year
    document.getElementById('currentYear').textContent = new Date().getFullYear();
    
    // Initialize mobile menu
    initMobileMenu();
    
    // Initialize smooth scroll
    initSmoothScroll();
    
    // Set default selected product
    updateOrderSummary();
    
    console.log('Desi Mithas Website Loaded Successfully! 🍞');
});

// Mobile Menu Toggle
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.querySelector('.nav-links');
    const navContact = document.querySelector('.nav-contact');
    
    mobileMenuBtn.addEventListener('click', function() {
        const isVisible = navLinks.style.display === 'flex';
        
        if (isVisible) {
            navLinks.style.display = 'none';
            navContact.style.display = 'none';
        } else {
            navLinks.style.display = 'flex';
            navContact.style.display = 'flex';
            navLinks.style.flexDirection = 'column';
            navLinks.style.position = 'absolute';
            navLinks.style.top = '100%';
            navLinks.style.left = '0';
            navLinks.style.right = '0';
            navLinks.style.background = 'white';
            navLinks.style.padding = '1.5rem';
            navLinks.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.1)';
            navLinks.style.gap = '1rem';
            navLinks.style.borderTop = '3px solid var(--primary-color)';
            
            navContact.style.flexDirection = 'column';
            navContact.style.position = 'absolute';
            navContact.style.top = 'calc(100% + 250px)';
            navContact.style.left = '0';
            navContact.style.right = '0';
            navContact.style.background = 'white';
            navContact.style.padding = '1.5rem';
            navContact.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.1)';
            navContact.style.gap = '1rem';
        }
    });
}

// Smooth Scroll
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const navLinks = document.querySelector('.nav-links');
                const navContact = document.querySelector('.nav-contact');
                if (navLinks.style.display === 'flex') {
                    navLinks.style.display = 'none';
                    navContact.style.display = 'none';
                }
            }
        });
    });
}

// Product Selection Functions
function selectQuantity(quantity) {
    const buttons = document.querySelectorAll('.quantity-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    
    let price = 0;
    let name = "";
    let deliveryCharge = 100; // Default delivery charge
    
    switch(quantity) {
        case '500gm':
            price = productPrices["500gm"];
            name = "Desi Mithas Atta - 500gm Pack";
            event.target.classList.add('active');
            deliveryCharge = price > 2000 ? 0 : 100;
            break;
        case '1kg':
            price = productPrices["1kg"];
            name = "Desi Mithas Atta - 1kg Pack";
            event.target.classList.add('active');
            deliveryCharge = price > 2000 ? 0 : 100;
            break;
        case '5kg':
            price = productPrices["5kg"];
            name = "Desi Mithas Atta - 5kg Pack";
            event.target.classList.add('active');
            deliveryCharge = 0; // Free delivery for 5kg
            break;
        case 'custom':
            name = "Custom Quantity Desi Mithas Atta";
            price = 0;
            event.target.classList.add('active');
            openCustomOrder();
            return;
    }
    
    selectedProduct = {
        name: name,
        price: price,
        quantity: quantity,
        deliveryCharge: deliveryCharge
    };
    
    updateOrderSummary();
}

function updateOrderSummary() {
    const totalAmount = selectedProduct.price + selectedProduct.deliveryCharge;
    
    document.getElementById('selectedQuantity').textContent = selectedProduct.name;
    document.getElementById('selectedPrice').textContent = 
        selectedProduct.price > 0 ? `Rs. ${selectedProduct.price.toLocaleString()}` : "Contact for Price";
    
    document.getElementById('deliveryCharge').textContent = 
        selectedProduct.deliveryCharge > 0 ? `Rs. ${selectedProduct.deliveryCharge}` : "FREE";
    
    document.getElementById('totalPrice').textContent = 
        selectedProduct.price > 0 ? `Rs. ${totalAmount.toLocaleString()}` : "Contact for Price";
}

// Order Functions
function orderProduct(productName, productPrice, quantity) {
    selectedProduct = {
        name: productName,
        price: productPrice,
        quantity: quantity,
        deliveryCharge: productPrice > 2000 ? 0 : 100
    };
    
    scrollToOrderForm();
    updateOrderSummary();
    
    // Update quantity buttons
    document.querySelectorAll('.quantity-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.textContent.toLowerCase() === quantity) {
            btn.classList.add('active');
        }
    });
}

function submitOrder() {
    // Get form values
    const name = document.getElementById('customerName').value.trim();
    const phone = document.getElementById('customerPhone').value.trim();
    const address = document.getElementById('customerAddress').value.trim();
    
    // Validation
    if (!name || !phone || !address) {
        showAlert('Please fill in all required fields.', 'error');
        return;
    }
    
    if (phone.length < 11) {
        showAlert('Please enter a valid phone number (11 digits).', 'error');
        return;
    }
    
    // Prepare WhatsApp message
    const totalAmount = selectedProduct.price + selectedProduct.deliveryCharge;
    
    const message = `🍞 *DESI MITHAS - NEW ATTA ORDER* 🍞

📦 *Order Details:*
• Product: ${selectedProduct.name}
• Quantity: ${selectedProduct.quantity}
• Product Price: ${selectedProduct.price > 0 ? `Rs. ${selectedProduct.price}` : 'Custom Order'}
• Delivery Charge: ${selectedProduct.deliveryCharge > 0 ? `Rs. ${selectedProduct.deliveryCharge}` : 'FREE'}
• Total Amount: ${selectedProduct.price > 0 ? `Rs. ${totalAmount}` : 'Will be confirmed'}

👤 *Customer Information:*
• Name: ${name}
• Phone: ${phone}
• Address: ${address}

📅 *Order Time:* ${new Date().toLocaleString('en-PK', { timeZone: 'Asia/Karachi' })}

💰 *Payment Method:* Cash on Delivery
🚚 *Delivery:* ${selectedProduct.deliveryCharge > 0 ? 'Standard' : 'FREE Delivery'}

_Thank you for choosing Desi Mithas! We will contact you shortly to confirm your order._`;

    // Encode message for WhatsApp URL
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    
    // Open WhatsApp
    window.open(whatsappURL, '_blank');
    
    // Reset form
    resetOrderForm();
    
    // Show confirmation
    showOrderConfirmation();
}

function resetOrderForm() {
    document.getElementById('customerName').value = '';
    document.getElementById('customerPhone').value = '03';
    document.getElementById('customerAddress').value = '';
    
    // Reset to default product
    selectedProduct = {
        name: "Desi Mithas Atta - 1kg Pack",
        price: 699,
        quantity: "1kg",
        deliveryCharge: 100
    };
    
    updateOrderSummary();
    
    // Reset quantity buttons
    document.querySelectorAll('.quantity-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.textContent === '1kg') {
            btn.classList.add('active');
        }
    });
}

function showOrderConfirmation() {
    const confirmation = document.createElement('div');
    confirmation.className = 'order-confirmation';
    confirmation.innerHTML = `
        <div class="confirmation-content">
            <i class="fas fa-check-circle"></i>
            <h3>Order Sent Successfully! 🎉</h3>
            <p>Your order has been sent to WhatsApp. We will contact you shortly to confirm your order.</p>
            <p><strong>WhatsApp:</strong> +92 349 4765335</p>
            <button onclick="this.parentElement.parentElement.remove()">Continue Shopping</button>
        </div>
    `;
    
    // Add styles
    confirmation.style.position = 'fixed';
    confirmation.style.top = '0';
    confirmation.style.left = '0';
    confirmation.style.right = '0';
    confirmation.style.bottom = '0';
    confirmation.style.background = 'rgba(0,0,0,0.7)';
    confirmation.style.display = 'flex';
    confirmation.style.alignItems = 'center';
    confirmation.style.justifyContent = 'center';
    confirmation.style.zIndex = '9999';
    
    const content = confirmation.querySelector('.confirmation-content');
    content.style.background = 'linear-gradient(135deg, white, #FFF9F0)';
    content.style.padding = '2.5rem';
    content.style.borderRadius = '20px';
    content.style.textAlign = 'center';
    content.style.maxWidth = '450px';
    content.style.width = '90%';
    content.style.boxShadow = '0 20px 40px rgba(0,0,0,0.3)';
    content.style.border = '3px solid var(--primary-color)';
    
    content.querySelector('i').style.color = '#27AE60';
    content.querySelector('i').style.fontSize = '4rem';
    content.querySelector('i').style.marginBottom = '1.5rem';
    
    content.querySelector('h3').style.marginBottom = '1rem';
    content.querySelector('h3').style.color = 'var(--dark-color)';
    content.querySelector('h3').style.fontSize = '1.8rem';
    
    content.querySelectorAll('p').forEach(p => {
        p.style.marginBottom = '1rem';
        p.style.color = 'var(--text-color)';
        p.style.lineHeight = '1.6';
    });
    
    content.querySelector('button').style.background = 'linear-gradient(45deg, var(--primary-color), var(--primary-dark))';
    content.querySelector('button').style.color = 'white';
    content.querySelector('button').style.border = 'none';
    content.querySelector('button').style.padding = '1rem 2.5rem';
    content.querySelector('button').style.borderRadius = '50px';
    content.querySelector('button').style.fontWeight = '700';
    content.querySelector('button').style.cursor = 'pointer';
    content.querySelector('button').style.fontSize = '1rem';
    content.querySelector('button').style.marginTop = '1rem';
    content.querySelector('button').style.transition = 'all 0.3s ease';
    
    content.querySelector('button').addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
        this.style.boxShadow = '0 6px 12px rgba(230, 126, 34, 0.4)';
    });
    
    content.querySelector('button').addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = 'none';
    });
    
    document.body.appendChild(confirmation);
}

// Navigation Functions
function scrollToProducts() {
    const productsSection = document.getElementById('products');
    window.scrollTo({
        top: productsSection.offsetTop - 80,
        behavior: 'smooth'
    });
}

function scrollToOrderForm() {
    const orderSection = document.getElementById('order');
    window.scrollTo({
        top: orderSection.offsetTop - 80,
        behavior: 'smooth'
    });
}

function openWhatsApp() {
    const message = "Hello Desi Mithas! I'm interested in your premium atta. Please provide more information.";
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, '_blank');
}

function openCustomOrder() {
    selectedProduct = {
        name: "Custom Quantity Desi Mithas Atta",
        price: 0,
        quantity: "Custom",
        deliveryCharge: 0
    };
    
    updateOrderSummary();
    
    // Focus on name field
    document.getElementById('customerName').focus();
    
    // Show custom order note
    showAlert("Please specify your required quantity in the address field. We will contact you with the price.", "info");
}

// Utility Functions
function showAlert(message, type = 'info') {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type}`;
    alertDiv.textContent = message;
    
    // Add styles
    alertDiv.style.position = 'fixed';
    alertDiv.style.top = '20px';
    alertDiv.style.right = '20px';
    alertDiv.style.padding = '1rem 1.5rem';
    alertDiv.style.borderRadius = '10px';
    alertDiv.style.fontWeight = '600';
    alertDiv.style.zIndex = '9999';
    alertDiv.style.maxWidth = '400px';
    alertDiv.style.boxShadow = '0 5px 15px rgba(0,0,0,0.2)';
    alertDiv.style.animation = 'slideIn 0.3s ease';
    
    if (type === 'error') {
        alertDiv.style.background = 'linear-gradient(45deg, #FF6B6B, #FF8E53)';
        alertDiv.style.color = 'white';
        alertDiv.style.borderLeft = '4px solid #FF5252';
    } else if (type === 'info') {
        alertDiv.style.background = 'linear-gradient(45deg, #4ECDC4, #44A08D)';
        alertDiv.style.color = 'white';
        alertDiv.style.borderLeft = '4px solid #26A69A';
    } else {
        alertDiv.style.background = 'linear-gradient(45deg, var(--primary-color), var(--primary-dark))';
        alertDiv.style.color = 'white';
        alertDiv.style.borderLeft = '4px solid var(--primary-dark)';
    }
    
    document.body.appendChild(alertDiv);
    
    // Remove after 5 seconds
    setTimeout(() => {
        alertDiv.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            if (alertDiv.parentNode) {
                alertDiv.parentNode.removeChild(alertDiv);
            }
        }, 300);
    }, 5000);
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
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
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Format price with commas
function formatPrice(price) {
    return 'Rs. ' + price.toLocaleString();
}

// Export functions to global scope
window.orderProduct = orderProduct;
window.selectQuantity = selectQuantity;
window.submitOrder = submitOrder;
window.openWhatsApp = openWhatsApp;
window.openCustomOrder = openCustomOrder;
window.scrollToOrderForm = scrollToOrderForm;
window.scrollToProducts = scrollToProducts;