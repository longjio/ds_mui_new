// D:/ds_mui/src/pages/DatePage.tsx

import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
// 수정: default export를 가져오기 위해 중괄호 {}를 제거합니다.
import DsDatePicker from '../components/mui_x/date/DsDatePicker';
import { Dayjs } from 'dayjs';

// DateField 예제를 위한 추가 import
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import dayjs from 'dayjs'; // dayjs 함수를 사용하기 위해 import
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateField } from '@mui/x-date-pickers/DateField';

export default function DatePage() {
    const [value, setValue] = useState<Dayjs | null>(null);

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h1" gutterBottom>
                Date Pickers & Fields
            </Typography>

            {/* DsDatePicker (Controlled) 예제 */}
            <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
                DsDatePicker (제어 컴포넌트)
            </Typography>
            <DsDatePicker
                label="날짜 선택"
                value={value}
                // 수정: newValue 파라미터에 Dayjs | null 타입을 명시합니다.
                onChange={(newValue: Dayjs | null) => {
                    setValue(newValue);
                }}
            />

            {/* DateField (Custom Korean Format) 예제 */}
            <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
                Date Field
            </Typography>
            {/* DateField는 LocalizationProvider가 필요하므로 별도로 감싸줍니다. */}
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DateField', 'DateField']}>
                    <DateField
                        label="점 구분자 날짜"
                        defaultValue={dayjs('2022-04-17')}
                        format="YYYY.MM.DD" // 한국식 날짜 형식 적용
                    />
                    <DateField
                        label="다른 점 구분자 날짜"
                        defaultValue={dayjs('2022-04-17')}
                        format="YYYY.MM.DD" // 한국식 날짜 형식 적용
                    />
                </DemoContainer>
            </LocalizationProvider>
        </Box>
    );
}