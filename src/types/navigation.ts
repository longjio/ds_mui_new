import { LazyExoticComponent } from 'react';

// 애플리케이션의 메인 네비게이션(사이드바) 구조를 위한 타입 정의

export interface NavigationMenuItem {
    id: string;
    text: string;
    path: string;
    component: LazyExoticComponent<React.ComponentType<any>>;
    children?: NavigationMenuItem[];
}

export interface NavigationMenuGroup {
    id: string;
    title: string;
    items: NavigationMenuItem[];
}