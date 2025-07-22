import { useState, useEffect } from 'react';
import { fetchMenuData } from '../api/services/menuService';
// [개선] 타입의 원본 소스인 'types/menu'에서 직접 가져옵니다.
// 이제 더 이상 'app-routes.ts'에 의존하지 않습니다.
import { MenuGroup } from '../types/menu';

export function useMenu() {
    // [개선] 별칭(AppMenuGroup) 없이 원본 타입 이름을 그대로 사용합니다.
    const [menuData, setMenuData] = useState<MenuGroup[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            try {
                const data = await fetchMenuData();
                setMenuData(data);
            } catch (error) {
                console.error("Failed to load menu data:", error);
            } finally {
                setIsLoading(false);
            }
        };
        loadData();
    }, []);

    return { menuData, isLoading };
}