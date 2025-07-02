import { Checkbox, FormControlLabel, CheckboxProps as MuiCheckboxProps } from '@mui/material';
import * as React from 'react'; // React 임포트 추가

// 1. Props 인터페이스 이름 변경 및 확장
export interface DsCheckboxProps {
    label?: string; // 체크박스 옆에 표시될 라벨
    checked?: boolean;
    // 2. onChange 핸들러 시그니처를 MUI Checkbox와 일치시킵니다.
    onChange?: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void;
    disabled?: boolean; // 체크박스 및 라벨 비활성화 여부
    id?: string; // 체크박스 DOM ID (접근성 및 테스트에 유용)
    name?: string; // 폼 제출 시 사용될 체크박스 이름
    // MUI Checkbox의 다른 유용한 props 추가
    color?: MuiCheckboxProps['color']; // 'primary', 'secondary', 'default', 등
    size?: MuiCheckboxProps['size'];   // 'small', 'medium'
    // FormControlLabel 관련 props도 필요에 따라 추가 가능
    // 예: labelPlacement?: 'end' | 'start' | 'top' | 'bottom';
}

// 1. 컴포넌트 이름 변경
export default function DsCheckbox({
                                       label, // 4. 기본 라벨 'Check me' 제거 (사용하는 쪽에서 명시적으로 제공)
                                       checked,
                                       onChange,
                                       disabled,
                                       id,
                                       name,
                                       color,
                                       size,
                                   }: DsCheckboxProps) {
    return (
        <FormControlLabel
            control={
                <Checkbox
                    checked={checked}
                    onChange={onChange}
                    disabled={disabled}
                    id={id}
                    name={name}
                    color={color}
                    size={size}
                    // 여기에 MuiCheckboxProps에서 가져오고 싶은 다른 props를 전달할 수 있습니다.
                    // 예: inputProps={{ 'aria-label': label || 'checkbox' }}
                />
            }
            label={label}
            // FormControlLabel에도 disabled를 전달하여 라벨의 스타일과 동작을 일관되게 합니다.
            disabled={disabled}
        />
    );
}