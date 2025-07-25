// D:/ds_mui_new/src/components/input/DsCheckbox.tsx

import { Checkbox, FormControlLabel, CheckboxProps as MuiCheckboxProps, SxProps, Theme } from '@mui/material';
import * as React from 'react';

// MuiCheckboxProps에서 DsCheckboxProps가 이미 명시적으로 정의한 속성들을 제외합니다.
type OmittedMuiProps = Omit<MuiCheckboxProps, 'checked' | 'onChange' | 'disabled' | 'id' | 'name' | 'color' | 'size' | 'sx'>;

/**
 * DsCheckbox 컴포넌트의 props 인터페이스입니다.
 * MUI Checkbox의 모든 props를 지원하여 유연성을 극대화했습니다.
 */
export interface DsCheckboxProps extends OmittedMuiProps {
    /**
     * 체크박스 옆에 표시될 라벨 텍스트입니다.
     * 이 prop이 제공되면 `FormControlLabel`로 감싸진 형태로 렌더링됩니다.
     */
    label?: string;
    /**
     * 체크박스의 체크 상태를 제어합니다.
     */
    checked?: boolean;
    /**
     * 체크 상태가 변경될 때 호출되는 콜백 함수입니다.
     */
    onChange?: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void;
    /**
     * `true`이면 체크박스와 라벨이 비활성화됩니다.
     */
    disabled?: boolean;
    /**
     * DOM에 적용될 `id` 속성입니다.
     */
    id?: string;
    /**
     * 폼 제출 시 사용될 `name` 속성입니다.
     */
    name?: string;
    /**
     * 체크박스의 색상을 지정합니다.
     * @default 'primary'
     */
    color?: MuiCheckboxProps['color'];
    /**
     * 체크박스의 크기를 지정합니다.
     * @default 'medium'
     */
    size?: MuiCheckboxProps['size'];
    /**
     * 내부 `Checkbox` 컴포넌트에 직접 적용될 스타일입니다.
     * 패딩, 마진 등 세부 스타일을 조정할 때 사용합니다.
     */
    sx?: SxProps<Theme>;
    /**
     * `label`이 제공될 때 감싸는 `FormControlLabel`에 적용될 스타일입니다.
     */
    formControlLabelSx?: SxProps<Theme>;
}

/**
 * 디자인 시스템의 Checkbox 컴포넌트입니다.
 * - `label` prop 유무에 따라 `FormControlLabel`로 감싸거나 순수 `Checkbox`를 렌더링합니다.
 * - 기본 padding을 5px로 설정하여 FormTableRow 등에서 다른 Input과 높이를 맞춥니다.
 */
export default function DsCheckbox({
                                       label,
                                       checked,
                                       onChange,
                                       disabled,
                                       id,
                                       name,
                                       color,
                                       size,
                                       sx,
                                       formControlLabelSx,
                                       ...rest // 나머지 MuiCheckboxProps
                                   }: DsCheckboxProps) {
    const checkboxElement = (
        <Checkbox
            checked={checked}
            onChange={onChange}
            disabled={disabled}
            id={id}
            name={name}
            color={color}
            size={size}
            sx={{
                // 기본 패딩을 5px로 설정하여 TextField(34px)와 높이를 맞춥니다.
                padding: '5px',
                // 외부에서 전달된 sx prop을 마지막에 적용하여 필요시 덮어쓰기 허용
                ...sx,
            }}
            {...rest} // 나머지 props 전달
        />
    );

    // label이 있으면 FormControlLabel로 감싸서 반환합니다.
    if (label) {
        return (
            <FormControlLabel
                control={checkboxElement}
                label={label}
                disabled={disabled}
                sx={formControlLabelSx}
            />
        );
    }

    // label이 없으면 Checkbox 요소만 반환합니다.
    return checkboxElement;
}