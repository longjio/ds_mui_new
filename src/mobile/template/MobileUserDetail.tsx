// D:/ds_mui_new/src/mobile/template/MobileUserDetail.tsx

import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Box,
    Stack,
    Avatar,
    Chip,
    Tabs,
    Tab,
    Paper,
    Divider,
    List,
    ListItem,
    ListItemText,
    Fab,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import EditIcon from '@mui/icons-material/Edit';
import MobileHeader from '../components/MobileHeader';
import { TitleS, BodyM } from '../../components/typography';

// 사용자 데이터 타입 정의 (목록 페이지와 동일)
interface User {
    id: string;
    loginId: string;
    name: string;
    system: string;
    company: string;
    isUsed: 'Y' | 'N';
}

// 샘플 데이터 (실제로는 API로 사용자 정보를 가져와야 합니다)
const sampleUsers: User[] = [
    { id: 'user001', loginId: 'user001', name: '홍길동', system: 'DS MUI NEW', company: '본사', isUsed: 'Y' },
    { id: 'user002', loginId: 'user002', name: '이순신', system: 'DS MUI NEW', company: '자회사 A', isUsed: 'Y' },
    { id: 'user003', loginId: 'user003', name: '유관순', system: '레거시 시스템', company: '자회사 B', isUsed: 'N' },
    { id: 'user004', loginId: 'user004', name: '세종대왕', system: 'DS MUI NEW', company: '본사', isUsed: 'Y' },
];

// 탭 패널을 위한 헬퍼 컴포넌트
interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;
    return (
        <div role="tabpanel" hidden={value !== index} {...other}>
            {value === index && <Box sx={{ p: 2 }}>{children}</Box>}
        </div>
    );
}

// --- ★★★ 핵심 수정 사항 ★★★ ---
const DetailListItem = ({ label, value }: { label: string, value: React.ReactNode }) => (
    <>
        <ListItem sx={{ py: 1.5 }}>
            <ListItemText
                primary={label}
                secondary={value}
                primaryTypographyProps={{ variant: 'body2', color: 'text.secondary' }}
                secondaryTypographyProps={{ variant: 'body1', color: 'text.primary', sx: { mt: 0.5 } }}
            />
        </ListItem>
        {/* `variant="inset"`을 제거하여 구분선이 전체 너비를 차지하도록 합니다. */}
        <Divider component="li" />
    </>
);

export default function MobileUserDetailPage() {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const user = sampleUsers.find(u => u.id === id);
    const [tabValue, setTabValue] = useState(0);

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    const handleEditClick = () => {
        if (user) {
            navigate(`/m/user-management/${user.id}/edit`);
        }
    };

    if (!user) {
        return (
            <Box>
                <MobileHeader title="사용자 정보" leftIcon="back" rightIcon="none" />
                <Box sx={{ p: 2 }}>
                    <TitleS>사용자를 찾을 수 없습니다.</TitleS>
                </Box>
            </Box>
        );
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', bgcolor: 'background.default' }}>
            <MobileHeader title="사용자 정보" leftIcon="back" rightIcon="none" />

            {/* 프로필 헤더 */}
            <Paper elevation={0} sx={{ p: 3, border: 0, borderRadius: 0, bgcolor: 'background.paper' }}>
                <Stack direction="row" spacing={2} alignItems="center">
                    <Avatar sx={{ width: 64, height: 64, bgcolor: 'primary.main' }}>
                        <PersonIcon sx={{ fontSize: 40 }} />
                    </Avatar>
                    <Stack>
                        <TitleS>{user.name}</TitleS>
                        <BodyM color="text.secondary">{user.loginId}</BodyM>
                    </Stack>
                </Stack>
            </Paper>
            <Divider />

            {/* 정보 탭 */}
            <Box sx={{ borderBottom: 1, borderColor: 'divider', bgcolor: 'background.paper' }}>
                <Tabs value={tabValue} onChange={handleTabChange} variant="fullWidth">
                    <Tab label="기본 정보" />
                    <Tab label="권한 정보" />
                </Tabs>
            </Box>

            {/* 탭 패널 (콘텐츠) */}
            <Box sx={{ flexGrow: 1, overflowY: 'auto', bgcolor: 'background.paper' }}>
                <TabPanel value={tabValue} index={0}>
                    <List disablePadding>
                        <DetailListItem label="상태" value={<Chip label={user.isUsed === 'Y' ? '사용중' : '미사용'} color={user.isUsed === 'Y' ? 'success' : 'default'} size="small" />} />
                        <DetailListItem label="시스템" value={user.system} />
                        <DetailListItem label="회사" value={user.company} />
                        <DetailListItem label="사용자 번호" value={user.id} />
                    </List>
                </TabPanel>
                <TabPanel value={tabValue} index={1}>
                    <List disablePadding>
                        <DetailListItem label="권한 그룹" value="일반 사용자 그룹" />
                        <DetailListItem label="메뉴 접근 권한" value="대시보드, 사용자 관리, 게시판" />
                    </List>
                </TabPanel>
            </Box>

            {/* 수정 버튼 */}
            <Fab
                color="primary"
                aria-label="edit user"
                sx={{ position: 'fixed', bottom: 24, right: 24 }}
                onClick={handleEditClick}
            >
                <EditIcon />
            </Fab>
        </Box>
    );
}