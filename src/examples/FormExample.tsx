// src/pages/TextFieldPage.tsx

import React, { useState } from 'react';
import { Stack, Typography, Box, Paper, useTheme } from '@mui/material'; // Grid 대신 useTheme 추가
import { DsTextField } from '../components/input/DsTextField';

const TextFieldPage = () => {
    const theme = useTheme(); // 테마 객체 가져오기 (간격 계산에 사용)
    const [name, setName] = useState<string>('홍길동');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('secret123');
    const [age, setAge] = useState<string>('30');
    const [description, setDescription] = useState<string>(
        '이것은 여러 줄을 입력할 수 있는 텍스트 필드입니다.\n기본 높이보다 더 많은 내용을 담을 수 있습니다.'
    );
    const [search, setSearch] = useState<string>('');

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const handleAgeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAge(event.target.value);
    };

    const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDescription(event.target.value);
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
    };

    const isEmailValid = email === '' || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    // 각 섹션의 아이템 너비를 계산하기 위한 값
    // theme.spacing(2)는 Grid의 spacing={2}와 유사한 간격을 의미 (기본 16px)
    // 두 아이템 사이의 간격이 theme.spacing(2)이므로, 각 아이템은 (50% - 간격의 절반) 만큼 차지
    const twoColumnItemWidth = {
        xs: '100%',
        sm: `calc(50% - ${theme.spacing(1)})` // theme.spacing(2) / 2 = theme.spacing(1)
    };

    return (
        <Stack spacing={4} sx={{ p: 3}}>
            <Typography variant="h4" component="h1" gutterBottom>
                DsTextField 컴포넌트 데모 페이지
            </Typography>

            <Paper elevation={3} sx={{ p: 3 }}>
                <Typography variant="h6" component="h2" gutterBottom sx={{ mb: 2 }}>
                    기본 사용법
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: theme.spacing(2) }}>
                    <Box sx={{ width: twoColumnItemWidth }}>
                        <DsTextField
                            label="이름 (제어됨)"
                            value={name}
                            onChange={handleNameChange}
                            id="name-field"
                            name="name"
                            fullWidth
                        />
                        <Typography variant="caption" display="block" sx={{ mt: 0.5 }}>
                            입력된 이름: {name}
                        </Typography>
                    </Box>
                    <Box sx={{ width: twoColumnItemWidth }}>
                        <DsTextField
                            label="검색어" // "기본값" 문구 제거, value/onChange로 제어됨
                            value={search} // defaultValue 대신 value 사용
                            onChange={handleSearchChange}
                            id="search-field"
                            name="search"
                            helperText="검색어를 입력하세요."
                            fullWidth
                        />
                    </Box>
                </Box>
            </Paper>

            <Paper elevation={3} sx={{ p: 3 }}>
                <Typography variant="h6" component="h2" gutterBottom sx={{ mb: 2 }}>
                    상태 및 유효성 검사
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: theme.spacing(2) }}>
                    <Box sx={{ width: twoColumnItemWidth }}>
                        <DsTextField
                            label="이메일 (유효성 검사)"
                            value={email}
                            onChange={handleEmailChange}
                            id="email-field"
                            name="email"
                            type="email"
                            error={!isEmailValid}
                            helperText={!isEmailValid ? '올바른 이메일 형식이 아닙니다.' : '이메일을 입력해주세요.'}
                            required
                            fullWidth
                        />
                    </Box>
                    <Box sx={{ width: twoColumnItemWidth }}>
                        <DsTextField
                            label="비밀번호 (비활성화)"
                            value={password}
                            onChange={handlePasswordChange}
                            id="password-field-disabled"
                            name="passwordDisabled"
                            type="password"
                            disabled // 비활성화 상태
                            fullWidth
                            helperText="이 필드는 비활성화되어 있습니다."
                        />
                    </Box>
                </Box>
            </Paper>

            <Paper elevation={3} sx={{ p: 3 }}>
                <Typography variant="h6" component="h2" gutterBottom sx={{ mb: 2 }}>
                    다양한 타입 및 옵션
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: theme.spacing(2) }}>
                    <Box sx={{ width: twoColumnItemWidth }}>
                        <DsTextField
                            label="나이 (숫자 입력)"
                            value={age}
                            onChange={handleAgeChange}
                            id="age-field"
                            name="age"
                            type="number" // 숫자 타입
                            InputLabelProps={{
                                shrink: true, // 레이블이 항상 위로 올라가도록
                            }}
                            fullWidth
                        />
                    </Box>
                    <Box sx={{ width: twoColumnItemWidth }}>
                        <DsTextField
                            label="읽기 전용 필드"
                            value="변경할 수 없는 값입니다."
                            id="read-only-field"
                            name="readOnlyField"
                            InputProps={{
                                readOnly: true, // 읽기 전용
                            }}
                            fullWidth
                            helperText="이 필드는 읽기 전용입니다."
                        />
                    </Box>
                    <Box sx={{ width: '100%' }}> {/* 이 항목은 항상 전체 너비 */}
                        <DsTextField
                            label="설명 (여러 줄 입력)"
                            value={description}
                            onChange={handleDescriptionChange}
                            id="description-field"
                            name="description"
                            multiline // 여러 줄 입력 가능
                            rows={4}    // 기본 표시 줄 수
                            fullWidth
                            placeholder="여기에 설명을 입력하세요..."
                        />
                    </Box>
                </Box>
            </Paper>
        </Stack>
    );
};

export default TextFieldPage;