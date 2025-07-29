// D:/ds_mui_new/src/mobile/pages/MobileData.tsx

import React from 'react';
import { Box, Paper, Typography } from '@mui/material';
import DsDataGrid from '../../components/mui_x/datagrid/DsDataGrid';
import { GridColDef } from '@mui/x-data-grid';

// 모바일 화면에 표시할 간단한 샘플 데이터
const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'product', headerName: 'Product', flex: 1 },
    { field: 'quantity', headerName: 'Qty', type: 'number', width: 60 },
    { field: 'price', headerName: 'Price', type: 'number', flex: 0.5 },
];

const rows = [
    { id: 1, product: 'Mobile Phone', quantity: 1, price: 800 },
    { id: 2, product: 'Laptop', quantity: 1, price: 1500 },
    { id: 3, product: 'Headphones', quantity: 2, price: 150 },
    { id: 4, product: 'Smartwatch', quantity: 1, price: 300 },
    { id: 5, product: 'Tablet', quantity: 1, price: 600 },
    { id: 6, product: 'Keyboard', quantity: 1, price: 100 },
    { id: 7, product: 'Mouse', quantity: 1, price: 50 },
];

export default function MobileDataPage() {
    return (
        <Box sx={{ p: 2 }}>
            <Typography variant="h5" component="h1" gutterBottom>
                Mobile Data Grid
            </Typography>
            <Paper>
                <DsDataGrid
                    rows={rows}
                    columns={columns}
                    autoHeight
                    checkboxSelection
                    showRowNumber
                />
            </Paper>
        </Box>
    );
}