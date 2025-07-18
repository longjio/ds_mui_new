// src/pages/CardPage.tsx

import React from 'react';
import {
    Box,
    Button,
    Container,
    CardMedia as MuiCardMedia,
    Typography,
} from '@mui/material';

// 컴포넌트 import
import { DsCard } from '../components/surface/DsCard';
import DsGrid from '../components/layout/DsGrid'; // Grid v2 호환 DsGrid를 가져옵니다.
import { RecipeReviewCard, RecipeReviewCardProps } from '../components/surface/RecipeReviewCard';

// 이미지 import
import Image1 from '../assets/images/img_burger.jpg';
import Image2 from '../assets/images/img_coffee.jpg';

// 데이터 정의 (변경 없음)
const paellaRecipeData: RecipeReviewCardProps = {
    avatarChar: 'P',
    title: 'Shrimp and Chorizo Paella',
    subheader: 'September 14, 2016',
    imageSrc: Image2,
    imageAlt: 'A delicious paella dish',
    initialContent: 'This impressive paella is a perfect party dish and a fun meal to cook together with your guests.',
    methodSteps: [
        'Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10 minutes.',
        'Heat oil in a paella pan. Add chicken, shrimp and chorizo, and cook until lightly browned.'
    ]
};
const cardData = {
    outlined: { title: 'Outlined Card', alertText: 'Benevolent' },
    elevation: { title: 'Elevation Card', alertText: 'Future of AI' },
    basic: { title: 'Basic Card' },
    custom: { title: 'Custom Layout Card', alertText: 'Custom Lizard' },
    quickTip: { title: 'Quick Tip', alertText: 'Quick Tip Improved' },
};

const CardPage = () => {
    const handleLearnMoreClick = (cardTitle: string) => {
        alert(`"${cardTitle}" 카드에서 버튼이 클릭되었습니다!`);
    };

    return (
        <Container sx={{ py: 4 }}>
            <Typography variant="h1" component="h1" gutterBottom sx={{ mb: 4 }}>
                Card
            </Typography>

            {/* Grid v2의 container를 사용합니다. */}
            <DsGrid container spacing={4}>
                {/* 중요: 'size' prop을 사용하여 반응형 크기를 객체로 전달합니다. */}
                {/* Grid v2에서는 전체 너비가 12입니다. */}
                <DsGrid size={{ xs: 12, sm: 4 }}>
                    <DsCard
                        overline="Word of the Day"
                        title={cardData.outlined.title}
                        subheader="adjective"
                        content={
                            <Typography variant="body2" color="text.secondary">
                                Set variant="outlined" to render an outlined card.
                                <br />
                                {'"a benevolent smile"'}
                            </Typography>
                        }
                        actionText="Learn More"
                        onActionClick={() => handleLearnMoreClick(cardData.outlined.alertText)}
                        sx={{ height: '100%' }}
                    />
                </DsGrid>

                {/* 다른 모든 카드 아이템들도 동일하게 'size' prop을 사용합니다. */}
                <DsGrid size={{ xs: 12, sm: 4 }}>
                    <DsCard
                        variant="elevation"
                        elevation={6}
                        overline="Featured Article"
                        title={cardData.elevation.title}
                        subheader="Technology Insights"
                        content={
                            <Typography variant="body2" color="text.secondary">
                                `elevation` 속성을 통해 카드에 그림자 효과를 주어 페이지 위에 떠 있는 듯한 입체감을 만듭니다.
                            </Typography>
                        }
                        actionText="Read Article"
                        onActionClick={() => handleLearnMoreClick(cardData.elevation.alertText)}
                        sx={{ height: '100%' }}
                    />
                </DsGrid>

                <DsGrid size={{ xs: 12, sm: 4 }}>
                    <DsCard variant="outlined" sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                        <MuiCardMedia
                            component="img"
                            height="140"
                            image={Image1}
                            alt="Custom image for card"
                        />
                        <Box sx={{ p: 2, flexGrow: 1 }}>
                            <Typography gutterBottom variant="h5" component="div">
                                {cardData.custom.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                `children`을 사용하면 카드 내부에 완전히 자유로운 레이아웃을 구성할 수 있습니다.
                            </Typography>
                        </Box>
                        <Box sx={{ p: 2, pt: 0 }}>
                            <Button size="small" onClick={() => handleLearnMoreClick(cardData.custom.alertText)}>Share</Button>
                            <Button size="small" onClick={() => handleLearnMoreClick(cardData.custom.alertText)}>Learn More</Button>
                        </Box>
                    </DsCard>
                </DsGrid>

                <DsGrid size={{ xs: 12, sm: 4 }}>
                    <DsCard
                        overline={cardData.quickTip.title}
                        title="Remember This!"
                        content={
                            <Typography variant="body2" color="text.secondary">
                                `overline`, `title`, `content`, `actionText` 등 구조화된 props를 사용하는 것이 표준적인 방법입니다.
                            </Typography>
                        }
                        actionText="Got it!"
                        onActionClick={() => handleLearnMoreClick(cardData.quickTip.alertText)}
                        sx={{ height: '100%' }}
                    />
                </DsGrid>

                <DsGrid size={{ xs: 12, sm: 4 }}>
                    <RecipeReviewCard {...paellaRecipeData} />
                </DsGrid>

            <DsGrid size={{ xs: 12, sm: 4 }}>
                    <DsCard
                        title={cardData.basic.title}
                        content={
                            <Typography variant="body2" color="text.secondary">
                                This is a basic card with only a title and content.
                            </Typography>
                        }
                        sx={{ height: '100%' }}
                    />
                </DsGrid>
            </DsGrid>
        </Container>
    );
};

export default CardPage;