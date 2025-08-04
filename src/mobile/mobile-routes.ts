// D:/ds_mui_new/src/mobile/mobile-routes.ts

import { lazy } from 'react';
import { AppRouteConfig } from '../app-config';

// 모바일 페이지 컴포넌트들을 lazy import 합니다.
const MobileHome = lazy(() => import('./pages/MobileHome'));
const MobileData = lazy(() => import('./pages/MobileData'));
const MobileSearch = lazy(() => import('./template/MobileSearch'));
const MobileList = lazy(() => import('./template/MobileList'));
const MobileForm = lazy(() => import('./template/MobileForm'));
const MobileMenu = lazy(() => import('./template/MobileMenu'));
const MobileUserList = lazy(() => import('./template/MobileUserList'));
const MobileTabSearch = lazy(() => import('./template/MobileTabSearch'));
const MobileNoticeList = lazy(() => import('./template/MobileNoticeList'));
const MobileMenuObj = lazy(() => import('./template/MobileMenuObj'));
const MobileStoreList = lazy(() => import('./template/MobileStoreList'));
const MobileBoardList = lazy(() => import('./template/MobileBoardList'));
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
        id: 'mobile-menu-config',
        path: '/menu-config',
        component: MobileMenu,
    },
    {
        id: 'mobile-menu-obj-config',
        path: '/menu-obj-config',
        component: MobileMenuObj,
    },
    {
        id: 'mobile-user-management',
        path: '/user-management',
        component: MobileUserList,
    },
    {
        id: 'mobile-notice-list',
        path: '/notices',
        component: MobileNoticeList,
    },
    {
        id: 'mobile-store-list',
        path: '/store-list',
        component: MobileStoreList,
    },
    {
        id: 'mobile-board-list',
        path: '/board',
        component: MobileBoardList,
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
        id: 'mobile-tab-search',
        path: '/tab-search',
        component: MobileTabSearch,
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