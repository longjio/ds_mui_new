// src/components/input/DsSwitch.tsx

import * as React from 'react';
import Switch, { SwitchProps as MuiSwitchProps } from '@mui/material/Switch';
import FormControlLabel, { FormControlLabelProps } from '@mui/material/FormControlLabel';

// DsSwitchProps 정의
// MuiSwitchProps를 확장하고, FormControlLabel과 관련된 props도 포함할 수 있습니다.
export interface DsSwitchProps extends Omit<MuiSwitchProps, 'onChange'> {
    /**
     * The current state of the switch.
     */
    checked: boolean;
    /**
     * Callback fired when the state is changed.
     * @param {React.ChangeEvent<HTMLInputElement>} event The event source of the callback.
     * @param {boolean} checked The new checked state.
     */
    onChange: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void;
    /**
     * The label for the switch. If provided, the Switch will be wrapped in a FormControlLabel.
     */
    label?: React.ReactNode;
    /**
     * The position of the label relative to the switch.
     * @default 'end'
     */
    labelPlacement?: FormControlLabelProps['labelPlacement'];
    /**
     * If `true`, the switch will be disabled.
     * @default false
     */
    disabled?: boolean;
    /**
     * A unique identifier for the switch input.
     */
    id?: string;
    /**
     * The name attribute of the switch input.
     */
    name?: string;
    // MuiSwitchProps에서 제공하는 다른 props (size, color 등)는 ...rest로 전달됩니다.
}

/**
 * DsSwitch is a custom switch component built using MUI's Switch and FormControlLabel.
 * It provides a toggle switch with an optional label.
 */
export function DsSwitch({
                             checked,
                             onChange,
                             label,
                             labelPlacement = 'end',
                             disabled = false,
                             id,
                             name,
                             ...rest // 나머지 MuiSwitchProps (예: size, color, inputProps)
                         }: DsSwitchProps) {
    const switchElement = (
        <Switch
            id={id}
            name={name}
            checked={checked}
            onChange={onChange}
            disabled={disabled}
            inputProps={{ 'aria-label': label ? undefined : (rest['aria-label'] || 'Switch') }} // label이 있으면 FormControlLabel이 처리, 없으면 aria-label 제공
            {...rest}
        />
    );

    if (label) {
        return (
            <FormControlLabel
                control={switchElement}
                label={label}
                labelPlacement={labelPlacement}
                disabled={disabled} // FormControlLabel에도 disabled를 전달하여 레이블 스타일도 비활성화
                htmlFor={id} // Switch의 id와 연결
            />
        );
    }

    return switchElement;
}