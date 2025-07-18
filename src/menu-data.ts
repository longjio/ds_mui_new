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
 * appRoutes의 중첩 구조를 올바르게 탐색하여 특정 그룹에 속하는 모든 메뉴 아이템을 찾는, 더 똑똑해진 함수.
 */
const findItemsForGroup = (routes: AppRouteConfig[], targetGroupId: string): MenuItem[] => {
    const menuItems: MenuItem[] = [];

    for (const route of routes) {
        // 현재 라우트의 메뉴 그룹이 타겟 그룹과 일치하는지 확인
        if (route.menu?.group === targetGroupId) {

            // Case 1: 이 라우트가 자식을 가지고 있다면, 자식들이 실제 메뉴 아이템입니다. (예: Components)
            if (route.children) {
                const childItems = route.children
                    .filter(child => child.menu && child.component) // 메뉴 정보와 컴포넌트가 있는 자식만 필터링
                    .map(child => {
                        // 전체 경로 목록에서 정확한 경로 정보를 찾아옵니다.
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
            // Case 2: 이 라우트가 자식이 없다면, 이 라우트 자체가 메뉴 아이템입니다. (예: Foundations)
            else if (route.component) {
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
        }
    }
    return menuItems;
};

// 새로 만든 findItemsForGroup 함수를 사용하여 메뉴 구조를 생성합니다.
export const menuStructure: MenuGroup[] = menuGroups.map(groupInfo => ({
    ...groupInfo,
    items: findItemsForGroup(appRoutes, groupInfo.id),
}));