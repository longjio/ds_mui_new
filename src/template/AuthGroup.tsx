// D:/ds_mui_new/src/template/AuthGroup.tsx

import React, { useState } from 'react';
import {Box, TextField, IconButton, Select, MenuItem, SelectChangeEvent} from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

// 레이아웃 및 공통 컴포넌트 import
import { TitleArea, SearchArea, SubTitleArea } from '../layouts';
import { FormField } from '../components/form/FormField';
import { FormTableRow } from '../components/form/FormTableRow';
import DsDataGrid from '../components/mui_x/datagrid/DsDataGrid';
import DsCheckbox from '../components/input/DsCheckbox';
import {
    SearchIconButton,
    ResetButton,
    SaveButton,
    AddButton,
    DeleteButton,
} from '../components/button';

// --- 샘플 데이터 정의 ---

// 1. 상단 그리드: 권한그룹 목록
const authGroupRows = [
    { id: 'GRP001', name: '관리자 그룹', isUsed: 'Y', description: '시스템의 모든 기능에 접근할 수 있는 최상위 그룹입니다.' },
    { id: 'GRP002', name: '일반 사용자 그룹', isUsed: 'Y', description: '데이터 조회 및 개인 정보 수정이 가능한 그룹입니다.' },
    { id: 'GRP003', name: '게스트 그룹', isUsed: 'N', description: '읽기 전용 권한을 가진 그룹입니다.' },
];

const authGroupColumns: GridColDef[] = [
    { field: 'id', headerName: '권한그룹코드', width: 120 },
    { field: 'name', headerName: '권한그룹명', flex: 1, minWidth: 150 },
    { field: 'description', headerName: '설명', flex: 2, minWidth: 250 },
    { field: 'isUsed', headerName: '사용여부', width: 100, align: 'center' },
];

// 2. 하단 왼쪽 그리드: 전체 프로그램
const allMenuRows = [
    { id: 'menu01', name: '대시보드', order: 1, depth: 0 },
    { id: 'menu02', name: '사용자 관리', order: 2, depth: 0 },
    { id: 'menu03', name: '메뉴 관리', order: 3, depth: 0 },
    { id: 'menu04', name: '공통코드 관리', order: 4, depth: 1 },
    { id: 'menu05', name: '제품 관리', order: 5, depth: 1 },
];

const allMenuColumns: GridColDef[] = [
    { field: 'depth', headerName: 'LEVEL', width: 80, align: 'center' },
    { field: 'id', headerName: '메뉴ID', width: 120 },
    { field: 'name', headerName: '메뉴명', flex: 1, minWidth: 150 },
    { field: 'order', headerName: '순번', width: 80, align: 'center' },
];

// 3. 하단 중앙 그리드: 등록된 프로그램
const groupMenuRows = [
    { id: 'menu01', name: '대시보드', order: 1, depth: 0, canSearch: 'Y', canSave: 'N', canExcel: 'Y', canPrint: 'Y' },
    { id: 'menu02', name: '사용자 관리', order: 2, depth: 0, canSearch: 'Y', canSave: 'Y', canExcel: 'Y', canPrint: 'N' },
];

const groupMenuColumns: GridColDef[] = [
    { field: 'depth', headerName: 'LEVEL', width: 80, align: 'center' },
    { field: 'id', headerName: '메뉴ID', width: 120 },
    { field: 'name', headerName: '메뉴명', flex: 1, minWidth: 150 },
    { field: 'order', headerName: '순번', width: 80, align: 'center' },
    { field: 'canSearch', headerName: '조회', width: 60, align: 'center' },
    { field: 'canSave', headerName: '저장', width: 60, align: 'center' },
    { field: 'canExcel', headerName: '엑셀', width: 60, align: 'center' },
    { field: 'canPrint', headerName: '인쇄', width: 60, align: 'center' },
];

// 사용여부 Select를 위한 옵션 데이터
const usageStatusOptions = [
    { value: 'Y', label: '사용' },
    { value: 'N', label: '미사용' },
];

export default function AuthGroupPage() {
    // 조회 조건 State
    const [groupCode, setGroupCode] = useState('');
    const [groupName, setGroupName] = useState('');

    // 상단 오른쪽 폼 State (권한그룹 등록)
    const [authGroupForm, setAuthGroupForm] = useState({
        id: 'GRP001',
        name: '관리자 그룹',
        isUsed: 'Y',
        description: '시스템의 모든 기능에 접근할 수 있는 최상위 그룹입니다.',
    });

    // 하단 오른쪽 폼 State (등록된 프로그램)
    const [menuPermissionForm, setMenuPermissionForm] = useState({
        menuId: 'menu02',
        menuName: '사용자 관리',
        canSearch: true,
        canSave: true,
        canExcel: true,
        canPrint: false,
    });

    const handleSearch = () => {
        alert(`검색 조건:\n그룹코드: ${groupCode}\n그룹명: ${groupName}`);
    };

    const handleReset = () => {
        setGroupCode('');
        setGroupName('');
    };

    // 권한그룹 등록 폼 변경 핸들러
    const handleAuthGroupFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>) => {
        const { name, value } = e.target;
        setAuthGroupForm(prev => ({ ...prev, [name]: value }));
    };

    // 메뉴 권한 폼 변경 핸들러
    const handlePermissionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        setMenuPermissionForm(prev => ({ ...prev, [name]: checked }));
    };

    // 셔틀 버튼 스타일
    const shuttleButtonStyle = {
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 0,
        width: '32px',
        height: '32px',
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', p: 3, boxSizing: 'border-box' }}>
            {/* --- 상단 제목 및 조회 영역 --- */}
            <TitleArea title="권한그룹 관리">
                <ResetButton onClick={handleReset} />
            </TitleArea>

            <SearchArea>
                <FormField label="권한그룹코드" htmlFor="group-code-search">
                    <TextField id="group-code-search" value={groupCode} onChange={(e) => setGroupCode(e.target.value)} sx={{ width: '200px' }} />
                </FormField>
                <FormField label="권한그룹명" htmlFor="group-name-search">
                    <TextField id="group-name-search" value={groupName} onChange={(e) => setGroupName(e.target.value)} sx={{ width: '200px' }} />
                </FormField>
                <SearchIconButton onClick={handleSearch} />
            </SearchArea>

            {/* --- 메인 콘텐츠 영역 (수직 분할) --- */}
            {/* ★ 스크롤 문제 해결: 불필요한 mt: 3 제거 */}
            <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: 3, overflow: 'hidden' }}>

                {/* --- 상단 행 (8:4 비율) --- */}
                <Box sx={{ flex: 1, display: 'flex', flexDirection: 'row', gap: 3, minHeight: 0 }}>
                    {/* 상단 왼쪽 (flex: 8) */}
                    <Box sx={{ flex: 8, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
                        <SubTitleArea title="권한그룹 목록">
                        </SubTitleArea>
                        <DsDataGrid rows={authGroupRows} columns={authGroupColumns} sx={{ flexGrow: 1 }} showRowNumber checkboxSelection hideFooter />
                    </Box>
                    {/* 상단 오른쪽 (flex: 4) */}
                    <Box sx={{ flex: 4, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
                        <SubTitleArea title="권한그룹 등록">
                            <AddButton onClick={() => {}} />
                            <DeleteButton onClick={() => {}} />
                            <SaveButton onClick={() => {}} />
                        </SubTitleArea>
                        <Box sx={{ border: '1px solid', borderColor: 'divider', flexGrow: 1, display: 'flex', flexDirection: 'column', overflow: 'auto' }}>
                            <FormTableRow label="권한그룹코드" required>
                                <TextField fullWidth variant="outlined" value={authGroupForm.id} InputProps={{ readOnly: true }} />
                            </FormTableRow>
                            <FormTableRow label="권한그룹명" required>
                                <TextField fullWidth variant="outlined" name="name" value={authGroupForm.name} onChange={handleAuthGroupFormChange} />
                            </FormTableRow>
                            <FormTableRow label="설명">
                                <TextField fullWidth multiline rows={2} variant="outlined" name="description" value={authGroupForm.description} onChange={handleAuthGroupFormChange} />
                            </FormTableRow>
                            <FormTableRow label="사용여부">
                                <Select fullWidth name="isUsed" value={authGroupForm.isUsed} onChange={handleAuthGroupFormChange}>
                                    {usageStatusOptions.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                                    ))}
                                </Select>
                            </FormTableRow>
                        </Box>
                    </Box>
                </Box>

                {/* --- 하단 행 (8:4 비율) --- */}
                <Box sx={{ flex: 1, display: 'flex', flexDirection: 'row', gap: 3, minHeight: 0 }}>
                    {/* 하단 왼쪽 (flex: 8) - 셔틀 그리드 영역 */}
                    <Box sx={{ flex: 8, display: 'flex', flexDirection: 'row', gap: 3, minWidth: 0, alignItems: 'center' }}>
                        {/* 전체 프로그램 그리드 */}
                        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, alignSelf: 'stretch' }}>
                            <SubTitleArea title="전체 프로그램" />
                            <DsDataGrid rows={allMenuRows} columns={allMenuColumns} sx={{ flexGrow: 1 }} showRowNumber checkboxSelection hideFooter />
                        </Box>

                        {/* 셔틀 버튼 */}
                        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 2 }}>
                            <IconButton color="primary" aria-label="move selected right" sx={shuttleButtonStyle}><ChevronRightIcon /></IconButton>
                            <IconButton color="primary" aria-label="move selected left" sx={shuttleButtonStyle}><ChevronLeftIcon /></IconButton>
                        </Box>

                        {/* 등록된 프로그램 그리드 */}
                        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, alignSelf: 'stretch' }}>
                            <SubTitleArea title="등록된 프로그램" />
                            <DsDataGrid rows={groupMenuRows} columns={groupMenuColumns} sx={{ flexGrow: 1 }} showRowNumber checkboxSelection hideFooter />
                        </Box>
                    </Box>

                    {/* 하단 오른쪽 (flex: 4) - 메뉴 상세 */}
                    <Box sx={{ flex: 4, display: 'flex', flexDirection: 'column', minWidth: 0, alignSelf: 'stretch' }}>
                        <SubTitleArea title="메뉴 상세">
                            <SaveButton onClick={() => {}} />
                        </SubTitleArea>
                        <Box sx={{ border: '1px solid', borderColor: 'divider', flexGrow: 1, display: 'flex', flexDirection: 'column', overflow: 'auto' }}>
                            <FormTableRow label="메뉴ID" required>
                                <TextField fullWidth variant="outlined" value={menuPermissionForm.menuId} InputProps={{ readOnly: true }} />
                            </FormTableRow>
                            <FormTableRow label="메뉴명" required>
                                <TextField fullWidth variant="outlined" value={menuPermissionForm.menuName} InputProps={{ readOnly: true }} />
                            </FormTableRow>
                            <FormTableRow label="조회">
                                <DsCheckbox name="canSearch" checked={menuPermissionForm.canSearch} onChange={handlePermissionChange} />
                            </FormTableRow>
                            <FormTableRow label="저장">
                                <DsCheckbox name="canSave" checked={menuPermissionForm.canSave} onChange={handlePermissionChange} />
                            </FormTableRow>
                            <FormTableRow label="엑셀">
                                <DsCheckbox name="canExcel" checked={menuPermissionForm.canExcel} onChange={handlePermissionChange} />
                            </FormTableRow>
                            <FormTableRow label="인쇄">
                                <DsCheckbox name="canPrint" checked={menuPermissionForm.canPrint} onChange={handlePermissionChange} />
                            </FormTableRow>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}