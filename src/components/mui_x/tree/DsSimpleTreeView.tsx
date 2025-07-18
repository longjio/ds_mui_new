// src/components/mui_x/tree/DsSimpleTreeView.tsx
import React from 'react';
import { SimpleTreeView, SimpleTreeViewProps } from '@mui/x-tree-view/SimpleTreeView';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

// multiSelect prop을 유연하게 받기 위해 제네릭을 사용합니다.
export const DsSimpleTreeView = <Multiple extends boolean | undefined>(
    props: SimpleTreeViewProps<Multiple>,
) => {
    return (
        <SimpleTreeView
            slots={{
                collapseIcon: ArrowDropDownIcon,
                expandIcon: ArrowRightIcon,
            }}
            sx={{ flexGrow: 1, overflowY: 'auto' }}
            {...props}
        />
    );
};