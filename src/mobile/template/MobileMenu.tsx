// D:/ds_mui_new/src/mobile/template/MobileMenu.tsx

import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
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

import { DsTextField } from '../../components/input/DsTextField';
import { DsSelect, DsSelectItem } from '../../components/input/DsSelect';
import { DsButton } from '../../components/button/DsButton';
import MobileHeader from '../components/MobileHeader';

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

export default function MobileMenuPage() {
    // ★ 부모(MobileLayout)로부터 Drawer를 여는 함수를 받아옵니다.
    const { handleDrawerToggle } = useOutletContext<{ handleDrawerToggle: () => void }>();

    const [system, setSystem] = useState('all');
    const [menuId, setMenuId] = useState('');
    const [menuName, setMenuName] = useState('');
    const [isUsed, setIsUsed] = useState('all');

    const [dialogInfo, setDialogInfo] = useState({
        open: false,
        title: '',
        message: '',
    });

    const handleSearch = () => {
        const searchMessage = `시스템: ${system}\n메뉴ID: ${menuId}\n메뉴명: ${menuName}\n사용여부: ${isUsed}`;
        setDialogInfo({
            open: true,
            title: '검색 조건 확인',
            message: searchMessage,
        });
    };

    const handleReset = () => {
        setSystem('all');
        setMenuId('');
        setMenuName('');
        setIsUsed('all');
        setDialogInfo({
            open: true,
            title: '초기화 완료',
            message: '조회 조건이 초기화되었습니다.',
        });
    };

    const handleCloseDialog = () => {
        setDialogInfo(prev => ({ ...prev, open: false }));
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            {/* ★ MobileHeader에 onRightIconClick 함수를 전달합니다. */}
            <MobileHeader
                title="메뉴 관리"
                onRightIconClick={handleDrawerToggle}
            />

            {/* 콘텐츠 영역 */}
            <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
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
            </Box>

            <Dialog
                open={dialogInfo.open}
                onClose={handleCloseDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {dialogInfo.title}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description" sx={{ whiteSpace: 'pre-wrap' }}>
                        {dialogInfo.message}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <DsButton onClick={handleCloseDialog} autoFocus>
                        확인
                    </DsButton>
                </DialogActions>
            </Dialog>
        </Box>
    );
}