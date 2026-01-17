// Cart functionality
let cart = JSON.parse(localStorage.getItem('floralCart')) || [];
let quantity = 1;

const products = {
    'tuscan-dawn': {
        id: 'tuscan-dawn',
        name: 'The Tuscan Dawn',
        price: 85.00,
        originalPrice: null,
        reward: 2550,
        image: 'https://images.unsplash.com/photo-1487070183336-b863922373d4?w=600&q=80',
        description: 'A quiet dialogue between light and shadow. Warm ocher and wild rose arrangement.',
        images: [
            'https://images.unsplash.com/photo-1487070183336-b863922373d4?w=600&q=80',
            'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=600&q=80',
            'https://images.unsplash.com/photo-1501226260458-b9a21e1c9fe0?w=600&q=80',
            'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=600&q=80'
        ]
    },
    'wild-meadow': {
        id: 'wild-meadow',
        name: 'Wild Meadow Dream',
        price: 72.00,
        originalPrice: null,
        reward: 2160,
        image: 'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=600&q=80',
        description: 'A celebration of untamed beauty. Field blooms and lavender.',
        images: [
            'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=600&q=80',
            'https://images.unsplash.com/photo-1487070183336-b863922373d4?w=600&q=80',
            'https://images.unsplash.com/photo-1501226260458-b9a21e1c9fe0?w=600&q=80',
            'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=600&q=80'
        ]
    },
    'midnight-peony': {
        id: 'midnight-peony',
        name: 'Midnight Peony',
        price: 95.00,
        originalPrice: null,
        reward: 2850,
        image: 'https://images.unsplash.com/photo-1501226260458-b9a21e1c9fe0?w=600&q=80',
        description: 'Dramatic and bold. Deep magenta peonies and eucalyptus.',
        images: [
            'https://images.unsplash.com/photo-1501226260458-b9a21e1c9fe0?w=600&q=80',
            'https://images.unsplash.com/photo-1487070183336-b863922373d4?w=600&q=80',
            'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=600&q=80',
            'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=600&q=80'
        ]
    },
    'crystal-love': {
        id: 'crystal-love',
        name: 'Crystal Love Frame',
        price: 89.00,
        originalPrice: 162.00,
        reward: 2670,
        image: 'https://images.unsplash.com/photo-1518709594023-6eab9bab7b23?w=600&q=80',
        description: '시들지 않는 하트, 크리스탈 레이어드 장식',
        images: [
            'https://images.unsplash.com/photo-1518709594023-6eab9bab7b23?w=600&q=80',
            'https://images.unsplash.com/photo-1487070183336-b863922373d4?w=600&q=80',
            'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=600&q=80',
            'https://images.unsplash.com/photo-1501226260458-b9a21e1c9fe0?w=600&q=80'
        ]
    },
    'blue-moment': {
        id: 'blue-moment',
        name: 'Blue Moment Hydrangea',
        price: 37.90,
        originalPrice: 59.90,
        reward: 1137,
        image: 'https://images.unsplash.com/photo-1594582285116-b7bbe8d1c9fe?w=600&q=80',
        description: '하늘빛 감성, 블루 모먼트 수국 꽃다발',
        images: [
            'https://images.unsplash.com/photo-1594582285116-b7bbe8d1c9fe?w=600&q=80',
            'https://images.unsplash.com/photo-1487070183336-b863922373d4?w=600&q=80',
            'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=600&q=80',
            'https://images.unsplash.com/photo-1501226260458-b9a21e1c9fe0?w=600&q=80'
        ]
    },
    'bigfish-bouquet': {
        id: 'bigfish-bouquet',
        name: '빅피쉬 꽃다발',
        price: 47.90,
        originalPrice: 68.90,
        reward: 1437,
        image: 'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=600&q=80',
        description: '청춘의 낭만을 담은 감성 꽃다발',
        images: [
            'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=600&q=80',
            'https://images.unsplash.com/photo-1487070183336-b863922373d4?w=600&q=80',
            'https://images.unsplash.com/photo-1501226260458-b9a21e1c9fe0?w=600&q=80',
            'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=600&q=80'
        ]
    }
};

function updateCartCount() {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    const countElements = document.querySelectorAll('#cartCount');
    countElements.forEach(el => {
        if (count > 0) {
            el.textContent = count;
            el.classList.remove('hidden');
        } else {
            el.classList.add('hidden');
        }
    });
}

function addToCart(productId, qty = 1) {
    const product = products[productId];
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity += qty;
    } else {
        cart.push({
            id: productId,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: qty
        });
    }
    
    localStorage.setItem('floralCart', JSON.stringify(cart));
    updateCartCount();
    showNotification(`${product.name}이(가) 장바구니에 추가되었습니다!`);
}

function showNotification(message) {
    const notif = document.createElement('div');
    notif.style.cssText = 'position:fixed;top:100px;right:20px;background:#11d452;color:#fff;padding:1rem 2rem;border-radius:50px;z-index:9999;font-weight:600;box-shadow:0 5px 20px rgba(0,0,0,0.2);animation:slideIn 0.3s ease';
    notif.textContent = message;
    document.body.appendChild(notif);
    setTimeout(() => notif.remove(), 3000);
}

// Main page
if (window.location.pathname.includes('flower.html') || window.location.pathname.endsWith('/')) {
    document.querySelectorAll('.quick-add-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const productId = btn.getAttribute('data-id');
            addToCart(productId);
        });
    });

    document.querySelectorAll('[data-product]').forEach(card => {
        card.addEventListener('click', function(e) {
            if (!e.target.closest('.quick-add-btn')) {
                const productId = this.getAttribute('data-product');
                window.location.href = `detail.html?id=${productId}`;
            }
        });
    });

    document.getElementById('cartBtn')?.addEventListener('click', () => {
        window.location.href = 'cart.html';
    });
}

// Detail page
if (window.location.pathname.includes('detail.html')) {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id') || 'tuscan-dawn';
    const product = products[productId];
    
    if (product) {
        document.getElementById('productTitle').textContent = product.name;
        document.getElementById('productPrice').textContent = `$${product.price.toFixed(2)}`;
        
        if (product.originalPrice) {
            document.getElementById('productOriginalPrice').textContent = `$${product.originalPrice.toFixed(2)}`;
        } else {
            document.getElementById('productOriginalPrice').style.display = 'none';
        }
        
        document.getElementById('productReward').textContent = `적립금 ${product.reward.toLocaleString()}원 (3%)`;
        document.getElementById('productDescription').textContent = product.description;
        
        const mainImage = document.getElementById('mainImage');
        mainImage.style.backgroundImage = `url("${product.images[0]}")`;
        
        document.querySelectorAll('.thumbnail').forEach((thumb, index) => {
            const img = thumb.querySelector('div');
            if (product.images[index]) {
                img.style.backgroundImage = `url("${product.images[index]}")`;
                
                thumb.addEventListener('click', () => {
                    mainImage.style.backgroundImage = `url("${product.images[index]}")`;
                    document.querySelectorAll('.thumbnail').forEach(t => {
                        t.classList.remove('border-primary');
                        t.classList.add('border-transparent');
                    });
                    thumb.classList.remove('border-transparent');
                    thumb.classList.add('border-primary');
                });
            }
        });
        
        // Quantity controls
        document.getElementById('decreaseQty')?.addEventListener('click', () => {
            if (quantity > 1) {
                quantity--;
                document.getElementById('quantity').textContent = quantity;
            }
        });
        
        document.getElementById('increaseQty')?.addEventListener('click', () => {
            quantity++;
            document.getElementById('quantity').textContent = quantity;
        });
        
        document.getElementById('addToCartBtn')?.addEventListener('click', () => {
            addToCart(productId, quantity);
            quantity = 1;
            document.getElementById('quantity').textContent = quantity;
        });
    }
    
    // Size selection
    document.querySelectorAll('.size-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.size-btn').forEach(b => {
                b.classList.remove('bg-primary', 'text-white', 'border-primary');
                b.classList.add('border-soft-black/10');
            });
            this.classList.add('bg-primary', 'text-white', 'border-primary');
            this.classList.remove('border-soft-black/10');
        });
    });
}

// Cart page
if (window.location.pathname.includes('cart.html')) {
    function renderCart() {
        const cartItems = document.getElementById('cartItems');
        if (!cartItems) return;
        
        if (cart.length === 0) {
            cartItems.innerHTML = '<p class="text-gray-500 text-center py-8">장바구니가 비어있습니다</p>';
            document.getElementById('subtotal').textContent = '$0.00';
            document.getElementById('tax').textContent = '$0.00';
            document.getElementById('total').textContent = '$0.00';
            return;
        }
        
        cartItems.innerHTML = cart.map(item => `
            <div class="pt-6 flex gap-4 group">
                <div class="w-24 h-24 bg-cover rounded-lg" style="background-image: url('${item.image}');"></div>
                <div class="flex-1">
                    <div class="flex justify-between items-start">
                        <div>
                            <h3 class="font-medium text-lg">${item.name}</h3>
                            <p class="text-gray-500 text-sm italic">Premium arrangement</p>
                        </div>
                        <button class="text-gray-400 hover:text-red-500 transition-colors" onclick="removeFromCart('${item.id}')">
                            <span class="material-symbols-outlined text-sm">close</span>
                        </button>
                    </div>
                    <div class="flex items-center justify-between mt-4">
                        <div class="flex items-center gap-4 bg-white border px-3 py-1.5 rounded-full">
                            <button onclick="updateQuantity('${item.id}', -1)" class="text-gray-400 hover:text-primary">
                                <span class="material-symbols-outlined text-sm">remove</span>
                            </button>
                            <span class="text-sm font-semibold w-4 text-center">${item.quantity}</span>
                            <button onclick="updateQuantity('${item.id}', 1)" class="text-gray-400 hover:text-primary">
                                <span class="material-symbols-outlined text-sm">add</span>
                            </button>
                        </div>
                        <p class="font-bold text-lg">$${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                </div>
            </div>
        `).join('');
        
        const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const tax = subtotal * 0.08;
        const total = subtotal + tax;
        
        document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
        document.getElementById('tax').textContent = `$${tax.toFixed(2)}`;
        document.getElementById('total').textContent = `$${total.toFixed(2)}`;
    }
    
    window.removeFromCart = function(productId) {
        cart = cart.filter(item => item.id !== productId);
        localStorage.setItem('floralCart', JSON.stringify(cart));
        updateCartCount();
        renderCart();
    };
    
    window.updateQuantity = function(productId, change) {
        const item = cart.find(i => i.id === productId);
        if (item) {
            item.quantity += change;
            if (item.quantity <= 0) {
                removeFromCart(productId);
            } else {
                localStorage.setItem('floralCart', JSON.stringify(cart));
                updateCartCount();
                renderCart();
            }
        }
    };
    
    renderCart();
}

// Add animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(400px); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
`;
document.head.appendChild(style);

updateCartCount();
console.log('Floral Boutique website loaded successfully!');
