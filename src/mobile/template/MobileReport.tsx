// D:/ds_mui_new/src/mobile/template/MobileReport.tsx

import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import {
    Box,
    Stack,
    Paper,
    Tabs,
    Tab,
    ToggleButtonGroup,
    ToggleButton,
    List,
    ListItem,
    ListItemText,
    Divider,
    Typography,
    useTheme
} from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';
import { PieChart } from '@mui/x-charts/PieChart';
import MobileHeader from '../components/MobileHeader';
import { TitleS, TitleXS, BodyM, BodyS } from '../../components/typography';

// --- 기간별 샘플 데이터 정의 (기존과 동일) ---
type ReportPeriod = 'daily' | 'weekly' | 'monthly';

const salesData = {
    daily: { revenue: '₩ 1,250,000', payments: '88 건', revenueChange: '+5.2%', paymentsChange: '-1.1%', arpu: '₩ 14,204', arpuChange: '+3.9%', topProducts: ['아메리카노', '카페라떼', '바닐라 크림 콜드브루', '자몽 허니 블랙티', '딸기 요거트 블렌디드'] },
    weekly: { revenue: '₩ 8,750,000', payments: '610 건', revenueChange: '+3.8%', paymentsChange: '+2.5%', arpu: '₩ 14,344', arpuChange: '+1.2%', topProducts: ['카페라떼', '아메리카노', '딸기 요거트 블렌디드', '콜드브루', '자몽 허니 블랙티'] },
    monthly: { revenue: '₩ 35,120,000', payments: '2,450 건', revenueChange: '+1.2%', paymentsChange: '+0.5%', arpu: '₩ 14,334', arpuChange: '+0.7%', topProducts: ['아메리카노', '딸기 요거트 블렌디드', '카페라떼', '바닐라 크림 콜드브루', '콜드브루'] }
};

const userData = {
    daily: { newUsers: '120 명', dau: '1,580 명', revisitRate: 35, revisitChange: '+3%' },
    weekly: { newUsers: '850 명', dau: '1,450 명', revisitRate: 38, revisitChange: '+5%' },
    monthly: { newUsers: '3,400 명', dau: '1,300 명', revisitRate: 42, revisitChange: '+8%' }
};

const trafficData = {
    daily: { pages: ['/home', '/products/coffee', '/board/notice', '/event/summer', '/mypage/orders'], times: [40, 80, 150, 120, 90, 60] },
    weekly: { pages: ['/products/coffee', '/home', '/event/summer', '/board/notice', '/mypage/orders'], times: [55, 95, 130, 110, 80, 70] },
    monthly: { pages: ['/products/coffee', '/event/summer', '/home', '/board/notice', '/mypage/orders'], times: [60, 110, 120, 100, 85, 75] }
};

// --- 공통 컴포넌트 (기존과 동일) ---

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}
function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;
    return (
        <div role="tabpanel" hidden={value !== index} {...other}>
            {value === index && <Box sx={{ p: 2 }}>{children}</Box>}
        </div>
    );
}

interface KpiCardProps {
    title: string;
    value: string;
    change?: string;
    changeColor?: string;
}

const KpiCard = ({ title, value, change, changeColor }: KpiCardProps) => (
    <Paper sx={{ p: 2, borderRadius: 2, height: '100%' }}>
        <BodyS sx={{ color: 'text.secondary', mb: 0.5 }}>{title}</BodyS>
        <TitleXS sx={{ fontWeight: 'bold' }}>{value}</TitleXS>
        {change && (
            <BodyS sx={{ color: changeColor || 'text.secondary', mt: 0.5 }}>
                {change}
            </BodyS>
        )}
    </Paper>
);

// --- 탭별 리포트 컴포넌트 ---

// 1. 매출 리포트
const SalesReport = ({ period }: { period: ReportPeriod }) => {
    const data = salesData[period];
    const periodTitle = { daily: '일간', weekly: '주간', monthly: '월간' }[period];

    return (
        <Stack spacing={3}>
            <Stack direction="row" spacing={2} alignItems="stretch">
                <Box sx={{ flex: 5, minWidth: 0 }}>
                    <KpiCard title={`${periodTitle} 매출액`} value={data.revenue} change={data.revenueChange} changeColor="success.main" />
                </Box>
                <Box sx={{ flex: 3, minWidth: 0 }}>
                    <KpiCard title="결제 건수" value={data.payments} change={data.paymentsChange} changeColor="error.main" />
                </Box>
                <Box sx={{ flex: 4, minWidth: 0 }}>
                    <KpiCard title="객단가" value={data.arpu} change={data.arpuChange} changeColor="success.main" />
                </Box>
            </Stack>
            <Paper sx={{ p: 2, borderRadius: 2 }}>
                <TitleXS sx={{ mb: 2 }}>인기 상품 TOP 5</TitleXS>
                <List disablePadding>
                    {data.topProducts.map((item, index) => (
                        <React.Fragment key={item}>
                            <ListItem disablePadding>
                                <ListItemText primary={`${index + 1}. ${item}`} primaryTypographyProps={{ variant: 'body2' }} />
                            </ListItem>
                            {index < 4 && <Divider sx={{ my: 1 }} />}
                        </React.Fragment>
                    ))}
                </List>
            </Paper>
        </Stack>
    );
};

// 2. 사용자 리포트
const UserReport = ({ period }: { period: ReportPeriod }) => {
    const theme = useTheme();
    const data = userData[period];
    const periodTitle = { daily: '일일', weekly: '주간', monthly: '월간' }[period];

    return (
        <Stack spacing={3}>
            <Stack direction="row" spacing={2} alignItems="stretch">
                <Box sx={{ flex: 1, minWidth: 0 }}>
                    <KpiCard title="신규 가입자" value={data.newUsers} change="+15%" changeColor="success.main" />
                </Box>
                <Box sx={{ flex: 1, minWidth: 0 }}>
                    <KpiCard title={`${periodTitle} 활성 사용자(DAU)`} value={data.dau} />
                </Box>
            </Stack>
            <Paper sx={{ p: 2, borderRadius: 2 }}>
                <TitleXS sx={{ mb: 2 }}>재방문율</TitleXS>
                <Box sx={{ position: 'relative', height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <PieChart
                        series={[{ data: [{ value: data.revisitRate, color: theme.palette.primary.main }, { value: 100 - data.revisitRate, color: theme.palette.grey[300] }], innerRadius: 60 }]}
                        margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
                    />
                    <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
                        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>{data.revisitRate}%</Typography>
                    </Box>
                </Box>
                <Typography align="center" color="text.secondary" variant="body2" sx={{ mt: 2 }}>
                    지난 기간 대비 {data.revisitChange}
                </Typography>
            </Paper>
        </Stack>
    );
};

// 3. 트래픽 리포트
const TrafficReport = ({ period }: { period: ReportPeriod }) => {
    const theme = useTheme();
    const data = trafficData[period];

    return (
        <Stack spacing={3}>
            <Paper sx={{ p: 2, borderRadius: 2 }}>
                <TitleXS sx={{ mb: 2 }}>페이지별 조회수</TitleXS>
                <List disablePadding>
                    {data.pages.map((item, index) => (
                        <React.Fragment key={item}>
                            <ListItem disablePadding>
                                <ListItemText primary={`${index + 1}. ${item}`} secondary={`${(15 - index) * 123} views`} primaryTypographyProps={{ variant: 'body2' }} />
                            </ListItem>
                            {index < 4 && <Divider sx={{ my: 1 }} />}
                        </React.Fragment>
                    ))}
                </List>
            </Paper>
            <Paper sx={{ p: 2, borderRadius: 2 }}>
                <TitleXS sx={{ mb: 2 }}>시간대별 접속 현황</TitleXS>
                <Box sx={{ height: 200 }}>
                    <BarChart
                        // ★★★ 최종 해결책 ★★★
                        // categoryGapRatio를 BarChart의 prop이 아닌, xAxis 설정 객체 안으로 이동합니다.
                        xAxis={[{
                            scaleType: 'band',
                            data: ['09', '11', '13', '15', '17', '19'],
                            categoryGapRatio: 0.6
                        }]}
                        series={[{ data: data.times, color: theme.palette.primary.main }]}
                        // @ts-ignore 주석은 더 이상 필요 없으므로 제거합니다.
                        margin={{ top: 20, right: 10, bottom: 20, left: 20 }}
                    />
                </Box>
            </Paper>
        </Stack>
    );
};


// --- 메인 페이지 컴포넌트 ---
export default function MobileReport() {
    const { handleDrawerToggle } = useOutletContext<{ handleDrawerToggle: () => void }>();
    const [tabValue, setTabValue] = useState(0);
    const [period, setPeriod] = useState<ReportPeriod>('daily');

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    const handlePeriodChange = (event: React.MouseEvent<HTMLElement>, newPeriod: string | null) => {
        if (newPeriod !== null) {
            setPeriod(newPeriod as ReportPeriod);
        }
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <MobileHeader
                title="통계 리포트"
                onRightIconClick={handleDrawerToggle}
            />
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={tabValue} onChange={handleTabChange} variant="fullWidth">
                    <Tab label="매출" />
                    <Tab label="사용자" />
                    <Tab label="트래픽" />
                </Tabs>
            </Box>

            <Box sx={{ p: 2}}>
                <ToggleButtonGroup
                    value={period}
                    exclusive
                    onChange={handlePeriodChange}
                    aria-label="기간 선택"
                    size="small"
                    fullWidth
                >
                    <ToggleButton value="daily">오늘</ToggleButton>
                    <ToggleButton value="weekly">이번 주</ToggleButton>
                    <ToggleButton value="monthly">이번 달</ToggleButton>
                </ToggleButtonGroup>
            </Box>

            <Box sx={{ flexGrow: 1, overflowY: 'auto' }}>
                <TabPanel value={tabValue} index={0}>
                    <SalesReport period={period} />
                </TabPanel>
                <TabPanel value={tabValue} index={1}>
                    <UserReport period={period} />
                </TabPanel>
                <TabPanel value={tabValue} index={2}>
                    <TrafficReport period={period} />
                </TabPanel>
            </Box>
        </Box>
    );
}