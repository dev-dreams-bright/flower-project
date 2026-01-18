// ============================================
// Supabase 설정 파일
// ============================================

// 1. Project URL
const SUPABASE_URL = 'https://xebqrsnkimtdlrjylvgy.supabase.co';

// 2. Publishable Key (공개 키 - 안전함)
const SUPABASE_ANON_KEY = 'sb_publishable_hAxbFj3PjkdVeYqDssDsDQ_aoND-4FU';

// Supabase 클라이언트 생성
let supabase;

// Supabase 초기화
function initSupabase() {
  if (typeof window.supabase !== 'undefined') {
    supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    console.log('✅ Supabase 연결 완료!');
  } else {
    console.error('❌ Supabase 라이브러리가 로드되지 않았습니다.');
  }
}

// 페이지 로드 시 자동 초기화
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initSupabase);
} else {
  initSupabase();
}
