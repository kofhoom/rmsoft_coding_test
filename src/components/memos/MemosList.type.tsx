export interface IMemoListProps {
  memos: IMemoTypes[];
  onSelectMemos: (memoId: number) => void;
  onAddMemos?: () => void;
  onDeleteMemos: (memoId: number) => void;
  selectedMemo: any;
}

export type IMemoTypes = {
  id: number;
  content: string;
  contentData: string;
};
