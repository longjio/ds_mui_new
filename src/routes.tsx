import React, { Suspense } from 'react';
import { RouteObject, Navigate } from 'react-router-dom';
import { Box, CircularProgress } from '@mui/material';

// Layouts
import MainLayout from './layouts/MainLayout';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import NotFoundPage from './pages/NotFoundPage';

// 유일한 정보 출처인 app-routes에서 메뉴 그룹과 타입을 가져옵니다.
import { componentMap } from './app-routes';

// 로딩 중에 보여줄 컴포넌트
const Loading = () => (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <CircularProgress />
    </Box>
);

// componentMap의 key와 value를 기반으로 모든 페이지 정보를 생성
const allPages = Object.entries(componentMap).map(([path, component]) => ({
    path,
    component,
}));

// [개선] 추출된 페이지 정보를 기반으로 RouteObject를 동적으로 생성합니다.
const childRoutes: RouteObject[] = allPages
    .filter(page => page.path && page.component)
    .map(page => {
        const PageComponent = page.component;
        const path = page.path.startsWith('/') ? page.path.substring(1) : page.path;

        // 기본 경로('/')는 index 라우트로 명시적으로 처리하여 코드의 명확성을 높입니다.
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
            // [수정] '/app/dashboard'로의 강제 이동을 제거합니다.
            // 이제 위에서 생성된 childRoutes의 index 라우트(AboutProjectPage)가
            // 로그인 후 첫 화면으로 자연스럽게 표시됩니다.
            // {
            //     index: true,
            //     element: <Navigate to="/app/dashboard" replace />,
            // },
            ...childRoutes,
            // MainLayout 내에서 존재하지 않는 경로로 접근 시 NotFoundPage를 보여줍니다.
            { path: '*', element: <NotFoundPage /> },
        ],
    },
    // 정의된 다른 모든 경로와 일치하지 않을 경우 NotFoundPage를 보여줍니다.
    { path: '*', element: <NotFoundPage /> },
];