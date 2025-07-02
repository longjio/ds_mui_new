import * as React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateField } from '@mui/x-date-pickers/DateField';
import { Dayjs } from 'dayjs';

type DsDateFieldProps = {
    // 제어 컴포넌트용 prop
    value?: Dayjs | null;
    onChange?: (newValue: Dayjs | null) => void;
    // 비제어 컴포넌트용 prop
    defaultValue?: Dayjs | null;
    label?: string;
    disabled?: boolean;
    format?: string; // 날짜 형식 지정 (기본값은 YYYY.MM.DD)
    // DateField에 전달될 수 있는 다른 모든 prop을 허용합니다.
    [key: string]: any;
};

export default function DsDateField({
                                        value,
                                        onChange,
                                        defaultValue,
                                        label,
                                        disabled,
                                        format = "YYYY.MM.DD", // 기본값을 한국식 날짜 형식으로 설정
                                        ...props
                                    }: DsDateFieldProps) {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateField
                format={format}
                value={value}
                onChange={onChange}
                defaultValue={defaultValue}
                label={label}
                disabled={disabled}
                {...props}
            />
        </LocalizationProvider>
    );
}