import React from 'react';
import { Typography, Container, Box } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

// [수정] 컴포넌트를 default로 내보내야 React.lazy가 올바르게 인식할 수 있습니다.
export default function TimePage() {
    return (
        <Container>
            <Typography variant="h1" component="h1" gutterBottom>
                Time Picker
            </Typography>
            <Typography paragraph>
                MUI X Time Picker를 사용하면 사용자가 쉽게 시간을 선택할 수 있습니다.
            </Typography>
            <Box sx={{ mt: 4 }}>
                {/* 
                  TimePicker와 같은 MUI X 컴포넌트는 LocalizationProvider로 감싸야 합니다.
                  프로젝트에 아직 설치되지 않았다면 아래 명령어를 실행해주세요.
                  npm install @mui/x-date-pickers dayjs 
                */}
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <TimePicker label="시간 선택" />
                </LocalizationProvider>
            </Box>
        </Container>
    );
}