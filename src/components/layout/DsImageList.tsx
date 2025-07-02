// D:/ds_mui/src/components/layout/DsImageList.tsx

import React from 'react';
import {
    ImageList,
    ImageListItem,
    ImageListItemBar,
    ImageListProps,
    ImageListItemProps,
    ImageListItemBarProps,
} from '@mui/material';

// 쿼리 파라미터를 URL에 안전하게 추가하는 헬퍼 함수
const appendQueryParams = (url: string, params: Record<string, string | number | undefined>): string => {
    const urlObj = new URL(url);
    for (const key in params) {
        if (params[key] !== undefined) {
            urlObj.searchParams.set(key, String(params[key]));
        }
    }
    return urlObj.toString();
};

// --- DsImageListProps ---
interface DsImageListProps extends ImageListProps {
    // 여기에 프로젝트의 디자인 시스템에 맞는 추가적인 prop이나 기본값을 정의할 수 있습니다.
}

// --- DsImageListItemProps ---
interface DsImageListItemProps extends ImageListItemProps {
    baseImgUrl: string; // 순수한 이미지 기본 URL (쿼리 파라미터 제외)
    imgAlt: string; // 이미지 대체 텍스트 (접근성)
    itemTitle?: string; // ImageListItemBar에 표시될 제목
    itemSubtitle?: string; // ImageListItemBar에 표시될 부제목
    actionIcon?: React.ReactNode; // ImageListItemBar에 표시될 액션 아이콘
    actionPosition?: ImageListItemBarProps['actionPosition']; // 액션 아이콘 위치
    withBar?: boolean; // ImageListItemBar를 포함할지 여부 (기본값: false)
    dynamicHeight?: number; // Masonry 레이아웃 등을 위한 동적 높이 (px)
}

// --- DsImageList Component ---
export const DsImageList: React.FC<DsImageListProps> = ({ children, ...rest }) => {
    const defaultProps = {
        cols: 4, // 기본 4열
        rowHeight: 'auto' as const, // 행 높이 자동 (masonry 등 유연한 레이아웃을 위해)
        gap: 8, // 아이템 간 기본 간격
    };

    return (
        <ImageList {...defaultProps} {...rest}>
            {children}
        </ImageList>
    );
};

// --- DsImageListItem Component ---
export const DsImageListItem: React.FC<DsImageListItemProps> = ({
                                                                    baseImgUrl, // 순수한 기본 URL을 받습니다.
                                                                    imgAlt,
                                                                    itemTitle,
                                                                    itemSubtitle,
                                                                    actionIcon,
                                                                    actionPosition,
                                                                    withBar = false,
                                                                    children,
                                                                    dynamicHeight, // 동적 높이 prop을 받습니다.
                                                                    ...rest
                                                                }) => {
    // Unsplash 이미지에 공통적으로 적용될 파라미터
    const commonUnsplashParams = {
        w: 248, // 기본 너비
        fit: 'crop', // 이미지 잘라내기
        auto: 'format', // 최적의 이미지 포맷 자동 감지
    };

    // 동적 높이가 제공되면 파라미터에 추가
    const finalUnsplashParams = dynamicHeight
        ? { ...commonUnsplashParams, h: dynamicHeight }
        : commonUnsplashParams;

    // srcSet을 위한 파라미터 (1x, 2x)
    const srcSetParams1x = finalUnsplashParams;
    const srcSetParams2x = { ...finalUnsplashParams, dpr: 2 };

    // 최종 이미지 URL 구성
    const src = appendQueryParams(baseImgUrl, finalUnsplashParams);
    const srcSet = `${appendQueryParams(baseImgUrl, srcSetParams1x)} 1x, ${appendQueryParams(baseImgUrl, srcSetParams2x)} 2x`;

    return (
        <ImageListItem {...rest}>
            <img
                srcSet={srcSet}
                src={src}
                alt={imgAlt}
                loading="lazy" // 이미지 지연 로딩
                style={{
                    display: 'block', // 이미지 하단의 불필요한 여백 제거
                    width: '100%',
                    height: '100%', // ImageListItem의 크기에 맞춰 이미지가 채워지도록
                    objectFit: 'cover', // 이미지가 영역을 꽉 채우도록
                }}
            />
            {/* withBar prop이 true이고 제목/부제목/액션 아이콘이 있을 때만 ImageListItemBar를 렌더링 */}
            {withBar && (itemTitle || itemSubtitle || actionIcon) && (
                <ImageListItemBar
                    title={itemTitle}
                    subtitle={itemSubtitle}
                    actionIcon={actionIcon}
                    actionPosition={actionPosition}
                />
            )}
            {children}
        </ImageListItem>
    );
};

export default DsImageList;