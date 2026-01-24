require('dotenv').config();

const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({
    origin: process.env.CORS_ORIGIN || '*'
}));
app.use(express.json());

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    console.error('❌ SUPABASE_URL 또는 SUPABASE_SERVICE_ROLE_KEY가 없습니다.');
    process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

async function getUserFromRequest(req) {
    const authHeader = req.headers.authorization || '';
    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;
    if (!token) return null;

    const { data, error } = await supabase.auth.getUser(token);
    if (error) return null;
    return data?.user || null;
}

async function requireAuth(req, res, next) {
    const user = await getUserFromRequest(req);
    if (!user) {
        return res.status(401).json({ message: '로그인이 필요합니다.' });
    }
    req.user = user;
    next();
}

async function fetchCartItems(userId) {
    const { data, error } = await supabase
        .from('cart_items')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: true });

    if (error) throw error;
    return data || [];
}

async function generateOrderNumber() {
    const { data, error } = await supabase.rpc('generate_order_number');
    if (error) throw error;
    return data;
}

async function createOrderWithRetry(payload, maxAttempts = 5) {
    let attempt = 0;
    while (attempt < maxAttempts) {
        const orderNumber = await generateOrderNumber();
        const { data: order, error } = await supabase
            .from('orders')
            .insert([{
                ...payload,
                order_number: orderNumber
            }])
            .select()
            .single();

        if (!error) return order;
        if (error.code !== '23505') {
            throw error;
        }
        attempt += 1;
    }
    throw new Error('주문번호 생성에 실패했습니다.');
}

app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
});

app.get('/api/cart', requireAuth, async (req, res) => {
    try {
        const items = await fetchCartItems(req.user.id);
        res.json({ items });
    } catch (error) {
        console.error('장바구니 조회 실패:', error);
        res.status(500).json({ message: '장바구니를 불러오지 못했습니다.' });
    }
});

app.post('/api/cart', requireAuth, async (req, res) => {
    const { productId, name, price, image, quantity = 1, size = null } = req.body || {};

    if (!productId || !name || !price || quantity <= 0) {
        return res.status(400).json({ message: '상품 정보가 올바르지 않습니다.' });
    }

    try {
        let query = supabase
            .from('cart_items')
            .select('id, quantity')
            .eq('user_id', req.user.id)
            .eq('product_id', productId);

        if (size) {
            query = query.eq('size', size);
        } else {
            query = query.is('size', null);
        }

        const { data: existingItem, error: existingError } = await query.maybeSingle();
        if (existingError) throw existingError;

        if (existingItem) {
            const { error: updateError } = await supabase
                .from('cart_items')
                .update({ quantity: existingItem.quantity + quantity })
                .eq('id', existingItem.id);

            if (updateError) throw updateError;
        } else {
            const { error: insertError } = await supabase
                .from('cart_items')
                .insert([{
                    user_id: req.user.id,
                    product_id: productId,
                    product_name: name,
                    product_price: price,
                    product_image: image || null,
                    quantity,
                    size
                }]);

            if (insertError) throw insertError;
        }

        const items = await fetchCartItems(req.user.id);
        res.json({ items });
    } catch (error) {
        console.error('장바구니 추가 실패:', error);
        res.status(500).json({ message: '장바구니에 추가하지 못했습니다.' });
    }
});

app.put('/api/cart', requireAuth, async (req, res) => {
    const { productId, quantity, size = null } = req.body || {};

    if (!productId || typeof quantity !== 'number') {
        return res.status(400).json({ message: '수량 정보가 올바르지 않습니다.' });
    }

    try {
        let query = supabase
            .from('cart_items')
            .select('id')
            .eq('user_id', req.user.id)
            .eq('product_id', productId);

        if (size) {
            query = query.eq('size', size);
        } else {
            query = query.is('size', null);
        }

        const { data: existingItem, error: existingError } = await query.maybeSingle();
        if (existingError) throw existingError;

        if (quantity <= 0) {
            if (existingItem) {
                const { error: deleteError } = await supabase
                    .from('cart_items')
                    .delete()
                    .eq('id', existingItem.id);
                if (deleteError) throw deleteError;
            }
        } else if (existingItem) {
            const { error: updateError } = await supabase
                .from('cart_items')
                .update({ quantity })
                .eq('id', existingItem.id);
            if (updateError) throw updateError;
        } else {
            const { error: insertError } = await supabase
                .from('cart_items')
                .insert([{
                    user_id: req.user.id,
                    product_id: productId,
                    product_name: req.body?.name || '상품',
                    product_price: req.body?.price || 0,
                    product_image: req.body?.image || null,
                    quantity,
                    size
                }]);
            if (insertError) throw insertError;
        }

        const items = await fetchCartItems(req.user.id);
        res.json({ items });
    } catch (error) {
        console.error('장바구니 업데이트 실패:', error);
        res.status(500).json({ message: '장바구니를 업데이트하지 못했습니다.' });
    }
});

app.delete('/api/cart/:productId', requireAuth, async (req, res) => {
    const { productId } = req.params;
    const size = req.query.size || null;

    try {
        let query = supabase
            .from('cart_items')
            .delete()
            .eq('user_id', req.user.id)
            .eq('product_id', productId);

        if (size) {
            query = query.eq('size', size);
        } else {
            query = query.is('size', null);
        }

        const { error } = await query;
        if (error) throw error;

        const items = await fetchCartItems(req.user.id);
        res.json({ items });
    } catch (error) {
        console.error('장바구니 삭제 실패:', error);
        res.status(500).json({ message: '장바구니에서 삭제하지 못했습니다.' });
    }
});

app.post('/api/orders', requireAuth, async (req, res) => {
    const { name, phone, address, message = null } = req.body || {};

    if (!name || !phone || !address) {
        return res.status(400).json({ message: '배송 정보가 올바르지 않습니다.' });
    }

    try {
        const cartItems = await fetchCartItems(req.user.id);
        if (cartItems.length === 0) {
            return res.status(400).json({ message: '장바구니가 비어있습니다.' });
        }

        const subtotal = cartItems.reduce((sum, item) => sum + (item.product_price * item.quantity), 0);
        const tax = Math.floor(subtotal * 0.1);
        const totalAmount = subtotal + tax;

        const order = await createOrderWithRetry({
            user_id: req.user.id,
            status: 'pending',
            total_amount: totalAmount,
            delivery_address: address,
            delivery_name: name,
            delivery_phone: phone,
            delivery_message: message
        });

        const orderItems = cartItems.map(item => ({
            order_id: order.id,
            product_id: item.product_id,
            product_name: item.product_name,
            product_price: item.product_price,
            quantity: item.quantity,
            size: item.size || null
        }));

        const { error: itemsError } = await supabase
            .from('order_items')
            .insert(orderItems);
        if (itemsError) throw itemsError;

        const pointsToAdd = Math.floor(totalAmount * 0.03);
        const { error: pointsError } = await supabase
            .from('points_history')
            .insert([{
                user_id: req.user.id,
                points: pointsToAdd,
                type: 'earn',
                description: `주문 #${order.order_number} 적립`,
                order_id: order.id
            }]);
        if (pointsError) throw pointsError;

        await supabase
            .from('cart_items')
            .delete()
            .eq('user_id', req.user.id);

        res.json(order);
    } catch (error) {
        console.error('주문 생성 실패:', error);
        res.status(500).json({ message: '주문 처리에 실패했습니다.' });
    }
});

app.get('/api/dashboard', requireAuth, async (req, res) => {
    try {
        const { data: profile } = await supabase
            .from('user_profiles')
            .select('total_points')
            .eq('id', req.user.id)
            .maybeSingle();

        const { data: orders, error: ordersError } = await supabase
            .from('orders')
            .select('*, order_items(*)')
            .eq('user_id', req.user.id)
            .order('created_at', { ascending: false });
        if (ordersError) throw ordersError;

        const { data: subscriptions, error: subsError } = await supabase
            .from('subscriptions')
            .select('*')
            .eq('user_id', req.user.id)
            .eq('status', 'active');
        if (subsError) throw subsError;

        res.json({
            totalPoints: profile?.total_points || 0,
            orders: orders || [],
            subscriptions: subscriptions || []
        });
    } catch (error) {
        console.error('대시보드 조회 실패:', error);
        res.status(500).json({ message: '대시보드 데이터를 불러오지 못했습니다.' });
    }
});

app.listen(PORT, () => {
    console.log(`✅ 백엔드 서버 실행 중: http://localhost:${PORT}`);
});
