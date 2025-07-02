import React from 'react';
import {
    Alert,
    AlertTitle,
    AlertProps as MuiAlertProps,
} from '@mui/material';

// DsAlert 컴포넌트가 받을 props 타입을 정의합니다.
// MUI의 AlertProps를 확장하여 모든 기본 기능을 지원하고, title을 추가합니다.
interface DsAlertProps extends MuiAlertProps {
    /**
     * Alert 메시지 위에 표시될 제목입니다.
     */
    title?: string;
}

/**
 * title prop을 통해 간단하게 제목 추가 가능.
 * severity, variant, onClose, action 등 MUI Alert의 모든 기능 지원
 */
const DsAlert: React.FC<DsAlertProps> = ({ title, children, ...props }) => {
    return (
        <Alert {...props}>
            {/* title prop이 존재할 경우에만 AlertTitle을 렌더링합니다. */}
            {title && <AlertTitle>{title}</AlertTitle>}
            {children}
        </Alert>
    );
};

export default DsAlert;