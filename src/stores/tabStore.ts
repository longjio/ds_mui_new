// [수정] zustand는 named export를 사용하므로, 중괄호{}로 감싸서 가져와야 합니다.
import { create } from 'zustand';
import { NavigationMenuItem } from '../types/navigation';

// 탭으로 열리는 페이지의 정보 타입
// component 정보는 라우터가 처리하므로 여기서는 제외합니다.
export interface OpenTab {
    id: string;
    text: string;
    path: string;
}

interface TabState {
    openTabs: OpenTab[];
    activeTabPath: string | null;
    addTab: (menuItem: NavigationMenuItem) => void;
    removeTab: (pathToRemove: string) => string | null; // 다음에 활성화될 탭의 경로를 반환
    setActiveTab: (path: string) => void;
}

export const useTabStore = create<TabState>((set, get) => ({
    openTabs: [],
    activeTabPath: null,

    // 새 탭 추가 로직
    addTab: (menuItem) => {
        // 이미 열려있지 않고, 경로가 있는 경우에만 추가
        if (menuItem.path && !get().openTabs.some(tab => tab.path === menuItem.path)) {
            const newTab: OpenTab = {
                id: menuItem.id,
                text: menuItem.text,
                path: menuItem.path,
            };
            set(state => ({ openTabs: [...state.openTabs, newTab] }));
        }
    },

    // 탭 제거 로직
    removeTab: (pathToRemove) => {
        const { openTabs, activeTabPath } = get();
        const tabIndex = openTabs.findIndex(tab => tab.path === pathToRemove);
        if (tabIndex === -1) return null;

        const newTabs = openTabs.filter(tab => tab.path !== pathToRemove);
        set({ openTabs: newTabs });

        // 닫는 탭이 현재 활성 탭이 아니면 아무것도 안 함
        if (activeTabPath !== pathToRemove) {
            return null;
        }

        // 닫는 탭이 활성 탭이었을 경우, 새로운 활성 탭을 찾아 경로를 반환
        if (newTabs.length === 0) {
            set({ activeTabPath: null });
            return '/'; // 모든 탭이 닫히면 홈으로
        }

        // 닫힌 탭의 바로 이전 탭을 활성화
        const newActiveIndex = Math.max(0, tabIndex - 1);
        const newActiveTabPath = newTabs[newActiveIndex].path;
        set({ activeTabPath: newActiveTabPath });
        return newActiveTabPath;
    },

    // 활성 탭 변경 로직
    setActiveTab: (path) => {
        set({ activeTabPath: path });
    },
}));