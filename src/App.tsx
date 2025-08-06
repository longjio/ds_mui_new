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
const MobileForm = lazy(() => import('./mobile/template/MobileForm'));
const MobileNoticeDetail = lazy(() => import('./mobile/template/MobileNoticeDetail'));
const MobileBoardDetail = lazy(() => import('./mobile/template/MobileBoardDetail'));
// ★ 1. 새로 만든 게시판 글쓰기 페이지를 import 합니다.
const MobileBoardWrite = lazy(() => import('./mobile/template/MobileBoardWrite'));

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

                            {/* 독립적인 모바일 페이지들 */}
                            <Route path="/m/form" element={<MobileForm />} />
                            <Route path="/m/notice/:id" element={<MobileNoticeDetail />} />
                            <Route path="/m/board/:id" element={<MobileBoardDetail />} />
                            {/* ★ 2. 게시판 글쓰기 페이지를 위한 독립 라우트를 추가합니다. */}
                            <Route path="/m/board/write" element={<MobileBoardWrite />} />

                            {/* 나머지 모바일 페이지들은 MobileLayout을 사용합니다. */}
                            <Route path="/m/*" element={<MobileLayout />}>
                                {mobileRoutes
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