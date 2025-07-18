import React from 'react';
import { ToggleButtonGroup, ToggleButton } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useThemeMode } from '../../contexts/ThemeModeContext';

// 그룹 전체를 감싸는 스타일을 새로 정의합니다.
const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
    // AppBar의 흰색 텍스트와 어울리도록 반투명한 흰색 테두리를 추가합니다.
    border: `1px solid ${alpha(theme.palette.common.white, 0.23)}`,
    // 그룹의 모서리를 둥글게 만듭니다.
    borderRadius: theme.shape.borderRadius,
}));

// 개별 버튼 스타일은 그대로 유지합니다.
// border: 'none' 속성 덕분에 그룹의 테두리와 충돌하지 않습니다.
const StyledToggleButton = styled(ToggleButton)(({ theme }) => ({
    color: 'inherit',
    border: 'none',
    padding: '8px',
    // 선택되었을 때의 스타일
    '&.Mui-selected': {
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        color: theme.palette.common.white,
        // 선택된 상태에서 마우스를 올렸을 때
        '&:hover': {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
    },
}));

export function ThemeModeButtonGroup() {
    // [수정] themeMode가 아니라, 컨텍스트에서 제공하는 'mode'를 받습니다.
    const { mode, toggleThemeMode } = useThemeMode();

    const handleModeChange = (
        event: React.MouseEvent<HTMLElement>,
        newMode: 'light' | 'dark' | null,
    ) => {
        // [수정] 비교 대상도 'mode'로 변경합니다.
        if (newMode !== null && newMode !== mode) {
            toggleThemeMode();
        }
    };

    return (
        // 기본 ToggleButtonGroup 대신 새로 만든 StyledToggleButtonGroup을 사용합니다.
        <StyledToggleButtonGroup
            // [수정] value도 'mode'로 변경합니다.
            value={mode}
            exclusive
            onChange={handleModeChange}
            aria-label="theme mode"
        >
            <StyledToggleButton value="light" aria-label="light mode">
                <LightModeIcon fontSize="small" />
            </StyledToggleButton>
            <StyledToggleButton value="dark" aria-label="dark mode">
                <DarkModeIcon fontSize="small" />
            </StyledToggleButton>
        </StyledToggleButtonGroup>
    );
}