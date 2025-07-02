import React, { Suspense } from 'react';
import { RouteObject } from 'react-router-dom';
import { Box, CircularProgress } from '@mui/material';

// Layouts
import MainLayout from './layouts/MainLayout';

// 유일한 정보 출처인 app-routes에서 메뉴 그룹과 타입을 가져옵니다.
import { menuGroups, MenuItem } from './app-routes';

// 로딩 중에 보여줄 컴포넌트
const Loading = () => (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <CircularProgress />
    </Box>
);

// 중첩된 메뉴 구조를 평탄화하여 모든 메뉴 아이템을 하나의 배열로 만드는 헬퍼 함수
const flattenMenuItems = (items: MenuItem[]): MenuItem[] => {
    const flatList: MenuItem[] = [];
    items.forEach(item => {
        // children이 없는 아이템만 추가 (상위 메뉴는 경로가 없으므로)
        if (item.path && item.component) {
            flatList.push(item);
        }
        // children이 있으면 재귀적으로 호출하여 하위 아이템도 추가
        if (item.children) {
            flatList.push(...flattenMenuItems(item.children));
        }
    });
    return flatList;
};

// 모든 메뉴 그룹을 순회하며 라우팅이 필요한 모든 페이지를 추출합니다.
const allPages = menuGroups.flatMap(group => flattenMenuItems(group.items));

// 추출된 페이지 정보를 기반으로 react-router-dom의 RouteObject를 동적으로 생성합니다.
const childRoutes: RouteObject[] = allPages
    .filter(page => page.path && page.component) // 경로와 컴포넌트가 모두 있는 항목만 필터링
    .map(page => {
        const PageComponent = page.component!;
        return {
            // path에서 맨 앞의 '/'를 제거합니다.
            path: page.path!.substring(1),
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
        element: <MainLayout />,
        // 동적으로 생성된 자식 라우트를 여기에 할당합니다.
        children: childRoutes,
    },
];