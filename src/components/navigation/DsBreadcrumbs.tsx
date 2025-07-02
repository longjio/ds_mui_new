import React from 'react';
// BreadcrumbsProps와 SvgIconProps를 import하여 타입을 명확히 합니다.
import { Breadcrumbs, Link, Typography, BreadcrumbsProps as MuiBreadcrumbsProps } from '@mui/material';
import { SvgIconProps } from '@mui/material/SvgIcon';
import { Link as RouterLink } from 'react-router-dom';

// Breadcrumb 항목 하나의 데이터 타입을 정의합니다.
export interface BreadcrumbItem {
    label: string;
    href?: string;
    // 핵심 수정 1: 아이콘 타입을 SvgIconProps를 받는 ReactElement로 구체화합니다.
    icon?: React.ReactElement<SvgIconProps>;
}

// DsBreadcrumbs 컴포넌트가 받을 props 타입을 정의합니다.
// 핵심 수정 2: MUI의 BreadcrumbsProps를 확장하여 모든 prop을 타입-안전하게 받습니다.
interface DsBreadcrumbsProps extends Omit<MuiBreadcrumbsProps, 'children'> {
    items: BreadcrumbItem[];
}

const DsBreadcrumbs: React.FC<DsBreadcrumbsProps> = ({ items, ...otherProps }) => {
    return (
        <Breadcrumbs aria-label="breadcrumb" {...otherProps}>
            {items.map((item, index) => {
                const isLast = index === items.length - 1;

                // 핵심 수정 3: 아이콘 복제 로직을 변수로 추출하여 코드를 정리합니다.
                // 이제 item.icon의 타입이 명확하므로 오류가 발생하지 않습니다.
                const iconWithStyle = item.icon
                    ? React.cloneElement(item.icon, { sx: { mr: 0.5 }, fontSize: 'inherit' })
                    : null;

                if (isLast) {
                    return (
                        <Typography
                            key={item.label}
                            sx={{ display: 'flex', alignItems: 'center' }}
                            color="text.primary"
                        >
                            {iconWithStyle}
                            {item.label}
                        </Typography>
                    );
                }

                return (
                    <Link
                        key={item.label}
                        component={RouterLink}
                        to={item.href || '#'}
                        underline="hover"
                        color="inherit"
                        sx={{ display: 'flex', alignItems: 'center' }}
                    >
                        {iconWithStyle}
                        {item.label}
                    </Link>
                );
            })}
        </Breadcrumbs>
    );
};

export default DsBreadcrumbs;