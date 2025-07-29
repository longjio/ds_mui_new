// D:/ds_mui_new/src/components/button/DsButton.tsx

import * as React from 'react';
import Button, { ButtonProps as MuiButtonProps } from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { SxProps, Theme } from '@mui/material/styles';

// DsButtonProps 정의: MuiButtonProps를 확장하여 필요한 props를 추가하거나 수정합니다.
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
     * 'xlarge'는 커스텀 크기입니다.
     * @default 'medium'
     */
    size?: 'small' | 'medium' | 'large' | 'xlarge';
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
                             variant = 'contained',
                             color = 'primary',
                             size = 'medium',
                             disabled = false,
                             disableElevation = true,
                             loading = false,
                             loadingPosition = 'start',
                             loadingIndicator,
                             onClick,
                             sx,
                             ...rest
                         }: DsButtonProps) {

    const actualDisabled = disabled || loading;

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        if (!actualDisabled && onClick) {
            onClick(event);
        }
    };

    const defaultLoadingIndicator = <CircularProgress color="inherit" size={20} />;
    const indicator = loadingIndicator || defaultLoadingIndicator;

    const xlargeStyles: SxProps<Theme> = {
        padding: '12px 28px',
        fontSize: '1rem', // 16px
    };

    // 'xlarge'는 MUI Button의 유효한 prop이 아니므로, sx prop으로 스타일을 직접 제어합니다.
    // 기본 스타일은 medium을 따르도록 설정하고, sx로 덮어씁니다.
    const muiButtonSize = size !== 'xlarge' ? size : 'medium';

    return (
        <Button
            variant={variant}
            color={color}
            size={muiButtonSize}
            disabled={actualDisabled}
            disableElevation={disableElevation}
            onClick={handleClick}
            sx={{
                ...(size === 'xlarge' && xlargeStyles),
                ...sx,
            }}
            {...rest}
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