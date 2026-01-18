-- ============================================
-- 꽃보라가든 보안 설정 (RLS)
-- Supabase SQL Editor에 복사해서 실행하세요!
-- ============================================

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

CREATE POLICY "사용자는 자신의 주문 상품만 생성 가능"
  ON order_items FOR INSERT
  WITH CHECK (
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

CREATE POLICY "시스템이 적립금을 추가할 수 있음"
  ON points_history FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- 구독 정책
CREATE POLICY "사용자는 자신의 구독만 조회/관리 가능"
  ON subscriptions FOR ALL
  USING (auth.uid() = user_id);

-- 배송지 정책
CREATE POLICY "사용자는 자신의 배송지만 조회/관리 가능"
  ON shipping_addresses FOR ALL
  USING (auth.uid() = user_id);
