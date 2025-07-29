import 'pretendard/dist/web/static/pretendard.css';
import { createTheme, ThemeOptions, Theme } from '@mui/material/styles';
import { PaletteMode } from '@mui/material';
import '@mui/x-data-grid/themeAugmentation';
import React from 'react';

// TypeScript 모듈 확장 (기존 코드와 동일, 훌륭합니다)
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

// [개선] 공통 설정 (기존 코드와 동일, 구조가 좋습니다)
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
            styleOverrides: { root: { boxShadow: 'none' } },
        },
        MuiPaper: {
            styleOverrides: {
                root: ({ theme }: { theme: Theme }) => ({
                    // 1. 기존 그림자 효과를 제거합니다.
                    boxShadow: 'none',
                    border: `1px solid ${theme.palette.divider}`,
                    // borderRadius: 0,
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

// [개선] 라이트/다크 모드 팔레트 (기존 코드와 동일)
const lightPalette: ThemeOptions['palette'] = {
    mode: 'light',
    primary: { main: '#323F53' },
    background: { default: '#ffffff', paper: '#ffffff' },
    text: { primary: '#1A2027', secondary: '#3E5060' },
    divider: 'rgba(0, 0, 0, 0.12)',
    charts: { main: '#323F53', secondary: '#82aaff', axis: '#637381' },
};

const darkPalette: ThemeOptions['palette'] = {
    mode: 'dark',
    primary: { main: '#A8B0BC' },
    background: { default: '#121212', paper: '#1e1e1e' },
    text: { primary: '#E0E3E7', secondary: '#B0B8C4' },
    divider: 'rgba(255, 255, 255, 0.12)',
    charts: { main: '#A8B0BC', secondary: '#5c85d6', axis: '#919EAB' },
};

// [개선] 생성된 테마를 캐싱하여 불필요한 재계산을 방지
const themeCache: { [key in PaletteMode]?: Theme } = {};

export const getTheme = (mode: PaletteMode): Theme => {
    // 캐시에 테마가 있으면 즉시 반환
    if (themeCache[mode]) {
        return themeCache[mode] as Theme;
    }

    // 캐시에 없으면 새로 생성
    const palette = mode === 'light' ? lightPalette : darkPalette;
    const newTheme = createTheme({
        ...commonSettings(mode),
        palette,
    });

    // 생성된 테마를 캐시에 저장
    themeCache[mode] = newTheme;
    return newTheme;
};