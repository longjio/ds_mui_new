import React from 'react';
import { DsButton, DsButtonProps } from './DsButton';
import SearchIcon from '@mui/icons-material/Search';

/**
 * @description
 * 조회 영역(SearchArea)에 특화된 검색 버튼입니다.
 * SearchArea의 높이에 꽉 차고, 우측에 붙는 레이아웃을 포함한 모든 스타일이 고정되어 있습니다.
 *
 * @example
 * <SearchIconButton onClick={handleSearch} />
 */
export const SearchIconButton: React.FC<DsButtonProps> = ({ sx, ...rest }) => {
    return (
        <DsButton
            variant="contained"
            color="primary"
            aria-label="search"
            {...rest}
            // ★ 1. 요청하신 모든 스타일을 컴포넌트의 기본 sx로 고정합니다.
            sx={{
                // --- 고정된 '모양' 스타일 ---
                width: '60px',
                minWidth: '60px',
                padding: 0,
                borderRadius: 0, // 모서리 직각
                '& .MuiSvgIcon-root': {
                    fontSize: '30px',
                },

                // --- 고정된 '배치' 스타일 ---
                marginLeft: 'auto',   // 오른쪽 정렬
                alignSelf: 'stretch', // 부모 높이에 맞게 늘어남
                height: 'auto',
                marginY: -2,          // 부모의 상하 패딩 무시

                // --- 외부 sx를 마지막에 적용하여 필요시 덮어쓰기 허용 ---
                ...sx,
            }}
        >
            <SearchIcon />
        </DsButton>
    );
};