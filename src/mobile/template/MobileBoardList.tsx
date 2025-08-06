// D:/ds_mui_new/src/mobile/template/MobileBoardList.tsx

import React from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import {
    Box,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Paper,
    Divider,
    Chip,
    Stack,
    Fab, // ★ 1. FAB 컴포넌트를 import 합니다.
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit'; // ★ 2. 글쓰기 아이콘을 import 합니다.
import { BodyS } from '../../components/typography';
import MobileHeader from '../components/MobileHeader';

// 게시판 데이터 타입 정의
interface BoardPost {
    id: string;
    category: string;
    title:string;
    author: string;
    date: string;
    views: number;
    commentsCount: number;
}

// 게시판 샘플 데이터
const posts: BoardPost[] = [
    { id: 'post-001', category: '자유', title: '새로운 디자인 시스템 정말 좋네요!', author: '김개발', date: '2024-05-28', views: 152, commentsCount: 8 },
    { id: 'post-002', category: '질문', title: '모바일 Drawer에서 클릭이 두 번 되는 현상 질문', author: '이초보', date: '2024-05-27', views: 298, commentsCount: 3 },
    { id: 'post-003', category: '정보', title: '유용한 React 훅 모음 공유합니다.', author: '박고수', date: '2024-05-27', views: 540, commentsCount: 15 },
    { id: 'post-004', category: '자유', title: '오늘 점심 메뉴 추천 받습니다.', author: '최인턴', date: '2024-05-26', views: 45, commentsCount: 22 },
];

export default function MobileBoardListPage() {
    const navigate = useNavigate();
    const { handleDrawerToggle } = useOutletContext<{ handleDrawerToggle: () => void }>();

    const handlePostClick = (id: string) => {
        navigate(`/m/board/${id}`);
    };

    // ★ 3. 글쓰기 버튼 클릭 핸들러를 추가합니다.
    const handleWriteClick = () => {
        // 글쓰기 페이지로 이동합니다. (추후 생성 필요)
        navigate(`/m/board/write`);
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <MobileHeader
                title="게시판"
                onRightIconClick={handleDrawerToggle}
            />
            {/* ★ 4. FAB 버튼에 가려지지 않도록 콘텐츠 영역에 하단 패딩을 추가합니다. */}
            <Box sx={{ flexGrow: 1, overflowY: 'auto', pb: 10 }}>
                <Paper elevation={0} sx={{ border: 0, borderRadius: 0 }}>
                    <List disablePadding>
                        {posts.map((post, index) => (
                            <React.Fragment key={post.id}>
                                <ListItem disablePadding>
                                    <ListItemButton onClick={() => handlePostClick(post.id)} sx={{ py: 2, px: '20px' }}>
                                        <Stack spacing={1} sx={{ width: '100%' }}>
                                            <Stack direction="row" spacing={1} alignItems="center">
                                                <Chip label={post.category} color="primary" variant="outlined" size="small" />
                                                <ListItemText
                                                    primary={post.title}
                                                    primaryTypographyProps={{ variant: 'body1', fontWeight: 500, noWrap: true }}
                                                    sx={{ my: 0 }}
                                                />
                                                <BodyS sx={{ color: 'primary.main', fontWeight: 'bold' }}>
                                                    [{post.commentsCount}]
                                                </BodyS>
                                            </Stack>
                                            <Stack direction="row" justifyContent="space-between" alignItems="center">
                                                <BodyS sx={{ color: 'text.secondary' }}>
                                                    {post.author} · {post.date}
                                                </BodyS>
                                                <BodyS sx={{ color: 'text.secondary' }}>
                                                    조회 {post.views}
                                                </BodyS>
                                            </Stack>
                                        </Stack>
                                    </ListItemButton>
                                </ListItem>
                                {index < posts.length - 1 && <Divider component="li" />}
                            </React.Fragment>
                        ))}
                    </List>
                </Paper>
            </Box>

            {/* ★ 5. 글쓰기 FAB를 추가합니다. */}
            <Fab
                color="primary"
                aria-label="write post"
                onClick={handleWriteClick}
                sx={{
                    position: 'fixed',
                    bottom: 24,
                    right: 24,
                }}
            >
                <EditIcon />
            </Fab>
        </Box>
    );
}