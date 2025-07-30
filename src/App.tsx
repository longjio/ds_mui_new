import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Box, CircularProgress } from '@mui/material';
import { ThemeModeProvider } from './contexts/ThemeModeContext';
import { AuthProvider } from './contexts/AuthContext';
import LoginPage from './pages/LoginPage';
import MainLayout from './layouts/MainLayout';
import NotFoundPage from './pages/NotFoundPage';
import SignupPage from './pages/SignupPage';

import { mobileRoutes } from './mobile/mobile-routes';
const MobileLayout = lazy(() => import('./mobile/layouts/MobileLayout'));
// 1. MobileForm을 독립적인 라우트로 사용하기 위해 직접 import 합니다.
const MobileForm = lazy(() => import('./mobile/template/MobileForm'));

const LoadingFallback = () => (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
    </Box>
);

function App() {
    return (
        <ThemeModeProvider>
            <BrowserRouter basename={process.env.PUBLIC_URL}>
                <AuthProvider>
                    <Suspense fallback={<LoadingFallback />}>
                        <Routes>
                            {/* 공통 페이지 */}
                            <Route path="/" element={<LoginPage />} />
                            <Route path="/login" element={<LoginPage />} />
                            <Route path="/signup" element={<SignupPage />} />

                            {/* 데스크톱 레이아웃 */}
                            <Route path="/app/*" element={<MainLayout />} />

                            {/* 2. MobileForm을 위한 독립 라우트를 추가합니다. */}
                            {/* 이 경로는 MobileLayout의 영향을 받지 않으므로, 자체 헤더만 표시됩니다. */}
                            <Route path="/m/form" element={<MobileForm />} />

                            {/* 나머지 모바일 페이지들은 기존처럼 MobileLayout을 사용합니다. */}
                            <Route path="/m/*" element={<MobileLayout />}>
                                {mobileRoutes
                                    // 3. 위에서 독립적으로 처리했으므로, 여기서는 form 경로를 제외합니다.
                                    .filter(route => route.id !== 'mobile-form')
                                    .map((route) => {
                                        const PageComponent = route.component;
                                        if (route.path === '/') {
                                            return <Route key={route.id} index element={<PageComponent />} />;
                                        }
                                        return (
                                            <Route
                                                key={route.id}
                                                path={route.path.substring(1)}
                                                element={<PageComponent />}
                                            />
                                        );
                                    })}
                            </Route>

                            {/* 404 페이지 */}
                            <Route path="*" element={<NotFoundPage />} />
                        </Routes>
                    </Suspense>
                </AuthProvider>
            </BrowserRouter>
        </ThemeModeProvider>
    );
}

export default App;