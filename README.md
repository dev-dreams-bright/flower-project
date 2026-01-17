# Floral Boutique - 꽃집 웹사이트

## 📖 프로젝트 소개

나를 위한 꽃집, Floral Boutique의 온라인 쇼핑몰입니다.
Snowfox Flowers의 디자인을 참고하여 세련되고 감성적인 UI/UX를 구현했습니다.

## 🎨 주요 기능

### 메인 페이지 (flower.html)
- 히어로 섹션
- New Arrivals (신상품)
- Best Sellers (베스트셀러)
- Plants (식물)
- Special Day (특별한 날)
- Subscription (정기구독)
- Real Reviews (실시간 리뷰)
- Brand Story (브랜드 스토리)

### 상세 페이지 (detail.html)
- 이미지 갤러리 (4장 썸네일)
- 사이즈 선택 (Standard/Deluxe/Premium)
- 수량 조절
- 적립금 표시
- 장바구니 담기
- 관련 상품 추천

### 장바구니 (cart.html)
- 실시간 장바구니 업데이트
- 수량 조절 및 삭제
- 가격 자동 계산
- 배송 정보 입력
- 결제 진행

### 대시보드 (dashboard.html)
- 주문 추적 (배송 진행률)
- 주문 내역
- 정기구독 관리
- 회원 정보

## 🛠 기술 스택

- **HTML5**: 시맨틱 마크업
- **CSS3**: Tailwind CSS CDN
- **JavaScript**: Vanilla JS (ES6+)
- **LocalStorage**: 장바구니 데이터 저장
- **Google Fonts**: Manrope, Noto Serif
- **Material Symbols**: 아이콘

## 📁 파일 구조

```
신사업/
├── flower.html          # 메인 페이지
├── detail.html          # 상품 상세 페이지
├── cart.html            # 장바구니/결제 페이지
├── dashboard.html       # 대시보드/마이페이지
├── flower.js            # JavaScript 기능
├── flower.css           # 추가 스타일
├── project.py           # Python 구구단 프로그램
├── .gitignore           # Git 제외 파일
└── README.md            # 프로젝트 설명

Git 자동화 스크립트:
├── git-auto-push.bat    # 자동 Push
├── git-auto-pull.bat    # 자동 Pull
└── git-sync.bat         # 자동 동기화 (Pull + Push)
```

## 🚀 사용 방법

### 1. 웹사이트 실행
```bash
# flower.html을 브라우저에서 열기
start flower.html
```

### 2. Git 자동화 사용

#### 첫 실행 (저장소 초기화)
```bash
# git-auto-push.bat 더블클릭
# 원격 저장소 URL 입력 (예: https://github.com/username/repo.git)
```

#### 변경사항 업로드 (Push)
```bash
# git-auto-push.bat 더블클릭
# 모든 변경사항을 자동으로 커밋하고 푸시합니다
```

#### 최신 코드 다운로드 (Pull)
```bash
# git-auto-pull.bat 더블클릭
# 원격 저장소의 최신 변경사항을 가져옵니다
```

#### 자동 동기화 (Pull + Push)
```bash
# git-sync.bat 더블클릭
# Pull → 변경사항 확인 → Commit → Push를 한번에 실행
```

## 🎯 기능 목록

### ✅ 완료된 기능
- [x] 반응형 디자인
- [x] 제품 목록 표시
- [x] 제품 상세 페이지
- [x] 장바구니 기능
- [x] 수량 조절
- [x] 가격 계산
- [x] 실시간 리뷰
- [x] 정기구독 플랜
- [x] 적립금 시스템
- [x] 배송 추적
- [x] 관심상품 (하트)
- [x] 할인가 표시
- [x] 배지 (NEW, BEST, PREMIUM)

### 📝 향후 추가 가능 기능
- [ ] 회원가입/로그인
- [ ] 실제 결제 연동
- [ ] 검색 기능
- [ ] 필터링/정렬
- [ ] 찜하기 목록
- [ ] 쿠폰 시스템
- [ ] 리뷰 작성
- [ ] 관리자 페이지

## 🎨 디자인 컨셉

- **컬러 팔레트**:
  - Primary: #11d452 (그린)
  - Background: #f6f8f6 (연한 그린)
  - Accent: #61896f (세이지)
  - Cream: #f9f8f4 (크림)

- **타이포그래피**:
  - Display: Manrope (산세리프)
  - Serif: Noto Serif (제목용)
  - Material Symbols (아이콘)

## 📸 이미지 출처

모든 이미지는 Unsplash의 무료 이미지를 사용했습니다.
- https://unsplash.com

## 🔗 참고 사이트

- Snowfox Flowers: https://snowfoxflowers.com/
- 디자인 영감 및 기능 참고

## 📝 라이센스

MIT License

## 👤 개발자

개인 프로젝트

## 📞 문의

이메일: your-email@example.com

---

**마지막 업데이트**: 2026-01-17
