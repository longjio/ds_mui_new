import React from 'react';
import { Stack } from '@mui/material';

// 커스텀 타이포그래피 컴포넌트 import
import { HeadlineL, HeadlineM, HeadlineS, TitleL, TitleM, TitleS, TitleXS, BodyL, BodyM, BodyS, BodyXS } from '../components/typography';

const TypographyPage = () => {
    return (
        <Stack spacing={2}>
            <TitleM sx={{ mb: 2 }}>Typography</TitleM>
            <HeadlineL>HeadLine L Pretendard Bold 48</HeadlineL>
            <HeadlineM>HeadLine M Pretendard Bold 40</HeadlineM>
            <HeadlineS>HeadLine S Pretendard Bold 36</HeadlineS>
            <TitleL>Title L Pretendard Semibold 30</TitleL>
            <TitleM>Title M Pretendard Semibold 26</TitleM>
            <TitleS>Title S Pretendard Semibold 24</TitleS>
            <TitleXS>Title XS Pretendard Semibold 20</TitleXS>
            <BodyL>Body L Pretendard Regular 20</BodyL>
            <BodyM>Body M Pretendard Regular 16</BodyM>
            <BodyS>Body S Pretendard Regular 14</BodyS>
            <BodyXS>Body XS Pretendard Regular 12</BodyXS>
        </Stack>
    );
};

export default TypographyPage;
