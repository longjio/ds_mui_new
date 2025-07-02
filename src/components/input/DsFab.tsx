// src/components/actions/DsFab.tsx
import React from 'react';
import Fab, { FabProps } from '@mui/material/Fab';
import Box from '@mui/material/Box'; // Box 컴포넌트 임포트
import { SxProps, Theme } from '@mui/material/styles';

// DsFabProps는 FabProps를 확장하여 필요한 props를 추가하거나 기본값을 설정할 수 있습니다.
// children prop은 우리가 icon과 text를 조합하여 내부에서 처리하므로 Omit 합니다.
interface DsFabProps extends Omit<FabProps, 'children'> {
    icon?: React.ReactNode; // FAB에 표시될 아이콘
    text?: string;          // 확장된 FAB에 표시될 텍스트
    // 여기에 DsFab만의 고유한 prop을 추가할 수 있습니다.
    // 예: actionType: 'add' | 'edit' | 'navigate';
}

const DsFab: React.FC<DsFabProps> = ({
                                         icon,
                                         text,
                                         // 기본값 설정 (필요에 따라 조정)
                                         color = "primary",
                                         size = "medium",
                                         variant, // variant prop은 그대로 받아서 사용
                                         sx, // ToggleButtonGroup 전체에 적용될 sx prop
                                         ...rest // 나머지 FabProps (disabled, href 등)
                                     }) => {
    // text prop이 있으면 자동으로 variant를 'extended'로 설정
    // text prop이 없으면 전달받은 variant 또는 기본값 'circular' 사용
    const effectiveVariant = text ? "extended" : variant || "circular";

    // 아이콘과 텍스트를 함께 사용할 때 텍스트 부분만 렌더링할 Box 컴포넌트
    const textElement = effectiveVariant === "extended" && text && (
        <Box
            component="span" // span 태그로 렌더링하여 인라인 요소로 만듦
            sx={(theme) => ({ // sx prop을 사용하여 스타일 적용
                // 아이콘이 있을 경우 왼쪽에 테마의 spacing(1) (기본 8px) 만큼 마진 추가
                marginLeft: icon ? theme.spacing(1) : 0,
                // 필요한 경우 텍스트 관련 추가 스타일 적용 가능
                // fontWeight: 'bold',
            })}
        >
            {text}
        </Box>
    );

    return (
        <Fab
            color={color}
            size={size}
            variant={effectiveVariant}
            sx={sx} // DsFab 컴포넌트 자체 (Fab)에 sx prop 적용
            {...rest} // 나머지 FabProps 전달
        >
            {/* 아이콘과 텍스트를 함께 렌더링 */}
            {icon}
            {textElement}
        </Fab>
    );
};

export default DsFab;