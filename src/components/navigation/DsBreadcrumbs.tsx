import React from 'react';
import { Breadcrumbs, Link as MuiLink, Typography, BreadcrumbsProps as MuiBreadcrumbsProps } from '@mui/material';
import { SvgIconProps } from '@mui/material/SvgIcon';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import { routableItems } from '../../menu-data'; // 자동 모드를 위해 메뉴 데이터 import

// Breadcrumb 항목 하나의 데이터 타입을 정의합니다.
export interface BreadcrumbItem {
    label: string;
    href?: string;
    icon?: React.ReactElement<SvgIconProps>;
}

// MUI의 BreadcrumbsProps를 확장하여 모든 prop을 타입-안전하게 받습니다.
interface DsBreadcrumbsProps extends Omit<MuiBreadcrumbsProps, 'children'> {
    items?: BreadcrumbItem[];
}

// 경로와 이름을 매핑하는 Map을 생성하여 성능을 최적화합니다.
const pathNameMap = new Map<string, string>();
routableItems.forEach(item => {
    if (item.path && item.text) {
        pathNameMap.set(item.path, item.text);
    }
});


const DsBreadcrumbs: React.FC<DsBreadcrumbsProps> = ({ items, ...otherProps }) => {
    // Rules of Hooks를 준수하기 위해 훅을 컴포넌트 최상단으로 이동합니다.
    const location = useLocation();

    // 수동 모드: `items` prop이 있으면 전달된 데이터를 기반으로 렌더링합니다.
    if (items && items.length > 0) {
        return (
            <Breadcrumbs aria-label="breadcrumb" {...otherProps}>
                {items.map((item, index) => {
                    const isLast = index === items.length - 1;
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
                        <MuiLink
                            key={item.label}
                            component={RouterLink}
                            to={item.href || '#'}
                            underline="hover"
                            color="inherit"
                            sx={{ display: 'flex', alignItems: 'center' }}
                        >
                            {iconWithStyle}
                            {item.label}
                        </MuiLink>
                    );
                })}
            </Breadcrumbs>
        );
    }

    // 자동 모드: `items` prop이 없으면 URL을 기반으로 동적으로 생성합니다.
    const pathnames = location.pathname.split('/').filter((x) => x);

    // 홈 화면이거나 유효한 경로가 아니면 아무것도 렌더링하지 않습니다.
    if (pathnames.length === 0) {
        return null;
    }

    return (
        <Breadcrumbs aria-label="breadcrumb" {...otherProps}>
            {/* 홈 링크는 항상 표시합니다. */}
            <MuiLink
                component={RouterLink}
                underline="hover"
                sx={{ display: 'flex', alignItems: 'center' }}
                color="inherit"
                to="/app"
            >
                <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                {pathNameMap.get('/app') || 'Home'}
            </MuiLink>
            {/* URL 경로 조각들을 순회하며 Breadcrumb 링크를 생성합니다. */}
            {pathnames.map((value, index) => {
                // 홈(/app) 경로는 위에서 이미 처리했으므로 건너뜁니다.
                if (index === 0 && value === 'app') {
                    return null;
                }

                const to = `/${pathnames.slice(0, index + 1).join('/')}`;
                const name = pathNameMap.get(to);
                const isLast = index === pathnames.length - 1;

                if (!name) return null; // 경로에 해당하는 이름이 없으면 렌더링하지 않습니다.

                return isLast ? (
                    <Typography key={to} sx={{ display: 'flex', alignItems: 'center' }} color="text.primary">
                        {name}
                    </Typography>
                ) : (
                    <MuiLink key={to} component={RouterLink} to={to} underline="hover" color="inherit">
                        {name}
                    </MuiLink>
                );
            })}
        </Breadcrumbs>
    );
};

export default DsBreadcrumbs;