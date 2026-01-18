# 🚀 꽃보라가든 백엔드 구축 가이드 (Supabase)

## 📋 목차
1. [Supabase 프로젝트 생성](#1-supabase-프로젝트-생성)
2. [데이터베이스 스키마 설계](#2-데이터베이스-스키마-설계)
3. [보안 설정 (RLS)](#3-보안-설정-rls)
4. [프론트엔드 연동](#4-프론트엔드-연동)
5. [기능 구현](#5-기능-구현)

---

## 🎯 전체 구조

```
Frontend (Azure Static Web Apps)
    ↓
Supabase (무료)
├── Authentication (회원가입/로그인)
├── Database (PostgreSQL)
│   ├── users (사용자)
│   ├── orders (주문)
│   ├── subscriptions (구독)
│   └── points_history (적립금 내역)
└── Row Level Security (보안)
```

---

## 1. Supabase 프로젝트 생성

### 1-1. 회원가입
👉 https://supabase.com

1. **"Start your project"** 클릭
2. GitHub 계정으로 로그인
3. **무료 플랜 선택**

### 1-2. 새 프로젝트 만들기

1. **"New Project"** 클릭
2. 정보 입력:
   - **Organization**: 새로 만들거나 기존 선택
   - **Project Name**: `flower-project`
   - **Database Password**: 강력한 비밀번호 입력 (저장 필수!)
   - **Region**: `Northeast Asia (Seoul)`
3. **"Create new project"** 클릭
4. ⏳ 2-3분 대기 (프로젝트 생성 중)

---

## 2. 데이터베이스 스키마 설계

### 2-1. SQL Editor 접속

1. 좌측 메뉴: **"SQL Editor"** 클릭
2. **"+ New query"** 클릭

### 2-2. 테이블 생성 SQL

아래 SQL을 복사해서 실행하세요:

```sql
-- 1. 사용자 프로필 테이블
CREATE TABLE user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  phone TEXT,
  total_points INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. 주문 테이블
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
  order_number TEXT UNIQUE NOT NULL,
  status TEXT DEFAULT 'pending', -- pending, processing, shipped, delivered, cancelled
  total_amount INTEGER NOT NULL,
  delivery_address TEXT NOT NULL,
  delivery_name TEXT NOT NULL,
  delivery_phone TEXT NOT NULL,
  delivery_message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. 주문 상품 테이블
CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  product_id TEXT NOT NULL,
  product_name TEXT NOT NULL,
  product_price INTEGER NOT NULL,
  quantity INTEGER NOT NULL,
  size TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. 정기구독 테이블
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
  plan_type TEXT NOT NULL, -- basic, medium, premium
  status TEXT DEFAULT 'active', -- active, paused, cancelled
  next_delivery_date DATE,
  delivery_address TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. 적립금 내역 테이블
CREATE TABLE points_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
  points INTEGER NOT NULL, -- 양수: 적립, 음수: 사용
  type TEXT NOT NULL, -- earn, use, expire
  description TEXT,
  order_id UUID REFERENCES orders(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. 배송지 테이블
CREATE TABLE shipping_addresses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  address TEXT NOT NULL,
  is_default BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 인덱스 생성 (검색 속도 향상)
CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE INDEX idx_order_items_order_id ON order_items(order_id);
CREATE INDEX idx_points_history_user_id ON points_history(user_id);
CREATE INDEX idx_subscriptions_user_id ON subscriptions(user_id);

-- 주문번호 자동 생성 함수
CREATE OR REPLACE FUNCTION generate_order_number()
RETURNS TEXT AS $$
DECLARE
  new_number TEXT;
BEGIN
  new_number := 'FL-' || LPAD(FLOOR(RANDOM() * 10000)::TEXT, 4, '0');
  RETURN new_number;
END;
$$ LANGUAGE plpgsql;

-- 사용자 생성 시 자동으로 프로필 생성 (트리거)
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO user_profiles (id, email, name)
  VALUES (NEW.id, NEW.email, COALESCE(NEW.raw_user_meta_data->>'name', 'User'));
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- 적립금 업데이트 함수
CREATE OR REPLACE FUNCTION update_user_points()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE user_profiles
  SET total_points = total_points + NEW.points,
      updated_at = NOW()
  WHERE id = NEW.user_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_points_added
  AFTER INSERT ON points_history
  FOR EACH ROW EXECUTE FUNCTION update_user_points();
```

**"RUN"** 버튼 클릭!

---

## 3. 보안 설정 (RLS)

### 3-1. Row Level Security 활성화

```sql
-- RLS 활성화
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE points_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE shipping_addresses ENABLE ROW LEVEL SECURITY;

-- 사용자 프로필 정책
CREATE POLICY "사용자는 자신의 프로필만 조회 가능"
  ON user_profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "사용자는 자신의 프로필만 수정 가능"
  ON user_profiles FOR UPDATE
  USING (auth.uid() = id);

-- 주문 정책
CREATE POLICY "사용자는 자신의 주문만 조회 가능"
  ON orders FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "사용자는 자신의 주문만 생성 가능"
  ON orders FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- 주문 상품 정책
CREATE POLICY "사용자는 자신의 주문 상품만 조회 가능"
  ON order_items FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM orders
      WHERE orders.id = order_items.order_id
      AND orders.user_id = auth.uid()
    )
  );

-- 적립금 정책
CREATE POLICY "사용자는 자신의 적립금 내역만 조회 가능"
  ON points_history FOR SELECT
  USING (auth.uid() = user_id);

-- 구독 정책
CREATE POLICY "사용자는 자신의 구독만 조회/관리 가능"
  ON subscriptions FOR ALL
  USING (auth.uid() = user_id);

-- 배송지 정책
CREATE POLICY "사용자는 자신의 배송지만 조회/관리 가능"
  ON shipping_addresses FOR ALL
  USING (auth.uid() = user_id);
```

**"RUN"** 버튼 클릭!

---

## 4. 프론트엔드 연동

### 4-1. Supabase 키 가져오기

1. 좌측 메뉴: **"Settings"** → **"API"**
2. 복사할 것:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon public key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

### 4-2. 환경 설정 파일 생성

`supabase-config.js` 파일 생성:

```javascript
// Supabase 설정
const SUPABASE_URL = '여기에_PROJECT_URL_붙여넣기';
const SUPABASE_ANON_KEY = '여기에_ANON_KEY_붙여넣기';

// Supabase 클라이언트 생성
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
```

### 4-3. HTML에 Supabase 추가

모든 HTML 파일의 `</body>` 직전에 추가:

```html
<!-- Supabase Client -->
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
<script src="supabase-config.js"></script>
```

---

## 5. 기능 구현

### 5-1. 회원가입 (`auth.js`)

```javascript
// 회원가입
async function signUp(email, password, name, phone) {
  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
    options: {
      data: {
        name: name,
        phone: phone
      }
    }
  });

  if (error) {
    alert('회원가입 실패: ' + error.message);
    return null;
  }

  alert('회원가입 성공! 이메일을 확인해주세요.');
  return data;
}

// 로그인
async function signIn(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password
  });

  if (error) {
    alert('로그인 실패: ' + error.message);
    return null;
  }

  alert('로그인 성공!');
  return data;
}

// 로그아웃
async function signOut() {
  const { error } = await supabase.auth.signOut();
  
  if (error) {
    alert('로그아웃 실패: ' + error.message);
  } else {
    alert('로그아웃 되었습니다.');
    window.location.href = 'flower.html';
  }
}

// 현재 사용자 가져오기
async function getCurrentUser() {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}
```

### 5-2. 주문 생성

```javascript
async function createOrder(items, deliveryInfo) {
  const user = await getCurrentUser();
  
  if (!user) {
    alert('로그인이 필요합니다.');
    window.location.href = 'login.html';
    return;
  }

  // 주문 생성
  const { data: order, error: orderError } = await supabase
    .from('orders')
    .insert([{
      user_id: user.id,
      order_number: await generateOrderNumber(),
      total_amount: calculateTotal(items),
      delivery_address: deliveryInfo.address,
      delivery_name: deliveryInfo.name,
      delivery_phone: deliveryInfo.phone,
      delivery_message: deliveryInfo.message,
      status: 'pending'
    }])
    .select()
    .single();

  if (orderError) {
    alert('주문 실패: ' + orderError.message);
    return;
  }

  // 주문 상품 추가
  const orderItems = items.map(item => ({
    order_id: order.id,
    product_id: item.id,
    product_name: item.name,
    product_price: item.price,
    quantity: item.quantity,
    size: item.size
  }));

  const { error: itemsError } = await supabase
    .from('order_items')
    .insert(orderItems);

  if (itemsError) {
    alert('주문 상품 추가 실패: ' + itemsError.message);
    return;
  }

  // 적립금 추가 (3%)
  const points = Math.floor(order.total_amount * 0.03);
  await addPoints(user.id, points, 'earn', '주문 적립', order.id);

  alert('주문이 완료되었습니다!');
  window.location.href = 'dashboard.html';
}

async function generateOrderNumber() {
  const { data } = await supabase.rpc('generate_order_number');
  return data;
}

function calculateTotal(items) {
  return items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
}
```

### 5-3. 적립금 시스템

```javascript
// 적립금 추가
async function addPoints(userId, points, type, description, orderId = null) {
  const { error } = await supabase
    .from('points_history')
    .insert([{
      user_id: userId,
      points: points,
      type: type,
      description: description,
      order_id: orderId
    }]);

  if (error) {
    console.error('적립금 추가 실패:', error);
  }
}

// 적립금 조회
async function getUserPoints(userId) {
  const { data, error } = await supabase
    .from('user_profiles')
    .select('total_points')
    .eq('id', userId)
    .single();

  if (error) {
    console.error('적립금 조회 실패:', error);
    return 0;
  }

  return data.total_points;
}

// 적립금 내역 조회
async function getPointsHistory(userId) {
  const { data, error } = await supabase
    .from('points_history')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('적립금 내역 조회 실패:', error);
    return [];
  }

  return data;
}
```

### 5-4. 주문 내역 조회

```javascript
async function getUserOrders(userId) {
  const { data, error } = await supabase
    .from('orders')
    .select(`
      *,
      order_items (*)
    `)
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('주문 내역 조회 실패:', error);
    return [];
  }

  return data;
}
```

---

## 6. 로그인/회원가입 페이지 생성

`login.html` 파일 생성 필요!

---

## 📋 완료 체크리스트

- [ ] Supabase 프로젝트 생성
- [ ] 데이터베이스 테이블 생성
- [ ] RLS 정책 설정
- [ ] Supabase 클라이언트 연동
- [ ] 로그인/회원가입 페이지 생성
- [ ] 주문 기능 연동
- [ ] 적립금 시스템 연동
- [ ] 마이페이지 데이터 연동

---

## 💰 비용

**완전 무료!**
- Supabase 무료 티어:
  - 500MB 데이터베이스
  - 50,000 월간 활성 사용자
  - 무제한 API 요청

---

## 🔒 보안 주의사항

1. ✅ Supabase Keys를 GitHub에 커밋하지 마세요
2. ✅ RLS 정책 반드시 설정
3. ✅ HTTPS 사용 (Azure Static Web Apps 기본 제공)
4. ✅ 이메일 인증 활성화

---

## 📞 문제 발생 시

Supabase 문서: https://supabase.com/docs

