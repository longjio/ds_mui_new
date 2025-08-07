// D:/ds_mui_new/src/mobile/template/MobileForm.tsx

import React, { useState } from 'react';
// ★ 1. useOutletContext를 import하여 헤더의 메뉴 버튼을 활성화합니다.
import { useNavigate, useOutletContext } from 'react-router-dom';
import {
    Box, Stack, SelectChangeEvent,
    Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle
} from '@mui/material';
import { DsTextField } from '../../components/input/DsTextField';
import { DsSelect, DsSelectItem } from '../../components/input/DsSelect';
import { DsButton } from '../../components/button/DsButton';
import MobileHeader from '../components/MobileHeader';

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
    const { handleDrawerToggle } = useOutletContext<{ handleDrawerToggle: () => void }>();

    const [formState, setFormState] = useState<FormState>({
        selectedObject: '',
        objectName: '',
        actionUrl: '',
        sortOrder: '',
        actionType: '',
        logYn: '',
    });

    // ★ 2. 다이얼로그 상태를 명확하게 분리하여 관리합니다.
    const [isResetDialogOpen, setResetDialogOpen] = useState(false);
    const [isSaveDialogOpen, setSaveDialogOpen] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormState(prev => ({ ...prev, [name]: value }));
    };

    const handleSelectChange = (e: SelectChangeEvent<string | number>) => {
        const { name, value } = e.target;
        setFormState(prev => ({ ...prev, [name]: String(value) }));
    };

    const handleOpenResetDialog = () => {
        setResetDialogOpen(true);
    };

    const handleCloseResetDialog = () => {
        setResetDialogOpen(false);
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

    // ★ 3. '저장' 버튼 클릭 시, alert 대신 다이얼로그를 열도록 수정합니다.
    const handleSave = () => {
        // 실제 저장 로직을 여기에 구현할 수 있습니다.
        console.log('저장할 데이터:', formState);
        setSaveDialogOpen(true);
    };

    // ★ 4. 저장 확인 다이얼로그를 닫고, 이전 페이지로 돌아가는 핸들러를 추가합니다.
    const handleCloseSaveDialog = () => {
        setSaveDialogOpen(false);
        navigate(-1); // '확인' 버튼을 누르면 이전 페이지로 이동
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', bgcolor: 'background.default' }}>
            <MobileHeader
                title="메뉴 OBJ 상세"
                leftIcon="back"
                rightIcon="menu"
                onRightIconClick={handleDrawerToggle}
            />

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

            {/* 초기화 확인 다이얼로그 */}
            <Dialog
                open={isResetDialogOpen}
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

            {/* ★ 5. 저장 완료 다이얼로그를 추가합니다. */}
            <Dialog
                open={isSaveDialogOpen}
                onClose={handleCloseSaveDialog}
                aria-labelledby="save-dialog-title"
            >
                <DialogTitle id="save-dialog-title">
                    저장 완료
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        성공적으로 저장되었습니다.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <DsButton onClick={handleCloseSaveDialog} autoFocus>
                        확인
                    </DsButton>
                </DialogActions>
            </Dialog>
        </Box>
    );
}