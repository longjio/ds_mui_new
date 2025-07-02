import React, { useState, useEffect, useMemo } from 'react';
import {
    Box,
    Popover,
    TextField,
    Typography,
    Stack,
    Button,
    InputAdornment,
    IconButton,
    SxProps,
    Theme,
    GlobalStyles,
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { StaticDatePicker, PickersDay, PickersDayProps, DatePickerToolbarProps } from '@mui/x-date-pickers';
import { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

// dayjs의 로케일을 한국어로 설정합니다.
dayjs.locale('ko');

/**
 * DsDateRangePicker 컴포넌트의 Props 인터페이스
 */
interface DsDateRangePickerProps {
    label?: string;
    initialStartDate?: Dayjs | null;
    initialEndDate?: Dayjs | null;
    onChange?: (startDate: Dayjs | null, endDate: Dayjs | null) => void;
}

/**
 * 달력 상단의 헤더를 커스텀 렌더링하는 컴포넌트
 * DatePickerToolbarProps와 커스텀 value prop을 모두 받도록 타입을 정의합니다.
 */
function CustomPickerHeader(props: DatePickerToolbarProps & { value: Dayjs | null }) {
    const { value } = props;
    return (
        <Typography variant="h6" sx={{ textAlign: 'center', width: '100%', py: 1 }}>
            {value ? value.format('YYYY년 M월') : ''}
        </Typography>
    );
}

/**
 * 날짜 범위 스타일을 적용하기 위한 커스텀 Day 렌더링 함수를 생성하는 고차 함수
 * @param selectedStart 선택된 시작일
 * @param selectedEnd 선택된 종료일
 * @returns 커스텀 PickersDay 컴포넌트
 */
function createRangePickersDay(selectedStart: Dayjs | null, selectedEnd: Dayjs | null) {
    // ✅ [수정] PickersDayProps에서 제네릭 <Dayjs>를 제거합니다.
    return function RangePickersDay(props: PickersDayProps): React.ReactElement {
        const { day, outsideCurrentMonth, ...other } = props;

        const isStart = selectedStart && day.isSame(selectedStart, 'day');
        const isEnd = selectedEnd && day.isSame(selectedEnd, 'day');
        const isBetween =
            selectedStart &&
            selectedEnd &&
            day.isAfter(selectedStart, 'day') &&
            day.isBefore(selectedEnd, 'day');

        const isSelected = isStart || isEnd;

        const wrapperStyle: SxProps<Theme> = {
            // isBetween일 때만 배경색을 적용하여 범위 느낌을 줍니다.
            backgroundColor: isBetween ? theme => theme.palette.action.hover : 'transparent',
            borderTopLeftRadius: isStart || isBetween ? '50%' : 0,
            borderBottomLeftRadius: isStart || isBetween ? '50%' : 0,
            borderTopRightRadius: isEnd || isBetween ? '50%' : 0,
            borderBottomRightRadius: isEnd || isBetween ? '50%' : 0,
            width: 40,
            height: 36,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        };

        const dayStyle: SxProps<Theme> = {
            ...(isSelected && {
                backgroundColor: 'primary.main',
                color: 'primary.contrastText',
                '&:hover': {
                    backgroundColor: 'primary.dark',
                },
                borderRadius: '50%',
                width: 36,
                height: 36,
            }),
        };

        return (
            <Box sx={wrapperStyle}>
                <PickersDay
                    day={day}
                    outsideCurrentMonth={outsideCurrentMonth}
                    {...other}
                    sx={dayStyle}
                />
            </Box>
        );
    };
}

/**
 * 두 개의 달력을 사용하여 날짜 범위를 선택하는 커스텀 Date Range Picker 컴포넌트
 */
const DsDateRangePicker: React.FC<DsDateRangePickerProps> = ({
                                                                 label = "날짜 범위 선택",
                                                                 initialStartDate = null,
                                                                 initialEndDate = null,
                                                                 onChange,
                                                             }) => {
    const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);
    const [tempStartDate, setTempStartDate] = useState<Dayjs | null>(initialStartDate);
    const [tempEndDate, setTempEndDate] = useState<Dayjs | null>(initialEndDate);
    const [leftCalendarMonth, setLeftCalendarMonth] = useState<Dayjs>(initialStartDate || dayjs());

    // Popover가 열릴 때마다 부모로부터 받은 초기값으로 임시 상태를 리셋합니다.
    useEffect(() => {
        if (anchorEl) {
            setTempStartDate(initialStartDate);
            setTempEndDate(initialEndDate);
            setLeftCalendarMonth(initialStartDate || dayjs());
        }
    }, [anchorEl, initialStartDate, initialEndDate]);

    const handleClick = (event: React.MouseEvent<HTMLDivElement> | React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget as HTMLDivElement);
    };

    const handleConfirm = () => {
        setAnchorEl(null);
        if (onChange) {
            onChange(tempStartDate, tempEndDate);
        }
    };

    const handleCancel = () => {
        setAnchorEl(null);
    };

    const handleDateChange = (newValue: Dayjs | null) => {
        if (tempStartDate && tempEndDate) {
            setTempStartDate(newValue);
            setTempEndDate(null);
            return;
        }

        if (!tempStartDate) {
            setTempStartDate(newValue);
            return;
        }

        if (tempStartDate && !tempEndDate) {
            if (newValue && newValue.isBefore(tempStartDate, 'day')) {
                setTempEndDate(tempStartDate);
                setTempStartDate(newValue);
            } else {
                setTempEndDate(newValue);
            }
        }
    };

    const open = Boolean(anchorEl);
    const id = open ? 'date-range-popover' : undefined;

    const displayValue = useMemo(() => {
        if (initialStartDate && initialEndDate) {
            return `${initialStartDate.format('YYYY.MM.DD')} ~ ${initialEndDate.format('YYYY.MM.DD')}`;
        }
        return '';
    }, [initialStartDate, initialEndDate]);

    const RangeDay = useMemo(() => createRangePickersDay(tempStartDate, tempEndDate), [tempStartDate, tempEndDate]);

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ko">
            <GlobalStyles styles={{
                '.MuiDayCalendar-weekDayLabel': {
                    width: 40,
                    height: 36,
                    margin: '0 auto',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                },
            }} />

            <TextField
                fullWidth
                label={label}
                value={displayValue}
                onClick={handleClick}
                sx={{ cursor: 'pointer' }}
                InputProps={{
                    readOnly: true,
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="날짜 범위 선택 열기"
                                onClick={handleClick as React.MouseEventHandler<HTMLButtonElement>}
                                edge="end"
                            >
                                <CalendarMonthIcon />
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleCancel}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
            >
                <Box sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                    <Stack direction="row" spacing={2} sx={{ flexWrap: 'wrap', justifyContent: 'center' }}>
                        <Box>
                            <StaticDatePicker
                                value={tempStartDate}
                                onChange={handleDateChange}
                                onMonthChange={(newMonth) => setLeftCalendarMonth(newMonth)}
                                slots={{
                                    actionBar: () => null,
                                    toolbar: (props) => <CustomPickerHeader {...props} value={leftCalendarMonth} />,
                                    day: RangeDay,
                                }}
                                referenceDate={leftCalendarMonth}
                            />
                        </Box>
                        <Box>
                            <StaticDatePicker
                                value={tempEndDate}
                                onChange={handleDateChange}
                                referenceDate={leftCalendarMonth.add(1, 'month')}
                                slots={{
                                    actionBar: () => null,
                                    toolbar: (props) => <CustomPickerHeader {...props} value={leftCalendarMonth.add(1, 'month')} />,
                                    day: RangeDay,
                                }}
                            />
                        </Box>
                    </Stack>
                    <Stack direction="row" justifyContent="flex-end" spacing={1} sx={{ mt: 2 }}>
                        <Button onClick={handleCancel}>취소</Button>
                        <Button variant="contained" onClick={handleConfirm}>확인</Button>
                    </Stack>
                </Box>
            </Popover>
        </LocalizationProvider>
    );
};

export default DsDateRangePicker;