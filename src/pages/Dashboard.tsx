// D:/ds_mui/src/pages/Dashboard.tsx

import React from 'react';
import { Paper, Typography, Box, Card, useTheme, Stack } from '@mui/material';
import { LineChart, RadarChart, Gauge, gaugeClasses, ScatterChart, PieChart } from '@mui/x-charts';
import DsGrid from '../components/layout/DsGrid';

interface SummaryCardProps {
    title: string;
    value: string;
    icon: React.ReactNode;
    color: string;
}

// 참고: SummaryCard 컴포넌트가 정의되었지만, 현재 Dashboard 내에서 사용되고 있지 않습니다.
const SummaryCard: React.FC<SummaryCardProps> = ({ title, value, icon, color }) => (
    <Card sx={{ display: 'flex', alignItems: 'center', p: 2, height: '100%' }}>
        <Box sx={{
            mr: 2,
            p: 1.5,
            borderRadius: '50%',
            backgroundColor: color,
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            {icon}
        </Box>
        <Box>
            <Typography color="text.secondary" gutterBottom>{title}</Typography>
            <Typography variant="h5" component="div">{value}</Typography>
        </Box>
    </Card>
);

/**
 * 메인 화면에 표시될 가상 대시보드 컴포넌트
 */
const Dashboard: React.FC = () => {
    const theme = useTheme();

    // ... (차트 데이터는 그대로)

    return (
        <Stack
            spacing={3}
            sx={(theme) => ({
                padding: theme.spacing(5),
                bgcolor: theme.palette.mode === 'dark' ? '#1e1e1e' : '#fafafa',
                minHeight: '100%',
            })}
        >
            {/* ... (페이지 제목 및 다른 차트들은 그대로) */}

            {/* PieChart */}
            <DsGrid size={{ xs: 12, sm: 6, md: 4 }}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: '100%' }}>
                    <Typography variant="h6" component="h2" gutterBottom>
                        Traffic Source
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <PieChart
                            series={[
                                {
                                    data: [
                                        { id: 0, value: 40, label: 'Search', color: theme.palette.charts.main },
                                        { id: 1, value: 35, label: 'Social', color: theme.palette.charts.secondary },
                                        { id: 2, value: 25, label: 'Direct', color: theme.palette.info.main },
                                    ],
                                    innerRadius: 40,
                                    outerRadius: 80,
                                    paddingAngle: 5,
                                    cornerRadius: 5,
                                },
                            ]}
                            height={180}
                            // legend={{ hidden: true }}
                            margin={{ top: 5, bottom: 5, left: 5, right: 5 }}
                        />
                    </Box>
                </Paper>
            </DsGrid>

            {/* RadarChart */}
            <DsGrid size={{ xs: 12, sm: 6, md: 4 }}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: '100%' }}>
                    <Typography variant="h6" component="h2" gutterBottom>
                        Performance Radar
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <RadarChart
                            height={180}
                            series={[{ label: 'Lisa', data: [120, 98, 86, 99, 85, 65] }]}
                            radar={{
                                max: 120,
                                metrics: ['Math', 'Chinese', 'English', 'Geography', 'Physics', 'History'],
                            }}
                        />
                    </Box>
                </Paper>
            </DsGrid>

            {/* ... (하단 행은 그대로) */}
        </Stack>
    );
};

export default Dashboard;