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
const MobileNoticeDetail = lazy(() => import('./mobile/template/MobileNoticeDetail'));
const MobileBoardDetail = lazy(() => import('./mobile/template/MobileBoardDetail'));
const MobileBoardWrite = lazy(() => import('./mobile/template/MobileBoardWrite'));
const MobileVideoDetail = lazy(() => import('./mobile/template/MobileVideoDetail'));
const MobileUserDetail = lazy(() => import('./mobile/template/MobileUserDetail'));
// ★ 1. 새로 만든 사용자 수정 페이지를 lazy import 합니다.
const MobileUserEdit = lazy(() => import('./mobile/template/MobileUserEdit'));

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

                            {/* 독립적인 모바일 페이지들 (MobileLayout 외부에 위치) */}
                            <Route path="/m/notice/:id" element={<MobileNoticeDetail />} />
                            <Route path="/m/board/write" element={<MobileBoardWrite />} />
                            <Route path="/m/board/:id" element={<MobileBoardDetail />} />
                            <Route path="/m/video/:id" element={<MobileVideoDetail />} />
                            {/* ★ 2. 사용자 수정 및 상세 페이지 라우트를 추가합니다. */}
                            {/*    더 구체적인 경로가 먼저 오도록 배치해야 합니다. */}
                            <Route path="/m/user-management/:id/edit" element={<MobileUserEdit />} />
                            <Route path="/m/user-management/:id" element={<MobileUserDetail />} />

                            {/* 나머지 모바일 페이지들은 MobileLayout을 사용합니다. */}
                            <Route path="/m/*" element={<MobileLayout />}>
                                {mobileRoutes.map((route) => {
                                    const PageComponent = route.component;
                                    // path가 '/'인 경우(모바일 홈)는 index route로 처리합니다.
                                    if (route.path === '/') {
                                        return <Route key={route.id} index element={<PageComponent />} />;
                                    }
                                    // 그 외의 경로는 path에서 맨 앞의 '/'를 제거하여 상대 경로로 만듭니다.
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