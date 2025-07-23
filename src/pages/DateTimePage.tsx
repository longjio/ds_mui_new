// D:/ds_mui_new/src/pages/DateTimePage.tsx

import React from 'react';
import { Typography, Container, Box } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

// ★★★ 핵심 수정 사항 ★★★
// 컴포넌트를 default로 내보내야 React.lazy가 올바르게 인식할 수 있습니다.
export default function DateTimePage() {
    return (
        <Container>
            <Typography variant="h1" component="h1" gutterBottom>
                Date Time Picker
            </Typography>
            <Typography paragraph>
                MUI X DateTime Picker를 사용하면 사용자가 날짜와 시간을 한 번에 선택할 수 있습니다.
            </Typography>
            <Box sx={{ mt: 4 }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker label="날짜 및 시간 선택" />
                </LocalizationProvider>
            </Box>
        </Container>
    );
}