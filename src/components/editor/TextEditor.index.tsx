import { CLEAR_HISTORY_COMMAND, EditorState } from "lexical";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { PlainTextPlugin } from "@lexical/react/LexicalPlainTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { ITextEditorProps } from "./TextEditor.types";
import type { IMyCustomAutoFocusPlugin } from "./TextEditor.types";
import { useEffect } from "react";

const onError = (error: any): void => {
  console.error(error);
};

// lexical 에디터 update/focus 이벤트 헨들러
const MyCustomAutoFocusPlugin = ({
  updateTextData,
  selectedMemo,
}: IMyCustomAutoFocusPlugin): null => {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    let newEditorState: EditorState;

    if (updateTextData && updateTextData.length > 0) {
      newEditorState = editor.parseEditorState(updateTextData);
    } else {
      // 에디터 초기값 셋팅
      let EMPTY_CONTENT: string =
        '{"root":{"children":[{"children":[],"direction":null,"format":"","indent":0,"type":"paragraph","version":1}],"direction":null,"format":"","indent":0,"type":"root","version":1}}';
      newEditorState = editor.parseEditorState(EMPTY_CONTENT);
    }

    if (newEditorState) {
      editor.setEditorState(newEditorState);
      editor.dispatchCommand(CLEAR_HISTORY_COMMAND, undefined);
    } else {
      console.error("잘못된 편집기 상태입니다. root 데이터가 비어 있습니다.");
    }

    editor.focus();
  }, [updateTextData, editor, selectedMemo]);

  return null;
};

const TextEditorComponent = ({
  updateTextData,
  selectedMemo,
  onChangeEditorContent,
}: ITextEditorProps): JSX.Element => {
  return (
    <div className="texteditor-wrap">
      {/* 초기 값 셋팅 */}
      <LexicalComposer
        initialConfig={{ theme: {}, onError, namespace: "myEditor" }}
      >
        {/* 초기 에디터 ui 생성 */}
        <PlainTextPlugin
          contentEditable={<ContentEditable className="texteditor-content" />}
          placeholder={<div className="placeholder">메모를 입력해 주세요.</div>}
          ErrorBoundary={LexicalErrorBoundary}
        />
        {/* 에디터 OnChangeEvent plugin 추가 */}
        <OnChangePlugin onChange={onChangeEditorContent} />

        {/* lexical 에디터 update/focus 이벤트 플러그인 */}
        <MyCustomAutoFocusPlugin
          updateTextData={updateTextData}
          selectedMemo={selectedMemo}
        />
      </LexicalComposer>
    </div>
  );
};

export default TextEditorComponent;
