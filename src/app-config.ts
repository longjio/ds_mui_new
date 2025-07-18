// D:/ds_mui_new/src/app-config.ts

import { lazy, LazyExoticComponent, ReactNode } from 'react';

// --- 타입 정의 ---
export interface AppRouteConfig {
    id: string;
    path: string;
    component: LazyExoticComponent<React.ComponentType<any>>;
    menu?: {
        text: string;
        group: string;
        icon?: ReactNode;
    };
    // [수정] 중첩된 라우트를 가질 수 있도록 children 속성을 추가합니다.
    // 자기 자신과 같은 구조를 재귀적으로 가질 수 있게 합니다.
    children?: AppRouteConfig[];
}
export interface MenuGroupInfo {
    id: string;
    title: string;
}

// --- 메뉴 그룹 정의 ---
// (이하 내용은 변경 없습니다)
export const menuGroups: MenuGroupInfo[] = [
    { id: 'group-foundations', title: 'Foundations' },
    { id: 'group-button', title: 'Button' },
    { id: 'group-input', title: 'Input' },
    { id: 'group-navigation', title: 'Navigation' },
    { id: 'group-surfaces', title: 'Surfaces' },
    { id: 'group-feedback', title: 'Feedback' },
    { id: 'group-layout', title: 'Layout' },
    { id: 'group-mui-x', title: 'MUI X' },
];

// --- ★★★★★ 유일한 정보 소스 (Single Source of Truth) ★★★★★ ---
// (이하 내용은 변경 없습니다)
export const appRoutes: AppRouteConfig[] = [
    // ... (기존 appRoutes 배열 내용)
    { id: 'home', path: '/', component: lazy(() => import('./pages/AboutProjectPage')) },
    { id: 'typography', path: '/typography', component: lazy(() => import('./pages/TypographyPage')), menu: { text: 'Typography', group: 'group-foundations' } },
    // ... 등등
];