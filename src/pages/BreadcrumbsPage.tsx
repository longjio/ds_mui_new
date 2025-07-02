// src/pages/DsBreadcrumbsPage.tsx (사용 예시)

import React from 'react';
import { Box, Typography } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import GrainIcon from '@mui/icons-material/Grain';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

// 방금 만든 재사용 가능한 컴포넌트와 타입을 import 합니다.
import DsBreadcrumbs, { BreadcrumbItem } from '../components/navigation/DsBreadcrumbs';

const DsBreadcrumbsPage = () => {
    // 각 예제에 필요한 데이터를 배열로 정의합니다.
    const basicItems: BreadcrumbItem[] = [
        { label: 'MUI', href: '/' },
        { label: 'Core', href: '/components' },
        { label: 'Breadcrumbs' },
    ];

    const withIconsItems: BreadcrumbItem[] = [
        { label: 'MUI', href: '/', icon: <HomeIcon /> },
        { label: 'Core', href: '/components', icon: <WhatshotIcon /> },
        { label: 'Breadcrumbs', icon: <GrainIcon /> },
    ];

    const collapsedItems: BreadcrumbItem[] = [
        { label: 'Home', href: '#' },
        { label: 'Catalog', href: '#' },
        { label: 'Accessories', href: '#' },
        { label: 'New Collection', href: '#' },
        { label: 'Belts' },
    ];

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>Breadcrumbs</Typography>

            {/* --- 예제 1: 기본 --- */}
            <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>Basic</Typography>
            <DsBreadcrumbs items={basicItems} />

            {/* --- 예제 2: 아이콘 포함 --- */}
            <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>With Icons</Typography>
            <DsBreadcrumbs items={withIconsItems} />

            {/* --- 예제 3: 접기 기능 --- */}
            <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>Collapsed</Typography>
            <DsBreadcrumbs items={collapsedItems} maxItems={2} />

            {/* --- 예제 4: 커스텀 구분 기호 --- */}
            <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>Custom Separator</Typography>
            <DsBreadcrumbs items={basicItems} separator={<NavigateNextIcon fontSize="small" />} />
        </Box>
    );
};

export default DsBreadcrumbsPage;