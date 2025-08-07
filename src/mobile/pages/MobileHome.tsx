// D:/ds_mui_new/src/mobile/pages/MobileHome.tsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Paper, Typography, Box, Chip, Stack, List, ListItem, ListItemText, ListItemAvatar, Avatar, Divider, useTheme } from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useAuth } from '../../contexts/AuthContext';

// 대시보드에 사용할 아이콘 import
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import EditIcon from '@mui/icons-material/Edit';
import LockResetIcon from '@mui/icons-material/LockReset';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import PaletteIcon from '@mui/icons-material/Palette';

import { BarChart } from '@mui/x-charts/BarChart';
import { TitleS } from '../../components/typography';

const chartDataset = [
    { day: '월', visitors: 250 },
    { day: '화', visitors: 310 },
    { day: '수', visitors: 290 },
    { day: '목', visitors: 350 },
    { day: '금', visitors: 480 },
    { day: '토', visitors: 420 },
    { day: '일', visitors: 380 },
];

export default function MobileHomePage() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const theme = useTheme();

    const featureCards = [
        {
            smallTitle: '간편한 메뉴 관리',
            mainTitle: '메뉴 구조화',
            description: '드래그 앤 드롭으로 메뉴를 설정하세요.',
            image: <AutoAwesomeIcon sx={{ fontSize: 40, color: 'primary.dark' }} />,
            bgColor: 'rgb(229, 246, 253)',
        },
        {
            smallTitle: '팀원과 함께',
            mainTitle: '사용자 초대',
            description: '새로운 팀원을 프로젝트에 초대하세요.',
            image: <GroupAddIcon sx={{ fontSize: 40, color: 'primary.dark' }} />,
            bgColor: 'rgb(239, 250, 252)',
        },
        {
            smallTitle: '나만의 스타일',
            mainTitle: '테마 변경',
            description: '라이트/다크 모드로 테마를 변경하세요.',
            image: <PaletteIcon sx={{ fontSize: 40, color: 'primary.dark' }} />,
            bgColor: 'rgb(253, 237, 237)',
        },
    ];

    const recentActivities = [
        {
            id: 1,
            icon: <PersonAddIcon />,
            bgColor: 'success.light',
            color: 'white',
            text: "'김철수' 사용자가 추가되었습니다.",
            time: "5분 전",
        },
        {
            id: 2,
            icon: <EditIcon />,
            bgColor: 'success.light',
            color: 'white',
            text: "'대시보드' 메뉴 정보가 수정되었습니다.",
            time: "1시간 전",
        },
        {
            id: 3,
            icon: <LockResetIcon />,
            bgColor: 'success.light',
            color: 'white',
            text: "'이영희' 사용자의 비밀번호가 초기화되었습니다.",
            time: "3시간 전",
        },
    ];

    return (
        <Stack spacing={3}>
            {/* 1. 환영 메시지 */}
            <Box sx={{ p: 3 }}>
                <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                    {user?.name || '관리자'}님, 안녕하세요!
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    시스템 현황을 확인해보세요.
                </Typography>
            </Box>

            {/* 2. 공지사항 영역 */}
            <Paper
                onClick={() => navigate('/m/notices')}
                elevation={0}
                sx={{
                    mx: -2,
                    borderRadius: 0,
                    bgcolor: 'action.hover',
                    py: 1.5,
                    px: 3,
                    display: 'flex',
                    alignItems: 'center',
                    cursor: 'pointer',
                    border: 'none',
                }}
            >
                <Chip label="공지" color="primary" size="small"/>
                <Typography variant="body2" sx={{ flexGrow: 1, mx: 1.5, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    새로운 디자인 시스템 v1.2 업데이트 안내입니다.
                </Typography>
                <ChevronRightIcon sx={{ color: 'text.secondary' }} />
            </Paper>

            {/* 3. 새로운 디자인의 기능 소개 카드 영역 */}
            <Box sx={{ mx: -2, overflow: 'hidden', pl: 3 }}>
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
                        // ★★★ 핵심 수정 사항 ★★★
                        // 스크롤 영역 내부에 좌우 패딩을 추가하여 정렬을 맞춥니다.
                        px: 2,
                    }}
                >
                    {featureCards.map((card, index) => (
                        <Paper
                            key={index}
                            elevation={0}
                            sx={{
                                scrollSnapAlign: 'start',
                                minWidth: '75%',
                                height: 140,
                                borderRadius: 3,
                                p: 2.5,
                                display: 'flex',
                                alignItems: 'center',
                                bgcolor: card.bgColor,
                                border: 'none',
                            }}
                        >
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

            {/* 주간 접속 현황 차트 영역 */}
            <Box sx={{ p: 3 }}>
                <TitleS sx={{ mb: 1, fontWeight: 'bold' }}>주간 접속 현황</TitleS>
                <Paper sx={{
                    borderRadius: 2,
                    p: 2,
                }}>
                    <BarChart
                        dataset={chartDataset}
                        xAxis={[{
                            scaleType: 'band',
                            dataKey: 'day',
                            categoryGapRatio: 0.4,
                        }]}
                        series={[{
                            dataKey: 'visitors',
                        }]}
                        height={250}
                        colors={[theme.palette.primary.main]}
                        margin={{ top:20, right: 10, bottom: 10, left: 0 }}
                    />
                </Paper>
            </Box>

            {/* 최근 활동 리스트 */}
            <Box sx={{ p: 3 }}>
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
                                        primary={
                                            <Typography variant="body2" component="span">
                                                {activity.text}
                                            </Typography>
                                        }
                                        secondary={activity.time}
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