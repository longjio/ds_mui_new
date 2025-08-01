// D:/ds_mui_new/src/mobile/template/MobileUserList.tsx

import React, { useMemo, useState, useEffect } from 'react';
// ★ 1. useOutletContext 훅을 import 합니다.
import { useNavigate, useSearchParams, useOutletContext } from 'react-router-dom';
import {
    Box,
    Stack,
    Paper,
    Chip,
    Fab,
    Zoom,
    Drawer,
    Toolbar,
    IconButton,
    Divider,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import CloseIcon from '@mui/icons-material/Close';
import { TitleS, TitleXS, BodyM, BodyS } from '../../components/typography';
import { DsButton } from '../../components/button/DsButton';
// ★ 2. MobileHeader를 import 합니다.
import MobileHeader from '../components/MobileHeader';

// User.tsx에서 사용자 데이터 타입과 샘플 데이터를 가져옵니다.
interface User {
    id: string;
    loginId: string;
    name: string;
    system: string;
    company: string;
    useTempPassword: 'Y' | 'N';
    isUsed: 'Y' | 'N';
    description: string;
    createdBy: string;
    updatedBy: string;
    createdAt: string;
    updatedAt: string;
}

const allUsers: User[] = [
    { id: 'user001', loginId: 'user001', name: '홍길동', system: 'DS MUI NEW', company: '본사', useTempPassword: 'N', isUsed: 'Y', description: '프론트엔드 개발자', createdBy: 'admin', updatedBy: 'admin', createdAt: '2023-10-27 10:00', updatedAt: '2023-10-27 11:00' },
    { id: 'user002', loginId: 'user002', name: '이순신', system: 'DS MUI NEW', company: '자회사 A', useTempPassword: 'N', isUsed: 'Y', description: '백엔드 개발자', createdBy: 'admin', updatedBy: 'admin', createdAt: '2023-10-26 14:00', updatedAt: '2023-10-26 15:30' },
    { id: 'user003', loginId: 'user003', name: '유관순', system: '레거시 시스템', company: '자회사 B', useTempPassword: 'Y', isUsed: 'N', description: 'UI/UX 디자이너', createdBy: 'admin', updatedBy: 'admin', createdAt: '2023-10-25 09:00', updatedAt: '2023-10-25 09:00' },
    { id: 'user004', loginId: 'user004', name: '세종대왕', system: 'DS MUI NEW', company: '본사', useTempPassword: 'N', isUsed: 'Y', description: '프로젝트 매니저', createdBy: 'admin', updatedBy: 'admin', createdAt: '2023-10-24 11:00', updatedAt: '2023-10-24 18:00' },
];

// --- 상세 정보 Drawer 컴포넌트 ---
interface MobileUserDetailProps {
    open: boolean;
    onClose: () => void;
    user: User | null;
}

function MobileUserDetail({ open, onClose, user }: MobileUserDetailProps) {
    if (!user) {
        return null;
    }

    return (
        <Drawer
            anchor="bottom"
            open={open}
            onClose={onClose}
            PaperProps={{
                sx: {
                    height: '90vh',
                    maxHeight: '700px',
                    borderTopLeftRadius: 16,
                    borderTopRightRadius: 16,
                },
            }}
        >
            <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <Toolbar disableGutters sx={{ flexShrink: 0, px: '20px' }}>
                    <TitleS component="div" sx={{ flexGrow: 1 }}>
                        {user.name}
                    </TitleS>
                    <IconButton edge="end" color="inherit" onClick={onClose} aria-label="close">
                        <CloseIcon />
                    </IconButton>
                </Toolbar>
                <Divider />

                <Box sx={{ p: 4, overflowY: 'auto', flexGrow: 1 }}>
                    <Stack spacing={2}>
                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                            <BodyM>사용 여부</BodyM>
                            <Chip label={user.isUsed === 'Y' ? '사용' : '미사용'} color={user.isUsed === 'Y' ? 'success' : 'default'} size="small"/>
                        </Stack>
                        <Divider />
                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                            <BodyM>로그인 ID</BodyM>
                            <BodyM sx={{ color: 'text.secondary' }}>{user.loginId}</BodyM>
                        </Stack>
                        <Divider />
                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                            <BodyM>시스템</BodyM>
                            <BodyM sx={{ color: 'text.secondary' }}>{user.system}</BodyM>
                        </Stack>
                        <Divider />
                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                            <BodyM>회사</BodyM>
                            <BodyM sx={{ color: 'text.secondary' }}>{user.company}</BodyM>
                        </Stack>
                        <Divider />
                        <Stack spacing={1}>
                            <BodyM>설명</BodyM>
                            <BodyS sx={{ color: 'text.secondary', whiteSpace: 'pre-wrap' }}>
                                {user.description}
                            </BodyS>
                        </Stack>
                        <Divider />
                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                            <BodyM>등록일시</BodyM>
                            <BodyM sx={{ color: 'text.secondary' }}>{user.createdAt}</BodyM>
                        </Stack>
                        <Divider />
                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                            <BodyM>수정일시</BodyM>
                            <BodyM sx={{ color: 'text.secondary' }}>{user.updatedAt}</BodyM>
                        </Stack>
                    </Stack>
                </Box>

                <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider', flexShrink: 0 }}>
                    <DsButton fullWidth variant="contained" size="xlarge" onClick={onClose}>
                        확인
                    </DsButton>
                </Box>
            </Box>
        </Drawer>
    );
}


// --- 메인 리스트 페이지 컴포넌트 ---
export default function MobileUserListPage() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    // ★ 3. 부모(MobileLayout)로부터 Drawer를 여는 함수를 받아옵니다.
    const { handleDrawerToggle } = useOutletContext<{ handleDrawerToggle: () => void }>();

    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [showScrollTop, setShowScrollTop] = useState(false);

    useEffect(() => {
        const scrollableContainer = document.querySelector('main');
        const handleScroll = () => {
            if (scrollableContainer) {
                setShowScrollTop(scrollableContainer.scrollTop > 300);
            }
        };
        if (scrollableContainer) {
            scrollableContainer.addEventListener('scroll', handleScroll);
        }
        return () => {
            if (scrollableContainer) {
                scrollableContainer.removeEventListener('scroll', handleScroll);
            }
        };
    }, []);

    const filteredUsers = useMemo(() => {
        const system = searchParams.get('system');
        const company = searchParams.get('company');
        const loginId = searchParams.get('loginId');
        const userName = searchParams.get('userName');

        return allUsers.filter(user => {
            const matchSystem = !system || system === 'all' || user.system === system;
            const matchCompany = !company || company === 'all' || user.company === company;
            const matchLoginId = !loginId || user.loginId.toLowerCase().includes(loginId.toLowerCase());
            const matchUserName = !userName || user.name.toLowerCase().includes(userName.toLowerCase());
            return matchSystem && matchCompany && matchLoginId && matchUserName;
        });
    }, [searchParams]);

    const handleItemClick = (user: User) => {
        setSelectedUser(user);
    };

    const handleDetailClose = () => {
        setSelectedUser(null);
    };

    const handleAddNew = () => {
        navigate('/m/user-form'); // 가상 경로
    };

    const handleScrollToTop = () => {
        const scrollableContainer = document.querySelector('main');
        if (scrollableContainer) {
            scrollableContainer.scrollTo({
                top: 0,
                behavior: 'smooth',
            });
        }
    };

    return (
        // ★ 4. 전체 레이아웃을 Header와 Content로 나눕니다.
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <MobileHeader
                title="사용자 관리"
                onRightIconClick={handleDrawerToggle}
            />
            {/* 콘텐츠 영역 */}
            <Box sx={{ flexGrow: 1, position: 'relative', overflowY: 'auto' }}>
                <Box sx={{ p: 2, pb: 15 }}>
                    <TitleS component="h1" sx={{ mb: 2, fontWeight: 'bold' }}>
                        사용자 목록 ({filteredUsers.length})
                    </TitleS>

                    {filteredUsers.length > 0 ? (
                        <Paper elevation={0} sx={{ borderRadius: 2 }}>
                            {filteredUsers.map((user, index) => (
                                <Box
                                    key={user.id}
                                    onClick={() => handleItemClick(user)}
                                    sx={{
                                        p: 2,
                                        cursor: 'pointer',
                                        borderBottom: index === filteredUsers.length - 1 ? 'none' : 1,
                                        borderColor: 'divider',
                                        '&:hover': {
                                            backgroundColor: 'action.hover',
                                        },
                                    }}
                                >
                                    <Stack spacing={1}>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <TitleXS component="h2">{user.name}</TitleXS>
                                            <Chip
                                                label={user.isUsed === 'Y' ? '사용' : '미사용'}
                                                color={user.isUsed === 'Y' ? 'success' : 'default'}
                                                size="small"
                                                sx={{ minWidth: '50px' }}
                                            />
                                        </Box>
                                        <BodyS sx={{ color: 'text.secondary' }} noWrap>
                                            ID: {user.loginId}
                                        </BodyS>
                                        <BodyS sx={{ color: 'text.secondary' }} noWrap>
                                            {user.company} / {user.system}
                                        </BodyS>
                                    </Stack>
                                </Box>
                            ))}
                        </Paper>
                    ) : (
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
                            <BodyM sx={{ color: 'text.secondary' }}>검색 결과가 없습니다.</BodyM>
                        </Box>
                    )}
                </Box>

                <MobileUserDetail
                    open={!!selectedUser}
                    onClose={handleDetailClose}
                    user={selectedUser}
                />

                {/* FAB 버튼들을 스크롤 컨테이너 내부에 fixed 대신 absolute로 배치합니다. */}
                <Box sx={{ position: 'absolute', bottom: 16, right: 16 }}>
                    <Stack spacing={2} alignItems="center">
                        {/* '맨 위로 가기' 버튼: 스크롤 시 나타남 */}
                        <Zoom in={showScrollTop}>
                            <Fab color="secondary" size="small" aria-label="scroll back to top" onClick={handleScrollToTop}>
                                <KeyboardArrowUpIcon />
                            </Fab>
                        </Zoom>

                        {/* '신규 등록' 버튼: 항상 보임 */}
                        <Fab color="primary" aria-label="add" onClick={handleAddNew}>
                            <AddIcon />
                        </Fab>
                    </Stack>
                </Box>
            </Box>
        </Box>
    );
}