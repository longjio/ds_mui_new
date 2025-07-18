// D:/ds_mui_new/src/app-routes.ts

import { appRoutes } from './app-config'; // 마스터 설계도를 가져옵니다.
import { LazyExoticComponent } from 'react';
import { MenuGroup, MenuItem } from './types/menu';

// 타입을 외부에서 가져오도록 수정합니다.
export type { MenuGroup, MenuItem };

/**
 * 마스터 데이터(appRoutes)를 기반으로 라우터가 사용할 componentMap을 동적으로 생성합니다.
 * 이 파일은 이제 직접 수정하지 않습니다.
 */
export const componentMap: Record<string, LazyExoticComponent<React.ComponentType<any>>> =
    appRoutes.reduce((acc, route) => {
        acc[route.path] = route.component;
        return acc;
    }, {} as Record<string, LazyExoticComponent<React.ComponentType<any>>>);