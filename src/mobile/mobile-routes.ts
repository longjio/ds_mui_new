// D:/ds_mui_new/src/mobile/mobile-routes.ts

import { lazy } from 'react';
// ★ 1. app-config.ts에서 AppRouteConfig 타입을 가져와 재사용합니다.
import { AppRouteConfig } from '../app-config';

// 모바일 페이지 컴포넌트들을 lazy import 합니다.
const MobileHome = lazy(() => import('./pages/MobileHome'));
const MobileData = lazy(() => import('./pages/MobileData'));
const MobileMenu = lazy(() => import('./template/MobileMenu'));

/**
 * 모바일 전용 라우트 설정 배열입니다.
 * 이제 app-config.ts와 동일한 구조를 가집니다.
 */
// ★ 2. 타입을 RouteObject[]에서 AppRouteConfig[]로 변경합니다.
export const mobileRoutes: AppRouteConfig[] = [
    // /m 경로의 기본 페이지
    {
        // ★ 3. 'element' 대신 'component'를 사용하고, id와 path를 명시합니다.
        id: 'mobile-home',
        path: '/', // MobileLayout의 index 라우트가 될 것입니다.
        component: MobileHome,
    },
    // /m/data 경로의 페이지
    {
        id: 'mobile-data',
        path: '/data',
        component: MobileData,
    },
    // /m/menu-config 경로의 페이지
    {
        id: 'mobile-menu-config',
        path: '/menu-config',
        component: MobileMenu,
    },
];