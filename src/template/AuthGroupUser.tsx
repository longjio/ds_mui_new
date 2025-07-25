// D:/ds_mui_new/src/template/AuthGroupUser.tsx

import React, { useState } from 'react';
import { Box, TextField, IconButton } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

// 레이아웃 및 공통 컴포넌트 import
import { TitleArea, SearchArea, SubTitleArea } from '../layouts';
import { FormField } from '../components/form/FormField';
import DsDataGrid from '../components/mui_x/datagrid/DsDataGrid';
import {
    SearchIconButton,
    ResetButton,
    SaveButton,
} from '../components/button';

// --- 샘플 데이터 정의 ---

// 1. 상단 그리드: 권한그룹 목록
const authGroupRows = [
    { id: 'GRP001', name: '관리자 그룹', description: '시스템의 모든 기능에 접근할 수 있는 최상위 그룹입니다.', isUsed: 'Y' },
    { id: 'GRP002', name: '일반 사용자 그룹', description: '데이터 조회 및 개인 정보 수정이 가능한 그룹입니다.', isUsed: 'Y' },
    { id: 'GRP003', name: '게스트 그룹', description: '읽기 전용 권한을 가진 그룹입니다.', isUsed: 'N' },
];

// ★ 1. 권한그룹 그리드 컬럼 수정
const authGroupColumns: GridColDef[] = [
    { field: 'id', headerName: '권한그룹코드', width: 150 },
    { field: 'name', headerName: '권한그룹명', width: 200 },
    { field: 'description', headerName: '설명', flex: 1, minWidth: 250 },
    { field: 'isUsed', headerName: '사용여부', width: 100, align: 'center' },
];

// 2. 하단 왼쪽 그리드: 전체 사용자 목록
const allUserRows = [
    { id: 'user001', loginId: 'gildong', name: '홍길동', system: 'DS MUI NEW', company: '본사' },
    { id: 'user002', loginId: 'sunsin', name: '이순신', system: 'DS MUI NEW', company: '자회사 A' },
    { id: 'user003', loginId: 'gwansun', name: '유관순', system: '레거시 시스템', company: '자회사 B' },
    { id: 'user004', loginId: 'sejong', name: '세종대왕', system: 'DS MUI NEW', company: '본사' },
    { id: 'user005', loginId: 'saimdang', name: '신사임당', system: 'DS MUI NEW', company: '본사' },
    { id: 'user006', loginId: 'youngsil', name: '장영실', system: 'DS MUI NEW', company: '본사' },
];

// ★ 2. 전체 사용자 그리드 컬럼 수정
const allUserColumns: GridColDef[] = [
    { field: 'id', headerName: '사용자번호', width: 120 },
    { field: 'loginId', headerName: '로그인ID', width: 120 },
    { field: 'name', headerName: '이름', flex: 1, minWidth: 120 },
    { field: 'system', headerName: '시스템', flex: 1, minWidth: 150 },
    { field: 'company', headerName: '회사', flex: 1, minWidth: 120 },
];

// 3. 하단 오른쪽 그리드: 그룹에 속한 사용자 목록
const usersInGroupRows = [
    { id: 'user001', loginId: 'gildong', name: '홍길동', system: 'DS MUI NEW', company: '본사' },
    { id: 'user005', loginId: 'saimdang', name: '신사임당', system: 'DS MUI NEW', company: '본사' },
];

// ★ 3. 그룹 소속 사용자 그리드 컬럼은 전체 사용자와 동일하게 사용
const usersInGroupColumns = allUserColumns;


export default function AuthGroupUserPage() {
    // 조회 조건 State
    const [groupCode, setGroupCode] = useState('');
    const [groupName, setGroupName] = useState('');

    const handleSearch = () => {
        alert(`검색 조건:\n그룹코드: ${groupCode}\n그룹명: ${groupName}`);
    };

    const handleReset = () => {
        setGroupCode('');
        setGroupName('');
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
            <TitleArea title="그룹별 사용자 관리">
                <SaveButton onClick={() => {}} />
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
            <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: 3, overflow: 'hidden' }}>

                {/* --- 상단 그리드 --- */}
                <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
                    <SubTitleArea title="권한그룹 목록" />
                    <DsDataGrid
                        rows={authGroupRows}
                        columns={authGroupColumns}
                        sx={{ flexGrow: 1 }}
                        showRowNumber
                        hideFooter
                    />
                </Box>

                {/* --- 하단 셔틀 그리드 영역 --- */}
                <Box sx={{ flex: 1, display: 'flex', flexDirection: 'row', gap: 3, minHeight: 0, alignItems: 'center' }}>
                    {/* 전체 사용자 그리드 */}
                    <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, alignSelf: 'stretch' }}>
                        <SubTitleArea title="전체 사용자" />
                        <DsDataGrid
                            rows={allUserRows}
                            columns={allUserColumns}
                            sx={{ flexGrow: 1 }}
                            showRowNumber
                            checkboxSelection
                            hideFooter
                        />
                    </Box>

                    {/* 셔틀 버튼 */}
                    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 2 }}>
                        <IconButton color="primary" aria-label="move selected right" sx={shuttleButtonStyle}>
                            <ChevronRightIcon />
                        </IconButton>
                        <IconButton color="primary" aria-label="move selected left" sx={shuttleButtonStyle}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </Box>

                    {/* 그룹 소속 사용자 그리드 */}
                    <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, alignSelf: 'stretch' }}>
                        <SubTitleArea title="그룹 소속 사용자" />
                        <DsDataGrid
                            rows={usersInGroupRows}
                            columns={usersInGroupColumns}
                            sx={{ flexGrow: 1 }}
                            showRowNumber
                            checkboxSelection
                            hideFooter
                        />
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}