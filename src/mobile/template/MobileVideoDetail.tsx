// D:/ds_mui_new/src/mobile/template/MobileVideoDetail.tsx

import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Box,
    Stack,
    Typography,
    Divider,
    Avatar,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    ListItemIcon,
    Paper,
} from '@mui/material';
import MobileHeader from '../components/MobileHeader';
import CoffeeImage from '../../assets/images/img_coffee.jpg'; // Placeholder image

// Data types (can be shared from list page)
interface Video {
    id: string;
    title: string;
    channel: string;
    views: string;
    uploaded: string;
    duration: string;
    thumbnail: string;
    description: string;
}

const videoPlaylist: Omit<Video, 'description'>[] = [
    { id: 'vid-001', title: 'React 기초: 컴포넌트와 Props', channel: '코딩의 신', views: '1.2만', uploaded: '3일 전', duration: '12:34', thumbnail: CoffeeImage },
    { id: 'vid-002', title: 'State와 Lifecycle 완벽 이해', channel: '코딩의 신', views: '8.8천', uploaded: '2일 전', duration: '15:02', thumbnail: CoffeeImage },
    { id: 'vid-003', title: 'React Hooks: useState와 useEffect', channel: '코딩의 신', views: '2.1만', uploaded: '1일 전', duration: '18:55', thumbnail: CoffeeImage },
    { id: 'vid-004', title: 'MUI 컴포넌트 활용하기', channel: '디자인 시스템 마스터', views: '5.4천', uploaded: '5시간 전', duration: '22:10', thumbnail: CoffeeImage },
];

const videoDetails: { [key: string]: Video } = {
    'vid-001': { ...videoPlaylist[0], description: 'React의 가장 기본적인 개념인 컴포넌트와 Props에 대해 알아봅니다. 함수형 컴포넌트와 클래스형 컴포넌트의 차이점을 이해하고, 데이터를 전달하는 방법을 배웁니다.' },
    'vid-002': { ...videoPlaylist[1], description: '컴포넌트의 상태(State)를 관리하고, 컴포넌트의 생명주기(Lifecycle)에 따라 특정 작업을 수행하는 방법을 학습합니다.' },
    'vid-003': { ...videoPlaylist[2], description: 'React Hooks의 핵심인 useState와 useEffect를 사용하여 함수형 컴포넌트에서 상태 관리와 사이드 이펙트 처리를 하는 방법을 알아봅니다.' },
    'vid-004': { ...videoPlaylist[3], description: 'Material-UI(MUI)를 사용하여 빠르고 아름다운 UI를 구축하는 방법을 배웁니다. 주요 컴포넌트 사용법과 테마 커스터마이징을 다룹니다.' },
};


export default function MobileVideoDetailPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const video = id ? videoDetails[id] : null;

    // ★ 1. 영상 목록 페이지로 이동하는 함수를 정의합니다.
    const handleGoToList = () => {
        navigate('/m/video-list');
    };

    if (!video) {
        return (
            <Box sx={{ p: 2 }}>
                <Typography>영상을 찾을 수 없습니다.</Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', bgcolor: 'background.default' }}>
            {/* ★ 2. MobileHeader에 onLeftIconClick prop으로 목록 이동 함수를 전달합니다. */}
            <MobileHeader
                title={video.title}
                leftIcon="back"
                rightIcon="none"
                onLeftIconClick={handleGoToList}
            />

            {/* Video Player Area */}
            <Box
                sx={{
                    width: '100%',
                    aspectRatio: '16/9',
                    bgcolor: 'black',
                }}
            >
                <video
                    width="100%"
                    height="100%"
                    controls
                    autoPlay
                    poster={video.thumbnail} // 썸네일을 비디오 포스터로 사용
                    style={{ border: 'none', display: 'block' }}
                >
                    {/* 저작권 무료 샘플 영상 "Big Buck Bunny" */}
                    <source
                        src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                        type="video/mp4"
                    />
                    브라우저가 비디오 태그를 지원하지 않습니다.
                </video>
            </Box>

            {/* Content Area */}
            <Box sx={{ flexGrow: 1, overflowY: 'auto' }}>
                <Box sx={{ p: 2 }}>
                    <Typography variant="h6" component="h1" fontWeight="bold" gutterBottom>
                        {video.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        조회수 {video.views}회 · {video.uploaded}
                    </Typography>
                    <Divider sx={{ my: 2 }} />

                    <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
                        {video.description}
                    </Typography>
                </Box>

                <Divider sx={{ my: 2 }} />

                <Box sx={{ px: 2, pb: 2 }}>
                    <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>
                        다음 동영상
                    </Typography>
                    <Paper variant="outlined" sx={{ borderRadius: 2 }}>
                        <List disablePadding>
                            {videoPlaylist.filter(v => v.id !== video.id).map((nextVideo, index) => (
                                <React.Fragment key={nextVideo.id}>
                                    <ListItem disablePadding>
                                        <ListItemButton onClick={() => navigate(`/m/video/${nextVideo.id}`)}>
                                            <ListItemIcon sx={{ mr: 1 }}>
                                                <Avatar variant="rounded" src={nextVideo.thumbnail} />
                                            </ListItemIcon>
                                            <ListItemText
                                                primary={nextVideo.title}
                                                secondary={nextVideo.channel}
                                                primaryTypographyProps={{ noWrap: true, variant: 'body2', fontWeight: 500 }}
                                                secondaryTypographyProps={{ noWrap: true, variant: 'caption' }}
                                            />
                                        </ListItemButton>
                                    </ListItem>
                                    {index < videoPlaylist.length - 2 && <Divider component="li" />}
                                </React.Fragment>
                            ))}
                        </List>
                    </Paper>
                </Box>
            </Box>
        </Box>
    );
}