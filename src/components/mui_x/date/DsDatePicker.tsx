import * as React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Dayjs } from 'dayjs';

type DsDatePickerProps = {
    value: Dayjs | null;
    onChange: (newValue: Dayjs | null) => void;
    label?: string;
    disabled?: boolean;
    // --- 추가된 부분 ---
    minDate?: Dayjs; // 최소 날짜 설정
    maxDate?: Dayjs; // 최대 날짜 설정
    // --- 추가된 부분 끝 ---
    // DatePicker에 전달될 수 있는 다른 모든 prop을 허용합니다.
    [key: string]: any;
};

export default function DsDatePicker({
                                         value,
                                         onChange,
                                         label,
                                         disabled,
                                         minDate, // 추가된 prop
                                         maxDate, // 추가된 prop
                                         ...props
                                     }: DsDatePickerProps) {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
                format="YYYY.MM.DD" // 한국식 날짜 형식 (년.월.일)
                value={value}
                onChange={onChange}
                label={label}
                disabled={disabled}
                minDate={minDate} // 내부 DatePicker로 전달
                maxDate={maxDate} // 내부 DatePicker로 전달
                {...props}
            />
        </LocalizationProvider>
    );
}