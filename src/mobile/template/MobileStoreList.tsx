// D:/ds_mui_new/src/mobile/template/MobileStoreList.tsx

import React from 'react';
import { useOutletContext } from 'react-router-dom';
import {
    Box,
    Stack,
    Chip,
    Avatar,
    List,
    Divider, // Divider는 이제 사용되지 않지만, 다른 곳에서 필요할 수 있어 남겨둡니다.
} from '@mui/material';
import StorefrontIcon from '@mui/icons-material/Storefront';
import DriveEtaIcon from '@mui/icons-material/DriveEta';
import CoffeeIcon from '@mui/icons-material/Coffee';         // 리저브 아이콘
import LocalParkingIcon from '@mui/icons-material/LocalParking'; // 주차 아이콘
import MobileHeader from '../components/MobileHeader';
// typography/index.ts 에서 모든 컴포넌트를 한번에 가져옵니다.
import { TitleXS, BodyM, BodyS, BodyXS } from '../../components/typography';
import CoffeeImage from '../../assets/images/img_coffee.jpg';

// 매장 데이터 타입 정의
interface Store {
    id: string;
    name: string;
    distance: string;
    address: string;
    status: '주문 가능' | '준비 중' | '주문 마감';
    statusColor: 'success' | 'warning' | 'default';
    tags: ('DT' | '리저브' | '주차 가능')[];
    imageUrl?: string;
}

// 샘플 데이터를 스타벅스 매장으로 변경하고, 이미지 경로를 적용합니다.
const sampleStores: Store[] = [
    {
        id: 'store-001',
        name: '스타벅스 강남R점',
        distance: '250m',
        address: '서울 강남구 강남대로 390',
        status: '주문 가능',
        statusColor: 'success',
        tags: ['리저브'],
        imageUrl: CoffeeImage,
    },
    {
        id: 'store-002',
        name: '스타벅스 역삼이마트점',
        distance: '800m',
        address: '서울 강남구 역삼로 310',
        status: '주문 가능',
        statusColor: 'success',
        tags: ['DT', '주차 가능'],
        imageUrl: CoffeeImage,
    },
    {
        id: 'store-003',
        name: '스타벅스 선릉동신빌딩점',
        distance: '1.2km',
        address: '서울 강남구 테헤란로 408',
        status: '준비 중',
        statusColor: 'warning',
        tags: ['리저브'],
        imageUrl: CoffeeImage,
    },
    {
        id: 'store-004',
        name: '스타벅스 코엑스별마당점',
        distance: '2.5km',
        address: '서울 강남구 영동대로 513',
        status: '주문 마감',
        statusColor: 'default',
        tags: ['리저브'],
        imageUrl: CoffeeImage,
    },
];

// 태그 아이콘 매핑
const tagIcons: { [key: string]: React.ReactElement } = {
    'DT': <DriveEtaIcon sx={{ fontSize: '14px', mr: 0.5 }} />,
    '리저브': <CoffeeIcon sx={{ fontSize: '14px', mr: 0.5 }} />,
    '주차 가능': <LocalParkingIcon sx={{ fontSize: '14px', mr: 0.5 }} />,
};

// 개별 매장 아이템 컴포넌트
const StoreListItem = ({ store }: { store: Store }) => (
    <Box
        sx={{
            py: 2,
            px: '20px',
            cursor: 'pointer',
            '&:hover': { bgcolor: 'action.hover' },
        }}
    >
        <Stack direction="row" spacing={2} alignItems="center">
            {/* 왼쪽: 이미지 */}
            <Avatar
                variant="rounded"
                src={store.imageUrl}
                sx={{ width: 80, height: 80, bgcolor: 'grey.200' }}
            >
                <StorefrontIcon sx={{ fontSize: 40, color: 'grey.500' }} />
            </Avatar>

            {/* 오른쪽: 정보 */}
            <Stack
                justifyContent="space-between" // 자식 요소들을 위아래로 분리
                sx={{
                    flexGrow: 1,
                    minWidth: 0,
                    height: '80px', // Avatar 높이와 동일하게 설정
                }}
            >
                {/* 상단 그룹: 매장명과 주소 */}
                <Box>
                    <BodyM component="h2" noWrap sx={{ fontWeight: 'bold' }}>
                        {store.name}
                    </BodyM>
                    <BodyXS sx={{ color: 'text.secondary' }} noWrap>
                        {store.address}
                    </BodyXS>
                </Box>

                {/* 하단 그룹: 태그와 거리 */}
                <Box>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Stack direction="row" spacing={1} alignItems="center">
                            <Chip
                                label={store.status}
                                color={store.statusColor}
                                size="small"
                                sx={{
                                    height: 20,
                                    fontSize: '0.75rem', // 12px
                                }}
                            />
                            {store.tags.map(tag => (
                                <Chip
                                    key={tag}
                                    icon={tagIcons[tag]}
                                    label={tag}
                                    variant="outlined"
                                    size="small"
                                    sx={{
                                        height: 20,
                                        fontSize: '0.75rem', // 12px
                                        '& .MuiChip-icon': {
                                            fontSize: '16px',
                                        },
                                        '& .MuiChip-label': {
                                            paddingX: '6px',
                                        },
                                    }}
                                />
                            ))}
                        </Stack>

                        <BodyS sx={{ color: 'text.secondary', flexShrink: 0 }}>
                            {store.distance}
                        </BodyS>
                    </Stack>
                </Box>
            </Stack>
        </Stack>
    </Box>
);

// 메인 페이지 컴포넌트
export default function MobileStoreListPage() {
    const { handleDrawerToggle } = useOutletContext<{ handleDrawerToggle: () => void }>();

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <MobileHeader
                title="매장 선택"
                leftIcon="back"
                onRightIconClick={handleDrawerToggle}
            />
            <Box sx={{ flexGrow: 1, overflowY: 'auto' }}>
                <List disablePadding>
                    {sampleStores.map((store) => (
                        <StoreListItem key={store.id} store={store} />
                    ))}
                </List>
            </Box>
        </Box>
    );
}