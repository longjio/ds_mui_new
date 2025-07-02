// src/components/surface/RecipeReviewCard.tsx

import React, { useState, useCallback } from 'react';
import {
    Card,
    CardHeader,
    CardMedia as MuiCardMedia,
    CardContent,
    CardActions,
    Collapse,
    Avatar,
    IconButton,
    Typography,
    styled,
    IconButtonProps,
} from '@mui/material';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import Image2 from '../../assets/images/img_coffee.jpg'; // 경로가 ../../ 로 변경되었습니다.

interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}

const ExpandMoreStyled = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: expand ? 'rotate(180deg)' : 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

// --- 개선 사항 1: 재사용을 위한 Props 타입 정의 ---
export interface RecipeReviewCardProps { // <-- 이 부분이 export 되어 있어야 합니다.
    avatarChar: string;
    avatarColor?: string;
    title: string;
    subheader: string;
    imageSrc: string;
    imageAlt: string;
    initialContent: React.ReactNode;
    methodTitle?: string;
    methodSteps: React.ReactNode[];
}

// --- 개선 사항 2: 컴포넌트가 데이터를 Props로 받도록 수정 ---
export const RecipeReviewCard = ({
                                     avatarChar,
                                     avatarColor = red[500], // 기본값 설정
                                     title,
                                     subheader,
                                     imageSrc,
                                     imageAlt,
                                     initialContent,
                                     methodTitle = 'Method:', // 기본값 설정
                                     methodSteps,
                                 }: RecipeReviewCardProps) => {
    const [expanded, setExpanded] = useState(false);

    // --- 개선 사항 3: useCallback으로 함수 최적화 ---
    const handleExpandClick = useCallback(() => {
        setExpanded((prev) => !prev);
    }, []);

    return (
        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: avatarColor }} aria-label="recipe">
                        {avatarChar}
                    </Avatar>
                }
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                }
                title={title}
                subheader={subheader}
            />

            <MuiCardMedia component="img" height="194" image={imageSrc} alt={imageAlt} />
            <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="body2" color="text.secondary">
                    {initialContent}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                </IconButton>
                <IconButton aria-label="share">
                    <ShareIcon />
                </IconButton>
                <ExpandMoreStyled
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon />
                </ExpandMoreStyled>
            </CardActions>

            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography paragraph>{methodTitle}</Typography>
                    {/* 배열 데이터를 map으로 렌더링 */}
                    {methodSteps.map((step, index) => (
                        <Typography key={index} paragraph>
                            {step}
                        </Typography>
                    ))}
                </CardContent>
            </Collapse>
        </Card>
    );
};