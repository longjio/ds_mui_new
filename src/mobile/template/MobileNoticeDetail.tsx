// D:/ds_mui_new/src/mobile/pages/MobileNoticeDetail.tsx

import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Box,
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Divider,
    Stack,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { TitleS, BodyM } from '../../components/typography';
import { DsButton } from '../../components/button/DsButton';

// 공지사항 샘플 데이터 (목록 페이지와 동일한 데이터를 사용합니다)
const notices = [
    {
        id: 'notice-003',
        title: 'v1.2 디자인 시스템 업데이트 안내',
        date: '2024-05-20',
        content: '안녕하세요. SI 디자인 시스템 팀입니다.\n\nv1.2 업데이트가 완료되었습니다. 이번 업데이트에서는 모바일 컴포넌트가 대거 추가되었으며, 다크 모드 지원이 강화되었습니다.\n\n자세한 내용은 문서를 참고해주세요.\n감사합니다.'
    },
    {
        id: 'notice-002',
        title: '서버 점검 안내 (05/15 02:00 ~ 04:00)',
        date: '2024-05-14',
        content: '보다 안정적인 서비스 제공을 위해 서버 점검을 실시합니다.\n\n- 점검 시간: 2024년 5월 15일 02:00 ~ 04:00 (2시간)\n- 점검 영향: 서비스 일시 중단\n\n이용에 불편을 드려 죄송합니다.'
    },
    {
        id: 'notice-001',
        title: '개인정보처리방침 개정 안내',
        date: '2024-05-01',
        content: '개인정보처리방침이 2024년 5월 1일부로 개정되어 안내드립니다. 변경된 내용은 아래와 같습니다.\n\n- 제3자 정보 제공 업체 추가\n- 개인정보 보관 기간 변경\n\n감사합니다.'
    },
];

export default function MobileNoticeDetailPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const notice = notices.find(n => n.id === id);

    const handleBack = () => {
        navigate(-1); // 이전 페이지로 돌아가기
    };

    if (!notice) {
        return (
            <Box sx={{ p: 2 }}>
                <TitleS>공지사항을 찾을 수 없습니다.</TitleS>
            </Box>
        );
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', bgcolor: 'background.default' }}>
            <AppBar position="static" elevation={0} color="inherit" sx={{ border: 0, borderBottom: 1, borderColor: 'divider' }}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={handleBack} aria-label="back">
                        <ArrowBackIcon />
                    </IconButton>
                    <TitleS component="div" sx={{ flexGrow: 1, textAlign: 'center' }}>
                        공지사항
                    </TitleS>
                    <Box sx={{ width: 40 }} /> {/* 제목을 중앙에 맞추기 위한 빈 공간 */}
                </Toolbar>
            </AppBar>

            <Box sx={{ flexGrow: 1, overflowY: 'auto', p: 5 }}>
                <Stack spacing={1} sx={{ mb: 2 }}>
                    <Typography variant="h6" component="h1" sx={{ fontWeight: 'bold' }}>
                        {notice.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {notice.date}
                    </Typography>
                </Stack>
                <Divider sx={{ my: 2 }} />
                <BodyM sx={{ whiteSpace: 'pre-wrap', lineHeight: 1.8 }}>
                    {notice.content}
                </BodyM>
            </Box>

            <Box sx={{
                p: 5,
                flexShrink: 0,
                // 버튼을 중앙에 배치하기 위해 flexbox를 사용합니다.
                display: 'flex',
                justifyContent: 'center',
            }}>
                <DsButton
                    variant="outlined" // 시각적 무게감을 줄이기 위해 outlined 스타일로 변경
                    color="inherit"    // 기본 텍스트 색상을 사용하도록 변경
                    onClick={handleBack}
                >
                    목록으로 돌아가기
                </DsButton>
            </Box>
        </Box>
    );
}