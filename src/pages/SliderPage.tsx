// src/pages/SliderPage.tsx

import React, { useState } from 'react';
import { Stack, Typography } from '@mui/material';
import { DsSlider } from '../components/input/DsSlider'; // DsSlider 컴포넌트 가져오기

const SliderPage = () => {
    // 1. 기본 단일 값 슬라이더 상태
    const [singleValue, setSingleValue] = useState<number>(30);

    // 2. 범위 슬라이더 (두 개의 핸들) 상태
    const [rangeValue, setRangeValue] = useState<number[]>([20, 80]);

    // 3. 커스텀 step 및 범위 슬라이더 상태
    const [customStepValue, setCustomStepValue] = useState<number>(50);

    // 4. 비활성화된 슬라이더 (값은 중요하지 않음, 보여주기용)
    const [disabledValue, setDisabledValue] = useState<number>(60);

    // 5. Marks가 있는 슬라이더를 위한 새로운 상태 추가
    const [marksValue, setMarksValue] = useState<number>(40);


    const handleSingleChange = (event: Event, newValue: number | number[]) => {
        setSingleValue(newValue as number);
    };

    const handleRangeChange = (event: Event, newValue: number | number[]) => {
        setRangeValue(newValue as number[]);
    };

    const handleCustomStepChange = (event: Event, newValue: number | number[]) => {
        setCustomStepValue(newValue as number);
    };

    // 비활성화된 슬라이더는 onChange 핸들러가 호출되지 않지만, 형식상 추가
    const handleDisabledChange = (event: Event, newValue: number | number[]) => {
        // 이 핸들러는 호출되지 않습니다.
        setDisabledValue(newValue as number);
    };

    // Marks가 있는 슬라이더를 위한 새로운 핸들러 추가
    const handleMarksChange = (event: Event, newValue: number | number[]) => {
        setMarksValue(newValue as number);
    };


    return (
        <Stack spacing={4} sx={{ p: 3, maxWidth: '600px'}}>
            <Typography variant="h1" component="h1" gutterBottom>
                Slider
            </Typography>

            {/* 예시 1: 기본 단일 값 슬라이더 */}
            <Stack spacing={1} sx={{ p: 2, border: '1px solid #e0e0e0' }}>
                <Typography variant="h6" component="h2">
                    기본 슬라이더
                </Typography>
                <DsSlider
                    value={singleValue}
                    onChange={handleSingleChange}
                    aria-label="기본 볼륨 슬라이더" // aria-label 제공
                />
                <Typography variant="body2">선택된 값: {singleValue}</Typography>
            </Stack>

            {/* 예시 2: 범위 슬라이더 */}
            <Stack spacing={1} sx={{ p: 2, border: '1px solid #e0e0e0' }}>
                <Typography variant="h6" component="h2">
                    범위 슬라이더 (Range)
                </Typography>
                <DsSlider
                    value={rangeValue}
                    onChange={handleRangeChange}
                    aria-label="가격 범위 슬라이더" // aria-label 제공
                />
                <Typography variant="body2">선택된 범위: {rangeValue[0]} - {rangeValue[1]}</Typography>
            </Stack>

            {/* 예시 3: 커스텀 min, max, step 슬라이더 */}
            <Stack spacing={1} sx={{ p: 2, border: '1px solid #e0e0e0' }}>
                <Typography variant="h6" component="h2">
                    커스텀 단계 (Min/Max/Step)
                </Typography>
                <DsSlider
                    value={customStepValue}
                    onChange={handleCustomStepChange}
                    min={0}
                    max={200}
                    step={10}
                    aria-label="커스텀 단계 슬라이더" // aria-label 제공
                />
                <Typography variant="body2">선택된 값: {customStepValue}</Typography>
            </Stack>

            {/* 예시 4: 비활성화된 슬라이더 */}
            <Stack spacing={1} sx={{ p: 2, border: '1px solid #e0e0e0' }}>
                <Typography variant="h6" component="h2">
                    비활성화된 슬라이더
                </Typography>
                <DsSlider
                    value={disabledValue}
                    onChange={handleDisabledChange} // 실제로는 호출되지 않음
                    disabled // disabled prop 사용
                    aria-label="비활성화된 슬라이더" // aria-label 제공
                />
                <Typography variant="body2">현재 값 (비활성화됨): {disabledValue}</Typography>
            </Stack>

            {/* 추가: DsSlider의 다른 props (marks, orientation 등)도 테스트해볼 수 있습니다. */}
            {/* 예시: Marks가 있는 슬라이더 */}
            <Stack spacing={1} sx={{ p: 2, border: '1px solid #e0e0e0' }}>
                <Typography variant="h6" component="h2">
                    Marks가 있는 슬라이더
                </Typography>
                <DsSlider
                    value={marksValue}
                    onChange={handleMarksChange}
                    aria-label="Marks 슬라이더"
                    step={10}
                    marks // marks를 true로 설정하거나, marks 배열을 직접 전달할 수 있습니다.
                    valueLabelDisplay="auto" // 값 레이블 표시
                />
                <Typography variant="body2">선택된 값: {marksValue}</Typography> {/* 새로운 상태 변수 표시 */}
            </Stack>

        </Stack>
    );
};

export default SliderPage;