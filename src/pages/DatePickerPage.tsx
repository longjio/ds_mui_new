import React, { useState } from 'react';
import { Box, Typography, Stack } from '@mui/material';
import DsDatePicker from '../components/mui_x/date/DsDatePicker';
import { Dayjs } from 'dayjs';
import dayjs from 'dayjs';

// LocalizationProvider와 AdapterDayjs를 임포트합니다.
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import DsDateRangePicker from '../components/mui_x/date/DsDateRangePicker';

export default function DsDatePickerPage() {
    const [controlledValue, setControlledValue] = useState<Dayjs | null>(dayjs());
    const [disabledValue, setDisabledValue] = useState<Dayjs | null>(dayjs('2023-01-15'));

    const [selectedRangeStartDate, setSelectedRangeStartDate] = useState<Dayjs | null>(null);
    const [selectedRangeEndDate, setSelectedRangeEndDate] = useState<Dayjs | null>(null);

    const handleRangeChange = (startDate: Dayjs | null, endDate: Dayjs | null) => {
        setSelectedRangeStartDate(startDate);
        setSelectedRangeEndDate(endDate);
    };

    return (
        // 전체 컴포넌트를 LocalizationProvider로 감싸줍니다.
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box sx={{ p: 3 }}>
                <Typography variant="h1" gutterBottom>
                    Date Picker
                </Typography>
                <Typography color="text.secondary" sx={{ mb: 4 }}>
                    Date Picker는 달력 UI를 통해 날짜를 시각적으로 선택하는 데 중점을 둔 컴포넌트입니다.
                </Typography>

                <Stack spacing={3} direction="column">
                    {/* 제어 컴포넌트 예제 */}
                    <Box>
                        <Typography variant="h6" gutterBottom>
                            Controlled
                        </Typography>
                        <DsDatePicker
                            label="날짜 선택"
                            value={controlledValue}
                            onChange={(newValue: Dayjs | null) => {
                                setControlledValue(newValue);
                            }}
                        />
                        <Typography variant="body2" sx={{ mt: 1 }}>
                            선택된 날짜: {controlledValue ? controlledValue.format('YYYY.MM.DD') : '없음'}
                        </Typography>
                    </Box>

                    {/* 비활성화된 컴포넌트 예제 */}
                    <Box>
                        <Typography variant="h6" gutterBottom>
                            Disabled
                        </Typography>
                        <DsDatePicker
                            label="비활성화된 날짜"
                            value={disabledValue}
                            onChange={(newValue: Dayjs | null) => setDisabledValue(newValue)}
                            disabled
                        />
                    </Box>

                    {/* 초기값 설정 예제 */}
                    <Box>
                        <Typography variant="h6" gutterBottom>
                            Read Only
                        </Typography>
                        <DsDatePicker
                            label="초기값 설정"
                            value={dayjs('2024-03-01')}
                            onChange={() => { }}
                        />
                    </Box>

                    {/* Date Picker Range 예제 (DsDateRangePicker 활용) */}
                    <Box>
                        <Typography variant="h6" gutterBottom>
                            Date Range Picker (팝업 캘린더)
                        </Typography>
                        {/* DsDateRangePicker를 감싸는 Box에 너비 스타일을 적용합니다. */}
                        <Box sx={{ width: '400px' }}>
                            <DsDateRangePicker
                                label="기간 선택"
                                onChange={handleRangeChange}
                                initialStartDate={selectedRangeStartDate}
                                initialEndDate={selectedRangeEndDate}
                            />
                        </Box>
                        <Typography variant="body2" sx={{ mt: 1 }}>
                            선택된 기간: {selectedRangeStartDate ? selectedRangeStartDate.format('YYYY.MM.DD') : '없음'} ~ {selectedRangeEndDate ? selectedRangeEndDate.format('YYYY.MM.DD') : '없음'}
                        </Typography>
                    </Box>
                </Stack>
            </Box>
        </LocalizationProvider>
    );
}