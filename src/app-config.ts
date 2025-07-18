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
    children?: AppRouteConfig[];
}

export interface MenuGroupInfo {
    id:string;
    title: string;
}

// --- 메뉴 그룹 정의 ---
// 요청하신 메뉴 그룹 목록을 모두 반영합니다.
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
// 요청하신 모든 페이지의 경로와 메뉴 그룹 정보를 여기에 모두 정의합니다.
export const appRoutes: AppRouteConfig[] = [
    // 메뉴에 표시되지 않는 페이지
    { id: 'home', path: '/', component: lazy(() => import('./pages/AboutProjectPage')) },

    // Foundations 그룹
    { id: 'typography', path: '/typography', component: lazy(() => import('./pages/TypographyPage')), menu: { text: 'Typography', group: 'group-foundations' } },

    // Button 그룹
    { id: 'button', path: '/button', component: lazy(() => import('./pages/ButtonPage')), menu: { text: 'Button', group: 'group-button' } },
    { id: 'button-group', path: '/button-group', component: lazy(() => import('./pages/ButtonGroupPage')), menu: { text: 'ButtonGroup', group: 'group-button' } },

    // Input 그룹
    { id: 'autocomplete', path: '/autocomplete', component: lazy(() => import('./pages/AutocompletePage')), menu: { text: 'Autocomplete', group: 'group-input' } },
    { id: 'checkbox', path: '/checkbox', component: lazy(() => import('./pages/CheckboxPage')), menu: { text: 'Checkbox', group: 'group-input' } },
    { id: 'radio-group', path: '/radio-group', component: lazy(() => import('./pages/RadioGroupPage')), menu: { text: 'Radio Group', group: 'group-input' } },
    { id: 'rating', path: '/rating', component: lazy(() => import('./pages/RatingPage')), menu: { text: 'Rating', group: 'group-input' } },
    { id: 'select', path: '/select', component: lazy(() => import('./pages/SelectPage')), menu: { text: 'Select', group: 'group-input' } },
    { id: 'slider', path: '/slider', component: lazy(() => import('./pages/SliderPage')), menu: { text: 'Slider', group: 'group-input' } },
    { id: 'switch', path: '/switch', component: lazy(() => import('./pages/SwitchPage')), menu: { text: 'Switch', group: 'group-input' } },
    { id: 'textfield', path: '/textfield', component: lazy(() => import('./pages/TextFieldPage')), menu: { text: 'TextField', group: 'group-input' } },

    // Navigation 그룹
    { id: 'bottom-nav', path: '/bottom-nav', component: lazy(() => import('./pages/BottomNavPage')), menu: { text: 'Bottom Navigation', group: 'group-navigation' } },
    { id: 'breadcrumbs', path: '/breadcrumbs', component: lazy(() => import('./pages/BreadcrumbsPage')), menu: { text: 'Breadcrumbs', group: 'group-navigation' } },
    { id: 'drawer', path: '/drawer', component: lazy(() => import('./pages/DrawerPage')), menu: { text: 'Drawer', group: 'group-navigation' } },
    { id: 'menu', path: '/menu', component: lazy(() => import('./pages/MenuPage')), menu: { text: 'Menu', group: 'group-navigation' } },
    { id: 'pagination', path: '/pagination', component: lazy(() => import('./pages/PaginationPage')), menu: { text: 'Pagination', group: 'group-navigation' } },
    { id: 'speed-dial', path: '/speed-dial', component: lazy(() => import('./pages/SpeedDialPage')), menu: { text: 'Speed Dial', group: 'group-navigation' } },
    { id: 'stepper', path: '/stepper', component: lazy(() => import('./pages/StepperPage')), menu: { text: 'Stepper', group: 'group-navigation' } },
    { id: 'tabs', path: '/tabs', component: lazy(() => import('./pages/TabsPage')), menu: { text: 'Tabs', group: 'group-navigation' } },

    // Surfaces 그룹
    { id: 'accordion', path: '/accordion', component: lazy(() => import('./pages/AccordionPage')), menu: { text: 'Accordion', group: 'group-surfaces' } },
    { id: 'appbar', path: '/appbar', component: lazy(() => import('./pages/AppBarPage')), menu: { text: 'Appbar', group: 'group-surfaces' } },
    { id: 'card', path: '/card', component: lazy(() => import('./pages/CardPage')), menu: { text: 'Card', group: 'group-surfaces' } },

    // Feedback 그룹
    { id: 'alert', path: '/alert', component: lazy(() => import('./pages/AlertPage')), menu: { text: 'Alert', group: 'group-feedback' } },
    { id: 'dialog', path: '/dialog', component: lazy(() => import('./pages/DialogPage')), menu: { text: 'Dialog', group: 'group-feedback' } },
    { id: 'progress', path: '/progress', component: lazy(() => import('./pages/ProgressPage')), menu: { text: 'Progress', group: 'group-feedback' } },

    // Layout 그룹
    { id: 'grid', path: '/grid', component: lazy(() => import('./pages/GridPage')), menu: { text: 'Grid', group: 'group-layout' } },
    { id: 'image-list', path: '/image-list', component: lazy(() => import('./pages/ImageListPage')), menu: { text: 'Image List', group: 'group-layout' } },

    // MUI X 그룹
    { id: 'data-grid', path: '/data-grid', component: lazy(() => import('./pages/DataGridPage')), menu: { text: 'Data Grid', group: 'group-mui-x' } },
    { id: 'date-picker', path: '/date-picker', component: lazy(() => import('./pages/DatePickerPage')), menu: { text: 'Date Picker', group: 'group-mui-x' } },
];