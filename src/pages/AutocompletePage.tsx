import React from 'react';
import { Container, Typography, TextField } from '@mui/material';
import { AutocompleteRenderInputParams } from '@mui/material/Autocomplete';
import ComponentShowcase from '../components/common/ComponentShowcase';

// ★★★ 핵심 수정 사항 ★★★
// 'export default'가 아닌 'export const'로 내보낸 컴포넌트이므로,
// 중괄호 { }를 사용하여 정확하게 가져옵니다.
import { DsAutoComplete } from '../components/input/DsAutoComplete';

// 샘플 데이터 (스토리 파일과 동일한 구조)
const top100Films = [
    { label: 'The Shawshank Redemption', year: 1994 },
    { label: 'The Godfather', year: 1972 },
    { label: 'The Dark Knight', year: 2008 },
    // ... (필요 시 더 많은 데이터 추가)
];

export default function AutocompletePage() {
    return (
        <Container>
            <Typography variant="h1" component="h1" gutterBottom>
                Autocomplete
            </Typography>

            <ComponentShowcase
                title="Basic Autocomplete"
                description="가장 기본적인 자동완성 컴포넌트입니다. 영화 목록에서 원하는 항목을 선택할 수 있습니다."
                component={
                    <DsAutoComplete
                        options={top100Films}
                        sx={{ width: 300 }}
                        renderInput={(params: AutocompleteRenderInputParams) => (
                            <TextField {...params} label="Movie" />
                        )}
                    />
                }
                code={`
import { DsAutoComplete } from './DsAutoComplete';
import TextField from '@mui/material/TextField';

const top100Films = [
  { label: 'The Shawshank Redemption', year: 1994 },
  // ...
];

<DsAutoComplete
  options={top100Films}
  sx={{ width: 300 }}
  renderInput={(params) => <TextField {...params} label="Movie" />}
/>
                `}
            />
            {/* 여기에 다른 Autocomplete 예제를 추가할 수 있습니다. */}
        </Container>
    );
}