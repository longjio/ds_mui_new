// D:/ds_mui_new/src/mobile/template/MobileForm.tsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Box, Stack, SelectChangeEvent,
    Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle
} from '@mui/material';
import { DsTextField } from '../../components/input/DsTextField';
import { DsSelect, DsSelectItem } from '../../components/input/DsSelect';
import { DsButton } from '../../components/button/DsButton';
import MobileHeader from '../components/MobileHeader'; // ★ 신규 헤더 import

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

    const [isDialogOpen, setDialogOpen] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormState(prev => ({ ...prev, [name]: value }));
    };

    const handleSelectChange = (e: SelectChangeEvent<string | number>) => {
        const { name, value } = e.target;
        setFormState(prev => ({ ...prev, [name]: String(value) }));
    };

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
        handleCloseResetDialog();
    };

    const handleSave = () => {
        // 저장 로직 후, 이전 페이지로 이동
        alert('저장되었습니다.');
        navigate(-1);
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', bgcolor: 'background.default' }}>
            {/* ★ 기존 AppBar를 신규 헤더로 교체 */}
            <MobileHeader title="메뉴 OBJ 상세" />

            <Box sx={{ flexGrow: 1, overflowY: 'auto', p: 4 }}>
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

            <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider', bgcolor: 'background.paper' }}>
                <Stack direction="row" spacing={1}>
                    <DsButton variant="outlined" onClick={handleOpenResetDialog} fullWidth size="xlarge">초기화</DsButton>
                    <DsButton variant="contained" onClick={handleSave} fullWidth size="xlarge">저장</DsButton>
                </Stack>
            </Box>

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