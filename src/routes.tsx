import React, { Suspense } from 'react';
import { RouteObject } from 'react-router-dom';
import { Box, CircularProgress } from '@mui/material';

// Layouts
import MainLayout from './layouts/MainLayout';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import NotFoundPage from './pages/NotFoundPage';

// [개선] 유일한 정보 소스인 app-config에서 라우트 설정을 직접 가져옵니다.
// app-routes.ts는 더 이상 필요하지 않습니다.
import { appRoutes } from './app-config';

// 로딩 중에 보여줄 컴포넌트
const Loading = () => (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <CircularProgress />
    </Box>
);

// [개선] appRoutes 배열을 직접 사용하여 RouteObject를 동적으로 생성합니다.
// 중간 단계의 변환(componentMap)이 사라져 코드가 더 직관적이고 효율적으로 변경됩니다.
const childRoutes: RouteObject[] = appRoutes.map(route => {
    const PageComponent = route.component;
    // app-config의 path는 이미 '/'로 시작하므로, 앞의 '/'를 제거합니다.
    const path = route.path.substring(1);

    // 기본 경로('/')는 index 라우트로 명시적으로 처리합니다.
    if (path === '') {
        return {
            index: true,
            element: (
                <Suspense fallback={<Loading />}>
                    <PageComponent />
                </Suspense>
            ),
        };
    }

    return {
        path: path,
        element: (
            <Suspense fallback={<Loading />}>
                <PageComponent />
            </Suspense>
        ),
    };
});

export const routesConfig: RouteObject[] = [
    {
        path: '/',
        element: <LoginPage />,
    },
    {
        path: '/signup',
        element: <SignupPage />,
    },
    {
        path: '/app',
        element: <MainLayout />,
        children: [
            ...childRoutes,
            // MainLayout 내에서 존재하지 않는 경로로 접근 시 NotFoundPage를 보여줍니다.
            { path: '*', element: <NotFoundPage /> },
        ],
    },
    // 정의된 다른 모든 경로와 일치하지 않을 경우 NotFoundPage를 보여줍니다.
    { path: '*', element: <NotFoundPage /> },
];