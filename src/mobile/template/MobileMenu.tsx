// D:/ds_mui_new/src/mobile/template/MobileMenu.tsx

import React, { useState } from 'react';
import {
    Box,
    Typography,
    Stack,
    Button,
    SelectChangeEvent,
} from '@mui/material';

import { DsTextField } from '../../components/input/DsTextField';
import { DsSelect, DsSelectItem } from '../../components/input/DsSelect';

const systemOptions: DsSelectItem[] = [
    { value: 'all', label: '전체' },
    { value: 'ds_mui_new', label: 'DS MUI NEW' },
    { value: 'legacy_system', label: '레거시 시스템' },
];

const usageStatusOptions: DsSelectItem[] = [
    // ★★★ 수정된 부분 ★★★
    { value: 'all', label: '전체' }, // '사용' -> '전체'
    { value: 'true', label: '사용' },
    { value: 'false', label: '미사용' },
];


export default function MobileMenuPage() {
    // ... (나머지 코드는 동일)
    const [system, setSystem] = useState('all');
    const [menuId, setMenuId] = useState('');
    const [menuName, setMenuName] = useState('');
    const [isUsed, setIsUsed] = useState('all');

    const handleSearch = () => {
        alert(`검색 조건:\n시스템: ${system}\n메뉴ID: ${menuId}\n메뉴명: ${menuName}\n사용여부: ${isUsed}`);
    };

    const handleReset = () => {
        setSystem('all');
        setMenuId('');
        setMenuName('');
        setIsUsed('all');
        alert('조회 조건이 초기화되었습니다.');
    };

    return (
        <Box sx={{ p: 2 }}>
            <Typography variant="h4" component="h1" gutterBottom>
                메뉴 관리
            </Typography>

            <Stack spacing={2} sx={{ p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
                <DsSelect
                    id="system-select"
                    label="시스템"
                    value={system}
                    onChange={(e: SelectChangeEvent<string | number>) => setSystem(e.target.value as string)}
                    items={systemOptions}
                    size="small"
                    fullWidth
                />
                <DsTextField
                    id="menu-id-input"
                    label="메뉴ID"
                    value={menuId}
                    onChange={(e) => setMenuId(e.target.value)}
                    placeholder="메뉴ID 입력"
                    variant="outlined"
                    size="small"
                    fullWidth
                />
                <DsTextField
                    id="menu-name-input"
                    label="메뉴명"
                    value={menuName}
                    onChange={(e) => setMenuName(e.target.value)}
                    placeholder="메뉴명 입력"
                    variant="outlined"
                    size="small"
                    fullWidth
                />
                <DsSelect
                    id="usage-status-select"
                    label="사용여부"
                    value={isUsed}
                    onChange={(e: SelectChangeEvent<string | number>) => setIsUsed(e.target.value as string)}
                    items={usageStatusOptions}
                    size="small"
                    fullWidth
                />
                <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
                    <Button variant="contained" onClick={handleSearch} fullWidth>검색</Button>
                    <Button variant="outlined" onClick={handleReset} fullWidth>초기화</Button>
                </Stack>
            </Stack>
        </Box>
    );
}