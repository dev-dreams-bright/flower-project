# 🚀 Supabase 백엔드 - 5분 설정 가이드

## ✅ Step 1: Supabase 프로젝트 생성 (2분)

### 1-1. 회원가입
👉 https://supabase.com/dashboard

1. **"Start your project"** 클릭
2. **GitHub 계정으로 로그인**
3. 무료 플랜 자동 선택됨

### 1-2. 새 프로젝트 생성

1. **"New Project"** 클릭
2. 입력:
   - **Organization**: 기존 선택 또는 새로 만들기
   - **Name**: `flower-project`
   - **Database Password**: 아무거나 입력 (복사해서 메모장에 저장!)
   - **Region**: `Northeast Asia (Seoul)` 선택
3. **"Create new project"** 클릭
4. ⏳ **2분 대기** (커피 한 모금 ☕)

---

## ✅ Step 2: 데이터베이스 설정 (1분)

### 2-1. SQL Editor 열기

1. 왼쪽 메뉴: **SQL Editor** 아이콘 클릭 (</> 모양)
2. **"+ New query"** 클릭

### 2-2. 테이블 생성

1. **파일 열기**: `supabase-setup-01-tables.sql`
2. **전체 선택**: Ctrl+A
3. **복사**: Ctrl+C
4. **Supabase SQL Editor에 붙여넣기**: Ctrl+V
5. **실행**: 우측 하단 **"Run"** 버튼 클릭
6. ✅ **"Success. No rows returned"** 나오면 성공!

### 2-3. 보안 설정

1. SQL Editor에서 **새 쿼리 열기** (+ New query)
2. **파일 열기**: `supabase-setup-02-security.sql`
3. **전체 복사 → 붙여넣기 → Run**
4. ✅ **"Success"** 확인!

---

## ✅ Step 3: API 키 가져오기 (30초)

### 3-1. Settings 이동

1. 왼쪽 메뉴: 톱니바퀴 아이콘 **"Settings"** 클릭
2. **"API"** 메뉴 클릭

### 3-2. 키 복사

2개를 복사하세요:

**1. Project URL**
```
예: https://abcdefghijk.supabase.co
```

**2. anon public (공개 키)**
```
예: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## ✅ Step 4: 프론트엔드 연동 (1분)

### 메모장에 다음 내용 작성:

```
PROJECT_URL: 여기에_복사한_URL_붙여넣기
ANON_KEY: 여기에_복사한_키_붙여넣기
```

**이 정보를 저장해두세요!** (다음에 사용)

---

## 🎉 완료!

**Supabase 백엔드 설정 완료!**

### 📋 확인 사항:

- ✅ Supabase 프로젝트 생성됨
- ✅ 데이터베이스 테이블 6개 생성됨
  - user_profiles
  - orders
  - order_items
  - subscriptions
  - points_history
  - shipping_addresses
- ✅ 보안 정책 (RLS) 활성화됨
- ✅ API 키 복사됨

---

## 📱 다음 단계: 로그인 페이지 만들기

백엔드는 완료! 이제 프론트엔드에서 로그인/회원가입 페이지를 만들면 됩니다.

---

## 💰 비용

**완전 무료!**
- 500MB 데이터베이스
- 50,000 월간 활성 사용자
- 무제한 API 요청

---

## 🆘 에러 발생 시

### "relation already exists" 에러
→ 이미 테이블이 있다는 뜻. 정상입니다!

### "permission denied" 에러
→ SQL Editor에서 실행했는지 확인

### 기타 에러
→ SQL 파일 전체가 복사되었는지 확인

---

## 📞 도움말

Supabase 대시보드: https://supabase.com/dashboard
문서: https://supabase.com/docs
