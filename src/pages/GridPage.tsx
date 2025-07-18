// src/pages/GridPage.tsx

import React from 'react';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
// ✅ FIX: DsGridItemStyled를 올바르게 import 합니다.
import DsGrid, { DsGridItemStyled } from '../components/layout/DsGrid';

const DsGridPage = () => {
    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Typography variant="h4" gutterBottom>
                Basic Grid
            </Typography>
            <DsGrid container spacing={2}>
                {/* ✅ FIX: 'size' prop 대신 xs, sm, md 등의 breakpoint prop을 사용합니다. */}
                <DsGrid size={{ xs: 8}}>
                    <DsGridItemStyled>xs=8</DsGridItemStyled>
                </DsGrid>
                <DsGrid size={{ xs: 4}}>
                    <DsGridItemStyled>xs=4</DsGridItemStyled>
                </DsGrid>
                <DsGrid size={{ xs: 4}}>
                    <DsGridItemStyled>xs=4</DsGridItemStyled>
                </DsGrid>
                <DsGrid size={{ xs: 8}}>
                    <DsGridItemStyled>xs=8</DsGridItemStyled>
                </DsGrid>
            </DsGrid>
            {/* ... 다른 Grid들도 동일하게 수정 ... */}
        </Container>
    );
};

export default DsGridPage;