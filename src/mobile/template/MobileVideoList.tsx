// D:/ds_mui_new/src/mobile/template/MobileVideoList.tsx

import React from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import {
    Box,
    Stack,
    Card,
    CardContent,
    CardMedia,
    Typography,
    Chip,
} from '@mui/material';
import MobileHeader from '../components/MobileHeader';
import CoffeeImage from '../../assets/images/img_coffee.jpg'; // Placeholder image

// Video data type
interface Video {
    id: string;
    title: string;
    channel: string;
    views: string;
    uploaded: string;
    duration: string;
    thumbnail: string;
}

// Sample video data
const videoPlaylist: Video[] = [
    { id: 'vid-001', title: 'React 기초: 컴포넌트와 Props', channel: '코딩의 신', views: '1.2만', uploaded: '3일 전', duration: '12:34', thumbnail: CoffeeImage },
    { id: 'vid-002', title: 'State와 Lifecycle 완벽 이해', channel: '코딩의 신', views: '8.8천', uploaded: '2일 전', duration: '15:02', thumbnail: CoffeeImage },
    { id: 'vid-003', title: 'React Hooks: useState와 useEffect', channel: '코딩의 신', views: '2.1만', uploaded: '1일 전', duration: '18:55', thumbnail: CoffeeImage },
    { id: 'vid-004', title: 'MUI 컴포넌트 활용하기', channel: '디자인 시스템 마스터', views: '5.4천', uploaded: '5시간 전', duration: '22:10', thumbnail: CoffeeImage },
];

export default function MobileVideoListPage() {
    const navigate = useNavigate();
    const { handleDrawerToggle } = useOutletContext<{ handleDrawerToggle: () => void }>();

    const handleVideoClick = (id: string) => {
        navigate(`/m/video/${id}`);
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <MobileHeader
                title="교육 컨텐츠"
                onRightIconClick={handleDrawerToggle}
            />
            <Box sx={{ flexGrow: 1, overflowY: 'auto' }}>
                <Stack spacing={0}>
                    {videoPlaylist.map((video) => (
                        <Card
                            key={video.id}
                            elevation={0}
                            onClick={() => handleVideoClick(video.id)}
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                cursor: 'pointer',
                                borderRadius: 0,
                                borderBottom: 1,
                                borderColor: 'divider',
                                '&:hover': { bgcolor: 'action.hover' },
                            }}
                        >
                            <Box sx={{ position: 'relative' }}>
                                <CardMedia
                                    component="img"
                                    sx={{ width: '100%', aspectRatio: '16/9' }}
                                    image={video.thumbnail}
                                    alt={video.title}
                                />
                                <Chip
                                    label={video.duration}
                                    size="small"
                                    sx={{
                                        position: 'absolute',
                                        bottom: 8,
                                        right: 8,
                                        bgcolor: 'rgba(0, 0, 0, 0.7)',
                                        color: 'white',
                                    }}
                                />
                            </Box>
                            <CardContent>
                                <Typography variant="body1" component="h2" fontWeight="bold" gutterBottom>
                                    {video.title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {video.channel}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    조회수 {video.views}회 · {video.uploaded}
                                </Typography>
                            </CardContent>
                        </Card>
                    ))}
                </Stack>
            </Box>
        </Box>
    );
}