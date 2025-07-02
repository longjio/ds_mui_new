// src/pages/DateTimePage.tsx

import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { Dayjs } from 'dayjs';

// 우리가 만든 커스텀 DsDateTimePicker 컴포넌트를 가져옵니다.
// 경로는 실제 파일 위치에 맞게 조정해야 할 수 있습니다.
import DsDateTimePicker from '../components/mui_x/date-time/DsDateTimePicker';

export const DateTimePage = () => {
    // DateTimePicker의 값을 저장하기 위한 state
    const [dateTimeValue, setDateTimeValue] = useState<Dayjs | null>(null);

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h1" gutterBottom>
                Date & Time Picker
            </Typography>

            {/* DsDateTimePicker (Controlled) 예제 */}
            <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
                날짜와 시간을 한번에 선택할 수 있는 커스텀 컴포넌트
            </Typography>

            {/* 컴포넌트가 너무 넓게 퍼지지 않도록 Box로 너비를 제한하면 보기 좋습니다. */}
            <Box sx={{ maxWidth: 320 }}>
                <DsDateTimePicker
                    label="날짜와 시간 선택"
                    value={dateTimeValue}
                    onChange={(newValue) => {
                        setDateTimeValue(newValue);
                    }}
                />
            </Box>

            {/* 선택된 값이 잘 변경되는지 확인하기 위한 디버깅용 코드입니다. */}
            <Box sx={{ mt: 2 }}>
                <Typography variant="body2" color="text.secondary">
                    선택된 값: {dateTimeValue ? dateTimeValue.format('YYYY-MM-DD HH:mm:ss') : '없음'}
                </Typography>
            </Box>
        </Box>
    );
};

// export default DateTimePage;