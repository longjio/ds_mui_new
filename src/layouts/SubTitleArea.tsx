// D:/ds_mui_new/src/layouts/SubTitleArea.tsx
import React from 'react';
import { Stack, StackProps } from '@mui/material';
import { TitleXS } from '../components/typography';

interface SubTitleAreaProps extends Omit<StackProps, 'title'> {
    title: React.ReactNode;
    children?: React.ReactNode;
}

/**
 * 데이터 그리드 등 섹션의 소제목과 액션 버튼들을 배치하는 레이아웃 컴포넌트입니다.
 * 제목은 왼쪽에, 버튼(children)은 오른쪽에 배치됩니다.
 */
export const SubTitleArea = ({ title, children, sx, ...rest }: SubTitleAreaProps) => {
    return (
        <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{
                mb: 1, // 그리드와의 간격을 위해 하단 마진을 1로 설정
                // ★ 버튼 유무에 관계없이 일정한 높이를 유지하도록 minHeight를 추가합니다.
                // FormField의 Input 높이(34px)와 맞추어 일관성을 유지합니다.
                minHeight: '35px',
                ...sx,
            }}
            {...rest}
        >
            {/* 제목 영역: title이 문자열이면 TitleXS로 감싸고, 컴포넌트면 그대로 렌더링 */}
            {typeof title === 'string' ? <TitleXS>{title}</TitleXS> : title}

            {/* 버튼(children) 영역 */}
            {children && (
                <Stack direction="row" spacing={1}>
                    {children}
                </Stack>
            )}
        </Stack>
    );
};