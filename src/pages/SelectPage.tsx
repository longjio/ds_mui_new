// src/pages/SelectPage.tsx

import React, { useState } from 'react';
import { Stack, Typography, Box } from '@mui/material'; // Paper import 제거
import { DsSelect, DsSelectItem } from '../components/input/DsSelect'; // DsSelect 컴포넌트의 실제 경로로 수정해주세요.
import { SelectChangeEvent } from '@mui/material/Select';

const ageItems: DsSelectItem[] = [
    { label: '10대', value: 10 },
    { label: '20대', value: 20 },
    { label: '30대', value: 30 },
    { label: '40대', value: 40 },
    { label: '50대 (선택불가)', value: 50, disabled: true },
];

const fruitItems: DsSelectItem[] = [
    { label: '사과', value: 'apple' },
    { label: '바나나', value: 'banana' },
    { label: '오렌지', value: 'orange' },
    { label: '포도', value: 'grape' },
];

const SelectPage = () => {
    const [age, setAge] = useState<string | number>(20);
    const [fruit, setFruit] = useState<string | number>('banana');
    const [city, setCity] = useState<string | number>(''); // 기본값 없는 경우
    const [country, setCountry] = useState<string | number>('KR'); // defaultValue 사용 예시

    const handleAgeChange = (event: SelectChangeEvent<string | number>) => {
        setAge(event.target.value);
    };

    const handleFruitChange = (event: SelectChangeEvent<string | number>) => {
        setFruit(event.target.value);
    };

    const handleCityChange = (event: SelectChangeEvent<string | number>) => {
        setCity(event.target.value);
    };

    const handleCountryChange = (event: SelectChangeEvent<string | number>) => {
        setCountry(event.target.value);
    };

    const countryItems: DsSelectItem[] = [
        { value: 'KR', label: '대한민국' },
        { value: 'US', label: '미국' },
        { value: 'JP', label: '일본' },
        { value: 'CN', label: '중국' },
    ];

    return (
        <Stack spacing={4} sx={{ p: 3}}>
            <Typography variant="h1" component="h1" gutterBottom>
                Select
            </Typography>

            <Box sx={{ p: 3 }}> {/* Paper -> Box, elevation 제거 */}
                <Typography variant="h6" component="h2" gutterBottom>
                    기본 DsSelect (제어 컴포넌트)
                </Typography>
                <DsSelect
                    label="나이 선택"
                    value={age}
                    onChange={handleAgeChange}
                    items={ageItems}
                    id="age-select"
                    formControlSx={{ width: 400 }} // 너비 추가
                />
                <Typography variant="body2" sx={{ mt: 1 }}>
                    선택된 값: {age}
                </Typography>
            </Box>

            <Box sx={{ p: 3 }}> {/* Paper -> Box, elevation 제거 */}
                <Typography variant="h6" component="h2" gutterBottom>
                    헬퍼 텍스트 및 에러 상태
                </Typography>
                <DsSelect
                    label="과일 선택"
                    value={fruit}
                    onChange={handleFruitChange}
                    items={fruitItems}
                    id="fruit-select-error"
                    helperText={fruit === 'grape' ? "포도는 알러지가 있을 수 있습니다." : "좋아하는 과일을 선택하세요."}
                    error={fruit === 'grape'} // 'grape' 선택 시 에러 상태
                    formControlSx={{ width: 400 }} // 너비 추가
                />
                <Typography variant="body2" sx={{ mt: 1 }}>
                    선택된 값: {fruit}
                </Typography>
            </Box>

            <Box sx={{ p: 3 }}> {/* Paper -> Box, elevation 제거 */}
                <Typography variant="h6" component="h2" gutterBottom>
                    비활성화된 DsSelect
                </Typography>
                <DsSelect
                    label="선택 불가 항목"
                    value={30} // 임의의 값
                    onChange={() => { /* 비활성화 상태이므로 호출되지 않음 */ }}
                    items={ageItems}
                    disabled={true}
                    id="disabled-select"
                    formControlSx={{ width: 400 }} // 너비 추가
                />
            </Box>

            <Box sx={{ p: 3 }}> {/* Paper -> Box, elevation 제거 */}
                <Typography variant="h6" component="h2" gutterBottom>
                    필수 항목 (Required) 및 빈 값 허용
                </Typography>
                <DsSelect
                    label="도시 선택 (필수)"
                    value={city}
                    onChange={handleCityChange}
                    items={[
                        { label: '선택안함', value: '' }, // 빈 값 옵션
                        { label: '서울', value: 'seoul' },
                        { label: '부산', value: 'busan' },
                        { label: '인천', value: 'incheon' },
                    ]}
                    id="city-select"
                    required={true}
                    helperText={!city ? "도시를 선택해주세요." : ""}
                    error={!city}
                    formControlSx={{ width: 400 }} // 너비 추가
                />
                <Typography variant="body2" sx={{ mt: 1 }}>
                    선택된 값: {city || "선택 안됨"}
                </Typography>
            </Box>

            <Box sx={{ p: 3 }}> {/* Paper -> Box, elevation 제거 */}
                <Typography variant="h6" component="h2" gutterBottom>
                    `defaultValue` 사용 예시
                </Typography>
                <DsSelect
                    label="국가 선택 (Default: 대한민국)"
                    value={country} // 제어 컴포넌트로 사용하려면 value와 onChange가 모두 필요
                    onChange={handleCountryChange}
                    items={countryItems}
                    defaultValue="KR" // 초기 렌더링 시 이 값이 사용되지만, value prop이 우선됨
                    id="country-default-select"
                    helperText="value prop이 있으면 defaultValue는 초기 렌더링에만 영향을 줍니다."
                    formControlSx={{ width: 400 }} // 너비 추가
                />
                <Typography variant="body2" sx={{ mt: 1 }}>
                    선택된 값: {country}
                </Typography>
            </Box>

            <Box sx={{ p: 3 }}> {/* Paper -> Box, elevation 제거 */}
                <Typography variant="h6" component="h2" gutterBottom>
                    `renderValue` 사용 예시
                </Typography>
                <DsSelect
                    label="국가 선택 (선택된 값 커스텀 표시)"
                    value={country}
                    onChange={handleCountryChange}
                    items={countryItems}
                    id="country-render-value-select"
                    renderValue={(selectedValue) => {
                        const selectedItem = countryItems.find(item => item.value === selectedValue);
                        return `선택: ${selectedItem ? selectedItem.label : '알 수 없음'} (코드: ${selectedValue})`;
                    }}
                    helperText="선택된 값을 원하는 형태로 표시합니다."
                    formControlSx={{ width: 400 }} // 너비 추가
                />
                <Typography variant="body2" sx={{ mt: 1 }}>
                    실제 값: {country}
                </Typography>
            </Box>

            <Box sx={{ p: 3 }}> {/* Paper -> Box, elevation 제거 */}
                <Typography variant="h6" component="h2" gutterBottom>
                    커스텀 FormControl 스타일
                </Typography>
                <DsSelect
                    label="스타일 적용된 선택"
                    value={age}
                    onChange={handleAgeChange}
                    items={ageItems}
                    id="styled-select"
                    formControlSx={{
                        backgroundColor: 'aliceblue',
                        borderRadius: '8px',
                        p: 1, // 내부 패딩
                        width: 400, // 너비 추가
                    }}
                />
            </Box>
        </Stack>
    );
};

export default SelectPage;