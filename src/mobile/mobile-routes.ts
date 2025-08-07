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
const MobileReport = lazy(() => import('./template/MobileReport'));
const MobileVideoList = lazy(() => import('./template/MobileVideoList'));


export const mobileRoutes: AppRouteConfig[] = [
    {
        id: 'mobile-home',
        path: '/',
        component: MobileHome,
    },
    {
        id: 'mobile-report',
        path: '/report',
        component: MobileReport,
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
    // ★ 2. 비디오 목록 페이지 라우트를 추가합니다.
    {
        id: 'mobile-video-list',
        path: '/video-list',
        component: MobileVideoList,
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
