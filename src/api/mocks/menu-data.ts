// D:/ds_mui_new/src/api/mocks/menu-data.ts

// 이 파일은 실제 API 응답을 모방한 순수 데이터입니다.
// component 정보는 프론트엔드에서 매핑할 것이므로 여기서는 제외합니다.

// MenuGroup의 타입 정의에서 component를 제외한 순수 데이터 타입
export interface MockMenuItem {
    text: string;
    id: string;
    path?: string;
    children?: MockMenuItem[];
}

export interface MockMenuGroup {
    title: string;
    id: string;
    items: MockMenuItem[];
}

// 실제 API가 이런 형식으로 데이터를 줄 것이라고 가정합니다.
// 모든 component 속성을 제거하여 순수 데이터로 만듭니다.
export const mockMenuApiResponse: MockMenuGroup[] = [
    {
        title: 'Button',
        id: 'group-button',
        items: [
            { text: 'Button', path: '/button', id: 'item-button' },
            { text: 'ButtonGroup', path: '/button-group', id: 'item-button-group' },
        ],
    },
    {
        title: 'Input',
        id: 'item-input-parent',
        items: [
            { text: 'Autocomplete', path: '/autocomplete', id: 'item-autocomplete' },
            { text: 'Textfield', path: '/textfield', id: 'item-textfield' },
            { text: 'Select', path: '/select', id: 'item-select' },
            { text: 'Checkbox', path: '/checkbox', id: 'item-checkbox' },
            { text: 'Radio Group', path: '/radio-group', id: 'item-radio-group' },
            { text: 'Rating', path: '/rating', id: 'item-rating' },
            { text: 'Slider', path: '/slider', id: 'item-slider' },
            { text: 'Switch', path: '/switch', id: 'item-switch' },
        ],
    },
    {
        title: 'Navigation',
        id: 'group-navigation',
        items: [
            { text: 'Bottom Navigation', path: '/bottom-nav', id: 'item-bottom-nav' },
            { text: 'Breadcrumbs', path: '/breadcrumbs', id: 'item-breadcrumbs' },
            { text: 'Drawer', path: '/drawer', id: 'item-drawer' },
            { text: 'Menu', path: '/menu', id: 'item-menu' },
            { text: 'Pagination', path: '/pagination', id: 'item-pagination' },
            { text: 'Speed Dial', path: '/speed-dial', id: 'item-speed-dial' },
            { text: 'Stepper', path: '/stepper', id: 'item-stepper' },
            { text: 'Tabs', path: '/tabs', id: 'item-tabs' },
        ],
    },
    {
        title: 'Surface',
        id: 'group-surface',
        items: [
            { text: 'Accordion', path: '/accordion', id: 'item-accordion' },
            { text: 'Appbar', path: '/appbar', id: 'item-appbar' },
            { text: 'Card', path: '/card', id: 'item-card' },
        ],
    },
    {
        title: 'Feedback',
        id: 'group-feedback',
        items: [
            { text: 'Alert', path: '/alert', id: 'item-alert' },
            { text: 'Dialog', path: '/dialog', id: 'item-dialog' },
            { text: 'Progress', path: '/progress', id: 'item-progress' },
        ],
    },
    {
        title: 'Layout',
        id: 'group-layout',
        items: [
            { text: 'Grid', path: '/grid', id: 'item-grid' },
            // [수정] id 값의 오타를 수정했습니다.
            { text: 'Image List', path: '/image-list', id: 'item-image-list' }
        ],
    },
    {
        title: 'Foundations',
        id: 'group-foundations',
        items: [
            { text: 'Typography', path: '/typography', id: 'item-typography' },
        ],
    },
    {
        title: 'MUI X',
        id: 'group-mui-x',
        items: [
            { text: 'Data Grid', path: '/data-grid', id: 'item-data-grid' },
            { text: 'Date', path: '/date-picker', id: 'item-date-picker' },
            { text: 'Date Time', path: '/date-time', id: 'item-date-time' },
            { text: 'Time', path: '/time', id: 'item-time' },
            { text: 'Tree', path: '/tree', id: 'item-tree' },
        ],
    },
];