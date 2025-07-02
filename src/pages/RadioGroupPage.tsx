// src/pages/RadioGroupPage.tsx

import React, { useState } from 'react';
import { Stack, Typography, Box } from '@mui/material';
import Radio from '@mui/material/Radio'; // 개별 Radio 컴포넌트 import
import { DsRadioGroup } from '../components/input/DsRadioGroup';

const RadioGroupPage = () => {
    // 첫 번째 라디오 그룹 상태
    const [selectedValue1, setSelectedValue1] = useState<string>('female');
    // 두 번째 라디오 그룹 상태 (가로 정렬 예시)
    const [selectedValue2, setSelectedValue2] = useState<string>('option1');
    // 세 번째 라디오 그룹 상태 (비활성화 예시)
    const [selectedValue3, setSelectedValue3] = useState<string>('apple');
    // 네 번째: 라디오 버튼 크기 예시 상태
    const [sizeRadioValue, setSizeRadioValue] = React.useState('a');

    const radioItems1 = [
        { label: '남성', value: 'male' },
        { label: '여성', value: 'female' },
        { label: '기타', value: 'other' },
    ];

    const radioItems2 = [
        { label: '옵션 1', value: 'option1' },
        { label: '옵션 2', value: 'option2' },
        { label: '옵션 3', value: 'option3' },
    ];

    const fruitItems = [
        { label: '사과', value: 'apple' },
        { label: '바나나', value: 'banana' },
        { label: '오렌지', value: 'orange' },
    ];

    const handleChange1 = (event: React.ChangeEvent<HTMLInputElement>, value: string) => {
        setSelectedValue1(value);
    };

    const handleChange2 = (event: React.ChangeEvent<HTMLInputElement>, value: string) => {
        setSelectedValue2(value);
    };

    const handleChange3 = (event: React.ChangeEvent<HTMLInputElement>, value: string) => {
        setSelectedValue3(value);
    };

    // 라디오 버튼 크기 예시 핸들러
    const handleSizeRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSizeRadioValue(event.target.value);
    };

    // 라디오 버튼 크기 예시를 위한 controlProps 헬퍼 함수
    const controlProps = (item: string) => ({
        checked: sizeRadioValue === item,
        onChange: handleSizeRadioChange,
        value: item,
        name: 'size-radio-button-demo',
        inputProps: { 'aria-label': item },
    });

    return (
        <Stack spacing={4} sx={{ p: 3 }}>
            <Typography variant="h1" component="h1" gutterBottom>
                Radio Group
            </Typography>

            {/* --- 기존 DsRadioGroup 예시들 --- */}
            <Stack spacing={2} sx={{ p: 3, border: '1px solid #e0e0e0' }}>
                <Typography variant="h6" component="h2" gutterBottom>
                    RadioGroup Vertical
                </Typography>
                <DsRadioGroup
                    id="gender-group"
                    label="성별을 선택하세요"
                    name="gender"
                    items={radioItems1}
                    value={selectedValue1}
                    onChange={handleChange1}
                />
                <Box sx={{ mt: 1 }}>
                    <Typography variant="body2">선택된 값: {selectedValue1}</Typography>
                </Box>
            </Stack>

            <Stack spacing={2} sx={{ p: 3, border: '1px solid #e0e0e0' }}>
                <Typography variant="h6" component="h2" gutterBottom>
                    RadioGroup Horizontal
                </Typography>
                <DsRadioGroup
                    id="options-group-row"
                    label="옵션을 선택하세요 (가로)"
                    name="optionsRow"
                    items={radioItems2}
                    value={selectedValue2}
                    onChange={handleChange2}
                    row
                />
                <Box sx={{ mt: 1 }}>
                    <Typography variant="body2">선택된 값: {selectedValue2}</Typography>
                </Box>
            </Stack>

            <Stack spacing={2} sx={{ p: 3, border: '1px solid #e0e0e0' }}>
                <Typography variant="h6" component="h2" gutterBottom>
                    RadioGroup 비활성화 (disabled prop)
                </Typography>
                <DsRadioGroup
                    id="fruits-group-disabled"
                    label="과일을 선택하세요 (비활성화됨)"
                    name="fruitsDisabled"
                    items={fruitItems}
                    value={selectedValue3}
                    onChange={handleChange3}
                    disabled
                />
                <Box sx={{ mt: 1 }}>
                    <Typography variant="body2">선택된 값: {selectedValue3}</Typography>
                </Box>
            </Stack>

            {/* --- 새로운 섹션: Radio 버튼 크기 데모 --- */}
            <Stack spacing={2} sx={{ p: 3, border: '1px solid #e0e0e0' }}>
                <Typography variant="h6" component="h2" gutterBottom>
                    Radio 크기 조절 (Size)
                </Typography>
                <Box> {/* 제공된 예제처럼 div 대신 Box 사용 */}
                    <Radio {...controlProps('a')} size="small" />
                    <Radio {...controlProps('b')} /> {/* Default size */}
                    <Radio
                        {...controlProps('c')}
                        sx={{
                            '& .MuiSvgIcon-root': {
                                fontSize: 28,
                            },
                        }}
                    />
                </Box>
                <Box sx={{ mt: 1 }}>
                    <Typography variant="body2">선택된 크기 라디오 값: {sizeRadioValue}</Typography>
                </Box>
            </Stack>
        </Stack>
    );
};

export default RadioGroupPage;