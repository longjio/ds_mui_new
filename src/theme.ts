// D:/ds_mui_new/src/theme.ts

import 'pretendard/dist/web/static/pretendard.css';
import { createTheme, ThemeOptions, Theme } from '@mui/material/styles';
import { PaletteMode } from '@mui/material';
import '@mui/x-data-grid/themeAugmentation';
import React from 'react';

// TypeScript 모듈 확장 (기존과 동일)
declare module '@mui/material/styles' {
    interface Palette {
        charts: {
            main: string;
            secondary: string;
            axis: string;
        };
    }
    interface PaletteOptions {
        charts?: {
            main?: string;
            secondary?: string;
            axis?: string;
        };
    }
    interface Components {
        MuiDataGrid: {
            styleOverrides?: {
                root?: React.CSSProperties | ((props: { theme: Theme }) => React.CSSProperties);
            };
        };
    }
}

const commonSettings = (mode: PaletteMode): ThemeOptions => ({
    typography: {
        fontFamily: [
            'Pretendard',
            '-apple-system',
            'BlinkMacSystemFont',
            'system-ui',
            'Roboto',
            '"Helvetica Neue"',
            '"Apple SD Gothic Neo"',
            '"Noto Sans KR"',
            'sans-serif',
        ].join(','),
        h1: { fontSize: '2.25rem', fontWeight: 600 },
        button: { textTransform: 'none' },
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: (theme: Theme) => ({
                body: {
                    scrollbarColor: `${theme.palette.mode === 'dark' ? theme.palette.grey[800] : theme.palette.grey[400]} ${theme.palette.background.default}`,
                    '&::-webkit-scrollbar, & *::-webkit-scrollbar': {
                        backgroundColor: 'transparent',
                        width: '8px',
                    },
                    '&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb': {
                        borderRadius: 8,
                        backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : theme.palette.grey[400],
                        minHeight: 24,
                    },
                    '&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover': {
                        backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : theme.palette.grey[500],
                    },
                },
                // --- ★★★ 핵심 수정 사항 ★★★ ---
                // 모바일 환경에서 300ms 탭(클릭) 딜레이를 제거하기 위한 전역 스타일입니다.
                // 모든 링크, 버튼 및 버튼 역할을 하는 요소에 적용됩니다.
                'a, button, [role="button"], .MuiListItemButton-root, .MuiCard-root, .MuiIconButton-root': {
                    touchAction: 'manipulation',
                },
            }),
        },
        MuiAccordion: {
            styleOverrides: {
                root: ({ theme }: { theme: Theme }) => ({
                    border: `1px solid ${theme.palette.divider}`,
                    '&:not(:first-of-type)': { borderTop: 'none' },
                    '&.Mui-expanded': { margin: 0 },
                    boxShadow: 'none',
                    '&:first-of-type': { borderTopLeftRadius: 0, borderTopRightRadius: 0 },
                    '&:last-of-type': { borderBottomLeftRadius: 0, borderBottomRightRadius: 0 },
                }),
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    boxShadow: 'none',
                    border: 0,
                }
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: ({ theme }: { theme: Theme }) => ({
                    boxShadow: 'none',
                    border: `1px solid ${theme.palette.divider}`,
                }),
            },
        },
        MuiDataGrid: {
            styleOverrides: {
                root: ({ theme }: { theme: Theme }) => ({
                    '--DataGrid-t-color-background-base': theme.palette.background.paper,
                    border: `1px solid ${theme.palette.divider}`,
                }),
            },
        },
    },
    spacing: 4,
});

const customSuccessPalette = {
    main: '#019AB2',
    light: '#63D4E6',
    dark: '#12B886',
    contrastText: '#ffffff',
};

const lightPalette: ThemeOptions['palette'] = {
    mode: 'light',
    primary: { main: '#323F53' },
    success: customSuccessPalette,
    background: { default: '#ffffff', paper: '#ffffff' },
    text: { primary: '#1A2027', secondary: '#3E5060' },
    divider: 'rgba(0, 0, 0, 0.12)',
    charts: { main: '#323F53', secondary: '#82aaff', axis: '#637381' },
};

const darkPalette: ThemeOptions['palette'] = {
    mode: 'dark',
    primary: { main: '#A8B0BC' },
    success: customSuccessPalette,
    background: { default: '#121212', paper: '#1e1e1e' },
    text: { primary: '#E0E3E7', secondary: '#B0B8C4' },
    divider: 'rgba(255, 255, 255, 0.12)',
    charts: { main: '#A8B0BC', secondary: '#5c85d6', axis: '#919EAB' },
};

const themeCache: { [key in PaletteMode]?: Theme } = {};

export const getTheme = (mode: PaletteMode): Theme => {
    if (themeCache[mode]) {
        return themeCache[mode] as Theme;
    }
    const palette = mode === 'light' ? lightPalette : darkPalette;
    const newTheme = createTheme({
        ...commonSettings(mode),
        palette,
    });
    themeCache[mode] = newTheme;
    return newTheme;
};