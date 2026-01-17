// 장바구니 기능
let cart = JSON.parse(localStorage.getItem('floralCart')) || [];
let quantity = 1;

const products = {
    'spring-peony': {
        id: 'spring-peony',
        name: '봄날의 작약 꽃다발',
        price: 89000,
        originalPrice: 162000,
        reward: 2670,
        image: 'https://images.unsplash.com/photo-1518709594023-6eab9bab7b23?w=600&q=80',
        description: '은은한 핑크빛이 아름다운 작약 꽃다발입니다. 봄의 따스함을 담았습니다.',
        images: [
            'https://images.unsplash.com/photo-1518709594023-6eab9bab7b23?w=600&q=80',
            'https://images.unsplash.com/photo-1487070183336-b863922373d4?w=600&q=80',
            'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=600&q=80',
            'https://images.unsplash.com/photo-1501226260458-b9a21e1c9fe0?w=600&q=80'
        ]
    },
    'blue-hydrangea': {
        id: 'blue-hydrangea',
        name: '하늘빛 수국 꽃다발',
        price: 37900,
        originalPrice: 59900,
        reward: 1137,
        image: 'https://images.unsplash.com/photo-1594582285116-b7bbe8d1c9fe?w=600&q=80',
        description: '맑은 하늘빛을 닮은 블루 수국 꽃다발입니다. 고요한 위로를 전합니다.',
        images: [
            'https://images.unsplash.com/photo-1594582285116-b7bbe8d1c9fe?w=600&q=80',
            'https://images.unsplash.com/photo-1487070183336-b863922373d4?w=600&q=80',
            'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=600&q=80',
            'https://images.unsplash.com/photo-1501226260458-b9a21e1c9fe0?w=600&q=80'
        ]
    },
    'rose-box': {
        id: 'rose-box',
        name: '영원한 로즈 하트',
        price: 25900,
        originalPrice: 42000,
        reward: 777,
        image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&q=80',
        description: '시들지 않는 특수 가공된 장미로 만든 하트 모양 꽃박스입니다.',
        images: [
            'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&q=80',
            'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=600&q=80',
            'https://images.unsplash.com/photo-1487070183336-b863922373d4?w=600&q=80',
            'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=600&q=80'
        ]
    },
    'cherry-bouquet': {
        id: 'cherry-bouquet',
        name: '체리블라썸 꽃다발',
        price: 47900,
        originalPrice: 68900,
        reward: 1437,
        image: 'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=600&q=80',
        description: '봄날의 로맨틱한 무드를 담은 체리블라썸 꽃다발입니다.',
        images: [
            'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=600&q=80',
            'https://images.unsplash.com/photo-1487070183336-b863922373d4?w=600&q=80',
            'https://images.unsplash.com/photo-1501226260458-b9a21e1c9fe0?w=600&q=80',
            'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=600&q=80'
        ]
    },
    'red-rose': {
        id: 'red-rose',
        name: '로얄 레드 장미',
        price: 37900,
        originalPrice: 59900,
        reward: 1137,
        image: 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=600&q=80',
        description: '고급스러운 붉은 장미 꽃다발입니다. 특별한 날에 선물하세요.',
        images: [
            'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=600&q=80',
            'https://images.unsplash.com/photo-1487070183336-b863922373d4?w=600&q=80',
            'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=600&q=80',
            'https://images.unsplash.com/photo-1501226260458-b9a21e1c9fe0?w=600&q=80'
        ]
    },
    'pink-dream': {
        id: 'pink-dream',
        name: '핑크 드림 꽃다발',
        price: 49900,
        originalPrice: 60000,
        reward: 1497,
        image: 'https://images.unsplash.com/photo-1487070183336-b863922373d4?w=600&q=80',
        description: '로맨틱한 핑크빛 무드의 꽃다발입니다.',
        images: [
            'https://images.unsplash.com/photo-1487070183336-b863922373d4?w=600&q=80',
            'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=600&q=80',
            'https://images.unsplash.com/photo-1501226260458-b9a21e1c9fe0?w=600&q=80',
            'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=600&q=80'
        ]
    },
    'money-tree': {
        id: 'money-tree',
        name: '금전수 디럭스',
        price: 40900,
        originalPrice: 55000,
        reward: 1227,
        image: 'https://images.unsplash.com/photo-1459156212016-c812468e2115?w=600&q=80',
        description: '재물운을 부르는 금전수 디럭스 화분입니다.',
        images: [
            'https://images.unsplash.com/photo-1459156212016-c812468e2115?w=600&q=80',
            'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=600&q=80',
            'https://images.unsplash.com/photo-1509423350716-97f9360b4e09?w=600&q=80',
            'https://images.unsplash.com/photo-1487070183336-b863922373d4?w=600&q=80'
        ]
    },
    'white-wedding': {
        id: 'white-wedding',
        name: '순백의 웨딩 부케',
        price: 86900,
        originalPrice: 130000,
        reward: 2607,
        image: 'https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?w=600&q=80',
        description: '순수한 마음을 전하는 순백의 웨딩 부케입니다.',
        images: [
            'https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?w=600&q=80',
            'https://images.unsplash.com/photo-1487070183336-b863922373d4?w=600&q=80',
            'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=600&q=80',
            'https://images.unsplash.com/photo-1501226260458-b9a21e1c9fe0?w=600&q=80'
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
    notif.style.cssText = 'position:fixed;top:100px;right:20px;background:#2d5f3f;color:#fff;padding:1rem 2rem;border-radius:50px;z-index:9999;font-weight:600;box-shadow:0 5px 20px rgba(0,0,0,0.3);animation:slideIn 0.3s ease';
    notif.textContent = message;
    document.body.appendChild(notif);
    setTimeout(() => notif.remove(), 3000);
}

// 메인 페이지
if (window.location.pathname.includes('flower.html') || window.location.pathname.endsWith('/') || window.location.pathname.endsWith('/신사업/')) {
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

// 상세 페이지
if (window.location.pathname.includes('detail.html')) {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id') || 'spring-peony';
    const product = products[productId];
    
    if (product) {
        document.getElementById('productTitle').textContent = product.name;
        document.getElementById('productPrice').textContent = `${product.price.toLocaleString()}원`;
        
        if (product.originalPrice) {
            document.getElementById('productOriginalPrice').textContent = `${product.originalPrice.toLocaleString()}원`;
        } else {
            document.getElementById('productOriginalPrice').style.display = 'none';
        }
        
        document.getElementById('productReward').textContent = `${product.reward.toLocaleString()}원 적립 (3%)`;
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
        
        // 수량 조절
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
    
    // 사이즈 선택
    document.querySelectorAll('.size-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.size-btn').forEach(b => {
                b.classList.remove('bg-primary', 'text-white', 'border-primary');
                b.classList.add('border-gray-200');
            });
            this.classList.add('bg-primary', 'text-white', 'border-primary');
            this.classList.remove('border-gray-200');
        });
    });
}

// 장바구니 페이지
if (window.location.pathname.includes('cart.html')) {
    function renderCart() {
        const cartItems = document.getElementById('cartItems');
        if (!cartItems) return;
        
        if (cart.length === 0) {
            cartItems.innerHTML = '<p class="text-gray-500 text-center py-8">장바구니가 비어있습니다</p>';
            document.getElementById('subtotal').textContent = '0원';
            document.getElementById('tax').textContent = '0원';
            document.getElementById('total').textContent = '0원';
            return;
        }
        
        cartItems.innerHTML = cart.map(item => `
            <div class="pt-6 flex gap-4 group">
                <div class="w-24 h-24 bg-cover rounded-lg shadow-md" style="background-image: url('${item.image}');"></div>
                <div class="flex-1">
                    <div class="flex justify-between items-start">
                        <div>
                            <h3 class="font-medium text-lg">${item.name}</h3>
                            <p class="text-gray-500 text-sm italic">프리미엄 구성</p>
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
                        <p class="font-bold text-lg">${(item.price * item.quantity).toLocaleString()}원</p>
                    </div>
                </div>
            </div>
        `).join('');
        
        const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const tax = Math.floor(subtotal * 0.1);
        const total = subtotal + tax;
        
        document.getElementById('subtotal').textContent = `${subtotal.toLocaleString()}원`;
        document.getElementById('tax').textContent = `${tax.toLocaleString()}원`;
        document.getElementById('total').textContent = `${total.toLocaleString()}원`;
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

// 애니메이션 추가
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(400px); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
`;
document.head.appendChild(style);

updateCartCount();
console.log('꽃보라가든 웹사이트 로드 완료!');
