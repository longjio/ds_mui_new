import React, { lazy, LazyExoticComponent } from 'react';

// 1. MenuItem 인터페이스에 'component' 속성 추가
export interface MenuItem {
    text: string;
    id: string;
    path?: string;
    component?: LazyExoticComponent<React.ComponentType<any>>;
    children?: MenuItem[];
}

export interface MenuGroup {
    title: string;
    id: string;
    items: MenuItem[];
}

// 2. 각 메뉴 아이템에 lazy로 불러온 컴포넌트 할당
export const menuGroups: MenuGroup[] = [
    {
        title: 'Button',
        id: 'group-button',
        items: [
            { text: 'Button', path: '/button', id: 'item-button', component: lazy(() => import('./pages/ButtonPage')) },
            { text: 'ButtonGroup', path: '/button-group', id: 'item-button-group', component: lazy(() => import('./pages/ButtonGroupPage')) },
        ],
    },
    // {
    //     title: 'Components',
    //     id: 'group-components',
    //     items: [
    //         {
    //             text: 'Input',
    //             id: 'item-input-parent',
    //             children: [
    //                 { text: 'Autocomplete', path: '/autocomplete', id: 'item-autocomplete', component: lazy(() => import('./pages/AutocompletePage')) },
    //                 { text: 'Textfield', path: '/textfield', id: 'item-textfield', component: lazy(() => import('./pages/TextFieldPage')) },
    //                 { text: 'Select', path: '/select', id: 'item-select', component: lazy(() => import('./pages/SelectPage')) },
    //                 { text: 'Checkbox', path: '/checkbox', id: 'item-checkbox', component: lazy(() => import('./pages/CheckboxPage')) },
    //                 { text: 'Radio Group', path: '/radio-group', id: 'item-radio-group', component: lazy(() => import('./pages/RadioGroupPage')) },
    //                 { text: 'Rating', path: '/rating', id: 'item-rating', component: lazy(() => import('./pages/RatingPage')) },
    //                 { text: 'Slider', path: '/slider', id: 'item-slider', component: lazy(() => import('./pages/SliderPage')) },
    //                 { text: 'Switch', path: '/switch', id: 'item-switch', component: lazy(() => import('./pages/SwitchPage')) },
    //             ],
    //         },
    //     ],
    // },
    {
        title: 'Input',
        id: 'item-input-parent',
        items: [
                    { text: 'Autocomplete', path: '/autocomplete', id: 'item-autocomplete', component: lazy(() => import('./pages/AutocompletePage')) },
                    { text: 'Textfield', path: '/textfield', id: 'item-textfield', component: lazy(() => import('./pages/TextFieldPage')) },
                    { text: 'Select', path: '/select', id: 'item-select', component: lazy(() => import('./pages/SelectPage')) },
                    { text: 'Checkbox', path: '/checkbox', id: 'item-checkbox', component: lazy(() => import('./pages/CheckboxPage')) },
                    { text: 'Radio Group', path: '/radio-group', id: 'item-radio-group', component: lazy(() => import('./pages/RadioGroupPage')) },
                    { text: 'Rating', path: '/rating', id: 'item-rating', component: lazy(() => import('./pages/RatingPage')) },
                    { text: 'Slider', path: '/slider', id: 'item-slider', component: lazy(() => import('./pages/SliderPage')) },
                    { text: 'Switch', path: '/switch', id: 'item-switch', component: lazy(() => import('./pages/SwitchPage')) },

        ],
    },
    {
        title: 'Navigation',
        id: 'group-navigation',
        items: [
            { text: 'Bottom Navigation', path: '/bottom-nav', id: 'item-bottom-nav', component: lazy(() => import('./pages/BottomNavPage')) },
            { text: 'Breadcrumbs', path: '/breadcrumbs', id: 'item-breadcrumbs', component: lazy(() => import('./pages/BreadcrumbsPage')) },
            { text: 'Drawer', path: '/drawer', id: 'item-drawer', component: lazy(() => import('./pages/DrawerPage')) },
            { text: 'Menu', path: '/menu', id: 'item-menu', component: lazy(() => import('./pages/MenuPage')) },
            { text: 'Pagination', path: '/pagination', id: 'item-pagination', component: lazy(() => import('./pages/PaginationPage')) },
            { text: 'Speed Dial', path: '/speed-dial', id: 'item-speed-dial', component: lazy(() => import('./pages/SpeedDialPage')) },
            { text: 'Stepper', path: '/stepper', id: 'item-stepper', component: lazy(() => import('./pages/StepperPage')) },
            { text: 'Tabs', path: '/tabs', id: 'item-tabs', component: lazy(() => import('./pages/TabsPage')) },
        ],
    },
    {
        title: 'Surface',
        id: 'group-surface',
        items: [
            { text: 'Accordion', path: '/accordion', id: 'item-accordion', component: lazy(() => import('./pages/AccordionPage')) },
            { text: 'Appbar', path: '/appbar', id: 'item-appbar', component: lazy(() => import('./pages/AppBarPage')) },
            { text: 'Card', path: '/card', id: 'item-card', component: lazy(() => import('./pages/CardPage')) },
        ],
    },
    {
        title: 'Feedback',
        id: 'group-feedback',
        items: [
            { text: 'Alert', path: '/alert', id: 'item-alert', component: lazy(() => import('./pages/AlertPage')) },
            { text: 'Dialog', path: '/dialog', id: 'item-dialog', component: lazy(() => import('./pages/DialogPage')) },
            { text: 'Progress', path: '/progress', id: 'item-progress', component: lazy(() => import('./pages/ProgressPage')) },
        ],
    },
    {
        title: 'Layout',
        id: 'group-layout',
        items: [
            { text: 'Grid', path: '/grid', id: 'item-grid', component: lazy(() => import('./pages/GridPage')) },
            { text: 'Image List', path: '/image-list', id: '/item-image-list', component: lazy(() => import('./pages/ImageListPage')) }
        ],
    },
    {
        title: 'Foundations',
        id: 'group-foundations',
        items: [
            { text: 'Typography', path: '/typography', id: 'item-typography', component: lazy(() => import('./pages/TypographyPage')) },
        ],
    },
    {
        title: 'MUI X',
        id: 'group-mui-x',
        items: [
            { text: 'Data Grid', path: '/data-grid', id: 'item-data-grid', component: lazy(() => import('./pages/DataGridPage')) },
            { text: 'Date', path: '/date-picker', id: 'item-date-picker', component: lazy(() => import('./pages/DatePickerPage')) },
            {
                text: 'Date Time',
                path: '/date-time',
                id: 'item-date-time',
                component: lazy(() =>
                    import('./pages/DateTimePage').then(module => ({ default: module.DateTimePage }))
                ),
            },
            {
                text: 'Time',
                path: '/time',
                id: 'item-time',
                component: lazy(() =>
                    import('./pages/TimePage').then(module => ({ default: module.TimePage }))
                ),
            },
        ],
    },
];