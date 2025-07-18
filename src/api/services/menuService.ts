// D:/ds_mui_new/src/api/services/menuService.ts

// [중요] 이 파일은 이제 매우 단순해집니다.
// menu-data.ts에서 동적으로 생성된 메뉴 구조를 그대로 가져오는 역할만 합니다.
import { menuStructure } from '../../menu-data';
import { MenuGroup } from '../../types/menu';

/**
 * 메뉴 데이터를 가져옵니다.
 * 현재는 로컬 파일(menu-data.ts)에서 동적으로 생성된 정적 데이터를 가져옵니다.
 * 나중에 실제 애플리케이션에서는 이 함수가 백엔드 API를 호출하도록 수정될 수 있습니다.
 */
export const fetchMenuData = async (): Promise<MenuGroup[]> => {
    // API 호출을 시뮬레이션하기 위해 약간의 지연 시간을 추가할 수 있습니다.
    return new Promise(resolve => {
        setTimeout(() => {
            // 복잡한 로직 없이, menu-data.ts에서 생성된 데이터를 그대로 반환합니다.
            resolve(menuStructure);
        }, 100); // 100ms 지연 (로딩 스피너를 확인하기 위함)
    });
};