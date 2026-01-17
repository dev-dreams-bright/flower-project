# GitHub Secret 설정 가이드

## Azure 토큰 등록하기

### 1단계: GitHub 저장소 접속
https://github.com/dev-dreams-bright/flower-project

### 2단계: Settings 메뉴
- 상단 탭에서 **Settings** 클릭

### 3단계: Secrets 메뉴
- 좌측 메뉴: **Secrets and variables** 클릭
- **Actions** 클릭

### 4단계: New repository secret
- 우측 상단: **New repository secret** 버튼 클릭

### 5단계: Secret 입력
**Name:**
```
AZURE_STATIC_WEB_APPS_API_TOKEN
```

**Value (아래 토큰 복사):**
```
ad77912e93538247f24cfb51800f189a0eaca8c6c1ec6152dcb29b157ca84fd501-257cb02b-2be0-48ae-a878-c910d628b27b010242406b8d3410
```

### 6단계: Add secret
- **Add secret** 버튼 클릭

---

## ✅ 완료 확인

Secret이 추가되면 목록에 표시됩니다:
- `AZURE_STATIC_WEB_APPS_API_TOKEN`

---

## 🚀 다음 단계

1. `deploy-to-azure.bat` 실행 (파일 업로드)
2. GitHub → Actions 탭에서 배포 진행 확인
3. 초록색 체크(✓) 나오면 성공!

배포 URL은 Azure Portal에서 확인 가능합니다.
