import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl, { FormControlProps } from '@mui/material/FormControl';
import Select, { SelectChangeEvent, SelectProps as MuiSelectProps } from '@mui/material/Select';
import FormHelperText from '@mui/material/FormHelperText';

export interface DsSelectItem {
    label: string;
    value: string | number;
    disabled?: boolean;
}

// Omit 목록에 defaultValue와 renderValue 추가
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
    // defaultValue와 renderValue를 string | number 타입으로 재정의
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
                             defaultValue, // 명시적으로 props 받기
                             renderValue,  // 명시적으로 props 받기
                             ...rest
                         }: DsSelectProps) {
    const labelId = `${id}-label`;

    return (
        <FormControl
            fullWidth={fullWidth}
            disabled={disabled}
            error={error}
            required={required}
            variant={variant}
            sx={formControlSx}
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
                defaultValue={defaultValue} // 전달
                renderValue={renderValue}   // 전달
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