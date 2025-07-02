import React, { useState } from 'react';
import {
    Box,
    Button,
    Typography,
    TextField,
    FormControlLabel,
    Switch,
} from '@mui/material';
import DsDialog from '../components/feedback/DsDialog';

const DialogPage = () => {
    // 각 다이얼로그 예제의 열림/닫힘 상태를 제어합니다.
    const [alertOpen, setAlertOpen] = useState(false);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [formOpen, setFormOpen] = useState(false);
    const [isFullScreen, setIsFullScreen] = useState(false);

    return (
        <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box>
                <Typography variant="h1" gutterBottom>
                    Dialog
                </Typography>
                <Typography color="text.secondary">
                    Dialog는 사용자에게 특정 과업에 대한 정보를 제공하고, 결정을 요구하거나,
                    여러 작업을 포함할 수 있는 대화상자입니다.
                </Typography>
            </Box>

            {/* --- 예제 1: 기본 Alert Dialog --- */}
            <Box>
                <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                    기본 Alert Dialog
                </Typography>
                <Typography color="text.secondary" sx={{ mb: 2 }}>
                    Alert Dialog는 사용자에게 특정 상황을 알리고 확인을 요구하는
                    긴급한 알림입니다.
                </Typography>
                <Button variant="outlined" onClick={() => setAlertOpen(true)}>
                    Alert Dialog open
                </Button>
                <DsDialog
                    open={alertOpen}
                    onClose={() => setAlertOpen(false)}
                    title="이것은 Alert입니다"
                    actions={
                        <Button onClick={() => setAlertOpen(false)} autoFocus>
                            확인
                        </Button>
                    }
                >
                    <Typography>
                        이곳은 Alert Dialog의 주된 내용이 표시되는 영역입니다. 사용자의
                        확인이 필요한 모든 정보를 여기에 넣을 수 있습니다.
                    </Typography>
                </DsDialog>
            </Box>

            {/* --- 예제 2: 확인(Confirmation) Dialog --- */}
            <Box>
                <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                   Confirmation Dialog
                </Typography>
                <Typography color="text.secondary" sx={{ mb: 2 }}>
                    Confirmation Dialog는 특정 작업을 실행하기 전에 사용자에게
                    명시적인 확인을 요구합니다.
                </Typography>
                <Button variant="outlined" onClick={() => setConfirmOpen(true)}>
                    Confirmation Dialog open
                </Button>
                <DsDialog
                    open={confirmOpen}
                    onClose={() => setConfirmOpen(false)}
                    title="이 항목을 삭제할까요?"
                    actions={
                        <>
                            <Button onClick={() => setConfirmOpen(false)}>취소</Button>
                            <Button
                                variant="contained"
                                color="error"
                                onClick={() => setConfirmOpen(false)}
                            >
                                삭제
                            </Button>
                        </>
                    }
                >
                    <Typography>
                        정말로 이 항목을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.
                    </Typography>
                </DsDialog>
            </Box>

            {/* --- 예제 3: 폼(Form) Dialog --- */}
            <Box>
                <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                    폼(Form) Dialog
                </Typography>
                <Typography color="text.secondary" sx={{ mb: 2 }}>
                    Form Dialog는 사용자가 대화상자 내에서 양식을 작성할 수 있게
                    해줍니다.
                </Typography>
                <FormControlLabel
                    sx={{ mb: 2 }}
                    control={
                        <Switch
                            checked={isFullScreen}
                            onChange={(e) => setIsFullScreen(e.target.checked)}
                        />
                    }
                    label="전체 화면으로 open"
                />
                <br />
                <Button variant="outlined" onClick={() => setFormOpen(true)}>
                    Form Dialog open
                </Button>
                <DsDialog
                    open={formOpen}
                    onClose={() => setFormOpen(false)}
                    title="뉴스레터 구독하기"
                    fullScreen={isFullScreen}
                    actions={
                        <>
                            <Button onClick={() => setFormOpen(false)}>취소</Button>
                            <Button
                                variant="contained"
                                onClick={() => setFormOpen(false)}
                            >
                                구독하기
                            </Button>
                        </>
                    }
                >
                    <Typography sx={{ mb: 2 }}>
                        이 웹사이트를 구독하려면 이메일 주소를 입력해주세요. 저희는 가끔
                        새로운 소식을 보내드립니다.
                    </Typography>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="email"
                        label="이메일 주소"
                        type="email"
                        fullWidth
                        variant="outlined"
                    />
                </DsDialog>
            </Box>
        </Box>
    );
};

export default DialogPage;