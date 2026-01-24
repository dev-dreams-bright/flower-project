// ============================================
// 꽃보라가든 - 백엔드 통합 버전
// ============================================

// 장바구니 기능 (서버 저장)
let cart = [];
let quantity = 1;
let currentUser = null;
const PRODUCTION_API_BASE = 'https://flower-backend-api-g0fuavb9b3gxhqgm.koreacentral-01.azurewebsites.net/api';
const API_BASE = window.API_BASE_URL
    || (window.location.origin === 'null'
        ? 'http://localhost:3001/api'
        : (window.location.hostname.endsWith('azurestaticapps.net')
            ? PRODUCTION_API_BASE
            : `${window.location.origin}/api`));

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

// ============================================
// 인증 시스템
// ============================================

// 현재 사용자 확인
async function checkAuth() {
    if (typeof supabase === 'undefined') {
        console.log('⏳ Supabase 로딩 중...');
        return null;
    }
    
    const { data: { user } } = await supabase.auth.getUser();
    currentUser = user;
    
    if (user) {
        console.log('✅ 로그인됨:', user.email);
        updateUIForLoggedInUser(user);
    } else {
        console.log('❌ 비로그인 상태');
    }
    
    return user;
}

async function getAccessToken() {
    const { data: { session } } = await supabase.auth.getSession();
    return session?.access_token || null;
}

async function apiRequest(path, options = {}) {
    const token = await getAccessToken();
    const headers = {
        'Content-Type': 'application/json',
        ...(options.headers || {})
    };
    if (token) headers.Authorization = `Bearer ${token}`;
    const response = await fetch(`${API_BASE}${path}`, {
        ...options,
        headers
    });
    if (!response.ok) {
        let message = '요청에 실패했습니다';
        try {
            const errorData = await response.json();
            message = errorData?.message || message;
        } catch (error) {
            message = response.statusText || message;
        }
        throw new Error(message);
    }
    if (response.status === 204) return null;
    return response.json();
}

function normalizeCartItems(items) {
    if (!Array.isArray(items)) return [];
    return items.map(item => ({
        id: item.product_id,
        name: item.product_name,
        price: item.product_price,
        image: item.product_image,
        quantity: item.quantity,
        size: item.size || null
    }));
}

async function loadCartFromServer({ silent = false } = {}) {
    try {
        const user = await checkAuth();
        if (!user) {
            cart = [];
            updateCartCount();
            return;
        }
        const data = await apiRequest('/cart');
        cart = normalizeCartItems(data?.items || data);
        updateCartCount();
    } catch (error) {
        if (!silent) {
            console.error('장바구니 로드 실패:', error);
        }
    }
}

// 로그인 상태에 따라 UI 업데이트
function updateUIForLoggedInUser(user) {
    // 로그인 버튼을 사용자 이름으로 변경
    const loginButtons = document.querySelectorAll('a[href="login.html"]');
    loginButtons.forEach(btn => {
        const userName = user.user_metadata?.name || user.email.split('@')[0];
        btn.textContent = `👤 ${userName}`;
        btn.href = 'dashboard.html';
    });
}

// 로그아웃
async function logout() {
    const { error } = await supabase.auth.signOut();
    if (!error) {
        showNotification('로그아웃 되었습니다');
        setTimeout(() => {
            window.location.href = 'flower.html';
        }, 1000);
    }
}

// ============================================
// 장바구니 기능
// ============================================

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

    (async () => {
        const user = await checkAuth();
        if (!user) {
            showNotification('⚠️ 로그인이 필요합니다');
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 1500);
            return;
        }

        await apiRequest('/cart', {
            method: 'POST',
            body: JSON.stringify({
                productId,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: qty
            })
        });

        await loadCartFromServer({ silent: true });
        showNotification(`${product.name}이(가) 장바구니에 추가되었습니다!`);
    })().catch(error => {
        console.error('장바구니 추가 에러:', error);
        showNotification('❌ 장바구니에 추가할 수 없습니다');
    });
}

function showNotification(message) {
    const notif = document.createElement('div');
    notif.style.cssText = 'position:fixed;top:100px;right:20px;background:#2d5f3f;color:#fff;padding:1rem 2rem;border-radius:50px;z-index:9999;font-weight:600;box-shadow:0 5px 20px rgba(0,0,0,0.3);animation:slideIn 0.3s ease';
    notif.textContent = message;
    document.body.appendChild(notif);
    setTimeout(() => notif.remove(), 3000);
}

// ============================================
// 주문 생성 (DB 저장)
// ============================================

async function createOrder(orderData) {
    try {
        // 로그인 확인
        const user = await checkAuth();
        if (!user) {
            showNotification('⚠️ 로그인이 필요합니다');
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 1500);
            return;
        }
        
        // 서버에서 주문 생성 및 저장
        const order = await apiRequest('/orders', {
            method: 'POST',
            body: JSON.stringify({
                name: orderData.name,
                phone: orderData.phone,
                address: orderData.address,
                message: orderData.message || null,
                paymentMethod: orderData.paymentMethod
            })
        });

        // 장바구니 새로고침
        await loadCartFromServer({ silent: true });

        return order;
        
    } catch (error) {
        console.error('주문 생성 에러:', error);
        throw error;
    }
}

// ============================================
// 마이페이지 데이터 로드
// ============================================

async function loadDashboardData() {
    try {
        const user = await checkAuth();
        if (!user) {
            window.location.href = 'login.html';
            return;
        }
        
        // 사용자 정보 표시
        const userName = user.user_metadata?.name || user.email.split('@')[0];
        const userNameEl = document.getElementById('userName');
        if (userNameEl) userNameEl.textContent = userName;
        
        const dashboard = await apiRequest('/dashboard');
        const totalPoints = dashboard?.totalPoints || 0;
        const orders = dashboard?.orders || [];
        const subscriptions = dashboard?.subscriptions || [];

        const userPointsEl = document.getElementById('userPoints');
        if (userPointsEl) userPointsEl.textContent = `${totalPoints.toLocaleString()}원`;

        // 통계 업데이트
        const totalOrders = orders?.length || 0;
        const totalSpent = orders?.reduce((sum, o) => sum + o.total_amount, 0) || 0;

        const activeSubscriptions = subscriptions?.length || 0;
        
        // UI 업데이트
        const totalOrdersEl = document.querySelector('[data-stat="orders"]');
        if (totalOrdersEl) totalOrdersEl.textContent = totalOrders;
        
        const totalSpentEl = document.querySelector('[data-stat="spent"]');
        if (totalSpentEl) totalSpentEl.textContent = `${totalSpent.toLocaleString()}원`;
        
        const subscriptionsEl = document.querySelector('[data-stat="subscriptions"]');
        if (subscriptionsEl) subscriptionsEl.textContent = activeSubscriptions;
        
        // 주문 목록 렌더링
        renderOrderList(orders);
        
    } catch (error) {
        console.error('대시보드 로드 에러:', error);
        showNotification('❌ 데이터를 불러오는데 실패했습니다');
    }
}

function renderOrderList(orders) {
    const orderListEl = document.getElementById('orderList');
    if (!orderListEl || !orders || orders.length === 0) {
        if (orderListEl) {
            orderListEl.innerHTML = '<p class="text-gray-500 text-center py-8">주문 내역이 없습니다</p>';
        }
        return;
    }
    
    const statusEmoji = {
        'pending': '⏳',
        'confirmed': '✅',
        'shipped': '🚚',
        'delivered': '📦',
        'cancelled': '❌'
    };
    
    const statusText = {
        'pending': '주문접수',
        'confirmed': '주문확인',
        'shipped': '배송중',
        'delivered': '배송완료',
        'cancelled': '취소됨'
    };
    
    orderListEl.innerHTML = orders.map(order => {
        const itemCount = order.order_items?.length || 0;
        const firstItem = order.order_items?.[0]?.product_name || '상품';
        const displayName = itemCount > 1 ? `${firstItem} 외 ${itemCount - 1}건` : firstItem;
        
        return `
            <div class="bg-white p-6 rounded-xl border hover:shadow-md transition-shadow">
                <div class="flex justify-between items-start mb-4">
                    <div>
                        <h3 class="font-bold text-lg">${displayName}</h3>
                        <p class="text-sm text-gray-500">${new Date(order.created_at).toLocaleDateString('ko-KR')}</p>
                    </div>
                    <span class="px-3 py-1 rounded-full text-sm font-semibold ${
                        order.status === 'delivered' ? 'bg-green-100 text-green-700' : 
                        order.status === 'cancelled' ? 'bg-red-100 text-red-700' : 
                        'bg-blue-100 text-blue-700'
                    }">
                        ${statusEmoji[order.status]} ${statusText[order.status]}
                    </span>
                </div>
                <div class="flex justify-between items-center pt-4 border-t">
                    <p class="text-gray-600">총 ${itemCount}개 상품</p>
                    <p class="font-bold text-xl text-primary">${order.total_amount.toLocaleString()}원</p>
                </div>
            </div>
        `;
    }).join('');
}

// ============================================
// 메인 페이지
// ============================================

if (window.location.pathname.includes('flower.html') || window.location.pathname.endsWith('/') || window.location.pathname.endsWith('/신사업/')) {
    // 로그인 체크
    setTimeout(() => {
        checkAuth();
        loadCartFromServer({ silent: true });
    }, 500);
    
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

// ============================================
// 상세 페이지
// ============================================

if (window.location.pathname.includes('detail.html')) {
    // 로그인 체크
    setTimeout(() => {
        checkAuth();
        loadCartFromServer({ silent: true });
    }, 500);
    
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

// ============================================
// 장바구니 페이지
// ============================================

if (window.location.pathname.includes('cart.html')) {
    // 로그인 체크
    setTimeout(() => {
        checkAuth();
    }, 500);

    async function renderCart() {
        const cartItems = document.getElementById('cartItems');
        if (!cartItems) return;

        await loadCartFromServer({ silent: true });

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
                            ✕
                        </button>
                    </div>
                    <div class="flex items-center justify-between mt-4">
                        <div class="flex items-center gap-4 bg-white border px-3 py-1.5 rounded-full">
                            <button onclick="updateQuantity('${item.id}', -1)" class="text-gray-400 hover:text-primary">
                                −
                            </button>
                            <span class="text-sm font-semibold w-4 text-center">${item.quantity}</span>
                            <button onclick="updateQuantity('${item.id}', 1)" class="text-gray-400 hover:text-primary">
                                +
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
        (async () => {
            await apiRequest(`/cart/${productId}`, { method: 'DELETE' });
            await loadCartFromServer({ silent: true });
            renderCart();
        })().catch(error => {
            console.error('장바구니 삭제 에러:', error);
            showNotification('❌ 장바구니에서 삭제할 수 없습니다');
        });
    };
    
    window.updateQuantity = function(productId, change) {
        (async () => {
            const item = cart.find(i => i.id === productId);
            if (!item) return;

            const newQuantity = item.quantity + change;
            if (newQuantity <= 0) {
                await apiRequest(`/cart/${productId}`, { method: 'DELETE' });
            } else {
                await apiRequest('/cart', {
                    method: 'PUT',
                    body: JSON.stringify({
                        productId,
                        quantity: newQuantity
                    })
                });
            }
            await loadCartFromServer({ silent: true });
            renderCart();
        })().catch(error => {
            console.error('수량 변경 에러:', error);
            showNotification('❌ 수량 변경에 실패했습니다');
        });
    };
    
    // 결제하기 버튼
    window.handleCheckout = async function() {
        if (cart.length === 0) {
            showNotification('⚠️ 장바구니가 비어있습니다');
            return;
        }
        
        // 로그인 확인
        const user = await checkAuth();
        if (!user) {
            showNotification('⚠️ 로그인이 필요합니다');
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 1500);
            return;
        }
        
        // 폼 데이터 가져오기
        const name = document.getElementById('recipientName')?.value?.trim();
        const address = document.getElementById('address')?.value?.trim();
        const city = document.getElementById('city')?.value?.trim();
        const postalCode = document.getElementById('postalCode')?.value?.trim();
        const phone = document.getElementById('phone')?.value?.trim();
        const message = document.getElementById('message')?.value?.trim();
        const paymentMethod = document.getElementById('paymentMethod')?.value;
        
        // 필수 필드 검증
        if (!name) {
            showNotification('⚠️ 받는 분 성함을 입력해주세요');
            document.getElementById('recipientName')?.focus();
            return;
        }
        if (!address) {
            showNotification('⚠️ 배송 주소를 입력해주세요');
            document.getElementById('address')?.focus();
            return;
        }
        if (!city) {
            showNotification('⚠️ 시/도를 입력해주세요');
            document.getElementById('city')?.focus();
            return;
        }
        if (!postalCode) {
            showNotification('⚠️ 우편번호를 입력해주세요');
            document.getElementById('postalCode')?.focus();
            return;
        }
        if (!phone) {
            showNotification('⚠️ 연락처를 입력해주세요');
            document.getElementById('phone')?.focus();
            return;
        }
        if (!paymentMethod) {
            showNotification('⚠️ 결제 방법을 선택해주세요');
            document.getElementById('paymentMethod')?.focus();
            return;
        }
        
        // 결제 확인
        const total = cart.reduce((sum, item) => sum + (item.product_price * item.quantity), 0);
        const paymentMethodName = {
            'card': '신용/체크카드',
            'transfer': '계좌이체',
            'vbank': '가상계좌',
            'phone': '휴대폰 결제'
        }[paymentMethod];
        
        const confirmMessage = `${paymentMethodName}(으)로 ${total.toLocaleString()}원을 결제하시겠습니까?`;
        if (!confirm(confirmMessage)) {
            return;
        }
        
        try {
            showNotification('⏳ 주문 및 결제 처리 중...');
            
            const fullAddress = `${address}, ${city} ${postalCode}`;
            
            const order = await createOrder({
                name,
                phone,
                address: fullAddress,
                message: message || null,
                paymentMethod
            });
            
            showNotification('✅ 주문 및 결제가 완료되었습니다!');
            
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 2000);
            
        } catch (error) {
            console.error('결제 에러:', error);
            showNotification('❌ 주문 처리 중 오류가 발생했습니다');
        }
    };
    
    renderCart();
}

// ============================================
// 대시보드 페이지
// ============================================

if (window.location.pathname.includes('dashboard.html')) {
    // 페이지 로드 시 데이터 불러오기
    setTimeout(() => {
        loadDashboardData();
    }, 500);
    
    // 로그아웃 버튼
    window.handleLogout = logout;
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
console.log('✅ 꽃보라가든 웹사이트 (백엔드 통합) 로드 완료!');
