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

// --- ★ 1. Date Picker 관련 컴포넌트 및 타입 import ---
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Dayjs } from 'dayjs';
import DsDateRangePicker from '../../components/mui_x/date/DsDateRangePicker';

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
    const { handleDrawerToggle } = useOutletContext<{ handleDrawerToggle: () => void }>();

    // --- ★ 2. 상태 초기값 일관성 유지 및 날짜 상태 추가 ---
    const [system, setSystem] = useState('');
    const [menuId, setMenuId] = useState('');
    const [menuName, setMenuName] = useState('');
    const [isUsed, setIsUsed] = useState('');
    const [startDate, setStartDate] = useState<Dayjs | null>(null);
    const [endDate, setEndDate] = useState<Dayjs | null>(null);

    const [dialogInfo, setDialogInfo] = useState({
        open: false,
        title: '',
        message: '',
    });

    const handleDateChange = (start: Dayjs | null, end: Dayjs | null) => {
        setStartDate(start);
        setEndDate(end);
    };

    const handleSearch = () => {
        // --- ★ 3. 검색 조건 메시지에 날짜 추가 ---
        const searchMessage = `시스템: ${system}\n메뉴ID: ${menuId}\n메뉴명: ${menuName}\n사용여부: ${isUsed}\n등록일: ${startDate ? startDate.format('YYYY-MM-DD') : '미지정'} ~ ${endDate ? endDate.format('YYYY-MM-DD') : '미지정'}`;
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
        // --- ★ 4. 날짜 상태 초기화 로직 추가 ---
        setStartDate(null);
        setEndDate(null);
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
        // --- ★ 5. Date Picker를 사용하기 위해 LocalizationProvider로 감싸기 ---
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <MobileHeader
                    title="메뉴 관리"
                    onRightIconClick={handleDrawerToggle}
                />

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
                            {/* --- ★ 6. DsDateRangePicker 컴포넌트 추가 --- */}
                            <DsDateRangePicker
                                label="등록일"
                                onChange={handleDateChange}
                                initialStartDate={startDate}
                                initialEndDate={endDate}
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
        </LocalizationProvider>
    );
}