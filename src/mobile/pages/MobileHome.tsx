// D:/ds_mui_new/src/mobile/pages/MobileHome.tsx

import React from 'react';
import { Paper, Typography, Box, useTheme, Stack } from '@mui/material';
// ★★★ 1. 타입 단언에 사용할 ChartsLegendProps를 import 합니다. ★★★
import {
    LineChart,
    PieChart,
    BarChart,
    ChartsLegendProps
} from '@mui/x-charts';
import DsGrid from '../../components/layout/DsGrid';

// 샘플 데이터 (차트 모양을 위한 데이터)
const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
const pData = [2400, 1398, 9800, 3908, 4800, 3800, 4300];
const xLabels = [
    'Page A',
    'Page B',
    'Page C',
    'Page D',
    'Page E',
    'Page F',
    'Page G',
];

export default function MobileHomePage() {
    const theme = useTheme();

    // 테마에 반응하는 차트 데이터를 컴포넌트 내부에서 생성합니다.
    const pieChartData = [
        { id: 0, value: 40, label: '검색', color: theme.palette.info.main },
        { id: 1, value: 35, label: '소셜', color: theme.palette.secondary.main },
        { id: 2, value: 25, label: '직접', color: theme.palette.primary.light },
    ];

    const barChartData = [
        { device: '모바일', visitors: 580 },
        { device: '데스크톱', visitors: 320 },
        { device: '태블릿', visitors: 150 },
    ];

    // ★★★ 2. 컴파일러의 타입 추론 버그를 우회하기 위해, 타입 단언(as)을 사용합니다. ★★★
    // 이렇게 하면 컴파일러가 잘못된 타입 규칙을 적용하는 것을 강제로 막을 수 있습니다.
    const chartSlotProps = {
        legend: { hidden: true } as Partial<ChartsLegendProps>,
    };

    return (
        <Box sx={{ bgcolor: 'primary.main', height: '100vh' }}>
            <Stack spacing={3} sx={{ p: 2 }}>
                <DsGrid container spacing={3}>
                    {/* 방문자 수 라인 차트 */}
                    <DsGrid size={{ xs: 12 }}>
                        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 240 }}>
                            <Typography variant="h6" component="h2" gutterBottom color="text.primary">
                                주간 방문자
                            </Typography>
                            <Box sx={{ flexGrow: 1 }}>
                                <LineChart
                                    series={[
                                        { data: pData, label: 'PV', color: theme.palette.primary.main },
                                        { data: uData, label: 'UV', color: theme.palette.secondary.main },
                                    ]}
                                    xAxis={[{ scaleType: 'point', data: xLabels }]}
                                    sx={{
                                        '.MuiLineElement-root': { strokeWidth: 2 },
                                        '.MuiMarkElement-root': { strokeWidth: 2 },
                                    }}
                                    slotProps={chartSlotProps}
                                />
                            </Box>
                        </Paper>
                    </DsGrid>

                    {/* 트래픽 소스 파이 차트 */}
                    <DsGrid size={{ xs: 12, sm: 6 }}>
                        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 240 }}>
                            <Typography variant="h6" component="h2" gutterBottom color="text.primary">
                                트래픽 소스
                            </Typography>
                            <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <PieChart
                                    series={[
                                        {
                                            data: pieChartData,
                                            innerRadius: 30,
                                            outerRadius: 80,
                                            paddingAngle: 2,
                                            cornerRadius: 4,
                                        },
                                    ]}
                                    height={160}
                                    slotProps={chartSlotProps}
                                />
                            </Box>
                        </Paper>
                    </DsGrid>

                    {/* 디바이스별 접속 현황 바 차트 */}
                    <DsGrid size={{ xs: 12, sm: 6 }}>
                        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 240 }}>
                            <Typography variant="h6" component="h2" gutterBottom color="text.primary">
                                디바이스별 접속
                            </Typography>
                            <Box sx={{ flexGrow: 1 }}>
                                <BarChart
                                    dataset={barChartData}
                                    yAxis={[{ scaleType: 'band', dataKey: 'device' }]}
                                    series={[{ dataKey: 'visitors', label: '방문자 수' }]}
                                    layout="horizontal"
                                    colors={[theme.palette.secondary.main]}
                                    slotProps={chartSlotProps}
                                />
                            </Box>
                        </Paper>
                    </DsGrid>
                </DsGrid>
            </Stack>
        </Box>
    );
}