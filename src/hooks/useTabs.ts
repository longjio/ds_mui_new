// D:/ds_mui_new/src/hooks/useTabs.ts

import { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { MenuItem as AppMenuItem } from '../app-routes';

export function useTabs(initialTabs: AppMenuItem[] = []) {
    const navigate = useNavigate();
    const location = useLocation();

    const [openTabs, setOpenTabs] = useState<AppMenuItem[]>(initialTabs);
    const [activeTabPath, setActiveTabPath] = useState<string>('/');

    useEffect(() => {
        setActiveTabPath(location.pathname);
    }, [location.pathname]);

    const handleMenuClick = useCallback((item: AppMenuItem) => {
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

    const handleCloseTab = useCallback((e: React.MouseEvent, tabToClose: AppMenuItem) => {
        e.stopPropagation();
        const newTabs = openTabs.filter(tab => tab.id !== tabToClose.id);
        setOpenTabs(newTabs);

        if (activeTabPath === tabToClose.path) {
            const lastTab = newTabs.length > 0 ? newTabs[newTabs.length - 1] : initialTabs[0];
            navigate(lastTab?.path || '/app');
        }
    }, [navigate, openTabs, activeTabPath, initialTabs]);

    // [핵심] '전체 닫기' 로직을 추가합니다.
    const handleCloseAllTabs = useCallback(() => {
        // 초기 탭(About Project)만 남깁니다.
        setOpenTabs(initialTabs);
        // 홈으로 이동시킵니다.
        navigate('/app');
    }, [navigate, initialTabs]);


    // [수정] 새로 만든 함수를 반환 객체에 포함시킵니다.
    return {
        openTabs,
        activeTabPath,
        handleMenuClick,
        handleTabChange,
        handleCloseTab,
        handleCloseAllTabs, // 전체 닫기 함수 추가
        setOpenTabs
    };
}