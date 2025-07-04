// src/components/mui_x/time/DsTimePicker.tsx
import React from 'react';
import type { Dayjs } from 'dayjs';
import { Button, DialogActions } from '@mui/material';

// MUI X Date Pickers의 핵심 컴포넌트들을 가져옵니다.
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker, TimePickerProps } from '@mui/x-date-pickers/TimePicker';
import { PickersActionBarProps } from '@mui/x-date-pickers/PickersActionBar';

/**
 * DsTimePicker의 Props 정의
 * MUI의 TimePickerProps를 기반으로 하되, value와 onChange는 우리가 직접 관리합니다.
 */
interface DsTimePickerProps extends Omit<TimePickerProps<Dayjs>, 'value' | 'onChange'> {
    /**
     * 시간 선택기의 레이블 텍스트입니다.
     */
    label: string;
    /**
     * 현재 선택된 시간 값입니다.
     */
    value: Dayjs | null;
    /**
     * 값이 변경될 때 호출되는 콜백 함수입니다.
     */
    onChange: (newValue: Dayjs | null) => void;
}

/**
 * "OK" 버튼에 Primary 스타일을 적용하기 위한 커스텀 액션 바입니다.
 * @param props MUI가 전달하는 액션 바 관련 props
 */
const CustomActionBar = (props: PickersActionBarProps) => {
    const { onAccept, onCancel, actions, getActionText } = props;

    if (actions == null || actions.length === 0) {
        return null;
    }

    return (
        <DialogActions>
            {actions.map((action) => {
                // 'accept' (OK) 액션일 경우에만 primary 스타일을 적용합니다.
                const buttonProps = {
                    ...(action === 'accept' && {
                        variant: 'contained' as const,
                        color: 'primary' as const,
                    }),
                };
                return (
                    <Button
                        key={action}
                        onClick={action === 'cancel' ? onCancel : onAccept}
                        {...buttonProps}
                    >
                        {getActionText(action)}
                    </Button>
                );
            })}
        </DialogActions>
    );
};

/**
 * 디자인 시스템에 맞게 커스터마이징된 TimePicker 컴포넌트입니다.
 * LocalizationProvider를 내장하여, 사용할 때마다 감싸줄 필요가 없습니다.
 */
const DsTimePicker: React.FC<DsTimePickerProps> = ({ label, value, onChange, ...rest }) => {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <TimePicker<Dayjs>
                label={label}
                value={value}
                onChange={onChange}
                ampm={false}
                // OK/Cancel 버튼이 항상 표시되도록 설정합니다.
                closeOnSelect={false}
                sx={{
                    width: '100%', // 기본 너비를 100%로 설정하여 레이아웃 잡기 용이
                }}
                // 'slots' prop을 사용하여 액션 바를 커스텀 컴포넌트로 교체합니다.
                slots={{
                    actionBar: CustomActionBar,
                }}
                // 팝업 UI 관련 스타일을 수정합니다.
                slotProps={{
                    desktopPaper: {
                        sx: {
                            // 1. 팝업 컨테이너 자체의 높이는 내용물에 맞게 자동 조절
                            height: 'auto',

                            // 2. 시간과 분 밑에 길게 남는 영역 스타일 수정
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

export default DsTimePicker;