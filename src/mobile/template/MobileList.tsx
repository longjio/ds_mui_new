// D:/ds_mui_new/src/mobile/template/MobileList.tsx

import React, { useMemo, useState, useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
    Box,
    Stack,
    Paper,
    Chip,
    Fab,
    Zoom,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import MobileDetail from './MobileDetail';
import MobileHeader from '../components/MobileHeader';
import { TitleS, TitleXS, BodyM, BodyS } from '../../components/typography';

interface Menu {
    id: number;
    menuName: string;
    path: string | null;
    order: number;
    isUsed: boolean;
    depth: number;
    parentId: number | null;
    menuDescription: string;
    hasPersonalInfo: boolean;
    system: string;
}

// ★ 검색 기능이 올바르게 동작하도록 system 값을 검색 페이지의 value와 일치시킵니다.
const allMenus: Menu[] = [
    { id: 1, menuName: '대시보드', path: '/dashboard', order: 1, isUsed: true, depth: 0, parentId: null, menuDescription: '메인 대시보드 화면', hasPersonalInfo: false, system: 'ds_mui_new' },
    { id: 2, menuName: '컴포넌트', path: null, order: 2, isUsed: true, depth: 0, parentId: null, menuDescription: 'UI 컴포넌트 그룹', hasPersonalInfo: false, system: 'ds_mui_new' },
    { id: 3, menuName: '버튼', path: '/button', order: 1, isUsed: true, depth: 1, parentId: 2, menuDescription: '버튼 컴포넌트 예제', hasPersonalInfo: false, system: 'ds_mui_new' },
    { id: 4, menuName: '데이터 그리드', path: '/data-grid', order: 2, isUsed: true, depth: 1, parentId: 2, menuDescription: '그리드 컴포넌트 예제', hasPersonalInfo: false, system: 'ds_mui_new' },
    { id: 5, menuName: '관리', path: null, order: 3, isUsed: true, depth: 0, parentId: null, menuDescription: '시스템 관리 기능 그룹', hasPersonalInfo: false, system: 'legacy_system' },
    { id: 6, menuName: '사용자 관리', path: '/users', order: 1, isUsed: false, depth: 1, parentId: 5, menuDescription: '사용자 정보 관리', hasPersonalInfo: true, system: 'legacy_system' },
    { id: 7, menuName: '로그 분석', path: '/logs', order: 2, isUsed: true, depth: 1, parentId: 5, menuDescription: '시스템 로그 분석', hasPersonalInfo: false, system: 'legacy_system' },
    { id: 8, menuName: '통계', path: '/stats', order: 4, isUsed: true, depth: 0, parentId: null, menuDescription: '서비스 통계', hasPersonalInfo: false, system: 'ds_mui_new' },
    { id: 9, menuName: '일일 리포트', path: '/stats/daily', order: 1, isUsed: true, depth: 1, parentId: 8, menuDescription: '일일 방문자 리포트', hasPersonalInfo: false, system: 'ds_mui_new' },
    { id: 10, menuName: '월간 리포트', path: '/stats/monthly', order: 2, isUsed: true, depth: 1, parentId: 8, menuDescription: '월간 매출 리포트', hasPersonalInfo: false, system: 'ds_mui_new' },
    { id: 11, menuName: '결제 관리', path: '/payment', order: 5, isUsed: false, depth: 0, parentId: null, menuDescription: '결제 내역 관리', hasPersonalInfo: true, system: 'legacy_system' },
    { id: 12, menuName: '공지사항', path: '/notices', order: 6, isUsed: true, depth: 0, parentId: null, menuDescription: '전체 공지사항', hasPersonalInfo: false, system: 'ds_mui_new' },
    { id: 13, menuName: '이벤트', path: '/events', order: 7, isUsed: true, depth: 0, parentId: null, menuDescription: '진행중인 이벤트', hasPersonalInfo: false, system: 'ds_mui_new' },
    { id: 14, menuName: '고객 지원', path: '/support', order: 8, isUsed: true, depth: 0, parentId: null, menuDescription: '1:1 문의 및 FAQ', hasPersonalInfo: true, system: 'legacy_system' },
];

export default function MobileListPage() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [selectedMenu, setSelectedMenu] = useState<Menu | null>(null);
    const [showScrollTop, setShowScrollTop] = useState(false);
    const scrollableContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const scrollableContainer = scrollableContainerRef.current;
        const handleScroll = () => {
            if (scrollableContainer) {
                setShowScrollTop(scrollableContainer.scrollTop > 300);
            }
        };
        if (scrollableContainer) {
            scrollableContainer.addEventListener('scroll', handleScroll);
        }
        return () => {
            if (scrollableContainer) {
                scrollableContainer.removeEventListener('scroll', handleScroll);
            }
        };
    }, []);

    const filteredMenus = useMemo(() => {
        const system = searchParams.get('system');
        const menuId = searchParams.get('menuId');
        const menuName = searchParams.get('menuName');
        const isUsed = searchParams.get('isUsed');

        return allMenus.filter(menu => {
            // ★ 데이터 일관성을 맞춘 후, 필터링 로직을 간단하게 수정합니다.
            const matchSystem = !system || system === 'all' || menu.system === system;
            const matchMenuId = !menuId || String(menu.id).includes(menuId);
            const matchMenuName = !menuName || menu.menuName.toLowerCase().includes(menuName.toLowerCase());
            const matchIsUsed = !isUsed || isUsed === 'all' || String(menu.isUsed) === isUsed;
            return matchSystem && matchMenuId && matchMenuName && matchIsUsed;
        });
    }, [searchParams]);

    const handleItemClick = (menu: Menu) => {
        setSelectedMenu(menu);
    };

    const handleDetailClose = () => {
        setSelectedMenu(null);
    };

    const handleAddNew = () => {
        navigate('/m/form');
    };

    const handleScrollToTop = () => {
        scrollableContainerRef.current?.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        // ★ 1. 최상위 Box에 position: 'relative'를 추가하여 FAB의 기준점으로 만듭니다.
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', position: 'relative' }}>
            <MobileHeader title="메뉴 목록" leftIcon="back" rightIcon="none" />

            {/* ★ 2. 스크롤되는 콘텐츠 영역 */}
            <Box ref={scrollableContainerRef} sx={{ flexGrow: 1, overflowY: 'auto', pb: 2 }}>
                <Box sx={{ p: 2 }}>
                    <TitleS component="h1" sx={{ mb: 2, fontWeight: 'bold' }}>
                        검색 결과 ({filteredMenus.length})
                    </TitleS>

                    {filteredMenus.length > 0 ? (
                        <Paper elevation={0} sx={{ borderRadius: 2 }}>
                            {filteredMenus.map((menu, index) => (
                                <Box
                                    key={menu.id}
                                    onClick={() => handleItemClick(menu)}
                                    sx={{
                                        p: 2,
                                        cursor: 'pointer',
                                        borderBottom: index === filteredMenus.length - 1 ? 'none' : 1,
                                        borderColor: 'divider',
                                        '&:hover': {
                                            backgroundColor: 'action.hover',
                                        },
                                    }}
                                >
                                    <Stack spacing={1}>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <TitleXS component="h2">{menu.menuName}</TitleXS>
                                            <Stack direction="row" spacing={1}>
                                                <Chip
                                                    label={menu.isUsed ? '사용' : '미사용'}
                                                    color={menu.isUsed ? 'success' : 'default'}
                                                    size="small"
                                                    sx={{ minWidth: '50px' }}
                                                />
                                                <Chip
                                                    label={menu.hasPersonalInfo ? '개인정보' : '개인정보'}
                                                    disabled={!menu.hasPersonalInfo}
                                                    color={menu.hasPersonalInfo ? 'error' : 'default'}
                                                    size="small"
                                                    variant="outlined"
                                                />
                                            </Stack>
                                        </Box>
                                        <BodyS sx={{ color: 'text.secondary' }} noWrap>
                                            설명: {menu.menuDescription}
                                        </BodyS>
                                    </Stack>
                                </Box>
                            ))}
                        </Paper>
                    ) : (
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
                            <BodyM sx={{ color: 'text.secondary' }}>검색 결과가 없습니다.</BodyM>
                        </Box>
                    )}
                </Box>
            </Box>

            <MobileDetail
                open={!!selectedMenu}
                onClose={handleDetailClose}
                menu={selectedMenu}
            />

            {/* ★ 3. FAB 버튼들을 스크롤 영역 밖으로 이동시켜 화면에 고정합니다. */}
            <Box sx={{ position: 'absolute', bottom: 24, right: 24 }}>
                <Stack spacing={2} alignItems="center">
                    <Zoom in={showScrollTop}>
                        <Fab color="secondary" size="small" aria-label="scroll back to top" onClick={handleScrollToTop}>
                            <KeyboardArrowUpIcon />
                        </Fab>
                    </Zoom>
                    <Fab color="primary" aria-label="add" onClick={handleAddNew}>
                        <AddIcon />
                    </Fab>
                </Stack>
            </Box>
        </Box>
    );
}