// D:/ds_mui_new/src/mobile/template/MobileForm.tsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// 1. Dialog 관련 컴포넌트들을 import 합니다.
import {
    Box, Stack, SelectChangeEvent, AppBar, Toolbar, IconButton,
    Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import { TitleS } from '../../components/typography';
import { DsTextField } from '../../components/input/DsTextField';
import { DsSelect, DsSelectItem } from '../../components/input/DsSelect';
import { DsButton } from '../../components/button/DsButton';

// MenuObj.tsx의 옵션 데이터를 모바일 폼에 맞게 가져옵니다.
const objectSelectOptions: DsSelectItem[] = [
    { value: 'OBJ001', label: 'User' },
    { value: 'OBJ002', label: 'Product' },
    { value: 'OBJ003', label: 'Order' },
];

const actionTypeOptions: DsSelectItem[] = [
    { value: 'C', label: '생성(Create)' },
    { value: 'R', label: '조회(Read)' },
    { value: 'U', label: '수정(Update)' },
    { value: 'D', label: '삭제(Delete)' },
];

const logOptions: DsSelectItem[] = [
    { value: 'Y', label: '사용' },
    { value: 'N', label: '미사용' },
];

// 폼 데이터의 상태를 관리하기 위한 인터페이스
interface FormState {
    selectedObject: string;
    objectName: string;
    actionUrl: string;
    sortOrder: string;
    actionType: string;
    logYn: string;
}

export default function MobileFormPage() {
    const navigate = useNavigate();

    const [formState, setFormState] = useState<FormState>({
        selectedObject: '',
        objectName: '',
        actionUrl: '',
        sortOrder: '',
        actionType: '',
        logYn: '',
    });

    // 2. Alert 상태 대신 Dialog의 열림 상태를 관리합니다.
    const [isDialogOpen, setDialogOpen] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormState(prev => ({ ...prev, [name]: value }));
    };

    const handleSelectChange = (e: SelectChangeEvent<string | number>) => {
        const { name, value } = e.target;
        setFormState(prev => ({ ...prev, [name]: String(value) }));
    };

    // 3. Dialog를 제어하는 핸들러 함수들을 추가합니다.
    const handleOpenResetDialog = () => {
        setDialogOpen(true);
    };

    const handleCloseResetDialog = () => {
        setDialogOpen(false);
    };

    const handleConfirmReset = () => {
        setFormState({
            selectedObject: '',
            objectName: '',
            actionUrl: '',
            sortOrder: '',
            actionType: '',
            logYn: '',
        });
        handleCloseResetDialog(); // 초기화 후 다이얼로그 닫기
    };

    const handleClose = () => {
        navigate(-1); // 한 단계 뒤로 이동
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', bgcolor: 'background.default' }}>
            <AppBar position="static" elevation={0} color="inherit" sx={{ border: 0, borderBottom: 1, borderColor: 'divider' }}>
                <Toolbar disableGutters sx={{ flexShrink: 0, px: '20px' }}>
                    <TitleS component="div" sx={{ flexGrow: 1 }}>
                        메뉴 OBJ 상세
                    </TitleS>
                    <IconButton
                        edge="end"
                        color="inherit"
                        onClick={handleClose}
                        aria-label="close"
                    >
                        <CloseIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>

            {/* 스크롤이 필요한 메인 콘텐츠 영역 */}
            <Box sx={{ flexGrow: 1, overflowY: 'auto', p: 4 }}>
                {/* 4. 기존 Alert와 Collapse 컴포넌트는 제거됩니다. */}
                <Stack spacing={4}>
                    <DsSelect
                        id="object-select"
                        name="selectedObject"
                        label="오브젝트"
                        value={formState.selectedObject}
                        onChange={handleSelectChange}
                        items={objectSelectOptions}
                        fullWidth
                        required
                    />
                    <DsTextField
                        id="object-name-input"
                        name="objectName"
                        label="오브젝트명"
                        value={formState.objectName}
                        onChange={handleInputChange}
                        fullWidth
                        required
                    />
                    <DsTextField
                        id="action-url-input"
                        name="actionUrl"
                        label="액션 URL"
                        value={formState.actionUrl}
                        onChange={handleInputChange}
                        fullWidth
                        required
                    />
                    <DsTextField
                        id="sort-order-input"
                        name="sortOrder"
                        label="정렬순번"
                        type="number"
                        value={formState.sortOrder}
                        onChange={handleInputChange}
                        fullWidth
                        required
                    />
                    <DsSelect
                        id="action-type-select"
                        name="actionType"
                        label="동작구분"
                        value={formState.actionType}
                        onChange={handleSelectChange}
                        items={actionTypeOptions}
                        fullWidth
                        required
                    />
                    <DsSelect
                        id="log-yn-select"
                        name="logYn"
                        label="로그"
                        value={formState.logYn}
                        onChange={handleSelectChange}
                        items={logOptions}
                        fullWidth
                        required
                    />
                </Stack>
            </Box>

            {/* 하단 버튼 영역 */}
            <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider', bgcolor: 'background.paper' }}>
                <Stack direction="row" spacing={1}>
                    {/* 5. 초기화 버튼 클릭 시 다이얼로그를 열도록 onClick 핸들러를 변경합니다. */}
                    <DsButton variant="outlined" onClick={handleOpenResetDialog} fullWidth size="xlarge">초기화</DsButton>
                    <DsButton variant="contained" onClick={handleClose} fullWidth size="xlarge">저장</DsButton>
                </Stack>
            </Box>

            {/* 6. 초기화 확인을 위한 AlertDialog를 추가합니다. */}
            <Dialog
                open={isDialogOpen}
                onClose={handleCloseResetDialog}
                aria-labelledby="reset-dialog-title"
                aria-describedby="reset-dialog-description"
            >
                <DialogTitle id="reset-dialog-title">
                    폼 초기화
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="reset-dialog-description">
                        입력한 모든 내용이 사라집니다. 정말로 초기화하시겠습니까?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <DsButton onClick={handleCloseResetDialog} variant="text">취소</DsButton>
                    <DsButton onClick={handleConfirmReset} autoFocus>
                        확인
                    </DsButton>
                </DialogActions>
            </Dialog>
        </Box>
    );
}