// D:/ds_mui_new/src/components/mui_x/date/DsDateRangePicker.tsx

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
    useTheme,
    useMediaQuery,
    // ★ 1. AppBar, Toolbar, CloseIcon 관련 import를 제거합니다.
    Dialog,
    Slide,
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { StaticDatePicker, PickersDay, PickersDayProps, DatePickerToolbarProps } from '@mui/x-date-pickers';
import { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
// ★ 2. DsButton을 import 합니다.
import { DsButton } from '../../button/DsButton';

// dayjs의 로케일을 한국어로 설정합니다.
dayjs.locale('ko');

// 모바일 Dialog를 위한 슬라이드 애니메이션
const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});


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
 * 달력 상단의 헤더를 커스텀 렌더링하는 컴포넌트 (데스크톱용)
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
 */
function createRangePickersDay(selectedStart: Dayjs | null, selectedEnd: Dayjs | null) {
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
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);
    const [isPickerOpen, setPickerOpen] = useState(false);
    const [tempStartDate, setTempStartDate] = useState<Dayjs | null>(initialStartDate);
    const [tempEndDate, setTempEndDate] = useState<Dayjs | null>(initialEndDate);
    const [leftCalendarMonth, setLeftCalendarMonth] = useState<Dayjs>(initialStartDate || dayjs());

    useEffect(() => {
        if (isPickerOpen) {
            setTempStartDate(initialStartDate);
            setTempEndDate(initialEndDate);
            setLeftCalendarMonth(initialStartDate || dayjs());
        }
    }, [isPickerOpen, initialStartDate, initialEndDate]);

    const handleClick = (event: React.MouseEvent<HTMLDivElement> | React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget as HTMLDivElement);
        setPickerOpen(true);
    };

    const handleClose = () => {
        setPickerOpen(false);
        setAnchorEl(null);
    };

    const handleConfirm = () => {
        if (onChange) {
            onChange(tempStartDate, tempEndDate);
        }
        handleClose();
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

    const displayValue = useMemo(() => {
        if (initialStartDate && initialEndDate) {
            return `${initialStartDate.format('YYYY.MM.DD')} ~ ${initialEndDate.format('YYYY.MM.DD')}`;
        }
        return '';
    }, [initialStartDate, initialEndDate]);

    const RangeDay = useMemo(() => createRangePickersDay(tempStartDate, tempEndDate), [tempStartDate, tempEndDate]);

    // ★ 3. pickerContent에서 불필요한 패딩 관련 스타일을 제거하여 재사용성을 높입니다.
    const pickerContent = (
        <Stack
            direction={isMobile ? 'column' : 'row'}
            spacing={2}
            sx={{
                flexWrap: 'wrap',
                justifyContent: 'center',
            }}
        >
            <Box>
                <StaticDatePicker
                    value={tempStartDate}
                    onChange={handleDateChange}
                    onMonthChange={(newMonth) => setLeftCalendarMonth(newMonth)}
                    slots={{
                        actionBar: () => null,
                        toolbar: isMobile ? () => null : (props) => <CustomPickerHeader {...props} value={leftCalendarMonth} />,
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
                        toolbar: isMobile ? () => null : (props) => <CustomPickerHeader {...props} value={leftCalendarMonth.add(1, 'month')} />,
                        day: RangeDay,
                    }}
                />
            </Box>
        </Stack>
    );

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

            {/* --- ★★★ 핵심 수정 사항 ★★★ --- */}
            {isMobile ? (
                <Dialog
                    fullScreen
                    open={isPickerOpen}
                    onClose={handleClose}
                    TransitionComponent={Transition}
                    PaperProps={{
                        sx: {
                            // Flexbox를 사용하여 콘텐츠와 하단 버튼 영역을 분리합니다.
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                        }
                    }}
                >
                    {/* 상단 AppBar를 제거합니다. */}

                    {/* 1. 스크롤 가능한 달력 콘텐츠 영역 */}
                    <Box sx={{ flexGrow: 1, overflowY: 'auto', p: 2, pt: 4 }}>
                        {pickerContent}
                    </Box>

                    {/* 2. 화면 하단에 고정되는 '확인' 버튼 영역 */}
                    <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider', bgcolor: 'background.paper', flexShrink: 0 }}>
                        <DsButton
                            variant="contained"
                            fullWidth
                            onClick={handleConfirm}
                            size="xlarge"
                        >
                            확인
                        </DsButton>
                    </Box>
                </Dialog>
            ) : (
                <Popover
                    id={isPickerOpen ? 'date-range-popover' : undefined}
                    open={isPickerOpen}
                    anchorEl={anchorEl}
                    onClose={handleClose}
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
                        {pickerContent}
                        <Stack direction="row" justifyContent="flex-end" spacing={1} sx={{ mt: 2 }}>
                            <Button onClick={handleClose}>취소</Button>
                            <Button variant="contained" onClick={handleConfirm}>확인</Button>
                        </Stack>
                    </Box>
                </Popover>
            )}
        </LocalizationProvider>
    );
};

export default DsDateRangePicker;