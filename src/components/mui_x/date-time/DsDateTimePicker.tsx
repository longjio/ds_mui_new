// src/components/mui_x/date-time/DsDateTimePicker.tsx

import React from 'react';
import { Dayjs } from 'dayjs';

// MUI X Date Pickers의 핵심 컴포넌트들을 가져옵니다.
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker, DateTimePickerProps } from '@mui/x-date-pickers/DateTimePicker';

/**
 * MUI의 DateTimePickerProps를 기반으로 하되, value와 onChange는 직접 관리
 */
interface DsDateTimePickerProps extends Omit<DateTimePickerProps, 'value' | 'onChange'> {
    label: string;
    value: Dayjs | null;
    onChange: (newValue: Dayjs | null) => void;
}

const DsDateTimePicker: React.FC<DsDateTimePickerProps> = ({ label, value, onChange, ...rest }) => {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
                label={label}
                value={value}
                onChange={onChange}
                format="YYYY-MM-DD HH:mm"
                ampm={false}
                sx={{
                    width: '100%', // 기본 너비 설정
                }}
                slotProps={{
                    desktopPaper: {
                        sx: {
                            // 1. 팝업 컨테이너 자체의 높이는 내용물에 맞게 자동 조절
                            height: 'auto',
                            // 2. MUI 컴포넌트에서 시간과 분 밑에 길게 남는 영역 스타일 수정
                            '& .MuiMultiSectionDigitalClockSection-root::after': {
                                height: 0,
                            },
                        },
                    },
                }}
                // 나머지 모든 props를 전달하여 유연성을 확보합니다.
                {...rest}
            />
        </LocalizationProvider>
    );
};

export default DsDateTimePicker;