import * as React from 'react';
import { SimpleTreeView, SimpleTreeViewProps } from '@mui/x-tree-view/SimpleTreeView';
import { RichTreeView, RichTreeViewProps } from '@mui/x-tree-view/RichTreeView';
import { TreeViewBaseItem } from '@mui/x-tree-view/models';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { DsTreeItem } from './DsTreeItem'; // 스타일링을 위해 기존 DsTreeItem을 가져옵니다.

// 데이터 기반 트리에서 사용할 노드의 타입입니다.
export interface TreeNode extends TreeViewBaseItem {
  id: string;
  label: string;
  children?: TreeNode[];
}

// 이 컴포넌트가 받을 Props 타입입니다.
// checkboxSelection prop의 값에 따라 SimpleTreeView와 RichTreeView의 props를 구분합니다.
type DsTreeViewProps<TItem extends TreeNode, Multiple extends boolean | undefined> =
  | (Omit<SimpleTreeViewProps<Multiple>, 'children'> & {
      checkboxSelection?: false;
      items?: never;
      children: React.ReactNode;
    })
  | (Omit<RichTreeViewProps<TItem, Multiple>, 'checkboxSelection' | 'multiSelect'> & {
      checkboxSelection: true;
      items: readonly TItem[];
      children?: never;
    });

// 제네릭을 사용하는 새로운 통합 DsTreeView 컴포넌트입니다.
export default function DsTreeView<
  TItem extends TreeNode,
  Multiple extends boolean | undefined = undefined,
>(props: DsTreeViewProps<TItem, Multiple>) {
  const { checkboxSelection, ...otherProps } = props;

  // 체크박스 선택 기능이 필요한 경우 RichTreeView를 사용합니다.
  if (checkboxSelection) {
    // RichTreeView에 필요한 props만 명시적으로 분리합니다.
    const richProps = otherProps as Omit<RichTreeViewProps<TItem, Multiple>, 'checkboxSelection' | 'multiSelect'>;
    return (
      <RichTreeView
        {...richProps}
        checkboxSelection // MUI의 내장 체크박스 기능을 활성화합니다.
        multiSelect={true as Multiple}       // 체크박스는 다중 선택을 전제로 합니다.
        slots={{
          item: DsTreeItem, // 스타일링을 위해 DsTreeItem을 사용합니다.
          collapseIcon: ArrowDropDownIcon,
          expandIcon: ArrowRightIcon,
        }}
      />
    );
  }

  // 체크박스가 필요 없는 기본 TreeView의 경우 SimpleTreeView를 사용합니다.
  const simpleProps = otherProps as Omit<SimpleTreeViewProps<Multiple>, 'children'> & { children: React.ReactNode };
  return (
    <SimpleTreeView
      {...simpleProps}
      slots={{
        collapseIcon: ArrowDropDownIcon,
        expandIcon: ArrowRightIcon,
      }}
    />
  );
}
