// D:/ds_mui_new/src/mobile/template/MobileMenuObj.tsx

import React, { useState } from 'react';
// ★ 1. useOutletContext 훅을 import 합니다.
import { useOutletContext } from 'react-router-dom';
import {
    Box,
    Stack,
    Collapse,
    IconButton,
    SelectChangeEvent,
    Divider,
} from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import { TitleXS } from '../../components/typography';
import { DsSelect, DsSelectItem } from '../../components/input/DsSelect';
import { DsButton } from '../../components/button/DsButton';
import DsDataGrid from '../../components/mui_x/datagrid/DsDataGrid';
import { GridColDef } from '@mui/x-data-grid';
import MobileHeader from '../components/MobileHeader';

const systemOptions: DsSelectItem[] = [
    { value: 'all', label: '전체' },
    { value: 'ds_mui_new', label: 'DS MUI NEW' },
    { value: 'legacy_system', label: '레거시 시스템' },
];

const menuGridRows = [
    { id: 1, menuName: '대시보드', objCount: 1 },
    { id: 2, menuName: '컴포넌트', objCount: 2 },
    { id: 3, menuName: '버튼', objCount: 0 },
    { id: 4, menuName: '데이터 그리드', objCount: 1 },
    { id: 5, menuName: '관리', objCount: 3 },
    { id: 6, menuName: '사용자 관리', objCount: 1 },
    { id: 7, menuName: '로그 분석', objCount: 1 },
    { id: 8, menuName: '통계', objCount: 0 },
];

const menuGridColumns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 80, align: 'center' },
    { field: 'menuName', headerName: '메뉴명', flex: 1, minWidth: 150 },
    { field: 'objCount', headerName: 'OBJ', type: 'number', width: 80, align: 'center' },
];

export default function MobileMenuObjPage() {
    // ★ 2. 부모(MobileLayout)로부터 Drawer를 여는 함수를 받아옵니다.
    const { handleDrawerToggle } = useOutletContext<{ handleDrawerToggle: () => void }>();

    const [system, setSystem] = useState('');
    const [isSearchAreaOpen, setSearchAreaOpen] = useState(true);

    const handleSearch = () => {
        alert(`검색 실행: ${system}`);
        setSearchAreaOpen(false);
    };

    const handleReset = () => {
        setSystem('all');
    };

    const toggleSearchArea = () => {
        setSearchAreaOpen(prev => !prev);
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            {/* ★ 3. MobileHeader에 onRightIconClick 함수를 전달하여 햄버거 메뉴를 활성화합니다. */}
            <MobileHeader
                title="메뉴 OBJ 관리"
                onRightIconClick={handleDrawerToggle}
            />

            <Box sx={{ flexGrow: 1, overflowY: 'auto', p: 4 }}>
                <Stack spacing={2}>
                    <Collapse in={isSearchAreaOpen} timeout="auto">
                        <Box>
                            <Stack spacing={2}>
                                <DsSelect
                                    label="시스템"
                                    value={system}
                                    onChange={(e: SelectChangeEvent<string | number>) => setSystem(e.target.value as string)}
                                    items={systemOptions}
                                />
                                <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                                    <DsButton variant="outlined" onClick={handleReset} fullWidth>초기화</DsButton>
                                    <DsButton variant="contained" onClick={handleSearch} fullWidth>검색</DsButton>
                                </Stack>
                            </Stack>
                        </Box>
                    </Collapse>

                    <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column',  }}>
                        <Stack
                            direction="row"
                            justifyContent="space-between"
                            alignItems="center"
                            sx={{ p: 2 }}
                        >
                            <TitleXS component="h2">메뉴 목록</TitleXS>
                            <IconButton onClick={toggleSearchArea} aria-label="toggle search area" size="small">
                                {isSearchAreaOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                            </IconButton>
                        </Stack>
                        <Divider />
                        <Box sx={{ flexGrow: 1, height: 400 }}>
                            <DsDataGrid
                                rows={menuGridRows}
                                columns={menuGridColumns}
                                showRowNumber
                                hideFooter
                                sx={{ border: 0 }}
                            />
                        </Box>
                    </Box>
                </Stack>
            </Box>
        </Box>
    );
}