// src/components/mui_x/tree/DsSimpleTreeItem.tsx
import { TreeItem, TreeItemProps, treeItemClasses } from '@mui/x-tree-view/TreeItem';
import { styled, alpha } from '@mui/material/styles';

// styled()를 사용하여 TreeItem의 기본 스타일을 커스터마이징합니다.
export const DsSimpleTreeItem = styled((props: TreeItemProps) => <TreeItem {...props} />)(
    ({ theme }) => ({
        [`& .${treeItemClasses.content}`]: {
            padding: theme.spacing(0.5, 1),
            borderRadius: theme.shape.borderRadius,
            '&:hover': {
                backgroundColor: alpha(theme.palette.primary.main, 0.1),
            },
            '&.Mui-selected, &.Mui-selected:hover': {
                backgroundColor: alpha(theme.palette.primary.main, 0.2),
            },
        },
    }),
);