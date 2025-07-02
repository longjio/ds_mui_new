// src/contexts/SnackbarProvider.tsx
import React, { useState, createContext, useContext, useCallback } from 'react';
import { Snackbar, Alert, AlertColor } from '@mui/material';

// 스낵바를 띄우는 함수의 타입 정의
type ShowSnackbarFunction = (message: string, severity?: AlertColor) => void;

// Context 생성
const SnackbarContext = createContext<ShowSnackbarFunction | undefined>(undefined);

/**
 * 앱의 모든 곳에서 스낵바를 쉽게 호출할 수 있게 해주는 커스텀 훅입니다.
 * 예시: const showSnackbar = useSnackbar(); showSnackbar('성공!', 'success');
 */
export const useSnackbar = () => {
    const context = useContext(SnackbarContext);
    if (context === undefined) {
        throw new Error('useSnackbar must be used within a SnackbarProvider');
    }
    return context;
};

// Provider 컴포넌트
export const SnackbarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [severity, setSeverity] = useState<AlertColor>('info');

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const showSnackbar: ShowSnackbarFunction = useCallback((msg, sev = 'info') => {
        setMessage(msg);
        setSeverity(sev);
        setOpen(true);
    }, []);

    return (
        <SnackbarContext.Provider value={showSnackbar}>
            {children}
            <Snackbar
                open={open}
                autoHideDuration={4000} // 4초 후 자동 닫힘
                onClose={handleClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                {/* Alert를 사용하면 severity에 따라 다른 색상을 보여줄 수 있어 UX에 좋습니다. */}
                <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
                    {message}
                </Alert>
            </Snackbar>
        </SnackbarContext.Provider>
    );
};