# 🚀 Azure 배포 완벽 가이드

## 문제 요약
Azure가 `package.json`을 찾고 빌드 명령어를 요구하지만, 우리는 **순수 HTML 프로젝트**라서 빌드가 필요 없습니다!

## 해결책
`skip_app_build: true` 설정을 추가한 워크플로우 파일을 업로드합니다.

---

# ✅ 단계별 실행 가이드

## Step 1: GitHub에 새 워크플로우 업로드 ⬆️

### 1-1. 배치 파일 실행
```
📁 c:\Users\com\Desktop\신사업\
└── deploy-to-azure.bat ← 더블클릭!
```

### 1-2. 결과 확인
- "GitHub에 업로드 완료!" 메시지가 나오면 성공!
- 에러가 나면 아래 수동 방법 사용:

**수동 방법 (cmd 열기):**
```cmd
cd c:\Users\com\Desktop\신사업
git add .
git commit -m "Fix: Azure 순수 HTML 배포 설정"
git push origin main
```

---

## Step 2: GitHub Secret 등록 🔐

### 2-1. GitHub 저장소 접속
https://github.com/dev-dreams-bright/flower-project

### 2-2. Settings → Secrets
1. 상단 탭: **Settings** 클릭
2. 좌측 메뉴: **Secrets and variables** → **Actions** 클릭
3. 우측 상단: **New repository secret** 클릭

### 2-3. Secret 입력

**Name (정확히 입력!):**
```
AZURE_STATIC_WEB_APPS_API_TOKEN
```

**Value (전체 복사!):**
```
ad77912e93538247f24cfb51800f189a0eaca8c6c1ec6152dcb29b157ca84fd501-257cb02b-2be0-48ae-a878-c910d628b27b010242406b8d3410
```

### 2-4. 저장
- **Add secret** 버튼 클릭
- 목록에 `AZURE_STATIC_WEB_APPS_API_TOKEN`이 표시되면 성공!

---

## Step 3: 기존 워크플로우 확인 및 삭제 🗑️

### 3-1. GitHub 워크플로우 폴더 확인
https://github.com/dev-dreams-bright/flower-project/tree/main/.github/workflows

### 3-2. 파일 확인
- **케이스 A**: `azure-static-web-apps.yml` 파일 1개만 있음
  → ✅ 완벽! 아무것도 안 해도 됨! Step 4로 이동!

- **케이스 B**: 다른 이름의 `.yml` 파일도 있음 (예: `azure-static-web-apps-xxx.yml`)
  → ⚠️ 중복 파일 삭제 필요! 아래 진행:

### 3-3. 중복 파일 삭제 방법
1. 중복된 `.yml` 파일 클릭 (우리가 만든 `azure-static-web-apps.yml`이 아닌 것)
2. 우측 상단: **...** (점 3개) 클릭
3. **Delete file** 클릭
4. 하단: **Commit changes** 클릭

---

## Step 4: 배포 진행 확인 ⏳

### 4-1. Actions 탭 이동
https://github.com/dev-dreams-bright/flower-project/actions

### 4-2. 워크플로우 실행 확인
- 🟡 **노란색 점**: 배포 진행 중 (2-5분 소요)
- 🟢 **초록색 체크(✓)**: 배포 성공!
- 🔴 **빨간색 X**: 실패 (아래 문제 해결 참고)

### 4-3. 상세 로그 확인
- 워크플로우 이름 클릭 → **Build and Deploy Job** 클릭
- 실시간 로그 확인 가능

---

## Step 5: 배포된 사이트 확인 🌐

### 5-1. Azure Portal 접속
https://portal.azure.com

### 5-2. Static Web App 리소스 선택
- 왼쪽 메뉴: **Static Web Apps** 클릭
- 생성한 앱 클릭

### 5-3. URL 확인
- **개요** 페이지에서 **URL** 복사
- 예: `https://happy-sea-123.azurestaticapps.net`

### 5-4. 브라우저에서 열기
- URL 붙여넣기
- 🎉 **꽃보라가든 웹사이트 확인!**

---

# 🔧 문제 해결

## 문제 1: "build 스크립트를 찾을 수 없습니다" 에러
**원인**: 기존 워크플로우 파일이 아직 사용되고 있음
**해결**: Step 3에서 중복 파일을 삭제했는지 확인

## 문제 2: "401 Unauthorized" 에러
**원인**: GitHub Secret이 올바르지 않음
**해결**: 
1. Step 2 다시 확인
2. Secret 이름이 정확한지 확인: `AZURE_STATIC_WEB_APPS_API_TOKEN`
3. 토큰 값 전체가 복사되었는지 확인

## 문제 3: 배포 성공했는데 사이트가 비어있음
**원인**: `index.html` 파일 문제
**해결**:
1. `c:\Users\com\Desktop\신사업\index.html` 파일이 있는지 확인
2. 없으면 `flower.html`을 `index.html`로 복사

---

# 📋 체크리스트

배포 전에 확인하세요:

- [ ] `deploy-to-azure.bat` 실행 완료
- [ ] GitHub Secret 등록 완료 (`AZURE_STATIC_WEB_APPS_API_TOKEN`)
- [ ] `.github/workflows/azure-static-web-apps.yml` 파일이 GitHub에 있음
- [ ] 중복된 워크플로우 파일 삭제 완료
- [ ] GitHub Actions에서 배포 진행 중 (노란색 점 또는 초록색 체크)

모두 체크되었다면 5분 내에 배포 완료됩니다! 🎉

---

# 📞 추가 도움

문제가 계속되면 GitHub Actions 로그의 에러 메시지를 확인하세요:
https://github.com/dev-dreams-bright/flower-project/actions

에러 메시지를 보내주시면 추가 지원해드립니다!
