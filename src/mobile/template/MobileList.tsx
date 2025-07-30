// D:/ds_mui_new/src/mobile/template/MobileList.tsx

import React, { useMemo, useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
    Box,
    Stack,
    Paper,
    Chip,
    Fab,
    Zoom, // 1. 애니메이션 효과를 위해 Zoom을 import 합니다.
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'; // 2. '맨 위로 가기' 아이콘을 import 합니다.
import MobileDetail from './MobileDetail';
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
}

const allMenus: Menu[] = [
    { id: 1, menuName: '대시보드', path: '/dashboard', order: 1, isUsed: true, depth: 0, parentId: null, menuDescription: '메인 대시보드 화면', hasPersonalInfo: false },
    { id: 2, menuName: '컴포넌트', path: null, order: 2, isUsed: true, depth: 0, parentId: null, menuDescription: 'UI 컴포넌트 그룹', hasPersonalInfo: false },
    { id: 3, menuName: '버튼', path: '/button', order: 1, isUsed: true, depth: 1, parentId: 2, menuDescription: '버튼 컴포넌트 예제', hasPersonalInfo: false },
    { id: 4, menuName: '데이터 그리드', path: '/data-grid', order: 2, isUsed: true, depth: 1, parentId: 2, menuDescription: '그리드 컴포넌트 예제', hasPersonalInfo: false },
    { id: 5, menuName: '관리', path: null, order: 3, isUsed: true, depth: 0, parentId: null, menuDescription: '시스템 관리 기능 그룹', hasPersonalInfo: false },
    { id: 6, menuName: '사용자 관리', path: '/users', order: 1, isUsed: false, depth: 1, parentId: 5, menuDescription: '사용자 정보 관리', hasPersonalInfo: true },
    { id: 7, menuName: '로그 분석', path: '/logs', order: 2, isUsed: true, depth: 1, parentId: 5, menuDescription: '시스템 로그 분석', hasPersonalInfo: false },
    { id: 8, menuName: '통계', path: '/stats', order: 4, isUsed: true, depth: 0, parentId: null, menuDescription: '서비스 통계', hasPersonalInfo: false },
    { id: 9, menuName: '일일 리포트', path: '/stats/daily', order: 1, isUsed: true, depth: 1, parentId: 8, menuDescription: '일일 방문자 리포트', hasPersonalInfo: false },
    { id: 10, menuName: '월간 리포트', path: '/stats/monthly', order: 2, isUsed: true, depth: 1, parentId: 8, menuDescription: '월간 매출 리포트', hasPersonalInfo: false },
    { id: 11, menuName: '결제 관리', path: '/payment', order: 5, isUsed: false, depth: 0, parentId: null, menuDescription: '결제 내역 관리', hasPersonalInfo: true },
    { id: 12, menuName: '공지사항', path: '/notices', order: 6, isUsed: true, depth: 0, parentId: null, menuDescription: '전체 공지사항', hasPersonalInfo: false },
    { id: 13, menuName: '이벤트', path: '/events', order: 7, isUsed: true, depth: 0, parentId: null, menuDescription: '진행중인 이벤트', hasPersonalInfo: false },
    { id: 14, menuName: '고객 지원', path: '/support', order: 8, isUsed: true, depth: 0, parentId: null, menuDescription: '1:1 문의 및 FAQ', hasPersonalInfo: true },
];

export default function MobileListPage() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [selectedMenu, setSelectedMenu] = useState<Menu | null>(null);
    // 3. '맨 위로 가기' 버튼의 표시 상태를 관리합니다.
    const [showScrollTop, setShowScrollTop] = useState(false);

    // 4. 스크롤 이벤트를 감지하여 버튼 표시 여부를 결정합니다.
    useEffect(() => {
        // MobileLayout의 <main> 태그가 스크롤 컨테이너입니다.
        const scrollableContainer = document.querySelector('main');

        const handleScroll = () => {
            if (scrollableContainer) {
                // 300px 이상 스크롤되면 버튼을 표시합니다.
                setShowScrollTop(scrollableContainer.scrollTop > 300);
            }
        };

        if (scrollableContainer) {
            scrollableContainer.addEventListener('scroll', handleScroll);
        }

        // 컴포넌트가 사라질 때 이벤트 리스너를 정리합니다.
        return () => {
            if (scrollableContainer) {
                scrollableContainer.removeEventListener('scroll', handleScroll);
            }
        };
    }, []); // 빈 배열을 전달하여 컴포넌트가 마운트될 때 한 번만 실행되도록 합니다.

    const filteredMenus = useMemo(() => {
        const menuId = searchParams.get('menuId');
        const menuName = searchParams.get('menuName');
        const isUsed = searchParams.get('isUsed');
        return allMenus.filter(menu => {
            const matchMenuId = !menuId || String(menu.id).includes(menuId);
            const matchMenuName = !menuName || menu.menuName.toLowerCase().includes(menuName.toLowerCase());
            const matchIsUsed = !isUsed || isUsed === 'all' || String(menu.isUsed) === isUsed;
            return matchMenuId && matchMenuName && matchIsUsed;
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

    // 5. '맨 위로 가기' 버튼 클릭 핸들러
    const handleScrollToTop = () => {
        const scrollableContainer = document.querySelector('main');
        if (scrollableContainer) {
            scrollableContainer.scrollTo({
                top: 0,
                behavior: 'smooth',
            });
        }
    };

    return (
        <Box>
            {/* 6. 하단 고정 버튼에 가려지지 않도록 콘텐츠 영역에 하단 패딩을 충분히 줍니다. */}
            <Box sx={{ p: 2, pb: 15 }}>
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
                                                sx={{ minWidth: '60px' }}
                                            />
                                            <Chip
                                                label={menu.hasPersonalInfo ? '개인정보 Y' : '개인정보 N'}
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
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 'calc(100vh - 56px - 64px - 72px)' }}>
                        <BodyM sx={{ color: 'text.secondary' }}>검색 결과가 없습니다.</BodyM>
                    </Box>
                )}
            </Box>

            <MobileDetail
                open={!!selectedMenu}
                onClose={handleDetailClose}
                menu={selectedMenu}
            />

            {/* 7. 하단 고정 버튼 영역 */}
            <Box sx={{ position: 'fixed', bottom: 16, right: 16 }}>
                <Stack spacing={2} alignItems="center">
                    {/* '맨 위로 가기' 버튼: 스크롤 시 나타남 */}
                    <Zoom in={showScrollTop}>
                        <Fab color="secondary" size="small" aria-label="scroll back to top" onClick={handleScrollToTop}>
                            <KeyboardArrowUpIcon />
                        </Fab>
                    </Zoom>

                    {/* '신규 등록' 버튼: 항상 보임 */}
                    <Fab color="primary" aria-label="add" onClick={handleAddNew}>
                        <AddIcon />
                    </Fab>
                </Stack>
            </Box>
        </Box>
    );
}