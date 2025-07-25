// D:/ds_mui_new/src/layouts/TitleArea.tsx
import React from 'react';
import { Stack, StackProps } from '@mui/material';
import { TitleM } from '../components/typography';

interface TitleAreaProps extends Omit<StackProps, 'title'> {
    title: React.ReactNode;
    children?: React.ReactNode;
}

/**
 * 페이지의 제목과 공통 액션 버튼들을 배치하는 레이아웃 컴포넌트입니다.
 * 제목은 왼쪽에, 버튼(children)은 오른쪽에 배치됩니다.
 */
export const TitleArea = ({ title, children, sx, ...rest }: TitleAreaProps) => {
    return (
        <Stack
            direction="row"
            justifyContent="space-between" // 제목과 버튼 그룹을 양 끝으로 분리
            alignItems="center"
            sx={{
                mb: 2, // SearchArea와의 간격을 위해 하단 마진 추가
                ...sx,
            }}
            {...rest}
        >
            {/* ★ 개선: title이 문자열이면 TitleM으로 감싸고, 컴포넌트면 그대로 렌더링 */}
            {typeof title === 'string' ? <TitleM>{title}</TitleM> : title}

            {/* 버튼(children) 영역 */}
            {children && (
                <Stack direction="row" spacing={1}>
                    {children}
                </Stack>
            )}
        </Stack>
    );
};