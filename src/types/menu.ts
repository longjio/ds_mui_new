import React from 'react';

// DsMenu와 MenuPage에서 공통으로 사용할 타입 정의
export interface DsMenuItem {
    id: string;
    label:string;
    icon?: React.ReactElement;
    onClick?: () => void;
    disabled?: boolean;
    divider?: boolean;
}