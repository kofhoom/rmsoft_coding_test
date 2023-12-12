export interface ITextEditorProps {
  updateTextData: string | undefined;
  onChangeEditorContent: (editorContent: any) => void;
  selectedMemo: number | string;
}

export type IMyCustomAutoFocusPlugin = {
  updateTextData: string | undefined;
  selectedMemo: string | number;
};
