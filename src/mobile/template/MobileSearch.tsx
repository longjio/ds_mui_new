// D:/ds_mui_new/src/mobile/template/MobileSearch.tsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    Stack,
    SelectChangeEvent,
} from '@mui/material';

import { TitleS } from '../../components/typography';
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
    const [system, setSystem] = useState('');
    const [menuId, setMenuId] = useState('');
    const [menuName, setMenuName] = useState('');
    const [isUsed, setIsUsed] = useState('');

    const handleSearch = () => {
        const queryParams = new URLSearchParams({
            system,
            menuId,
            menuName,
            isUsed,
        }).toString();

        // ★★★ 이동 경로를 /m/list 로 수정합니다. ★★★
        navigate(`/m/list?${queryParams}`);
    };

    const handleReset = () => {
        setSystem('all');
        setMenuId('');
        setMenuName('');
        setIsUsed('all');
        alert('조회 조건이 초기화되었습니다.');
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <Box sx={{ flexGrow: 1, overflowY: 'auto', p: 6 }}>
                <TitleS component="h1" sx={{ mb: 3 }}>
                    메뉴 검색
                </TitleS>

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

            <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider', bgcolor: 'background.paper' }}>
                <Stack direction="row" spacing={1}>
                    <DsButton variant="outlined" onClick={handleReset} fullWidth size="xlarge">초기화</DsButton>
                    <DsButton variant="contained" onClick={handleSearch} fullWidth size="xlarge">검색</DsButton>
                </Stack>
            </Box>
        </Box>
    );
}