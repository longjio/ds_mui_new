import React from 'react';
import { BrowserRouter as Router, useRoutes } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import { routesConfig } from './routes';
import { getTheme } from './theme';
import { SnackbarProvider } from './contexts/SnackbarProvider';
import { ThemeContextProvider, useThemeContext } from './contexts/ThemeContext';

// AppRoutes 컴포넌트 (useRoutes 훅 사용)
const AppRoutes = () => {
    const element = useRoutes(routesConfig);
    return element;
};

// ThemeProvider와 그 자식들을 별도 컴포넌트로 분리합니다.
// 이렇게 해야 useThemeContext가 ThemeContextProvider의 컨텍스트에 접근할 수 있습니다.
const AppContent = () => {
    const { mode } = useThemeContext(); // Context에서 현재 테마 모드를 가져옵니다.
    const theme = React.useMemo(() => getTheme(mode), [mode]); // 모드에 따라 테마를 동적으로 생성합니다.

    return (
        <ThemeProvider theme={theme}>
            <SnackbarProvider>
                <CssBaseline />
                <Router basename={process.env.PUBLIC_URL}>
                    <AppRoutes />
                </Router>
            </SnackbarProvider>
        </ThemeProvider>
    );
};

function App() {
    return (
        // 최상위를 ThemeContextProvider로 감싸서
        // 모든 자식 컴포넌트가 테마 컨텍스트에 접근할 수 있도록 합니다.
        <ThemeContextProvider>
            <AppContent />
        </ThemeContextProvider>
    );
}

export default App;