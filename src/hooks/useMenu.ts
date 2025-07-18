import { useState, useEffect } from 'react';
import { fetchMenuData } from '../api/services/menuService';
import { MenuGroup as AppMenuGroup } from '../app-routes';

export function useMenu() {
    const [menuData, setMenuData] = useState<AppMenuGroup[]>([]);
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