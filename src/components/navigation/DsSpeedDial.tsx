import React from 'react';
import {
    Box,
    SpeedDial,
    SpeedDialIcon,
    SpeedDialAction,
    SpeedDialProps as MuiSpeedDialProps,
} from '@mui/material';

// SpeedDial에 표시될 각 액션 아이템의 데이터 타입을 정의합니다.
export interface SpeedDialActionItem {
    icon: React.ReactElement;
    name: string;
    onClick?: () => void;
}

// DsSpeedDial 컴포넌트가 받을 props 타입을 정의합니다.
// MUI의 SpeedDialProps를 확장하고, actions 배열을 필수로 받도록 합니다.
interface DsSpeedDialProps extends Omit<MuiSpeedDialProps, 'children'> {
    actions: SpeedDialActionItem[];
}

/**
 * MUI의 SpeedDial을 기반으로 한, 프로젝트 맞춤형 재사용 가능 컴포넌트입니다.
 * 화면의 특정 위치에 고정되어 여러 액션을 제공하는 플로팅 버튼을 렌더링합니다.
 *
 * @param {SpeedDialActionItem[]} actions - 표시할 액션 목록 배열
 * @param {string} ariaLabel - 웹 접근성을 위한 aria-label
 */
const DsSpeedDial: React.FC<DsSpeedDialProps> = ({ actions, ...props }) => {
    const handleActionClick = (actionOnClick?: () => void) => {
        if (actionOnClick) {
            actionOnClick();
        }
    };

    return (
        <SpeedDial
            icon={<SpeedDialIcon />}
            {...props} // sx, ariaLabel 등 MUI SpeedDial의 모든 props를 지원
        >
            {actions.map((action) => (
                <SpeedDialAction
                    key={action.name}
                    icon={action.icon}
                    tooltipTitle={action.name}
                    onClick={() => handleActionClick(action.onClick)}
                />
            ))}
        </SpeedDial>
    );
};

export default DsSpeedDial;