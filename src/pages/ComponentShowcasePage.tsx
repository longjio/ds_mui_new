// D:/ds_mui_new/src/pages/ComponentShowcasePage.tsx

import React from 'react';
import { Container, Typography, Button } from '@mui/material';
// '액자' 컴포넌트를 common 폴더에서 가져옵니다.
import ComponentShowcase from '../components/common/ComponentShowcase';

// 1. 액자에 보여줄 예시 컴포넌트를 정의합니다.
const ExampleComponent = () => <Button variant="contained">Example Button</Button>;

// 2. 액자에 보여줄 예시 코드를 정의합니다. (이것이 누락되어 에러가 발생했습니다)
const exampleCode = `
import { Button } from '@mui/material';

function MyButton() {
  return (
    <Button variant="contained">Example Button</Button>
  );
}
`;

// 3. '액자를 사용하는 페이지'를 만듭니다.
export default function ComponentShowcasePage() {
    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Component Showcase
            </Typography>
            <Typography paragraph>
                이 페이지는 디자인 시스템의 다른 컴포넌트들을 문서화하는 데 사용되는 <code>ComponentShowcase</code> 컴포넌트 자체를 보여주는 예시입니다.
            </Typography>

            {/* 4. 액자에 필요한 모든 내용물(props)을 채워서 사용합니다. */}
            <ComponentShowcase
                title="기본 예시"
                description="ComponentShowcase는 제목, 설명, 실제 렌더링된 컴포넌트, 그리고 복사 가능한 코드 블록으로 구성됩니다."
                component={<ExampleComponent />}
                code={exampleCode}
            />
        </Container>
    );
}