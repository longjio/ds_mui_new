// D:/ds_mui_new/src/menu-data.ts

import { appRoutes, menuGroups } from './app-config';
import { AppRouteConfig } from './app-config';
import { MenuGroup, MenuItem } from './types/menu';

// [데이터 1] 라우팅 가능한 모든 페이지 목록 (이 로직은 정상 작동하며, 수정하지 않습니다)
const processRoutesToFlatList = (routes: AppRouteConfig[], basePath = '/app'): MenuItem[] => {
    let items: MenuItem[] = [];

    routes.forEach(route => {
        const newPath = route.path === '/' ? basePath : `${basePath}${route.path}`;

        items.push({
            id: route.id,
            text: route.menu?.text ?? route.id,
            path: newPath,
            component: route.component,
            icon: route.menu?.icon,
        });

        if (route.children) {
            items = [...items, ...processRoutesToFlatList(route.children, newPath)];
        }
    });

    return items;
};
export const routableItems: MenuItem[] = processRoutesToFlatList(appRoutes);


// [데이터 2] 왼쪽 메뉴 UI를 위한 계층 구조 데이터 (로직 전면 수정)

/**
 * [핵심 수정]
 * appRoutes의 중첩 구조를 재귀적으로 탐색하여 특정 그룹에 속하는 모든 메뉴 아이템을 찾는 함수.
 * 부모-자식 관계를 유지하여 그룹 정보를 올바르게 상속받도록 합니다.
 */
const findItemsForGroup = (routes: AppRouteConfig[], targetGroupId: string): MenuItem[] => {
    let menuItems: MenuItem[] = [];

    for (const route of routes) {
        // Case 1: 현재 라우트 자체가 타겟 그룹에 속하는 단일 메뉴 아이템인 경우 (예: Foundations)
        if (route.menu?.group === targetGroupId && route.component) {
            const routableItem = routableItems.find(item => item.id === route.id);
            if (routableItem) {
                menuItems.push({
                    id: route.id,
                    text: route.menu.text,
                    path: routableItem.path,
                    icon: route.menu.icon,
                    component: route.component,
                });
            }
        }

        // Case 2: 현재 라우트가 타겟 그룹의 '컨테이너' 역할을 하고, 자식들이 실제 메뉴 아이템인 경우 (예: Components)
        if (route.children && route.menu?.group === targetGroupId) {
            const childItems = route.children
                .filter(child => child.menu && child.component) // 메뉴 정보와 컴포넌트가 있는 자식만 필터링
                .map(child => {
                    const routableItem = routableItems.find(item => item.id === child.id);
                    return {
                        id: child.id,
                        text: child.menu!.text,
                        path: routableItem?.path ?? '',
                        icon: child.menu!.icon,
                        component: child.component,
                    };
                });
            menuItems.push(...childItems);
        }
    }
    return menuItems;
};

// 새로 만든 findItemsForGroup 함수를 사용하여 메뉴 구조를 생성합니다.
export const menuStructure: MenuGroup[] = menuGroups.map(groupInfo => ({
    ...groupInfo,
    items: findItemsForGroup(appRoutes, groupInfo.id),
}));