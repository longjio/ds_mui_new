import * as React from 'react';
import { RichTreeView, RichTreeViewProps } from '@mui/x-tree-view/RichTreeView';
import { TreeViewBaseItem } from '@mui/x-tree-view/models';
import { DsTreeItem } from './DsTreeItem'; // 스타일링을 위해 DsTreeItem을 가져옵니다.

// 1. 데이터의 타입을 정의합니다.
//    내장된 체크박스 기능을 사용할 것이므로, `checked` 속성은 필요 없습니다.
export interface TreeNode extends TreeViewBaseItem {
    id: string;
    label: string;
    children?: TreeNode[];
}

// 2. 이 컴포넌트가 받을 props를 정의합니다.
//    RichTreeView의 다중 선택(Multiple=true) props를 기반으로 합니다.
interface DsCheckboxTreeViewProps extends Omit<RichTreeViewProps<TreeNode, true>, 'checkboxSelection' | 'multiSelect'> {
    // 이 컴포넌트는 항상 체크박스를 사용하므로, 관련 props는 내부에서 설정합니다.
}

// 3. 최종 컴포넌트: 복잡한 로직 없이 RichTreeView를 감싸기만 합니다.
export default function DsCheckboxTreeView(props: DsCheckboxTreeViewProps) {
    return (
        <RichTreeView
            {...props}
            // `checkboxSelection`과 `multiSelect`를 항상 true로 설정하여
            // MUI의 내장 체크박스 기능을 활성화합니다.
            checkboxSelection
            multiSelect
            // (선택) 만약 TreeItem에 커스텀 스타일을 적용하고 싶다면,
            // DsTreeItem을 item 슬롯에 전달할 수 있습니다.
            slots={{
                item: DsTreeItem,
            }}
        />
    );
}
