// D:/ds_mui_new/src/contexts/ThemeModeContext.tsx

import React, { createContext, useState, useMemo, useContext, ReactNode } from 'react';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
// [핵심 1] CssBaseline을 여기서 import 합니다.
import { CssBaseline, PaletteMode } from '@mui/material';
import { getTheme } from '../theme';

interface ThemeModeContextType {
    toggleThemeMode: () => void;
    mode: PaletteMode;
}

const ThemeModeContext = createContext<ThemeModeContextType>({
    toggleThemeMode: () => {},
    mode: 'light',
});

interface ThemeModeProviderProps {
    children: ReactNode;
}

export function ThemeModeProvider({ children }: ThemeModeProviderProps) {
    const [mode, setMode] = useState<PaletteMode>('light');

    const themeMode = useMemo(
        () => ({
            toggleThemeMode: () => {
                setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
            },
            mode,
        }),
        [mode]
    );

    const theme = useMemo(() => getTheme(mode), [mode]);

    return (
        <ThemeModeContext.Provider value={themeMode}>
            {/* [핵심 2] MuiThemeProvider가 테마를 적용하고, 그 안에서 CssBaseline을 렌더링합니다. */}
            {/* 이렇게 하면 CssBaseline이 우리가 theme.ts에서 정의한 커스텀 스타일을 적용받게 됩니다. */}
            <MuiThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </MuiThemeProvider>
        </ThemeModeContext.Provider>
    );
}

export const useThemeMode = () => useContext(ThemeModeContext);