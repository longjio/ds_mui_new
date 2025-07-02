import React from 'react';
import { Box, Typography, TextField } from '@mui/material';
import DsTabs, { TabItem } from '../components/navigation/DsTabs';

// 아이콘 import
import PhoneIcon from '@mui/icons-material/Phone';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PersonPinIcon from '@mui/icons-material/PersonPin';

const TabsPage = () => {
    // 1. 기본 탭에 전달할 데이터 배열
    const basicTabs: TabItem[] = [
        {
            label: 'Item One',
            content: <Typography>This is the content for Item One.</Typography>,
        },
        {
            label: 'Item Two',
            content: <Typography>Here you can find information about Item Two.</Typography>,
        },
        {
            label: 'Item Three',
            content: (
                <Box>
                    <Typography>Item Three can have more complex content, like a form.</Typography>
                    <TextField label="Your Name" variant="outlined" fullWidth margin="normal" />
                </Box>
            ),
        },
        {
            label: 'Disabled Item',
            content: 'You should not see this.',
            disabled: true,
        },
    ];

    // 2. 아이콘 탭에 전달할 데이터 배열
    const iconTabs: TabItem[] = [
        { label: 'Recents', content: 'Recent calls content', icon: <PhoneIcon /> },
        { label: 'Favorites', content: 'Favorites content', icon: <FavoriteIcon /> },
        { label: 'Nearby', content: 'Nearby places content', icon: <PersonPinIcon /> },
    ];

    // 3. 스크롤 탭에 전달할 데이터 배열 (새로 추가)
    const scrollableTabs: TabItem[] = [
        { label: 'Item One', content: 'Content for Item One' },
        { label: 'Item Two', content: 'Content for Item Two' },
        { label: 'Item Three', content: 'Content for Item Three' },
        { label: 'Item Four', content: 'Content for Item Four' },
        { label: 'Item Five', content: 'Content for Item Five' },
        { label: 'Item Six', content: 'Content for Item Six' },
        { label: 'Item Seven', content: 'Content for Item Seven' },
    ];

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h1" gutterBottom>
                Tabs
            </Typography>
            <Typography color="text.secondary" sx={{ mb: 4 }}>
                Tabs는 관련된 컨텐츠 그룹을 탐색하고 전환할 수 있게 해주는 UI 패턴입니다.
            </Typography>

            {/* --- 예제 1: 기본 탭 --- */}
            <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
                Basic Tabs
            </Typography>
            <DsTabs tabs={basicTabs} />

            {/* --- 예제 2: 가득 찬 너비의 탭 (Centered) --- */}
            <Typography variant="h6" gutterBottom sx={{ mt: 6 }}>
                Full Width & Centered Tabs
            </Typography>
            <DsTabs tabs={basicTabs.slice(0, 3)} variant="fullWidth" centered />

            {/* --- 예제 3: 아이콘과 텍스트 탭 --- */}
            <Typography variant="h6" gutterBottom sx={{ mt: 6 }}>
                Icon Tabs
            </Typography>
            <DsTabs tabs={iconTabs} />

            {/* --- 예제 4: 스크롤 가능한 탭 (새로 추가) --- */}
            <Typography variant="h6" gutterBottom sx={{ mt: 6 }}>
                Scrollable Tabs
            </Typography>
            <Typography color="text.secondary" sx={{ mb: 2 }}>
                탭의 개수가 컨테이너 너비를 초과할 때 스크롤 버튼을 표시합니다.
            </Typography>
            <Box sx={{ maxWidth: { xs: 320, sm: 480 }}}>
                <DsTabs
                    tabs={scrollableTabs}
                    variant="scrollable"
                    scrollButtons
                    allowScrollButtonsMobile
                    aria-label="scrollable force tabs example"
                />
            </Box>
        </Box>
    );
};

export default TabsPage;