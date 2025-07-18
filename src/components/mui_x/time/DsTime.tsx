// src/components/mui_x/time/DsTime.tsx
import React from 'react';
import { DateTimePicker, DateTimePickerProps } from '@mui/x-date-pickers/DateTimePicker';
// Dayjs 타입도 가져옵니다.
import { Dayjs } from 'dayjs';

// DateTimePickerProps는 날짜 타입(Dayjs) 하나만 제네릭으로 받습니다.
// Omit을 사용하여 우리가 직접 관리할 'value'와 'onChange'만 제외합니다.
interface DsTimeProps extends Omit<DateTimePickerProps, 'value' | 'onChange'> {

    /**
     * The label for the time picker.
     */
    label: string;
    /**
     * The current value of the time picker.
     */
    value: Dayjs | null;
    /**
     * Callback fired when the value changes.
     */
    onChange: (newValue: Dayjs | null) => void;
}

/**
 * A customized DateTimePicker component for the design system.
 */
const DsTime: React.FC<DsTimeProps> = ({ label, value, onChange, ...rest }) => {
    return (
        // 사용하는 컴포넌트에도 날짜 타입(Dayjs)만 명시합니다.
        <DateTimePicker
            label={label}
            value={value}
            onChange={onChange}
            format="YYYY-MM-DD HH:mm"
            ampm={false}
            sx={{
                width: '100%',
            }}
            // 나머지 모든 props를 그대로 전달하여 유연성을 확보합니다.
            {...rest}
        />
    );
};

export default DsTime;