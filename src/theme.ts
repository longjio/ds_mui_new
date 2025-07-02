import 'pretendard/dist/web/static/pretendard.css';
import { createTheme, ThemeOptions, Theme } from '@mui/material/styles';
import { PaletteMode } from '@mui/material';
import '@mui/x-data-grid/themeAugmentation';

// TypeScript에게 새로운 팔레트 및 컴포넌트 속성을 알려주기 위한 모듈 확장
declare module '@mui/material/styles' {
    // Palette와 PaletteOptions에 새로운 속성을 추가합니다.
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

    // 이것이 최신 DataGrid 테마 커스터마이징의 올바른 방법입니다.
    interface Components {
        MuiDataGrid: {
            styleOverrides?: {
                root?: React.CSSProperties | ((props: { theme: Theme }) => React.CSSProperties);
                // 필요하다면 다른 DataGrid 슬롯에 대한 타입도 여기에 추가할 수 있습니다.
            };
        };
    }
}

// 공통으로 사용할 테마 옵션을 정의합니다.
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
        h1: {
            fontSize: '2.25rem',
            fontWeight: 600,
        },
        button: {
            textTransform: 'none', // 버튼 텍스트 대문자 변환 비활성화
        },
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: (theme: Theme) => ({
                body: {
                    // 테마 모드에 따라 스크롤바 색상을 동적으로 설정합니다.
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
                    '&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus': {
                        backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : theme.palette.grey[500],
                    },
                    '&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active': {
                        backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : theme.palette.grey[500],
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
                    // 첫 번째 아코디언을 제외하고 상단 테두리를 겹치지 않게 합니다.
                    '&:not(:first-of-type)': {
                        borderTop: 'none',
                    },
                    // 확장되었을 때 불필요한 margin을 제거합니다.
                    '&.Mui-expanded': {
                        margin: 0,
                    },
                    boxShadow: 'none', // 기본 그림자 제거
                    // 첫 번째와 마지막 요소의 radius를 제거하여 그룹처럼 보이게 합니다.
                    '&:first-of-type': {
                        borderTopLeftRadius: 0,
                        borderTopRightRadius: 0,
                    },
                    '&:last-of-type': {
                        borderBottomLeftRadius: 0,
                        borderBottomRightRadius: 0,
                    },
                }),
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    boxShadow: 'none',
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    // Paper 컴포넌트의 기본 그림자를 좀 더 부드럽게 설정
                    boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
                },
            },
        },
        MuiDataGrid: {
            styleOverrides: {
                root: ({ theme }: { theme: Theme }) => ({
                    // DataGrid의 기본 배경색을 테마의 paper 색상으로 지정합니다.
                    '--DataGrid-t-color-background-base': theme.palette.background.paper,
                    // 테두리 색상도 테마와 일관성을 맞춥니다.
                    border: `1px solid ${theme.palette.divider}`,
                }),
            },
        },
    },
    spacing: 4, // 기본 간격 단위 (예: theme.spacing(2) === 8px)
});

// 라이트 모드 색상 팔레트
const lightPalette: ThemeOptions['palette'] = {
    mode: 'light',
    primary: {
        main: '#323F53',
    },
    background: {
        default: '#f4f6f8',
        paper: '#ffffff',
    },
    text: {
        primary: '#1A2027',
        secondary: '#3E5060',
    },
    divider: 'rgba(0, 0, 0, 0.12)',
    charts: {
        main: '#323F53',
        secondary: '#82aaff',
        axis: '#637381',
    },
};

// 다크 모드 색상 팔레트
const darkPalette: ThemeOptions['palette'] = {
    mode: 'dark',
    primary: {
        main: '#A8B0BC',
    },
    background: {
        default: '#121212',
        paper: '#1e1e1e',
    },
    text: {
        primary: '#E0E3E7',
        secondary: '#B0B8C4',
    },
    divider: 'rgba(255, 255, 255, 0.12)',
    charts: {
        main: '#A8B0BC',
        secondary: '#5c85d6',
        axis: '#919EAB',
    },
};

// 최종 테마를 생성하는 함수
export const getTheme = (mode: PaletteMode) => {
    const palette = mode === 'light' ? lightPalette : darkPalette;
    return createTheme({
        ...commonSettings(mode),
        palette,
    });
};