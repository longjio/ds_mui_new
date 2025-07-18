// D:/ds_mui_new/src/types/menu.ts

import React from 'react';

export interface MenuItem {
    id: string;
    text: string;
    path?: string;
    // [수정] 아이콘을 컴포넌트 '타입(설계도)'이 아닌, 렌더링 가능한 '요소(완성품)'로 받도록 변경합니다.
    // React.ElementType -> React.ReactNode
    icon?: React.ReactNode;
    children?: MenuItem[];
    component?: React.ComponentType;
}

export interface MenuGroup {
    id: string;
    title: string;
    items: MenuItem[];
}