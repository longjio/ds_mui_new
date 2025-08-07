// D:/ds_mui_new/src/mobile/template/MobileUserList.tsx

import React from 'react';
// ★ 1. useNavigate를 import 합니다.
import { useOutletContext, useNavigate } from 'react-router-dom';
import {
    Box,
    Stack,
    List,
    ListItemButton,
    Avatar,
    Chip,
    Divider,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import MobileHeader from '../components/MobileHeader';
import { BodyM, BodyS } from '../../components/typography';

// 사용자 데이터 타입 정의
interface User {
    id: string;
    loginId: string;
    name: string;
    system: string;
    company: string;
    isUsed: 'Y' | 'N';
}

// 샘플 사용자 데이터 (데스크톱 User.tsx 참고)
const sampleUsers: User[] = [
    { id: 'user001', loginId: 'user001', name: '홍길동', system: 'DS MUI NEW', company: '본사', isUsed: 'Y' },
    { id: 'user002', loginId: 'user002', name: '이순신', system: 'DS MUI NEW', company: '자회사 A', isUsed: 'Y' },
    { id: 'user003', loginId: 'user003', name: '유관순', system: '레거시 시스템', company: '자회사 B', isUsed: 'N' },
    { id: 'user004', loginId: 'user004', name: '세종대왕', system: 'DS MUI NEW', company: '본사', isUsed: 'Y' },
];

// ★ 2. 개별 사용자 목록 아이템에 onClick 핸들러를 받을 수 있도록 props를 추가합니다.
const UserListItem = ({ user, onClick }: { user: User; onClick: () => void }) => (
    <ListItemButton sx={{ py: 2, px: '20px' }} onClick={onClick}>
        <Stack direction="row" spacing={2} alignItems="center" sx={{ width: '100%' }}>
            <Avatar sx={{ bgcolor: user.isUsed === 'Y' ? 'primary.light' : 'grey.300' }}>
                <PersonIcon />
            </Avatar>
            <Stack sx={{ flexGrow: 1, minWidth: 0 }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <BodyM component="h2" noWrap sx={{ fontWeight: 'bold' }}>
                        {user.name}
                    </BodyM>
                    <Chip
                        label={user.isUsed === 'Y' ? '사용중' : '미사용'}
                        color={user.isUsed === 'Y' ? 'success' : 'default'}
                        size="small"
                    />
                </Stack>
                <BodyS sx={{ color: 'text.secondary' }} noWrap>
                    ID: {user.loginId}
                </BodyS>
                <BodyS sx={{ color: 'text.secondary' }} noWrap>
                    {user.company} / {user.system}
                </BodyS>
            </Stack>
        </Stack>
    </ListItemButton>
);

// 메인 페이지 컴포넌트
export default function MobileUserList() {
    const { handleDrawerToggle } = useOutletContext<{ handleDrawerToggle: () => void }>();
    // ★ 3. navigate 함수를 초기화합니다.
    const navigate = useNavigate();

    // ★ 4. 사용자 클릭 시 상세 페이지로 이동하는 핸들러를 추가합니다.
    const handleUserClick = (userId: string) => {
        navigate(`/m/user-management/${userId}`);
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <MobileHeader
                title="사용자 관리"
                onRightIconClick={handleDrawerToggle}
            />
            <Box sx={{ flexGrow: 1, overflowY: 'auto' }}>
                <List disablePadding>
                    {sampleUsers.map((user, index) => (
                        <React.Fragment key={user.id}>
                            {/* ★ 5. UserListItem에 클릭 핸들러를 전달합니다. */}
                            <UserListItem user={user} onClick={() => handleUserClick(user.id)} />
                            {index < sampleUsers.length - 1 && <Divider component="li" variant="inset" />}
                        </React.Fragment>
                    ))}
                </List>
            </Box>
        </Box>
    );
}