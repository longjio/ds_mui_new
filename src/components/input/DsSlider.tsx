import * as React from 'react';
import Slider, { SliderProps as MuiSliderProps } from '@mui/material/Slider'; // SliderProps 임포트

// DsSliderProps가 MuiSliderProps를 확장하도록 변경
// DsSlider에서 특별히 다루거나 기본값을 설정하는 prop들은 Omit으로 제외
export interface DsSliderProps extends Omit<MuiSliderProps,
    'value' | 'onChange' | 'min' | 'max' | 'step' | 'disabled' | 'aria-label' // 'aria-label'도 Omit
> {
    // 1. value 타입을 number | number[]로 확장
    value: number | number[];
    // onChange 타입은 MUI Slider와 일치하므로 그대로 사용 가능
    onChange: (event: Event, newValue: number | number[], activeThumb: number) => void;
    min?: number;
    max?: number;
    step?: number;
    disabled?: boolean;
    // 3. aria-label을 직접 prop으로 받도록 변경 (또는 ariaLabelledby)
    'aria-label': string; // 필수 prop으로 변경하거나, 기본값을 유지할 수 있습니다.
    // 필요하다면 다른 DsSlider만의 고유한 prop을 추가할 수 있습니다.
}

export function DsSlider({
                             value,
                             onChange,
                             min = 0,
                             max = 100,
                             step = 1,
                             disabled = false,
                             'aria-label': ariaLabel = 'Slider', // 기본값 설정
                             ...rest // 나머지 MuiSliderProps를 받습니다.
                         }: DsSliderProps) {
    return (
        <Slider
            value={value}
            onChange={onChange}
            min={min}
            max={max}
            step={step}
            disabled={disabled}
            aria-label={ariaLabel} // 전달받은 aria-label 사용
            {...rest} // 나머지 props 전달 (예: marks, orientation, size 등)
        />
    );
}