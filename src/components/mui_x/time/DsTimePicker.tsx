// src/components/mui_x/time/DsTimePicker.tsx
import React, { useState } from 'react';
import type { Dayjs } from 'dayjs';
import { Button, Box } from '@mui/material';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker, TimePickerProps } from '@mui/x-date-pickers/TimePicker';
import { PickersActionBarProps } from '@mui/x-date-pickers/PickersActionBar';

/**
 * DsTimePicker의 Props 정의
 */
interface DsTimePickerProps extends Omit<TimePickerProps, 'value' | 'onChange'> {
    label: string;
    value: Dayjs | null;
    onChange: (newValue: Dayjs | null) => void;
}

interface CustomActionBarProps extends PickersActionBarProps {
     onAccept: () => void;
    onCancel: () => void;
    handleClose: () => void;
}

/**
 * 안정성을 위해 '취소'와 'OK' 버튼을 직접 렌더링하는 커스텀 액션 바입니다.
 */
const CustomActionBar = (props: CustomActionBarProps) => {
    const { onCancel, onAccept, handleClose } = props;

    const handleCancelClick = () => {
        if (typeof onCancel === 'function') {
            onCancel();
        }
        handleClose();
    };

    const handleAcceptClick = () => {
        if (typeof onAccept === 'function') {
            onAccept();
        }
        handleClose();
    };

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'center',
                padding: '8px 16px',
                borderTop: 1,
                borderColor: 'divider',
            }}
        >
            <Button onClick={handleCancelClick} color="primary">
                Cancel
            </Button>
            <Button onClick={handleAcceptClick} variant="contained" color="primary" sx={{ ml: 1 }}>
                OK
            </Button>
        </Box>
    );
};

/**
 * 디자인 시스템에 맞게 커스터마이징된 TimePicker 컴포넌트입니다.
 */
const DsTimePicker: React.FC<DsTimePickerProps> = ({ label, value, onChange, ...rest }) => {
    const [open, setOpen] = useState(false);

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <TimePicker
                label={label}
                value={value}
                onChange={onChange}
                ampm={false}
                closeOnSelect={false}
                open={open}
                onOpen={() => setOpen(true)}
                onClose={() => setOpen(false)}
                sx={{
                    width: '100%',
                }}
                slots={{
                    actionBar: (props) => <CustomActionBar {...props} onAccept={() => setOpen(false)} onCancel={() => setOpen(false)} handleClose={() => setOpen(false)} />,

                }}
                // 모든 문제 해결 코드를 통합합니다.
                slotProps={{
                    // [추가] 시간 선택 영역 아래의 불필요한 공간을 제거합니다.
                    desktopPaper: {
                        sx: {
                            height: 'auto',
                            '& .MuiMultiSectionDigitalClockSection-root::after': {
                                height: 0,
                            },
                        },
                    },
                    // 버튼이 하단에 위치하도록 레이아웃을 수정합니다.
                    layout: {
                        sx: {
                            '.MuiPickersLayout-contentWrapper': {
                                gridColumn: 'unset',
                                gridRow: 'unset',
                            },
                        },
                    },
                }}
                {...rest}
            />
        </LocalizationProvider>
    );
};

export default DsTimePicker;