// src/pages/TextFieldPage.tsx

import React, { useState } from 'react';
import { Typography, Box, Stack } from '@mui/material';
import { DsTextField } from '../components/input/DsTextField';

const TextFieldPage = () => {
    // const theme = useTheme(); // 이 예제에서는 직접 사용하지 않음

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

    return (
        <Stack spacing={2} sx={{ p: 3 }}> {/* 전체 페이지 컨테이너 */}
            <Typography variant="h1" component="h1" gutterBottom>
                TextField
            </Typography>

            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '30ch' }, // DsTextField 내부의 MuiTextField에 스타일 적용
                    display: 'flex',
                    flexDirection: 'column', // 필드들을 세로로 정렬
                    alignItems: 'flex-start', // 여기를 'center'에서 'flex-start'로 변경하여 좌측 정렬
                    p: 2,
                    border: '1px solid #ccc',
                    maxWidth: '400px', // 전체 폼의 최대 너비 제한
                }}
                noValidate
                autoComplete="off"
            >
                <DsTextField
                    label="이름 (제어됨)"
                    value={name}
                    onChange={handleNameChange}
                    id="name-field"
                    name="name"
                />
                <Typography variant="caption" display="block" sx={{ width: '30ch', textAlign: 'left', ml: 1 }}>
                    입력된 이름: {name}
                </Typography>

                <DsTextField
                    label="검색어"
                    value={search}
                    onChange={handleSearchChange}
                    id="search-field"
                    name="search"
                    helperText="검색어를 입력하세요."
                />

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
                />

                <DsTextField
                    label="비밀번호 (비활성화)"
                    value={password}
                    onChange={handlePasswordChange}
                    id="password-field-disabled"
                    name="passwordDisabled"
                    type="password"
                    disabled
                    helperText="이 필드는 비활성화되어 있습니다."
                />

                <DsTextField
                    label="나이 (숫자 입력)"
                    value={age}
                    onChange={handleAgeChange}
                    id="age-field"
                    name="age"
                    type="number"
                    InputLabelProps={{
                        shrink: true,
                    }}
                />

                <DsTextField
                    label="읽기 전용 필드"
                    value="변경할 수 없는 값입니다."
                    id="read-only-field"
                    name="readOnlyField"
                    InputProps={{
                        readOnly: true,
                    }}
                    helperText="이 필드는 읽기 전용입니다."
                />

                <DsTextField
                    label="설명 (여러 줄 입력)"
                    value={description}
                    onChange={handleDescriptionChange}
                    id="description-field"
                    name="description"
                    multiline
                    rows={4}
                    placeholder="여기에 설명을 입력하세요..."
                    sx={{ width: '100% !important' }} // 여러 줄 입력 필드는 너비를 100%로 강제
                />
            </Box>
        </Stack>
    );
};

export default TextFieldPage;