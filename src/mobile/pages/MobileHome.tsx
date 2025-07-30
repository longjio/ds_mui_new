// D:/ds_mui_new/src/mobile/pages/MobileHome.tsx

import React from 'react';
import { Paper, Typography, Box, Chip, Stack, IconButton } from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

// 카드에 사용할 아이콘
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import CreditScoreIcon from '@mui/icons-material/CreditScore';

export default function MobileHomePage() {
    // 카드 데이터 예시
    const cards = [
        {
            title: '나의 지갑',
            content: '포인트, 쿠폰, 스탬프를 확인하세요.',
            icon: <AccountBalanceWalletIcon fontSize="large" color="primary" />,
        },
        {
            title: '투자 현황',
            content: '수익률과 포트폴리오를 분석해보세요.',
            icon: <TrendingUpIcon fontSize="large" color="success" />,
        },
        {
            title: '신용 점수',
            content: '내 신용점수를 올리는 방법을 알아보세요.',
            icon: <CreditScoreIcon fontSize="large" color="info" />,
        },
    ];

    return (
        // 페이지 전체 컨테이너
        <Stack spacing={2} sx={{ p: 2 }}>
            {/* 1. 공지사항 영역 */}
            <Paper
                onClick={() => alert('공지사항 클릭')}
                sx={{
                    p: 1.5,
                    display: 'flex',
                    alignItems: 'center',
                    cursor: 'pointer',
                    borderRadius: 2,
                }}
            >
                <Chip label="공지" color="primary" size="small" sx={{ fontWeight: 'bold' }} />
                <Typography variant="body2" sx={{ flexGrow: 1, mx: 1.5, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    새로운 디자인 시스템 v1.2 업데이트 안내입니다.
                </Typography>
                <ChevronRightIcon sx={{ color: 'text.secondary' }} />
            </Paper>

            {/* 2. 카드 스와이프 영역 */}
            <Box sx={{ width: '100%', overflow: 'hidden' }}>
                <Stack
                    direction="row"
                    spacing={2}
                    sx={{
                        overflowX: 'auto',
                        // 스크롤바 숨기기
                        '&::-webkit-scrollbar': { display: 'none' },
                        scrollbarWidth: 'none',
                        py: 1,
                        // iOS에서 부드러운 스크롤링을 위함
                        WebkitOverflowScrolling: 'touch',
                        // 스크롤이 끝났을 때 자연스럽게 멈추도록 함
                        scrollSnapType: 'x mandatory',
                    }}
                >
                    {cards.map((card, index) => (
                        <Paper
                            key={index}
                            elevation={1}
                            sx={{
                                // 각 카드가 스크롤 스냅의 대상이 되도록 함
                                scrollSnapAlign: 'start',
                                // 카드 크기 및 디자인
                                minWidth: '85%',
                                height: 100,
                                borderRadius: 3,
                                p: 2,
                                display: 'flex',
                                alignItems: 'center',
                                gap: 2,
                            }}
                        >
                            {card.icon}
                            <Box>
                                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{card.title}</Typography>
                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>{card.content}</Typography>
                            </Box>
                        </Paper>
                    ))}
                </Stack>
            </Box>
        </Stack>
    );
}