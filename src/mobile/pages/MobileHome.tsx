// D:/ds_mui_new/src/mobile/pages/MobileHome.tsx

import React from 'react';
import { Paper, Typography, Box, Chip, Stack, List, ListItem, ListItemText, ListItemAvatar, Avatar, Divider } from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useAuth } from '../../contexts/AuthContext';

// 대시보드에 사용할 아이콘 import
import ListAltIcon from '@mui/icons-material/ListAlt';
import GroupIcon from '@mui/icons-material/Group';
import SecurityIcon from '@mui/icons-material/Security';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import EditIcon from '@mui/icons-material/Edit';
import LockResetIcon from '@mui/icons-material/LockReset';

import { TitleS } from '../../components/typography';

export default function MobileHomePage() {
    const { user } = useAuth();

    // 1. 핵심 지표 데이터 (가상)
    const summaryCards = [
        {
            title: '총 메뉴',
            value: '128개',
            icon: <ListAltIcon sx={{ fontSize: 32 }} />,
            color: 'primary.main',
        },
        {
            title: '활성 사용자',
            value: '76명',
            icon: <GroupIcon sx={{ fontSize: 32 }} />,
            color: 'success.main',
        },
        {
            title: '권한 그룹',
            value: '8개',
            icon: <SecurityIcon sx={{ fontSize: 32 }} />,
            color: 'info.main',
        },
    ];

    // 2. 최근 활동 데이터 (가상)
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
        <Stack spacing={3} sx={{ p: 2 }}>
            {/* 1. 환영 메시지 */}
            <Box>
                <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                    {user?.name || '관리자'}님, 안녕하세요!
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    시스템 현황을 확인해보세요.
                </Typography>
            </Box>

            {/* ★★★ 여기가 수정된 부분입니다 ★★★ */}
            {/* 2. 공지사항 영역 */}
            <Paper
                onClick={() => alert('공지사항 클릭')}
                elevation={0} // 그림자 효과 제거를 명시합니다.
                sx={{
                    // 부모 Stack의 padding(p: 2)을 무시하고 좌우로 꽉 채웁니다.
                    mx: -2,
                    // 사각형 배너 형태로 보이기 위해 borderRadius를 0으로 설정합니다.
                    borderRadius: 0,
                    // 가장 연한 회색 배경을 적용합니다. (테마에 따라 자동 변경)
                    bgcolor: 'action.hover',
                    // 내부 컨텐츠의 좌우 여백을 다시 설정하고, 상하 여백은 유지합니다.
                    py: 1.5,
                    px: 2,
                    // 기존 스타일 유지
                    display: 'flex',
                    alignItems: 'center',
                    cursor: 'pointer',
                    border: 'none', // 테두리 없음
                }}
            >
                <Chip label="공지" color="primary" size="small" sx={{ fontWeight: 'bold' }} />
                <Typography variant="body2" sx={{ flexGrow: 1, mx: 1.5, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    새로운 디자인 시스템 v1.2 업데이트 안내입니다.
                </Typography>
                <ChevronRightIcon sx={{ color: 'text.secondary' }} />
            </Paper>

            {/* 3. 핵심 지표 카드 스와이프 영역 */}
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
                    {summaryCards.map((card, index) => (
                        <Paper
                            key={index}
                            elevation={0}
                            sx={{
                                scrollSnapAlign: 'start',
                                minWidth: '45%',
                                height: 120,
                                borderRadius: 2,
                                p: 2,
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                border: '1px solid',
                                borderColor: 'divider',
                                bgcolor: 'background.paper'
                            }}
                        >
                            <Avatar sx={{ bgcolor: card.color, color: 'white' }}>
                                {card.icon}
                            </Avatar>
                            <Box>
                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>{card.title}</Typography>
                                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{card.value}</Typography>
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