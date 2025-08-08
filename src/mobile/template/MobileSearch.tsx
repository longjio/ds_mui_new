// D:/ds_mui_new/src/mobile/template/MobileSearch.tsx

import React, { useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import {
    Box,
    Stack,
    SelectChangeEvent,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from '@mui/material';
import MobileHeader from '../components/MobileHeader';
import { DsTextField } from '../../components/input/DsTextField';
import { DsSelect, DsSelectItem } from '../../components/input/DsSelect';
import { DsButton } from '../../components/button/DsButton';

const systemOptions: DsSelectItem[] = [
    { value: 'all', label: '전체' },
    { value: 'ds_mui_new', label: 'DS MUI NEW' },
    { value: 'legacy_system', label: '레거시 시스템' },
];

const usageStatusOptions: DsSelectItem[] = [
    { value: 'all', label: '전체' },
    { value: 'true', label: '사용' },
    { value: 'false', label: '미사용' },
];

export default function MobileSearchPage() {
    const navigate = useNavigate();
    const { handleDrawerToggle } = useOutletContext<{ handleDrawerToggle: () => void }>();

    const [system, setSystem] = useState('');
    const [menuId, setMenuId] = useState('');
    const [menuName, setMenuName] = useState('');
    const [isUsed, setIsUsed] = useState('');
    const [isResetDialogOpen, setResetDialogOpen] = useState(false); // ★ 다이얼로그 상태 추가

    const handleSearch = () => {
        const queryParams = new URLSearchParams({
            system,
            menuId,
            menuName,
            isUsed,
        }).toString();

        navigate(`/m/list?${queryParams}`);
    };

    // ★ '초기화' 버튼 클릭 시 다이얼로그를 열도록 수정
    const handleReset = () => {
        setResetDialogOpen(true);
    };

    // ★ 다이얼로그 닫기 핸들러
    const handleCloseResetDialog = () => {
        setResetDialogOpen(false);
    };

    // ★ 다이얼로그에서 '확인' 클릭 시 실제 초기화 로직 실행
    const handleConfirmReset = () => {
        setSystem('all');
        setMenuId('');
        setMenuName('');
        setIsUsed('all');
        handleCloseResetDialog();
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <MobileHeader
                title="메뉴 검색"
                onRightIconClick={handleDrawerToggle}
            />

            <Box sx={{ flexGrow: 1, overflowY: 'auto', p: 4 }}>
                <Stack spacing={3}>
                    <DsSelect
                        id="system-select"
                        label="시스템"
                        value={system}
                        onChange={(e: SelectChangeEvent<string | number>) => setSystem(e.target.value as string)}
                        items={systemOptions}
                        fullWidth
                    />
                    <DsTextField
                        id="menu-id-input"
                        label="메뉴ID"
                        value={menuId}
                        onChange={(e) => setMenuId(e.target.value)}
                        placeholder="메뉴ID 입력"
                        variant="outlined"
                        fullWidth
                    />
                    <DsTextField
                        id="menu-name-input"
                        label="메뉴명"
                        value={menuName}
                        onChange={(e) => setMenuName(e.target.value)}
                        placeholder="메뉴명 입력"
                        variant="outlined"
                        fullWidth
                    />
                    <DsSelect
                        id="usage-status-select"
                        label="사용여부"
                        value={isUsed}
                        onChange={(e: SelectChangeEvent<string | number>) => setIsUsed(e.target.value as string)}
                        items={usageStatusOptions}
                        fullWidth
                    />
                </Stack>
            </Box>

            <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider', bgcolor: 'background.paper', flexShrink: 0 }}>
                <Stack direction="row" spacing={1}>
                    <DsButton variant="outlined" onClick={handleReset} fullWidth size="xlarge">초기화</DsButton>
                    <DsButton variant="contained" onClick={handleSearch} fullWidth size="xlarge">검색</DsButton>
                </Stack>
            </Box>

            {/* ★ 초기화 확인 다이얼로그 */}
            <Dialog
                open={isResetDialogOpen}
                onClose={handleCloseResetDialog}
                aria-labelledby="reset-dialog-title"
                aria-describedby="reset-dialog-description"
            >
                <DialogTitle id="reset-dialog-title">
                    초기화 확인
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="reset-dialog-description">
                        입력한 모든 조회 조건을 초기화하시겠습니까?
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