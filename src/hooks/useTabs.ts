// D:/ds_mui_new/src/hooks/useTabs.ts

import { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
// [개선] 타입의 원본 소스인 'types/menu'에서 직접 가져옵니다.
import { MenuItem } from '../types/menu';

// [개선] 별칭(AppMenuItem) 없이 원본 타입 이름을 그대로 사용합니다.
export function useTabs(initialTabs: MenuItem[] = []) {
    const navigate = useNavigate();
    const location = useLocation();

    const [openTabs, setOpenTabs] = useState<MenuItem[]>(initialTabs);
    const [activeTabPath, setActiveTabPath] = useState<string>('/');

    useEffect(() => {
        setActiveTabPath(location.pathname);
    }, [location.pathname]);

    const handleMenuClick = useCallback((item: MenuItem) => {
        if (item.path) {
            if (!openTabs.some(tab => tab.id === item.id)) {
                setOpenTabs(prev => [...prev, item]);
            }
            navigate(item.path);
        }
    }, [navigate, openTabs]);

    const handleTabChange = (event: React.SyntheticEvent, newPath: string) => {
        navigate(newPath);
    };

    const handleCloseTab = useCallback((e: React.MouseEvent, tabToClose: MenuItem) => {
        e.stopPropagation();
        const newTabs = openTabs.filter(tab => tab.id !== tabToClose.id);
        setOpenTabs(newTabs);

        if (activeTabPath === tabToClose.path) {
            const lastTab = newTabs.length > 0 ? newTabs[newTabs.length - 1] : initialTabs[0];
            navigate(lastTab?.path || '/app');
        }
    }, [navigate, openTabs, activeTabPath, initialTabs]);

    const handleCloseAllTabs = useCallback(() => {
        setOpenTabs(initialTabs);
        navigate('/app');
    }, [navigate, initialTabs]);

    return {
        openTabs,
        activeTabPath,
        handleMenuClick,
        handleTabChange,
        handleCloseTab,
        handleCloseAllTabs,
        setOpenTabs
    };
}