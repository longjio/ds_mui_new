import React, { createContext, useState, useMemo, useContext, useEffect } from 'react';

type ThemeMode = 'light' | 'dark';

// Context가 제공할 값의 타입 정의
interface ThemeContextType {
    mode: ThemeMode;
    // 1. 여기에 setMode 타입을 추가합니다.
    setMode: (newMode: ThemeMode) => void;
}

// Context 생성
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Provider 컴포넌트
export const ThemeContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [mode, setMode] = useState<ThemeMode>(() => {
        const storedMode = localStorage.getItem('themeMode') as ThemeMode;
        if (storedMode) {
            return storedMode;
        }
        const userPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        return userPrefersDark ? 'dark' : 'light';
    });

    useEffect(() => {
        localStorage.setItem('themeMode', mode);
    }, [mode]);

    // 2. Context를 통해 mode 상태와 setMode 함수를 함께 제공합니다.
    const value = useMemo(() => ({ mode, setMode }), [mode]);

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

// Context를 쉽게 사용하기 위한 커스텀 훅
export const useThemeContext = () => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useThemeContext must be used within a ThemeContextProvider');
    }
    return context;
};