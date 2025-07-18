// src/components/layout/DsGrid.tsx

import React from 'react';
import { Grid as MuiGrid, GridProps as MuiGridProps, Paper, styled } from '@mui/material';

export interface DsGridProps extends MuiGridProps {}

const DsGrid: React.FC<DsGridProps> = (props) => <MuiGrid {...props} />;

// ✅ DsGridItemStyled가 반드시 여기에 정의되고 export 되어야 합니다.
export const DsGridItemStyled = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    boxShadow: 'none',
    border: '1px solid',
    borderColor: theme.palette.divider,
}));

export default DsGrid;