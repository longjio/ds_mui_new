// D:/ds_mui_new/src/components/input/DsSelect.tsx

import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl, { FormControlProps } from '@mui/material/FormControl';
import Select, { SelectChangeEvent, SelectProps as MuiSelectProps } from '@mui/material/Select';
import FormHelperText from '@mui/material/FormHelperText';
import { SxProps, Theme } from '@mui/material/styles';

export interface DsSelectItem {
    label: string;
    value: string | number;
    disabled?: boolean;
}

export interface DsSelectProps extends Omit<MuiSelectProps,
    'value' | 'onChange' | 'label' | 'children' | 'defaultValue' | 'renderValue'
> {
    value: string | number;
    onChange: (event: SelectChangeEvent<string | number>, child: React.ReactNode) => void;
    label: string;
    items: DsSelectItem[];
    helperText?: React.ReactNode;
    error?: FormControlProps['error'];
    required?: FormControlProps['required'];
    formControlSx?: FormControlProps['sx'];
    defaultValue?: string | number;
    renderValue?: (value: string | number) => React.ReactNode;
}

export function DsSelect({
                             value,
                             onChange,
                             label,
                             items,
                             disabled = false,
                             fullWidth = true,
                             id = 'ds-select',
                             helperText,
                             error,
                             required,
                             formControlSx,
                             variant = 'outlined',
                             size: sizeFromProps, // ★ 1. size prop을 받아옵니다.
                             defaultValue,
                             renderValue,
                             ...rest
                         }: DsSelectProps) {
    const labelId = `${id}-label`;
    // ★ 2. size의 기본값을 'medium'으로 설정합니다.
    const size = sizeFromProps ?? 'medium';

    // ★ 3. DsTextField와 동일한 동적 라벨 스타일을 정의합니다.
    const mediumSizeSx: SxProps<Theme> = {
        // 컴포넌트 높이를 50px로 고정합니다.
        '& .MuiOutlinedInput-root': {
            height: '50px',
        },
        // 라벨의 기본 위치를 재조정합니다.
        '& .MuiInputLabel-root': {
            lineHeight: '1.2em',
            transform: 'translate(14px, 16px) scale(1)',
        },
        // 값이 있거나 포커스될 때 축소되는 라벨의 위치를 보정합니다.
        '& .MuiInputLabel-shrink': {
            transform: 'translate(14px, -9px) scale(0.75)',
        },
    };

    return (
        <FormControl
            fullWidth={fullWidth}
            disabled={disabled}
            error={error}
            required={required}
            variant={variant}
            size={size} // size prop을 FormControl에 전달합니다.
            sx={{
                // ★ 4. size가 'medium'일 때만 정의한 스타일을 적용합니다.
                ...(size === 'medium' && mediumSizeSx),
                // 필수(*) 스타일
                ...(required && {
                    '& .MuiFormLabel-asterisk': {
                        color: 'error.main',
                    },
                }),
                // 외부에서 전달된 sx를 병합합니다.
                ...formControlSx,
            }}
        >
            <InputLabel id={labelId}>{label}</InputLabel>
            <Select
                labelId={labelId}
                id={id}
                value={value}
                label={label}
                onChange={onChange}
                disabled={disabled}
                variant={variant}
                size={size} // size prop을 Select에도 전달합니다.
                defaultValue={defaultValue}
                renderValue={renderValue}
                {...rest}
            >
                {items.map((item) => (
                    <MenuItem
                        key={item.value}
                        value={item.value}
                        disabled={item.disabled}
                    >
                        {item.label}
                    </MenuItem>
                ))}
            </Select>
            {helperText && <FormHelperText error={error}>{helperText}</FormHelperText>}
        </FormControl>
    );
}