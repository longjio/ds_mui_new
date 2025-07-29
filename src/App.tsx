// D:/ds_mui_new/src/App.tsx

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

                            {/* ★★★ 모바일 레이아웃 및 하위 페이지들 수정 ★★★ */}
                            <Route path="/m/*" element={<MobileLayout />}>
                                {mobileRoutes.map((route) => {
                                    const PageComponent = route.component;
                                    // path가 '/'이면 index 라우트로 처리합니다.
                                    if (route.path === '/') {
                                        return <Route key={route.id} index element={<PageComponent />} />;
                                    }
                                    // 그 외 경로는 앞의 '/'를 제거하여 상대 경로로 만듭니다.
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