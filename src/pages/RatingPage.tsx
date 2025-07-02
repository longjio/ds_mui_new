// src/pages/RatingPage.tsx

import React, { useState } from 'react';
import { Stack, Typography, Box } from '@mui/material';
import Rating from '../components/input/DsRating'; // Rating 컴포넌트의 실제 경로로 수정해주세요.

const RatingPage = () => {
    const [controlledValue, setControlledValue] = useState<number | null>(2.5);
    const [controlledValueWithLabel, setControlledValueWithLabel] = useState<number | null>(3);
    const [precisionValue, setPrecisionValue] = useState<number | null>(3.5);

    const handleControlledChange = (
        event: React.SyntheticEvent,
        newValue: number | null,
    ) => {
        setControlledValue(newValue);
    };

    const handleControlledChangeWithLabel = (
        event: React.SyntheticEvent,
        newValue: number | null,
    ) => {
        setControlledValueWithLabel(newValue);
    };

    const handlePrecisionChange = (
        event: React.SyntheticEvent,
        newValue: number | null,
    ) => {
        setPrecisionValue(newValue);
    };

    return (
        <Stack spacing={4} sx={{ p: 3 }}>
            <Typography variant="h1" component="h1" gutterBottom>
                Rating
            </Typography>

            <Box>
                <Typography variant="h6" component="h2" gutterBottom>
                    기본 Rating (레이블 포함)
                </Typography>
                <Rating
                    label="서비스 만족도"
                    name="satisfaction-basic"
                    defaultValue={3}
                />
            </Box>

            <Box>
                <Typography variant="h6" component="h2" gutterBottom>
                    제어되는 Rating (Controlled)
                </Typography>
                <Rating
                    label="나의 평점"
                    name="controlled-rating"
                    value={controlledValueWithLabel}
                    onChange={handleControlledChangeWithLabel}
                />
                <Typography variant="body2" sx={{ mt: 1 }}>
                    현재 값: {controlledValueWithLabel !== null ? controlledValueWithLabel : '선택 안됨'}
                </Typography>
            </Box>

            <Box>
                <Typography variant="h6" component="h2" gutterBottom>
                    읽기 전용 Rating (Read Only)
                </Typography>
                <Rating
                    label="평균 평점"
                    name="read-only-rating"
                    value={4.5}
                    readOnly
                    precision={0.5}
                />
            </Box>

            <Box>
                <Typography variant="h6" component="h2" gutterBottom>
                    비활성화된 Rating (Disabled)
                </Typography>
                <Rating
                    label="이전 평점"
                    name="disabled-rating"
                    value={2}
                    disabled
                />
            </Box>

            <Box>
                <Typography variant="h6" component="h2" gutterBottom>
                    정밀도 0.5 Rating (Precision 0.5)
                </Typography>
                <Rating
                    label="세부 평점"
                    name="precision-rating"
                    value={precisionValue}
                    precision={0.5}
                    onChange={handlePrecisionChange}
                />
                <Typography variant="body2" sx={{ mt: 1 }}>
                    현재 값: {precisionValue !== null ? precisionValue : '선택 안됨'}
                </Typography>
            </Box>

            <Box>
                <Typography variant="h6" component="h2" gutterBottom>
                    최대값 변경 Rating (Max Value)
                </Typography>
                <Rating
                    label="10점 만점 평가"
                    name="max-value-rating"
                    defaultValue={7}
                    max={10}
                />
            </Box>

            <Box>
                <Typography variant="h6" component="h2" gutterBottom>
                    레이블 없는 Rating
                </Typography>
                <Rating
                    name="no-label-rating"
                    value={controlledValue}
                    onChange={handleControlledChange}
                />
                <Typography variant="body2" sx={{ mt: 1 }}>
                    현재 값: {controlledValue !== null ? controlledValue : '선택 안됨'}
                </Typography>
            </Box>

            <Box>
                <Typography variant="h6" component="h2" gutterBottom>
                    커스텀 Box 스타일 적용
                </Typography>
                <Rating
                    label="스타일 적용된 평점"
                    name="custom-box-style-rating"
                    defaultValue={3}
                    boxSx={{
                        backgroundColor: '#f0f0f0',
                        padding: 2,
                        borderRadius: '4px',
                        border: '1px solid #ccc'
                    }}
                />
            </Box>
        </Stack>
    );
};

export default RatingPage;