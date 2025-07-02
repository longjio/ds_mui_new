// src/components/DsToggleButton.tsx
import React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup, { ToggleButtonGroupProps } from '@mui/material/ToggleButtonGroup';
import { SxProps, Theme } from '@mui/material/styles';

interface ToggleButtonOption {
    value: string;
    label?: React.ReactNode; // 텍스트 레이블
    icon?: React.ReactNode;  // 아이콘
    ariaLabel?: string;      // 접근성을 위한 aria-label
}

interface DsToggleButtonProps extends Omit<ToggleButtonGroupProps, 'value' | 'onChange' | 'children'> {
    options: ToggleButtonOption[];
    value: string | string[] | null; // null을 허용하여 아무것도 선택되지 않은 상태 표현
    onChange: (event: React.MouseEvent<HTMLElement>, newValue: string | string[] | null) => void;
    // ToggleButtonGroup에 직접 적용할 sx prop
    sx?: SxProps<Theme>;
    // 개별 ToggleButton에 적용할 sx prop (모든 버튼에 일괄 적용)
    buttonSx?: SxProps<Theme>;
}

const DsToggleButton: React.FC<DsToggleButtonProps> = ({
                                                           options,
                                                           value,
                                                           onChange,
                                                           exclusive = false, // 기본값: 다중 선택 가능
                                                           sx,
                                                           buttonSx,
                                                           ...rest // 나머지 ToggleButtonGroupProps (size, color, orientation 등)
                                                       }) => {
    return (
        <ToggleButtonGroup
            value={value}
            exclusive={exclusive}
            onChange={onChange}
            aria-label={exclusive ? "exclusive selection toggle button group" : "multiple selection toggle button group"}
            sx={sx}
            {...rest}
        >
            {options.map((option) => (
                <ToggleButton
                    key={option.value}
                    value={option.value}
                    aria-label={option.ariaLabel || (typeof option.label === 'string' ? option.label : option.value)}
                    sx={buttonSx}
                >
                    {option.icon}
                    {option.icon && option.label && <span style={{ marginLeft: option.icon && option.label ? '8px' : '0' }}>{option.label}</span>}
                    {!option.icon && option.label}
                </ToggleButton>
            ))}
        </ToggleButtonGroup>
    );
};

export default DsToggleButton;