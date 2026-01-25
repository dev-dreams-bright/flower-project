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
console.log('🔗 API_BASE:', API_BASE);

// DB에서 상품 로드
let products = {};
let productsArray = [];

function normalizeProduct(product) {
    return {
        id: product.product_id,
        name: product.name,
        price: product.price,
        originalPrice: product.original_price,
        reward: Math.floor(product.price * 0.03),
        image: (Array.isArray(product.images) && product.images[0]) || 'https://via.placeholder.com/400',
        description: product.description,
        images: Array.isArray(product.images) ? product.images : [],
        stock: product.stock,
        category: product.category
    };
}

async function loadProductsFromSupabase() {
    const supabaseClient = window.supabase;
    if (!supabaseClient || typeof supabaseClient.from !== 'function') {
        console.warn('⚠️ Supabase 클라이언트가 준비되지 않았습니다.');
        return false;
    }
    try {
        const { data, error: sbError } = await supabaseClient
            .from('products')
            .select('*')
            .eq('is_active', true)
            .order('created_at', { ascending: false });
        if (sbError || !Array.isArray(data)) {
            console.error('Supabase 상품 로드 실패:', sbError);
            return false;
        }
        productsArray = data;
        const loadedProducts = {};
        data.forEach(product => {
            loadedProducts[product.product_id] = normalizeProduct(product);
        });
        products = loadedProducts;
        if (window.location.pathname.includes('flower.html') || 
            window.location.pathname.includes('index.html') || 
            window.location.pathname.endsWith('/')) {
            renderAllProductsGrid();
            setupMainPageEvents();
        }
        return true;
    } catch (sbFallbackError) {
        console.error('Supabase 상품 로드 실패:', sbFallbackError);
        return false;
    }
}

// 상품 데이터 로드 함수
async function loadProductsFromDB() {
    try {
        // 타임아웃 5초 설정 (백엔드 다운 시 빠른 폴백)
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);
        
        const response = await fetch(`${API_BASE}/products`, {
            signal: controller.signal,
            headers: { 'Content-Type': 'application/json' }
        });
        clearTimeout(timeoutId);
        
        if (!response.ok) throw new Error('상품 로드 실패');
        
        productsArray = await response.json();
        console.log('📦 productsArray:', productsArray);
        if (!Array.isArray(productsArray) || productsArray.length === 0) {
            console.warn('⚠️ API 응답이 비어있습니다. Supabase 폴백을 시도합니다.');
            const fallbackLoaded = await loadProductsFromSupabase();
            return fallbackLoaded;
        }
        
        // products 객체로 변환 (기존 코드 호환성)
        const loadedProducts = {};
        productsArray.forEach(product => {
            loadedProducts[product.product_id] = normalizeProduct(product);
        });
        products = loadedProducts;
        console.log('🧩 products map:', products);
        
        console.log(`✅ DB에서 ${productsArray.length}개 상품 로드 완료`);
        
        // 메인 페이지라면 상품 카드 다시 렌더링 및 이벤트 재설정
        if (window.location.pathname.includes('flower.html') || 
            window.location.pathname.includes('index.html') || 
            window.location.pathname.endsWith('/')) {
            renderAllProductsGrid();
            setupMainPageEvents(); // 이벤트 리스너 재설정
        }
        
        return true;
    } catch (error) {
        console.error('상품 로드 에러:', error.name === 'AbortError' ? '백엔드 타임아웃 (5초 초과)' : error);
        // 실패 시 Supabase 직접 조회 폴백 (실제 데이터만)
        console.log('🔄 Supabase 직접 연결로 폴백...');
        const fallbackLoaded = await loadProductsFromSupabase();
        if (fallbackLoaded) {
            console.log('✅ Supabase 폴백 성공!');
            return true;
        }
        // 실패 시 빈 목록 유지
        console.error('❌ 모든 상품 로드 방법 실패');
        products = {};
        productsArray = [];
        return false;
    }
}

async function loadProductById(productId) {
    try {
        const response = await fetch(`${API_BASE}/products/${productId}`);
        if (!response.ok) throw new Error('상품 조회 실패');
        const product = await response.json();
        const normalized = normalizeProduct(product);
        products[normalized.id] = normalized;
        return normalized;
    } catch (error) {
        console.error('상품 단건 조회 실패:', error);
        if (typeof supabase !== 'undefined') {
            const { data, error: sbError } = await supabase
                .from('products')
                .select('*')
                .eq('product_id', productId)
                .eq('is_active', true)
                .maybeSingle();
            if (!sbError && data) {
                const normalized = normalizeProduct(data);
                products[normalized.id] = normalized;
                return normalized;
            }
        }
        return null;
    }
}

// 임시 products 객체 (DB 로드 전 폴백용)
const productsLegacy = {
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

const subscriptionPlans = {
    small: { name: '스몰 플랜', price: 18900 },
    medium: { name: '미디엄 플랜', price: 27900 },
    large: { name: '라지 플랜', price: 36900 }
};

// 상품 카드 렌더링 함수
function renderAllProductsGrid() {
    const grid = document.getElementById('productGrid');
    const emptyState = document.getElementById('productEmpty');
    
    console.log('🎨 renderAllProductsGrid 호출됨');
    console.log('   - grid 존재:', !!grid);
    console.log('   - productsArray 길이:', productsArray.length);
    
    if (!grid) {
        console.error('❌ productGrid 요소를 찾을 수 없습니다');
        return;
    }
    
    if (!Array.isArray(productsArray) || productsArray.length === 0) {
        console.warn('⚠️ 렌더링할 상품이 없습니다');
        grid.innerHTML = '';
        if (emptyState) emptyState.classList.remove('hidden');
        return;
    }
    
    if (emptyState) emptyState.classList.add('hidden');
    
    console.log('✅ 상품 렌더링 시작:', productsArray.length, '개');
    
    grid.innerHTML = productsArray.map(product => {
        const image = (Array.isArray(product.images) && product.images[0]) || product.image || 'https://via.placeholder.com/400';
        const originalPrice = product.original_price;
        const reward = Math.floor(product.price * 0.03);
        const isSoldOut = (product.stock ?? 0) <= 0;
        return `
            <div class="group cursor-pointer" data-product="${product.product_id}">
                <div class="relative w-full aspect-[3/4] overflow-hidden rounded-2xl bg-cream shadow-lg">
                    <div class="w-full h-full bg-center bg-cover group-hover:scale-110 transition-transform duration-700" style='background-image: url("${image}")'></div>
                    <button class="absolute top-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity bg-black/30 rounded-full p-2 hover:bg-black/50">
                        <span class="material-symbols-outlined">favorite_border</span>
                    </button>
                    ${isSoldOut ? `<span class="absolute top-4 left-4 bg-gray-800 text-white px-4 py-2 rounded-full text-xs font-bold">품절</span>` : ''}
                    <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                        <button class="bg-white text-primary px-8 py-3 rounded-full font-bold quick-add-btn hover:bg-primary hover:text-white transition-colors" data-id="${product.product_id}" ${isSoldOut ? 'disabled' : ''}>장바구니 담기</button>
                    </div>
                </div>
                <div class="mt-4">
                    <h3 class="text-lg font-bold">${product.name}</h3>
                    <p class="text-muted-sage text-sm">${product.description || ''}</p>
                    <div class="flex items-center gap-2 mt-2">
                        <p class="text-primary font-bold text-xl">${product.price.toLocaleString()}원</p>
                        ${originalPrice ? `<span class="text-gray-400 line-through text-sm">${originalPrice.toLocaleString()}원</span>` : ''}
                    </div>
                    <div class="flex items-center gap-1 text-xs text-primary mt-2">
                        <span class="material-symbols-outlined text-sm">stars</span>
                        <span>${reward.toLocaleString()}원 적립 (3%)</span>
                    </div>
                </div>
            </div>
        `;
    }).join('');
    
    console.log('✅ 상품 렌더링 완료');
}

function getProductById(productId) {
    return products[productId] || null;
}

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
        size: item.size || null,
        ribbonMessage: item.ribbon_message || null,
        addOns: item.add_ons || []
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

function addToCart(productId, qty = 1, options = {}) {
    const product = getProductById(productId);
    if (!product) {
        showNotification('❌ 상품 정보를 찾을 수 없습니다');
        return;
    }
    if ((product.stock ?? 0) <= 0) {
        showNotification('⚠️ 품절된 상품입니다');
        return;
    }

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
                quantity: qty,
                size: options.size || null,
                ribbonMessage: options.ribbonMessage || null,
                addOns: Array.isArray(options.addOns) ? options.addOns : []
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
                paymentMethod: orderData.paymentMethod,
                deliveryDate: orderData.deliveryDate || null,
                deliveryTimeSlot: orderData.deliveryTimeSlot || null,
                ordererName: orderData.ordererName || null,
                ordererPhone: orderData.ordererPhone || null
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
        const userRole = dashboard?.role || 'customer';
        const orders = dashboard?.orders || [];
        const subscriptions = dashboard?.subscriptions || [];

        // 역할 기반 링크 표시
        if (userRole === 'seller' || userRole === 'admin') {
            const sellerLink = document.getElementById('sellerLink');
            if (sellerLink) sellerLink.classList.remove('hidden');
        }
        if (userRole === 'admin') {
            const adminLink = document.getElementById('adminLink');
            if (adminLink) adminLink.classList.remove('hidden');
        }

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
        'preparing': '🛠️',
        'shipping': '🚚',
        'delivered': '📦',
        'cancelled': '❌'
    };
    
    const statusText = {
        'preparing': '제작중',
        'shipping': '배송중',
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
                        ${statusEmoji[order.status] || '🛠️'} ${statusText[order.status] || '제작중'}
                    </span>
                </div>
                <div class="flex justify-between items-center pt-4 border-t">
                    <p class="text-gray-600">총 ${itemCount}개 상품</p>
                    <p class="font-bold text-xl text-primary">${order.total_amount.toLocaleString()}원</p>
                </div>
                <div class="mt-4 flex gap-2">
                    <a href="tracking.html?order=${order.order_number}" class="px-3 py-2 text-xs bg-gray-100 rounded-lg hover:bg-gray-200">배송 추적</a>
                    <button onclick="reorderOrder('${order.id}')" class="px-3 py-2 text-xs bg-primary/10 text-primary rounded-lg hover:bg-primary/20">재주문</button>
                    ${order.status === 'preparing' ? `<button onclick="cancelOrder('${order.id}')" class="px-3 py-2 text-xs bg-red-50 text-red-600 rounded-lg hover:bg-red-100">주문 취소</button>` : ''}
                </div>
            </div>
        `;
    }).join('');
}

window.reorderOrder = async function(orderId) {
    try {
        await apiRequest(`/orders/${orderId}/reorder`, { method: 'POST' });
        showNotification('✅ 장바구니에 담았습니다');
        setTimeout(() => window.location.href = 'cart.html', 800);
    } catch (error) {
        console.error('재주문 실패:', error);
        showNotification('❌ 재주문에 실패했습니다');
    }
};

window.cancelOrder = async function(orderId) {
    try {
        await apiRequest(`/orders/${orderId}/cancel`, { method: 'POST' });
        showNotification('✅ 취소 요청이 접수되었습니다');
        setTimeout(() => window.location.href = 'dashboard.html', 600);
    } catch (error) {
        console.error('취소 실패:', error);
        showNotification('❌ 취소에 실패했습니다');
    }
};

// ============================================
// 메인 페이지
// ============================================

// 메인 페이지 이벤트 설정 함수
function setupMainPageEvents() {
    console.log('🔧 메인 페이지 이벤트 리스너 설정 중...');
    
    // 장바구니 빠른 추가 버튼
    document.querySelectorAll('.quick-add-btn').forEach(btn => {
        btn.removeEventListener('click', handleQuickAdd); // 중복 방지
        btn.addEventListener('click', handleQuickAdd);
    });

    // 상품 카드 클릭 (상세 페이지 이동)
    document.querySelectorAll('[data-product]').forEach(card => {
        card.style.cursor = 'pointer';
        card.removeEventListener('click', handleProductClick); // 중복 방지
        card.addEventListener('click', handleProductClick);
    });

    // 장바구니 버튼
    const cartBtn = document.getElementById('cartBtn');
    if (cartBtn) {
        cartBtn.removeEventListener('click', goToCart);
        cartBtn.addEventListener('click', goToCart);
    }
    
    console.log('✅ 이벤트 리스너 설정 완료');
}

// 이벤트 핸들러 함수들
function handleQuickAdd(e) {
    e.stopPropagation();
    e.preventDefault();
    const productId = this.getAttribute('data-id');
    console.log('장바구니 추가:', productId);
    addToCart(productId, 1, { size: 'medium', ribbonMessage: null, addOns: [] });
}

function handleProductClick(e) {
    if (e.target.closest('.quick-add-btn') || e.target.closest('button')) {
        return; // 버튼 클릭 시 무시
    }
    const productId = this.getAttribute('data-product');
    console.log('상품 상세 이동:', productId);
    if (window.location.hostname.endsWith('azurestaticapps.net')) {
        window.location.href = `/product/${productId}`;
    } else {
        window.location.href = `detail.html?id=${productId}`;
    }
}

function goToCart() {
    window.location.href = 'cart.html';
}

// 메인 페이지 초기화
const productGrid = document.getElementById('productGrid');
if (productGrid || window.location.pathname.includes('flower.html') || 
    window.location.pathname.includes('index.html') || 
    window.location.pathname.endsWith('/') || 
    window.location.pathname.endsWith('/신사업/') || 
    window.location.pathname.endsWith('/frontend/') ||
    window.location.pathname.endsWith('/frontend')) {
    
    console.log('🌸 메인 페이지 초기화 시작');
    
    // Supabase 로드 대기 후 상품 로드
    const initMainPage = async () => {
        // Supabase가 준비될 때까지 대기 (최대 3초)
        let attempts = 0;
        while (attempts < 30 && typeof window.supabase === 'undefined') {
            console.log('⏳ Supabase 로딩 대기 중...', attempts);
            await new Promise(resolve => setTimeout(resolve, 100));
            attempts++;
        }
        
        if (typeof window.supabase === 'undefined') {
            console.warn('⚠️ Supabase 로드 실패, API만 사용합니다');
        } else {
            console.log('✅ Supabase 준비 완료');
        }
        
        // DB에서 상품 로드
        const loaded = await loadProductsFromDB();
        console.log('📊 상품 로드 결과:', loaded, '개수:', productsArray.length);
        
        // 상품 로드 후 이벤트 설정
        setupMainPageEvents();
    };
    
    initMainPage();
    
    // 로그인 체크
    setTimeout(() => {
        checkAuth();
        loadCartFromServer({ silent: true });
    }, 500);
}

// ============================================
// 상세 페이지
// ============================================

if (window.location.pathname.includes('detail.html') || window.location.pathname.includes('/product/')) {
    console.log('📦 상세 페이지 초기화');
    
    // 로그인 체크
    setTimeout(() => {
        checkAuth();
        loadCartFromServer({ silent: true });
    }, 500);
    
    const urlParams = new URLSearchParams(window.location.search);
    const pathParts = window.location.pathname.split('/').filter(Boolean);
    const detectedProductId = urlParams.get('id') || (pathParts[0] === 'product' ? pathParts[1] : null);
    
    console.log('🔍 감지된 productId:', detectedProductId);
    
    if (!detectedProductId) {
        showNotification('❌ 상품을 찾을 수 없습니다');
        setTimeout(() => window.location.href = 'flower.html', 1500);
        return;
    }
    
    // 상품 단건 로드 후 상세 정보 표시
    loadProductById(detectedProductId).then(product => {
        if (!product) {
            console.error('상품을 찾을 수 없습니다:', detectedProductId);
            showNotification('❌ 상품을 찾을 수 없습니다');
            setTimeout(() => window.location.href = 'flower.html', 2000);
            return;
        }
        displayProductDetail(product, detectedProductId);
    });
}

function displayProductDetail(product, productId) {
    console.log('상품 상세 표시:', product, 'ID:', productId);
    
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
        const categoryEl = document.getElementById('productCategory');
        if (categoryEl) categoryEl.textContent = product.category || '꽃다발';

        const soldOutNotice = document.getElementById('soldOutNotice');
        if ((product.stock ?? 0) <= 0) {
            if (soldOutNotice) soldOutNotice.classList.remove('hidden');
            document.getElementById('addToCartBtn')?.setAttribute('disabled', 'true');
            document.getElementById('buyNowBtn')?.setAttribute('disabled', 'true');
        } else {
            if (soldOutNotice) soldOutNotice.classList.add('hidden');
            document.getElementById('addToCartBtn')?.removeAttribute('disabled');
            document.getElementById('buyNowBtn')?.removeAttribute('disabled');
        }
        
        const mainImage = document.getElementById('mainImage');
        const fallbackImage = product.image || 'https://via.placeholder.com/600x800';
        mainImage.style.backgroundImage = `url("${product.images[0] || fallbackImage}")`;
        
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
            const size = document.querySelector('.size-btn.bg-primary')?.dataset?.size || 'medium';
            const ribbonMessage = document.getElementById('ribbonMessage')?.value?.trim() || null;
            const addOns = Array.from(document.querySelectorAll('input[name="addOns"]:checked')).map(el => el.value);
            console.log('🛒 장바구니 추가:', productId, quantity);
            addToCart(productId, quantity, { size, ribbonMessage, addOns });
            quantity = 1;
            document.getElementById('quantity').textContent = quantity;
        });

        document.getElementById('buyNowBtn')?.addEventListener('click', () => {
            const size = document.querySelector('.size-btn.bg-primary')?.dataset?.size || 'medium';
            const ribbonMessage = document.getElementById('ribbonMessage')?.value?.trim() || null;
            const addOns = Array.from(document.querySelectorAll('input[name="addOns"]:checked')).map(el => el.value);
            console.log('💳 바로 결제:', productId, quantity);
            addToCart(productId, quantity, { size, ribbonMessage, addOns });
            quantity = 1;
            document.getElementById('quantity').textContent = quantity;
            setTimeout(() => {
                window.location.href = 'cart.html';
            }, 600);
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
// 구독 페이지
// ============================================
if (window.location.pathname.includes('subscription.html')) {
    setTimeout(() => {
        checkAuth();
    }, 300);

    const urlParams = new URLSearchParams(window.location.search);
    let selectedPlan = urlParams.get('plan') || 'medium';
    if (!subscriptionPlans[selectedPlan]) selectedPlan = 'medium';

    const updatePlanUI = () => {
        document.querySelectorAll('.plan-card').forEach(card => {
            const plan = card.getAttribute('data-plan');
            if (plan === selectedPlan) {
                card.classList.add('border-primary', 'shadow-lg');
            } else {
                card.classList.remove('border-primary', 'shadow-lg');
            }
        });
        const planInfo = subscriptionPlans[selectedPlan];
        const nameEl = document.getElementById('selectedPlanName');
        const priceEl = document.getElementById('selectedPlanPrice');
        if (nameEl) nameEl.textContent = planInfo.name;
        if (priceEl) priceEl.textContent = `${planInfo.price.toLocaleString()}원 / 주`;
    };

    document.querySelectorAll('.plan-card').forEach(card => {
        card.addEventListener('click', () => {
            selectedPlan = card.getAttribute('data-plan');
            updatePlanUI();
        });
    });

    updatePlanUI();

    const form = document.getElementById('subscriptionForm');
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const messageEl = document.getElementById('subscriptionMessage');
            try {
                const user = await checkAuth();
                if (!user) {
                    showNotification('⚠️ 로그인이 필요합니다');
                    setTimeout(() => window.location.href = 'login.html', 1200);
                    return;
                }
                const name = document.getElementById('subscriberName')?.value?.trim();
                const phone = document.getElementById('subscriberPhone')?.value?.trim();
                const address = document.getElementById('subscriberAddress')?.value?.trim();
                const startDate = document.getElementById('startDate')?.value;
                const deliveryDay = document.getElementById('deliveryDay')?.value || null;

                if (!name || !phone || !address || !startDate) {
                    showNotification('⚠️ 필수 정보를 모두 입력해주세요');
                    return;
                }

                const payload = {
                    planType: selectedPlan,
                    deliveryAddress: address,
                    nextDeliveryDate: startDate,
                    deliveryDay,
                    name,
                    phone
                };
                sessionStorage.setItem('subscriptionDraft', JSON.stringify(payload));
                window.location.href = `subscription-checkout.html?plan=${selectedPlan}`;
            } catch (error) {
                console.error('구독 신청 실패:', error);
                if (messageEl) messageEl.textContent = '❌ 구독 신청에 실패했습니다.';
                showNotification('❌ 구독 신청에 실패했습니다');
            }
        });
    }
}

// ============================================
// 구독 결제 페이지
// ============================================
if (window.location.pathname.includes('subscription-checkout.html')) {
    const draftRaw = sessionStorage.getItem('subscriptionDraft');
    const draft = draftRaw ? JSON.parse(draftRaw) : null;
    const urlParams = new URLSearchParams(window.location.search);
    const plan = urlParams.get('plan') || draft?.planType || 'medium';
    const planInfo = subscriptionPlans[plan] || subscriptionPlans.medium;

    const planNameEl = document.getElementById('checkoutPlanName');
    const planPriceEl = document.getElementById('checkoutPlanPrice');
    if (planNameEl) planNameEl.textContent = planInfo.name;
    if (planPriceEl) planPriceEl.textContent = `${planInfo.price.toLocaleString()}원 / 주`;

    document.getElementById('checkoutBtn')?.addEventListener('click', async () => {
        try {
            const user = await checkAuth();
            if (!user) {
                showNotification('⚠️ 로그인이 필요합니다');
                setTimeout(() => window.location.href = 'login.html', 1200);
                return;
            }
            if (!draft) {
                showNotification('⚠️ 구독 정보를 다시 입력해주세요');
                setTimeout(() => window.location.href = 'subscription.html', 1200);
                return;
            }
            const paymentMethod = document.getElementById('subscriptionPayment')?.value;
            if (!paymentMethod) {
                showNotification('⚠️ 결제 수단을 선택해주세요');
                return;
            }
            await apiRequest('/subscriptions', {
                method: 'POST',
                body: JSON.stringify(draft)
            });
            sessionStorage.removeItem('subscriptionDraft');
            showNotification('✅ 구독 결제가 완료되었습니다');
            setTimeout(() => window.location.href = 'dashboard.html', 1500);
        } catch (error) {
            console.error('구독 결제 실패:', error);
            showNotification('❌ 구독 결제에 실패했습니다');
        }
    });
}

// ============================================
// 프로필 페이지
// ============================================
if (window.location.pathname.includes('profile.html')) {
    setTimeout(async () => {
        const user = await checkAuth();
        if (!user) {
            window.location.href = 'login.html';
            return;
        }
        const emailEl = document.getElementById('profileEmail');
        if (emailEl) emailEl.value = user.email;
        try {
            const profile = await apiRequest('/profile');
            document.getElementById('profileName').value = profile?.name || '';
            document.getElementById('profilePhone').value = profile?.phone || '';
        } catch (error) {
            console.error('프로필 조회 실패:', error);
        }
    }, 300);

    const form = document.getElementById('profileForm');
    form?.addEventListener('submit', async (e) => {
        e.preventDefault();
        const messageEl = document.getElementById('profileMessage');
        try {
            const name = document.getElementById('profileName')?.value?.trim();
            const phone = document.getElementById('profilePhone')?.value?.trim();
            await apiRequest('/profile', {
                method: 'PUT',
                body: JSON.stringify({ name, phone })
            });
            if (messageEl) messageEl.textContent = '✅ 정보가 저장되었습니다.';
            showNotification('✅ 정보 저장 완료');
        } catch (error) {
            console.error('프로필 저장 실패:', error);
            if (messageEl) messageEl.textContent = '❌ 저장에 실패했습니다.';
            showNotification('❌ 저장에 실패했습니다');
        }
    });
}

// ============================================
// 배송지 관리 페이지
// ============================================
if (window.location.pathname.includes('addresses.html')) {
    const loadAddresses = async () => {
        const listEl = document.getElementById('addressList');
        try {
            const addresses = await apiRequest('/addresses');
            if (!addresses || addresses.length === 0) {
                listEl.textContent = '등록된 배송지가 없습니다.';
                return;
            }
            listEl.innerHTML = addresses.map(addr => `
                <div class="border rounded-xl p-4">
                    <div class="flex justify-between items-start">
                        <div>
                            <p class="font-semibold">${addr.name} · ${addr.phone}</p>
                            <p class="text-gray-500 mt-1">${addr.address}</p>
                            ${addr.is_default ? '<span class="text-xs text-primary font-bold mt-2 inline-block">기본 배송지</span>' : ''}
                        </div>
                        <button onclick="deleteAddress('${addr.id}')" class="text-xs text-red-500 hover:underline">삭제</button>
                    </div>
                </div>
            `).join('');
        } catch (error) {
            console.error('배송지 조회 실패:', error);
            listEl.textContent = '배송지 정보를 불러오지 못했습니다.';
        }
    };

    window.deleteAddress = async function(addressId) {
        try {
            await apiRequest(`/addresses/${addressId}`, { method: 'DELETE' });
            showNotification('✅ 배송지가 삭제되었습니다');
            loadAddresses();
        } catch (error) {
            console.error('배송지 삭제 실패:', error);
            showNotification('❌ 배송지 삭제에 실패했습니다');
        }
    };

    setTimeout(async () => {
        const user = await checkAuth();
        if (!user) {
            window.location.href = 'login.html';
            return;
        }
        loadAddresses();
    }, 300);

    const form = document.getElementById('addressForm');
    form?.addEventListener('submit', async (e) => {
        e.preventDefault();
        const messageEl = document.getElementById('addressMessage');
        try {
            const name = document.getElementById('addressName')?.value?.trim();
            const phone = document.getElementById('addressPhone')?.value?.trim();
            const address = document.getElementById('addressText')?.value?.trim();
            const isDefault = document.getElementById('addressDefault')?.checked || false;
            await apiRequest('/addresses', {
                method: 'POST',
                body: JSON.stringify({ name, phone, address, isDefault })
            });
            form.reset();
            if (messageEl) messageEl.textContent = '✅ 배송지가 추가되었습니다.';
            showNotification('✅ 배송지 추가 완료');
            loadAddresses();
        } catch (error) {
            console.error('배송지 추가 실패:', error);
            if (messageEl) messageEl.textContent = '❌ 배송지 추가에 실패했습니다.';
            showNotification('❌ 배송지 추가 실패');
        }
    });
}

// ============================================
// 적립 내역 페이지
// ============================================
if (window.location.pathname.includes('points.html')) {
    setTimeout(async () => {
        const user = await checkAuth();
        if (!user) {
            window.location.href = 'login.html';
            return;
        }
        const listEl = document.getElementById('pointsList');
        const summaryEl = document.getElementById('pointsSummary');
        try {
            const data = await apiRequest('/points');
            const total = data?.totalPoints || 0;
            if (summaryEl) summaryEl.textContent = `현재 적립금: ${total.toLocaleString()}원`;
            const items = data?.history || [];
            if (!items.length) {
                listEl.textContent = '적립 내역이 없습니다.';
                return;
            }
            listEl.innerHTML = items.map(item => `
                <div class="flex justify-between border-b pb-3">
                    <div>
                        <p class="font-semibold">${item.description || '적립'}</p>
                        <p class="text-xs text-gray-400">${new Date(item.created_at).toLocaleDateString('ko-KR')}</p>
                    </div>
                    <p class="font-bold ${item.type === 'earn' ? 'text-primary' : 'text-red-500'}">
                        ${item.type === 'earn' ? '+' : '-'}${item.points.toLocaleString()}원
                    </p>
                </div>
            `).join('');
        } catch (error) {
            console.error('적립 내역 조회 실패:', error);
            listEl.textContent = '적립 내역을 불러오지 못했습니다.';
        }
    }, 300);
}

// ============================================
// 배송 추적 페이지
// ============================================
if (window.location.pathname.includes('tracking.html')) {
    const inputEl = document.getElementById('trackOrderInput');
    const resultEl = document.getElementById('trackingResult');
    const btnEl = document.getElementById('trackOrderBtn');

    const fetchTracking = async (orderNumber) => {
        if (!orderNumber) {
            resultEl.textContent = '주문 번호를 입력해 주세요.';
            return;
        }
        try {
            const data = await apiRequest(`/orders/track?orderNumber=${encodeURIComponent(orderNumber)}`);
            const statusMap = {
                preparing: '제작중',
                shipping: '배송중',
                delivered: '배송완료',
                cancelled: '취소됨'
            };
            resultEl.innerHTML = `
                <div class="mt-4 space-y-2">
                    <p><span class="font-semibold">주문 번호:</span> ${data.order_number}</p>
                    <p><span class="font-semibold">상태:</span> ${statusMap[data.status] || '제작중'}</p>
                    <p><span class="font-semibold">받는 분:</span> ${data.delivery_name}</p>
                    <p><span class="font-semibold">주소:</span> ${data.delivery_address}</p>
                    <p><span class="font-semibold">최근 업데이트:</span> ${new Date(data.updated_at).toLocaleString('ko-KR')}</p>
                </div>
            `;
        } catch (error) {
            console.error('배송 추적 실패:', error);
            resultEl.textContent = '주문 정보를 찾을 수 없습니다.';
        }
    };

    btnEl?.addEventListener('click', () => {
        fetchTracking(inputEl.value.trim());
    });

    const urlParams = new URLSearchParams(window.location.search);
    const orderParam = urlParams.get('order');
    if (orderParam) {
        inputEl.value = orderParam;
        fetchTracking(orderParam);
    }
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
                            <p class="text-gray-500 text-sm italic">사이즈: ${item.size || 'medium'}</p>
                            ${item.ribbonMessage ? `<p class="text-xs text-gray-400 mt-1">리본문구: ${item.ribbonMessage}</p>` : ''}
                            ${Array.isArray(item.addOns) && item.addOns.length ? `<p class="text-xs text-gray-400 mt-1">추가옵션: ${item.addOns.join(', ')}</p>` : ''}
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
        const ordererName = document.getElementById('ordererName')?.value?.trim();
        const ordererPhone = document.getElementById('ordererPhone')?.value?.trim();
        const deliveryDate = document.getElementById('deliveryDate')?.value;
        const deliveryTimeSlot = document.getElementById('deliveryTimeSlot')?.value;
        if (!ordererName) {
            showNotification('⚠️ 주문자 성함을 입력해주세요');
            document.getElementById('ordererName')?.focus();
            return;
        }
        if (!ordererPhone) {
            showNotification('⚠️ 주문자 연락처를 입력해주세요');
            document.getElementById('ordererPhone')?.focus();
            return;
        }
        if (!deliveryDate) {
            showNotification('⚠️ 배송 날짜를 선택해주세요');
            document.getElementById('deliveryDate')?.focus();
            return;
        }
        if (!deliveryTimeSlot) {
            showNotification('⚠️ 배송 시간대를 선택해주세요');
            document.getElementById('deliveryTimeSlot')?.focus();
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
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
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
                paymentMethod,
                deliveryDate,
                deliveryTimeSlot,
                ordererName,
                ordererPhone
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
