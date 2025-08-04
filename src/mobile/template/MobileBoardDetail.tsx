// D:/ds_mui_new/src/mobile/template/MobileBoardDetail.tsx

import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Box,
    Divider,
    Stack,
    Chip,
    Avatar,
    TextField,
    Paper,
} from '@mui/material';
import { TitleS, BodyM, BodyS } from '../../components/typography';
import { DsButton } from '../../components/button/DsButton';
import MobileHeader from '../components/MobileHeader';

// 게시판 샘플 데이터 (목록 페이지와 일부 공유)
const posts = [
    { id: 'post-001', category: '자유', title: '새로운 디자인 시스템 정말 좋네요!', author: '김개발', date: '2024-05-28', views: 152, commentsCount: 2, content: '이번에 새로 도입된 모바일 템플릿 덕분에 개발 속도가 엄청나게 빨라졌습니다.\n\n특히 재사용 가능한 헤더 컴포넌트와 일관된 폼 요소들이 마음에 드네요. 다들 어떻게 사용하고 계신가요?' },
    { id: 'post-002', category: '질문', title: '모바일 Drawer에서 클릭이 두 번 되는 현상 질문', author: '이초보', date: '2024-05-27', views: 298, commentsCount: 3, content: '안녕하세요, Drawer 메뉴를 클릭하면 한번에 페이지 이동이 안되고 두 번 클릭해야만 이동이 됩니다. 혹시 비슷한 문제를 겪으신 분 계신가요?' },
];

const comments = [
    { id: 'comment-01', author: '박고수', content: 'onMouseDown 이벤트를 사용해보세요! onClick은 렌더링과 충돌할 수 있습니다.', date: '2024-05-27' },
    { id: 'comment-02', author: '최매니저', content: '좋은 의견 감사합니다. 저희도 해당 이슈 인지하고 있으며, 개선하도록 하겠습니다.', date: '2024-05-27' },
    { id: 'comment-03', author: '이초보', content: '와, onMouseDown으로 바꾸니 바로 해결됐습니다. 감사합니다!', date: '2024-05-28' },
];

export default function MobileBoardDetailPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const post = posts.find(p => p.id === id);

    if (!post) {
        return (
            <Box>
                <MobileHeader title="게시글 없음" leftIcon="back" />
                <Box sx={{ p: 2 }}>
                    <TitleS>게시글을 찾을 수 없습니다.</TitleS>
                </Box>
            </Box>
        );
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', bgcolor: 'background.default' }}>
            <MobileHeader title="게시판" leftIcon="back" />

            <Box sx={{ flexGrow: 1, overflowY: 'auto' }}>
                {/* --- 게시글 본문 --- */}
                <Box sx={{ p: '20px' }}>
                    <Stack spacing={1} sx={{ mb: 2 }}>
                        <Chip label={post.category} color="primary" variant="outlined" size="small" sx={{ width: 'fit-content' }} />
                        <TitleS component="h1" sx={{ fontWeight: 'bold' }}>
                            {post.title}
                        </TitleS>
                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                            <BodyS color="text.secondary">{post.author} · {post.date}</BodyS>
                            <BodyS color="text.secondary">조회 {post.views}</BodyS>
                        </Stack>
                    </Stack>
                    <Divider sx={{ my: 2 }} />
                    <BodyM sx={{ whiteSpace: 'pre-wrap', lineHeight: 1.8, minHeight: '150px' }}>
                        {post.content}
                    </BodyM>
                </Box>

                <Divider />

                {/* --- 댓글 섹션 --- */}
                <Box sx={{ p: '20px' }}>
                    <TitleS sx={{ mb: 2 }}>댓글 {comments.length}개</TitleS>
                    <Stack spacing={2}>
                        {comments.map(comment => (
                            <Stack key={comment.id} direction="row" spacing={2}>
                                <Avatar sx={{ width: 32, height: 32, fontSize: '0.8rem' }}>{comment.author.charAt(0)}</Avatar>
                                <Stack>
                                    <BodyS sx={{ fontWeight: 'bold' }}>{comment.author}</BodyS>
                                    <BodyM>{comment.content}</BodyM>
                                    <BodyS color="text.secondary">{comment.date}</BodyS>
                                </Stack>
                            </Stack>
                        ))}
                    </Stack>
                </Box>
            </Box>

            {/* --- 댓글 입력창 --- */}
            <Paper elevation={2} sx={{ p: 2, flexShrink: 0, borderRadius: 0, borderTop: 1, borderColor: 'divider' }}>
                <Stack direction="row" spacing={1}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        size="small"
                        placeholder="댓글을 입력하세요"
                    />
                    <DsButton variant="contained">등록</DsButton>
                </Stack>
            </Paper>
        </Box>
    );
}