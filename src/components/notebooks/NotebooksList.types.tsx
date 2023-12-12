import type { IMemoTypes } from "../memos/MemosList.type";

export type INoteBookTypes = {
  id: number;
  name: string;
  memos: IMemoTypes[];
};

export interface INotebooksProps {
  notebooks: INoteBookTypes[];
  onSelectNotebook: (notebookId: number) => void;
  onAddNotebook: (name: string) => void;
  onDeleteNotebook: (notebookId: number) => void;
  selectedNotebook: number | undefined;
}
