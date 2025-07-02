// D:/ds_mui/src/components/button/DsButtonGroup.tsx

import * as React from 'react';
import ButtonGroup, { ButtonGroupProps as MuiButtonGroupProps } from '@mui/material/ButtonGroup';

// DsButtonGroupProps 정의: MuiButtonGroupProps를 확장합니다.
// DsButtonGroup만의 고유한 prop을 추가하거나,
// MUI ButtonGroup의 특정 prop에 대한 기본값을 설정할 수 있습니다.
export interface DsButtonGroupProps extends MuiButtonGroupProps {
    /**
     * 그룹 내 버튼들의 시각적 스타일을 결정합니다.
     * `DsButton`의 variant와 일치시키는 것이 일반적입니다.
     * @default 'contained'
     */
    variant?: 'contained' | 'outlined' | 'text';
    /**
     * 그룹 내 버튼들의 색상을 결정합니다.
     * @default 'primary'
     */
    color?: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';
    /**
     * 그룹 내 버튼들의 크기를 결정합니다.
     * @default 'medium'
     */
    size?: 'small' | 'medium' | 'large';
    /**
     * 버튼 그룹의 정렬 방향을 결정합니다.
     * @default 'horizontal'
     */
    orientation?: 'horizontal' | 'vertical';
    // 여기에 DsButtonGroup만의 추가적인 props를 정의할 수 있습니다.
    // 예를 들어, 특정 레이아웃을 위한 커스텀 prop 등
}

export function DsButtonGroup({
                                  children,
                                  variant = 'contained', // 기본 variant 설정
                                  color = 'primary',     // 기본 color 설정
                                  size = 'medium',       // 기본 size 설정
                                  orientation = 'horizontal', // 기본 orientation 설정
                                  disabled = false,
                                  disableElevation = false, // contained variant에서 그림자 제거 여부
                                  fullWidth = false,
                                  ...rest // 나머지 MuiButtonGroupProps (예: sx, 'aria-label' 등)
                              }: DsButtonGroupProps) {
    return (
        <ButtonGroup
            variant={variant}
            color={color}
            size={size}
            orientation={orientation}
            disabled={disabled}
            disableElevation={disableElevation}
            fullWidth={fullWidth}
            {...rest} // sx, aria-label 등 나머지 props 전달
        >
            {children}
        </ButtonGroup>
    );
}