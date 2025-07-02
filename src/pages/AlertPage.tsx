import React, { useState } from 'react';
import { Box, Typography, Button, Collapse } from '@mui/material';
import DsAlert from '../components/feedback/DsAlert';

const AlertPage = () => {
    // 닫기 기능이 있는 Alert의 표시 상태를 관리합니다.
    const [isClosableAlertVisible, setIsClosableAlertVisible] = useState(true);

    return (
        <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', gap: 4 }}>
            <Box>
                <Typography variant="h1" gutterBottom>
                    Alert
                </Typography>
                <Typography color="text.secondary">
                    Alert는 사용자의 작업을 방해하지 않으면서 짧고 중요한 메시지를 표시합니다.
                </Typography>
            </Box>

            {/* --- 예제 1: 기본 Alert (Outlined) --- */}
            <Box>
                <Typography variant="h6" gutterBottom>
                    Basic Alerts (Outlined)
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <DsAlert severity="error" title="Error">
                        이것은 에러 알림입니다 — <strong>확인해보세요!</strong>
                    </DsAlert>
                    <DsAlert severity="warning" title="Warning">
                        이것은 경고 알림입니다 — <strong>확인해보세요!</strong>
                    </DsAlert>
                    <DsAlert severity="info" title="Info">
                        이것은 정보 알림입니다 — <strong>확인해보세요!</strong>
                    </DsAlert>
                    <DsAlert severity="success" title="Success">
                        이것은 성공 알림입니다 — <strong>확인해보세요!</strong>
                    </DsAlert>
                </Box>
            </Box>

            {/* --- 예제 2: 채워진 Alert (Filled) --- */}
            <Box>
                <Typography variant="h6" gutterBottom>
                    Filled Alerts
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <DsAlert variant="filled" severity="error" title="Error">
                        이것은 에러 알림입니다 — <strong>확인해보세요!</strong>
                    </DsAlert>
                    <DsAlert variant="filled" severity="warning" title="Warning">
                        이것은 경고 알림입니다 — <strong>확인해보세요!</strong>
                    </DsAlert>
                    <DsAlert variant="filled" severity="info" title="Info">
                        이것은 정보 알림입니다 — <strong>확인해보세요!</strong>
                    </DsAlert>
                    <DsAlert variant="filled" severity="success" title="Success">
                        이것은 성공 알림입니다 — <strong>확인해보세요!</strong>
                    </DsAlert>
                </Box>
            </Box>

            {/* --- 예제 3: 액션이 포함된 Alert --- */}
            <Box>
                <Typography variant="h6" gutterBottom>
                    Alerts with Actions
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {/* 닫기 버튼이 있는 Alert */}
                    <Collapse in={isClosableAlertVisible}>
                        <DsAlert
                            severity="info"
                            onClose={() => setIsClosableAlertVisible(false)}
                        >
                            이 알림은 닫을 수 있습니다.
                        </DsAlert>
                    </Collapse>
                    {/* 커스텀 액션 버튼이 있는 Alert */}
                    <DsAlert
                        severity="success"
                        action={
                            <Button color="inherit" size="small" variant="outlined">
                                UNDO
                            </Button>
                        }
                    >
                        프로필이 성공적으로 업데이트되었습니다!
                    </DsAlert>
                </Box>
            </Box>
        </Box>
    );
};

export default AlertPage;