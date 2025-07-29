// D:/ds_mui_new/.storybook/preview.tsx

import type { Preview } from '@storybook/react-webpack5';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { MemoryRouter } from 'react-router-dom';
import { AuthProvider } from '../src/contexts/AuthContext';
import { getTheme } from '../src/theme';
import 'pretendard/dist/web/static/pretendard.css';

// Storybook에서 사용할 기본 테마를 생성합니다.
const storybookTheme = getTheme('light');

const preview: Preview = {
    parameters: {
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
        actions: { argTypesRegex: '^on[A-Z].*' },
    },

    // ★★★★★ 최종 해결책 ★★★★★
    // 여러 데코레이터를 하나로 통합하여 Provider의 중첩 순서를 명확하게 보장합니다.
    // 이 방식은 Storybook의 해석 오류 가능성을 원천적으로 차단합니다.
    decorators: [
        (Story) => (
            // 1. 가장 바깥: MUI 테마 적용
            <ThemeProvider theme={storybookTheme}>
                <CssBaseline />
                {/* 2. 중간: 라우팅 컨텍스트 제공 */}
                <MemoryRouter initialEntries={['/']}>
                    {/* 3. 가장 안쪽: 인증 컨텍스트 제공 */}
                    <AuthProvider>
                        {/* 4. 실제 스토리 컴포넌트 렌더링 */}
                        <Story />
                    </AuthProvider>
                </MemoryRouter>
            </ThemeProvider>
        ),
    ],
};

export default preview;