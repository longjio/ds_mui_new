import React from 'react';
import { Box, Typography, Paper, Divider, Chip, Stack } from '@mui/material';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <Box sx={{ mb: 4 }}>
        <Typography variant="h5" gutterBottom>
            {title}
        </Typography>
        <Paper variant="outlined" sx={{ p: 3 }}>
            {children}
        </Paper>
    </Box>
);

export default function AboutProjectPage() {
    const techStack = ['React', 'TypeScript', 'MUI', 'MUI X', 'React Router', 'Day.js', 'Zustand', 'Pretendard'];
    const gettingStartedCode = `
# 1. 의존성 설치
npm install

# 2. 개발 서버 실행
npm start
    `;
    const troubleshootingTip = `
// IntelliJ / WebStorm에서 파일 구조가 보이지 않을 때
File > Project Structure > Modules 에서 프로젝트 폴더를 다시 소스로 지정

// 원인 불명의 오류 발생 시 캐시 초기화
File > Invalidate Caches / Restart... > Invalidate and Restart
    `;

    return (
        <Box>
            <Typography variant="h4" gutterBottom>
                🚀 프로젝트 소개: DS_MUI_NEW
            </Typography>
            <Typography color="text.secondary" sx={{ mb: 4 }}>
                MUI(Material-UI)를 기반으로 구축된 재사용 가능한 컴포넌트 라이브러리 및 디자인 시스템 쇼케이스입니다.
            </Typography>

            <Divider sx={{ mb: 4 }} />

            <Section title="🎯 주요 기능">
                <Stack spacing={1}>
                    <Typography>• **MDI 탭 인터페이스**: VS Code와 유사한 동적 탭 관리 기능</Typography>
                    <Typography>• **반응형 레이아웃**: 모바일과 데스크톱을 모두 지원하는 사이드바 및 레이아웃</Typography>
                    <Typography>• **동적 라우팅**: 중앙 설정 파일(`app-routes.ts`) 기반의 자동 메뉴 및 페이지 생성</Typography>
                    <Typography>• **컴포넌트 쇼케이스**: 사용법, 설명, 코드 복사 기능을 포함한 컴포넌트 예제 페이지</Typography>
                </Stack>
            </Section>

            <Section title="🛠️ 기술 스택">
                <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
                    {techStack.map(tech => <Chip key={tech} label={tech} color="primary" variant="outlined" />)}
                </Stack>
            </Section>

            <Section title="⚙️ 시작하기">
                <Typography variant="body2" sx={{ mb: 2 }}>
                    아래 명령어를 사용하여 로컬 환경에서 프로젝트를 실행할 수 있습니다.
                </Typography>
                <SyntaxHighlighter language="bash" style={vscDarkPlus}>
                    {gettingStartedCode.trim()}
                </SyntaxHighlighter>
            </Section>

            <Section title="💡 개발 여정 및 트러블슈팅 팁">
                <Typography variant="body2" sx={{ mb: 2 }}>
                    프로젝트를 진행하며 겪었던 주요 문제들과 해결 방법입니다. 비슷한 문제를 겪는 분들께 도움이 되길 바랍니다.
                </Typography>
                <SyntaxHighlighter language="bash" style={vscDarkPlus}>
                    {troubleshootingTip.trim()}
                </SyntaxHighlighter>
            </Section>
        </Box>
    );
}