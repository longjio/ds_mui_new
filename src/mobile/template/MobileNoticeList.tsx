// D:/ds_mui_new/src/mobile/pages/MobileNoticeList.tsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Paper,
    Divider,
} from '@mui/material';
import { TitleS } from '../../components/typography';

// 공지사항 샘플 데이터 (상세 페이지와 동일한 데이터를 사용합니다)
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

export default function MobileNoticeListPage() {
    const navigate = useNavigate();

    const handleNoticeClick = (id: string) => {
        // 상세 페이지로 ID와 함께 이동합니다.
        navigate(`/m/notice/${id}`);
    };

    return (
        <Box sx={{ p: 2 }}>
            <TitleS component="h1" sx={{ mb: 2, fontWeight: 'bold' }}>
                공지사항
            </TitleS>
            <Paper>
                <List disablePadding>
                    {notices.map((notice, index) => (
                        <React.Fragment key={notice.id}>
                            <ListItem disablePadding>
                                <ListItemButton onClick={() => handleNoticeClick(notice.id)} sx={{ py: 2 }}>
                                    <ListItemText
                                        primary={notice.title}
                                        secondary={notice.date}
                                        primaryTypographyProps={{ variant: 'body1', fontWeight: 500 }}
                                        secondaryTypographyProps={{ variant: 'body2', color: 'text.secondary', mt: 0.5 }}
                                    />
                                </ListItemButton>
                            </ListItem>
                            {index < notices.length - 1 && <Divider component="li" />}
                        </React.Fragment>
                    ))}
                </List>
            </Paper>
        </Box>
    );
}