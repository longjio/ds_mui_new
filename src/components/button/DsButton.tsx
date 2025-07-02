// src/components/button/DsButton.tsx

import * as React from 'react';
import Button, { ButtonProps as MuiButtonProps } from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress'; // 로딩 상태를 위한 임포트
import Box from '@mui/material/Box'; // <--- 이 줄을 여기로 옮깁니다!

// DsButtonProps 정의: MuiButtonProps를 확장하여 필요한 props를 추가하거나 수정합니다.
// 여기서는 'variant', 'color', 'size' 등의 기본값을 설정하거나,
// DsButton만의 고유한 prop (예: loading)을 추가할 수 있습니다.
export interface DsButtonProps extends Omit<MuiButtonProps, 'variant' | 'color' | 'size'> {
    /**
     * 버튼의 시각적 스타일을 결정합니다.
     * @default 'contained'
     */
    variant?: 'contained' | 'outlined' | 'text';
    /**
     * 버튼의 색상을 결정합니다. 테마 색상 팔레트를 사용합니다.
     * @default 'primary'
     */
    color?: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';
    /**
     * 버튼의 크기를 결정합니다.
     * @default 'medium'
     */
    size?: 'small' | 'medium' | 'large';
    /**
     * true로 설정하면 버튼 내부에 로딩 스피너를 표시하고 버튼을 비활성화합니다.
     * @default false
     */
    loading?: boolean;
    /**
     * 로딩 스피너의 위치를 결정합니다.
     * @default 'start'
     */
    loadingPosition?: 'start' | 'end' | 'center';
    /**
     * 로딩 상태일 때 표시될 텍스트입니다. 설정하지 않으면 기존 버튼 텍스트가 유지됩니다.
     */
    loadingIndicator?: React.ReactNode;
}

export function DsButton({
                             children,
                             variant = 'contained', // 기본 variant 설정
                             color = 'primary',     // 기본 color 설정
                             size = 'medium',      // 기본 size 설정
                             disabled = false,
                             loading = false,
                             loadingPosition = 'start',
                             loadingIndicator,
                             onClick,
                             ...rest // 나머지 MuiButtonProps (예: href, fullWidth, startIcon, endIcon 등)
                         }: DsButtonProps) {

    const actualDisabled = disabled || loading; // 로딩 중일 때는 항상 비활성화

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        if (!actualDisabled && onClick) {
            onClick(event);
        }
    };

    const defaultLoadingIndicator = <CircularProgress color="inherit" size={20} />;
    const indicator = loadingIndicator || defaultLoadingIndicator;

    return (
        <Button
            variant={variant}
            color={color}
            size={size}
            disabled={actualDisabled}
            onClick={handleClick}
            {...rest} // startIcon, endIcon 등 나머지 props 전달
        >
            {loading && loadingPosition === 'start' && (
                <Box component="span" sx={{ display: 'inherit', mr: children ? 1 : 0, ml: -0.5 }}>
                    {indicator}
                </Box>
            )}
            {loading && loadingPosition === 'center' && !children && (
                <Box component="span" sx={{ display: 'inherit' }}>
                    {indicator}
                </Box>
            )}
            {!(loading && loadingPosition === 'center' && !children) && children}
            {loading && loadingPosition === 'end' && (
                <Box component="span" sx={{ display: 'inherit', ml: children ? 1 : 0, mr: -0.5 }}>
                    {indicator}
                </Box>
            )}
        </Button>
    );
}

// Box 컴포넌트를 사용하기 위해 임포트 (로딩 인디케이터 위치 조정용)
// import Box from '@mui/material/Box'; // <--- 이 줄은 삭제하거나 주석 처리합니다.