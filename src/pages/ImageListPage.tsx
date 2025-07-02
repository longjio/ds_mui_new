import React from 'react';
import { Box, Typography, Stack, IconButton } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { DsImageList, DsImageListItem } from '../components/layout/DsImageList';

// 예시 이미지 데이터
// 'img' URL에서 기존의 Unsplash 쿼리 파라미터를 모두 제거하여 순수한 기본 URL만 남깁니다.
const itemData = [
    {
        img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=164&h=164&fit=crop&auto=format',
        title: 'Breakfast',
        author: '@bkristastucchio',
    },
    {
        img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=164&h=164&fit=crop&auto=format',
        title: 'Burger',
        author: '@rollelite_dn',
    },
    {
        img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45?w=164&h=164&fit=crop&auto=format',
        title: 'Camera',
        author: '@helloimnik',
    },
    {
        img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c?w=164&h=164&fit=crop&auto=format',
        title: 'Coffee',
        author: '@nolanissac',
    },
    {
        img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8?w=164&h=164&fit=crop&auto=format',
        title: 'Hats',
        author: '@hjrc33',
    },
    {
        img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=242&h=242&fit=crop&auto=format',
        title: 'Honey',
        author: '@arwinneil',
    },
    {
        img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6?w=121&h=121&fit=crop&auto=format',
        title: 'Basketball',
        author: '@tjdragotta',
    },
    {
        img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f?w=121&h=121&fit=crop&auto=format',
        title: 'Fern',
        author: '@katie_wasserman',
    },
    {
        img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25?w=242&h=242&fit=crop&auto=format',
        title: 'Mushrooms',
        author: '@silverdalex',
    },
    {
        img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af?w=121&h=121&fit=crop&auto=format',
        title: 'Tomato basil',
        author: '@shelleypauls',
    },
    {
        img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1?w=121&h=121&fit=crop&auto=format',
        title: 'Sea star',
        author: '@peterlaster',
    },
    {
        img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6?w=242&h=121&fit=crop&auto=format',
        title: 'Bike',
        author: '@southside_design',
    },
];

// --- Standard ImageList Example ---
const StandardImageListExample = () => (
    <>
        <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
            Standard ImageList (Default `DsImageList`)
        </Typography>
        {/* width를 500px로 설정 */}
        {/* rowHeight를 164로 설정하여 정사각형 모양 유지 */}
        <DsImageList cols={3} sx={{ width: 500 }} rowHeight={164}>
            {itemData.slice(0, 6).map((item) => (
                <DsImageListItem
                    key={item.img}
                    baseImgUrl={item.img}
                    imgAlt={item.title}
                />
            ))}
        </DsImageList>
    </>
);
// Quilted 레이아웃을 위한 패턴 정의
const quiltedPattern = [
    {
        rows: 2,
        cols: 2,
    },
    {
        rows: 1,
        cols: 1,
    },
    {
        rows: 1,
        cols: 1,
    },
    {
        rows: 1,
        cols: 2,
    },
    {
        rows: 1,
        cols: 2,
    },
    {
        rows: 2,
        cols: 2,
    },
    {
        rows: 1,
        cols: 1,
    },
    {
        rows: 1,
        cols: 1,
    },
];
// --- Quilted ImageList Example ---
const QuiltedImageListExample = () => (
    <>
        <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
            Quilted ImageList
        </Typography>
        {/* width를 500px로 설정 */}
        <DsImageList variant="quilted" cols={4} rowHeight={121} sx={{ width: 500 }}>
            {itemData.map((item, index) => {
                // 정의된 패턴을 순환하며 적용
                const pattern = quiltedPattern[index % quiltedPattern.length];
                return (
                    <DsImageListItem
                        key={item.img}
                        baseImgUrl={item.img}
                        imgAlt={item.title}
                        itemTitle={item.title}
                        itemSubtitle={item.author}
                        withBar
                        cols={pattern.cols}
                        rows={pattern.rows}
                        // --- 마우스 오버 효과를 위한 sx prop 추가 ---
                        sx={{
                            // ImageListItemBar를 기본적으로 숨김(투명 처리)
                            '.MuiImageListItemBar-root': {
                                opacity: 0,
                                transition: (theme) =>
                                    theme.transitions.create('opacity', {
                                        duration: theme.transitions.duration.short,
                                    }),
                            },
                            // ImageListItem에 마우스 오버 시 ImageListItemBar를 보이게 함
                            '&:hover .MuiImageListItemBar-root': {
                                opacity: 1,
                            },
                        }}
                    />
                );
            })}
        </DsImageList>
    </>
);

// --- Masonry ImageList Example ---
const MasonryImageListExample = () => (
    <>
        <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
            Masonry ImageList
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 4 }}>
            각 이미지의 가로세로 비율에 맞춰 컨테이너 높이가 자동으로 조절되므로 이미지가 잘리지 않고 원본 그대로 표시되며, 주로 다른 사용자들이 올린 콘텐츠를 탐색할 때 가장 유용합니다.
        </Typography>
        {/* width를 500px로 설정 */}
        <DsImageList variant="masonry" cols={3} gap={8} rowHeight="auto" sx={{ width: 500 }}>
            {itemData.map((item) => (
                <DsImageListItem
                    key={item.img}
                    baseImgUrl={item.img}
                    imgAlt={item.title}
                    // Masonry ImageList에서는 텍스트 정보와 액션 아이콘을 표시하지 않음
                    // itemTitle, itemSubtitle, withBar prop들을 제거
                    // Masonry 효과를 위해 이미지 높이를 랜덤으로 조절하여 dynamicHeight prop으로 전달
                    dynamicHeight={Math.round(Math.random() * (300 - 150) + 150)}
                />
            ))}
        </DsImageList>
    </>
);

const ImageListPage = () => {
    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h1" gutterBottom>
                Image List
            </Typography>
            <Typography color="text.secondary" sx={{ mb: 4 }}>
                이미지 목록은 여러 이미지를 정돈된 격자(그리드) 형태로 깔끔하게 보여줍니다
            </Typography>

            <StandardImageListExample />
            <QuiltedImageListExample />
            <MasonryImageListExample />
        </Box>
    );
};

export default ImageListPage;