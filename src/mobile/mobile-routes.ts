import { lazy } from 'react';
import { AppRouteConfig } from '../app-config';

// 모바일 페이지 컴포넌트들을 lazy import 합니다.
const MobileHome = lazy(() => import('./pages/MobileHome'));
const MobileData = lazy(() => import('./pages/MobileData'));
const MobileSearch = lazy(() => import('./template/MobileSearch'));
const MobileList = lazy(() => import('./template/MobileList'));
const MobileForm = lazy(() => import('./template/MobileForm')); // 1. 새 컴포넌트 import
/**
 * 모바일 전용 라우트 설정 배열입니다.
 */
export const mobileRoutes: AppRouteConfig[] = [
    {
        id: 'mobile-home',
        path: '/',
        component: MobileHome,
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