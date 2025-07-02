import React from 'react';
import { Button, ButtonGroup } from '@mui/material';
import { useThemeContext } from '../contexts/ThemeContext';
import Brightness7Icon from '@mui/icons-material/Brightness7'; // Sun icon
import Brightness4Icon from '@mui/icons-material/Brightness4'; // Moon icon

export const ThemeModeButtonGroup = () => {
    // 수정된 Context로부터 mode와 setMode를 가져옵니다.
    const { mode, setMode } = useThemeContext();

    return (
        <ButtonGroup variant="outlined" size="small" aria-label="light and dark mode toggle button group">
            <Button
                onClick={() => setMode('light')}
                // 현재 모드가 'light'일 때만 'contained' 스타일을 적용하여 활성화 상태를 표시합니다.
                variant={mode === 'light' ? 'contained' : 'outlined'}
                startIcon={<Brightness7Icon />}
            >
                Light
            </Button>
            <Button
                onClick={() => setMode('dark')}
                // 현재 모드가 'dark'일 때만 'contained' 스타일을 적용합니다.
                variant={mode === 'dark' ? 'contained' : 'outlined'}
                startIcon={<Brightness4Icon />}
            >
                Dark
            </Button>
        </ButtonGroup>
    );
};