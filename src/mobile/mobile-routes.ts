// D:/ds_mui_new/src/mobile/mobile-routes.ts

import { lazy } from 'react';
import { AppRouteConfig } from '../app-config';

// 모바일 페이지 컴포넌트들을 lazy import 합니다.
const MobileHome = lazy(() => import('./pages/MobileHome'));
const MobileData = lazy(() => import('./pages/MobileData'));
const MobileSearch = lazy(() => import('./template/MobileSearch'));
const MobileList = lazy(() => import('./template/MobileList'));
const MobileForm = lazy(() => import('./template/MobileForm'));
// ★★★ 수정 1: MobileMenu.tsx를 import 합니다.
const MobileMenu = lazy(() => import('./template/MobileMenu'));
const MobileUserList = lazy(() => import('./template/MobileUserList'));

/**
 * 모바일 전용 라우트 설정 배열입니다.
 */
export const mobileRoutes: AppRouteConfig[] = [
    {
        id: 'mobile-home',
        path: '/',
        component: MobileHome,
    },
    // ★★★ 수정 2: '/m/menu-config' 경로에 MobileMenu 컴포넌트를 연결하는 라우트를 추가합니다.
    {
        id: 'mobile-menu-config',
        path: '/menu-config',
        component: MobileMenu,
    },
    {
        id: 'mobile-user-management',
        path: '/user-management',
        component: MobileUserList,
    },
    {
        id: 'mobile-data',
        path: '/data',
        component: MobileData,
    },
    {
        id: 'mobile-search',
        path: '/search',
        component: MobileSearch,
    },
    {
        id: 'mobile-list',
        path: '/list',
        component: MobileList,
    },
    {
        id: 'mobile-form',
        path: '/form',
        component: MobileForm,
    },
];