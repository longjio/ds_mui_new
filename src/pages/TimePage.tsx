// src/pages/TimePage.tsx

import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';

// 우리가 만든 커스텀 DsTimePicker 컴포넌트를 가져옵니다.
// 경로는 실제 파일 위치에 맞게 조정해야 할 수 있습니다.
import DsTimePicker from '../components/mui_x/time/DsTimePicker';

export const TimePage = () => {
    // 첫 번째 TimePicker의 값을 저장하기 위한 state
    const [timeValue, setTimeValue] = useState<Dayjs | null>(null);

    // 두 번째 TimePicker의 값을 저장하기 위한 state (기본값 설정)
    const [timeWithDefault, setTimeWithDefault] = useState<Dayjs | null>(dayjs('2022-04-17T15:30'));

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h1" gutterBottom>
                Time Picker
            </Typography>

            {/* 예제 1: 기본 DsTimePicker */}
            <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
                DsTimePicker (제어 컴포넌트)
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
                시간만 선택할 수 있는 커스텀 컴포넌트입니다. 내부적으로 LocalizationProvider를 포함하고 있어 사용이 간편합니다.
            </Typography>

            {/* 컴포넌트가 너무 넓게 퍼지지 않도록 Box로 너비를 제한하면 보기 좋습니다. */}
            <Box sx={{ maxWidth: 320 }}>
                <DsTimePicker
                    label="시간 선택"
                    value={timeValue}
                    onChange={(newValue) => {
                        setTimeValue(newValue);
                    }}
                />
            </Box>

            {/* 선택된 값이 잘 변경되는지 확인하기 위한 디버깅용 코드입니다. */}
            <Box sx={{ mt: 2 }}>
                <Typography variant="body2" color="text.secondary">
                    선택된 값: {timeValue ? timeValue.format('HH:mm:ss') : '없음'}
                </Typography>
            </Box>

            {/* 예제 2: 기본값 및 분 단위 설정 */}
            <Typography variant="h6" gutterBottom sx={{ mt: 6 }}>
                DsTimePicker (기본값 & 30분 간격)
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
                컴포넌트가 제공하는 유연성을 활용하여 기본값을 설정하고 분 단위를 조절할 수 있습니다.
            </Typography>

            <Box sx={{ maxWidth: 320 }}>
                <DsTimePicker
                    label="예약 시간 (30분 단위)"
                    value={timeWithDefault}
                    onChange={(newValue) => {
                        setTimeWithDefault(newValue);
                    }}
                    // DsTimePicker는 MUI TimePicker의 모든 props를 그대로 전달받아 사용할 수 있습니다.
                    minutesStep={30}
                />
            </Box>

            {/* 선택된 값이 잘 변경되는지 확인하기 위한 디버깅용 코드입니다. */}
            <Box sx={{ mt: 2 }}>
                <Typography variant="body2" color="text.secondary">
                    선택된 값: {timeWithDefault ? timeWithDefault.format('HH:mm') : '없음'}
                </Typography>
            </Box>
        </Box>
    );
};