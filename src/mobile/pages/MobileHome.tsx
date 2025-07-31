// D:/ds_mui_new/src/mobile/pages/MobileHome.tsx

import React from 'react';
import { Paper, Typography, Box, Chip, Stack, List, ListItem, ListItemText, ListItemAvatar, Avatar, Divider } from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useAuth } from '../../contexts/AuthContext';

// 대시보드에 사용할 아이콘 import
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import EditIcon from '@mui/icons-material/Edit';
import LockResetIcon from '@mui/icons-material/LockReset';
// ★★★ 수정 1: 새로운 카드 디자인에 사용할 아이콘을 import 합니다.
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import PaletteIcon from '@mui/icons-material/Palette';

import { TitleS } from '../../components/typography';

export default function MobileHomePage() {
    const { user } = useAuth();

    // ★★★ 수정 2: 새로운 카드 디자인에 맞는 데이터 구조로 변경합니다.
    const featureCards = [
        {
            smallTitle: '간편한 메뉴 관리',
            mainTitle: '메뉴 구조화',
            description: '드래그 앤 드롭으로 메뉴를 설정하세요.',
            image: <AutoAwesomeIcon sx={{ fontSize: 40, color: 'primary.dark' }} />,
            bgColor: 'primary.50',
        },
        {
            smallTitle: '팀원과 함께',
            mainTitle: '사용자 초대',
            description: '새로운 팀원을 프로젝트에 초대하세요.',
            image: <GroupAddIcon sx={{ fontSize: 40, color: 'success.dark' }} />,
            bgColor: 'success.50',
        },
        {
            smallTitle: '나만의 스타일',
            mainTitle: '테마 변경',
            description: '라이트/다크 모드로 테마를 변경하세요.',
            image: <PaletteIcon sx={{ fontSize: 40, color: 'secondary.dark' }} />,
            bgColor: 'secondary.50',
        },
    ];

    // 최근 활동 데이터 (기존과 동일)
    const recentActivities = [
        {
            id: 1,
            icon: <PersonAddIcon />,
            bgColor: 'success.light',
            color: 'success.dark',
            text: "'김철수' 사용자가 추가되었습니다.",
            time: "5분 전",
        },
        {
            id: 2,
            icon: <EditIcon />,
            bgColor: 'warning.light',
            color: 'warning.dark',
            text: "'대시보드' 메뉴 정보가 수정되었습니다.",
            time: "1시간 전",
        },
        {
            id: 3,
            icon: <LockResetIcon />,
            bgColor: 'info.light',
            color: 'info.dark',
            text: "'이영희' 사용자의 비밀번호가 초기화되었습니다.",
            time: "3시간 전",
        },
    ];

    return (
        <Stack spacing={3} sx={{ p: 3 }}>
            {/* 1. 환영 메시지 */}
            <Box>
                <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                    {user?.name || '관리자'}님, 안녕하세요!
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    시스템 현황을 확인해보세요.
                </Typography>
            </Box>

            {/* 2. 공지사항 영역 */}
            <Paper
                onClick={() => alert('공지사항 클릭')}
                elevation={0}
                sx={{
                    mx: -2,
                    borderRadius: 0,
                    bgcolor: 'action.hover',
                    py: 1.5,
                    px: 2,
                    display: 'flex',
                    alignItems: 'center',
                    cursor: 'pointer',
                    border: 'none',
                }}
            >
                <Chip label="공지" color="primary" size="small" sx={{ fontWeight: 'bold' }}/>
                <Typography variant="body2" sx={{ flexGrow: 1, mx: 1.5, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    새로운 디자인 시스템 v1.2 업데이트 안내입니다.
                </Typography>
                <ChevronRightIcon sx={{ color: 'text.secondary' }} />
            </Paper>

            {/* ★★★ 수정 3: 새로운 디자인의 기능 소개 카드 영역 ★★★ */}
            <Box sx={{ width: '100%', overflow: 'hidden' }}>
                <Stack
                    direction="row"
                    spacing={2}
                    sx={{
                        overflowX: 'auto',
                        '&::-webkit-scrollbar': { display: 'none' },
                        scrollbarWidth: 'none',
                        py: 1,
                        WebkitOverflowScrolling: 'touch',
                        scrollSnapType: 'x mandatory',
                    }}
                >
                    {featureCards.map((card, index) => (
                        <Paper
                            key={index}
                            elevation={0}
                            sx={{
                                scrollSnapAlign: 'start',
                                minWidth: '75%', // 카드의 너비를 넓혀 내용을 충분히 보여줍니다.
                                height: 140,     // 카드 높이를 늘립니다.
                                borderRadius: 3,
                                p: 2.5,
                                display: 'flex',
                                alignItems: 'center',
                                bgcolor: card.bgColor, // 파스텔톤 배경색 적용
                                border: '1px solid',
                                borderColor: 'divider',
                            }}
                        >
                            {/* 왼쪽: 텍스트 영역 */}
                            <Box sx={{ flexGrow: 1, pr: 1 }}>
                                <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 'bold' }}>
                                    {card.smallTitle}
                                </Typography>
                                <Typography variant="h6" sx={{ fontWeight: 'bold', my: 0.5, lineHeight: 1.2 }}>
                                    {card.mainTitle}
                                </Typography>
                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                    {card.description}
                                </Typography>
                            </Box>
                            {/* 오른쪽: 이미지(아이콘) 영역 */}
                            <Box sx={{
                                width: 64,
                                height: 64,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexShrink: 0,
                            }}>
                                {card.image}
                            </Box>
                        </Paper>
                    ))}
                </Stack>
            </Box>

            {/* 4. 최근 활동 리스트 */}
            <Box>
                <TitleS sx={{ mb: 1, fontWeight: 'bold' }}>최근 활동</TitleS>
                <Paper sx={{ borderRadius: 2 }}>
                    <List disablePadding>
                        {recentActivities.map((activity, index) => (
                            <React.Fragment key={activity.id}>
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar sx={{ bgcolor: activity.bgColor, color: activity.color }}>
                                            {activity.icon}
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={activity.text}
                                        secondary={activity.time}
                                        primaryTypographyProps={{ variant: 'body2' }}
                                    />
                                </ListItem>
                                {index < recentActivities.length - 1 && <Divider variant="inset" component="li" />}
                            </React.Fragment>
                        ))}
                    </List>
                </Paper>
            </Box>
        </Stack>
    );
}