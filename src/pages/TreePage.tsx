
import React from 'react';
import { Box, Typography } from '@mui/material';
import DsTreeView, { TreeNode } from '../components/mui_x/tree/DsTreeView';
import { DsTreeItem } from '../components/mui_x/tree/DsTreeItem';

export default function TreePage() {
    const [treeData] = React.useState<TreeNode[]>([
        { id: 'data-components', label: 'Components', children: [{ id: 'data-inputs', label: 'Inputs' }] },
        { id: 'data-foundation', label: 'Foundation', children: [{ id: 'data-colors', label: 'Colors' }] },
    ]);
    const [selectedItem, setSelectedItem] = React.useState<string | null>(null);

    return (
        <Box>
            <Typography variant="h4" gutterBottom>
                Tree View
            </Typography>
            <Typography color="text.secondary" sx={{ mb: 4 }}>
                계층적인 데이터를 목록 형태로 보여주는 컴포넌트입니다.
            </Typography>

            <Box sx={{ width: '100%', maxWidth: 400, mb: 4 }}>
                <DsTreeView aria-label="simple-tree" defaultExpandedItems={["foundation"]}>
                    <DsTreeItem itemId="foundation" label="Foundation" />
                    <DsTreeItem itemId="components" label="Components">
                        <DsTreeItem itemId="inputs" label="Inputs" />
                    </DsTreeItem>
                </DsTreeView>
            </Box>

            <Box sx={{ width: '100%', maxWidth: 400 }}>
                <DsTreeView
                    items={treeData}
                    checkboxSelection
                    defaultExpandedItems={['data-components']}
                    selectedItems={selectedItem}
                    onSelectedItemsChange={(event: React.SyntheticEvent<Element, Event> | null, id: string | null) => setSelectedItem(id)}
                />
            </Box>
        </Box>
    );
}