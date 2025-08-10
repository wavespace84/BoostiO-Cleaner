# BoostiO Cleaner - Windows 클리너 프로그램

AI 기반의 현대적인 Windows PC 최적화 솔루션입니다.

## 프로젝트 실행 방법

1. 터미널을 열고 프로젝트 디렉토리로 이동:
```bash
cd D:\boostio_cleaner\boostio-cleaner
```

2. 개발 서버 시작:
```bash
npm start
```

3. 브라우저에서 자동으로 http://localhost:3000 이 열립니다.

## 주요 기능

- 🚀 **PC 최적화**: AI 기반 시스템 분석으로 PC 성능 극대화
- 🗑️ **정크 파일 제거**: 불필요한 파일을 찾아 안전하게 제거
- 🛡️ **보안 강화**: 실시간 보안 위협 감지 및 차단
- ⚡ **부팅 속도 향상**: 시작 프로그램 최적화

## 디자인 특징

- 다크 테마 기반의 모던한 웹 대시보드 스타일
- 퍼플-블루 계열의 그라데이션 포인트 컬러
- 0과 1이 흐르는 매트릭스 배경 효과
- Toss 앱 스타일의 부드러운 스프링/스와이프 애니메이션
- 스크롤 유도 애니메이션

## 기술 스택

- **React** (TypeScript)
- **Tailwind CSS** - 유틸리티 우선 CSS 프레임워크
- **Framer Motion** - 애니메이션 라이브러리
- **Lucide React** - 아이콘 라이브러리
- **Radix UI** - 접근 가능한 UI 컴포넌트

## 프로젝트 구조

```
boostio-cleaner/
├── src/
│   ├── components/          # React 컴포넌트
│   │   ├── MatrixBackground.tsx   # 매트릭스 배경 효과
│   │   ├── Navbar.tsx             # 네비게이션 바
│   │   ├── HeroSection.tsx        # 히어로 섹션
│   │   ├── FeaturesSection.tsx    # 기능 소개 섹션
│   │   ├── FeatureCard.tsx        # 기능 카드 컴포넌트
│   │   ├── PricingSection.tsx     # 가격 정책 섹션
│   │   ├── FloatingContactButton.tsx # 플로팅 문의 버튼
│   │   └── ScrollProgress.tsx     # 스크롤 진행 표시기
│   ├── lib/                # 유틸리티 함수
│   │   └── utils.ts       # className 헬퍼 함수
│   ├── App.tsx            # 메인 앱 컴포넌트
│   ├── App.css            # 앱 스타일
│   └── index.css          # 글로벌 스타일 및 Tailwind 설정
├── tailwind.config.js     # Tailwind CSS 설정
├── postcss.config.js      # PostCSS 설정
└── package.json           # 프로젝트 설정 및 의존성

## 빌드 및 배포

프로덕션 빌드 생성:
```bash
npm run build
```

빌드된 파일은 `build/` 디렉토리에 생성됩니다.