/* eslint-disable @next/next/no-img-element */
import TextEditorComponent from "@/src/components/editor/TextEditor.index";
import EmptyComponent from "@/src/components/common/empty.index";
import MemoListComponent from "@/src/components/memos/MemosList.index";
import NotebooksComponent from "@/src/components/notebooks/NotebooksList.index";
import type { IMemoTypes } from "@/src/components/memos/MemosList.type";
import type { INoteBookTypes } from "@/src/components/notebooks/NotebooksList.types";
import { useState, useEffect } from "react";

const Home = (): JSX.Element => {
  const [memos, setMemos] = useState<IMemoTypes[]>([]);
  const [selectedMemo, setSelectedMemo] = useState<IMemoTypes | null>(null);
  const [notebooks, setNotebooks] = useState<INoteBookTypes[]>([]);
  const [selectedNotebook, setSelectedNotebook] =
    useState<INoteBookTypes | null>(null);
  const [counts, setCounts] = useState<number>(1);
  const [editorContent, setEditorContent] = useState<string | undefined>("");

  const isNoteBooks: boolean = notebooks.length === 0;

  // Notebook 생성시 자동 넘버링
  useEffect(() => {
    if (isNoteBooks) {
      setCounts(1);
    }
  }, [isNoteBooks]);

  // 초기 로컬스토리지 데이터 셋팅
  useEffect(() => {
    const storedNotebooksString: string | null =
      localStorage.getItem("notebooks");

    if (storedNotebooksString !== null) {
      const storedNotebooks = JSON.parse(storedNotebooksString) || [];
      setNotebooks(storedNotebooks);
    }
  }, []);

  // 로컬스토리지 공통 저장 함수
  const saveNotebooksToLocalStorage = (
    updatedNotebooks: INoteBookTypes[]
  ): void => {
    localStorage.setItem("notebooks", JSON.stringify(updatedNotebooks));
  };

  // Notebook 선택 함수
  const onSelectNotebook = (notebookId: number): void => {
    const selected: INoteBookTypes | null =
      notebooks.find(
        (notebook: INoteBookTypes): boolean => notebook.id === notebookId
      ) || null;

    setSelectedNotebook(selected);
    setMemos(selected?.memos || []);
    setSelectedMemo(null);
  };

  // Notebook 추가 함수
  const onAddNotebook = (name: string): void => {
    setCounts((prev) => prev + 1);

    const newNotebook: INoteBookTypes = {
      id: Date.now(),
      name: name + counts,
      memos: [],
    };

    const updatedNotebooks: INoteBookTypes[] = [...notebooks, newNotebook];

    setNotebooks(updatedNotebooks);
    onSelectNotebook(newNotebook.id);
    setSelectedNotebook(newNotebook);
    saveNotebooksToLocalStorage(updatedNotebooks);
  };

  // Notebook 삭제 함수
  const onDeleteNotebook = (notebookId: number): void => {
    const updatedNotebooks: INoteBookTypes[] = notebooks.filter(
      (notebook: INoteBookTypes): boolean => notebook.id !== notebookId
    );

    setNotebooks(updatedNotebooks);
    saveNotebooksToLocalStorage(updatedNotebooks);
    setSelectedNotebook(null);
    setMemos([]);
    setSelectedMemo(null);
  };

  // 해당 Memo 선택시 실행 함수
  const onSelectMemos = (memoId: number): void => {
    const selected: IMemoTypes | null =
      memos.find((memo: IMemoTypes): boolean => memo.id === memoId) || null;

    setSelectedMemo(selected);
    setEditorContent(selected?.contentData);
  };

  // Memo 추가시 실행 함수
  const onAddMemos = (): void => {
    if (selectedNotebook) {
      const newMemo: IMemoTypes = {
        id: Date.now(),
        content: "새 메모",
        contentData: "",
      };

      const updatedNotebooks: INoteBookTypes[] = [...notebooks];

      const selectedNotebookIndex: number = updatedNotebooks.findIndex(
        (notebook: INoteBookTypes): boolean =>
          notebook.id === selectedNotebook.id
      );

      if (selectedNotebookIndex !== -1) {
        updatedNotebooks[selectedNotebookIndex].memos.push(newMemo);
        setMemos(updatedNotebooks[selectedNotebookIndex].memos);
      }

      setNotebooks(updatedNotebooks);
      saveNotebooksToLocalStorage(updatedNotebooks);
      console.log(notebooks);
    }
  };

  // 해당 Memo 삭제 함수
  const onDeleteMemos = (memoId: number): void => {
    const updatedMemos: IMemoTypes[] = memos.filter(
      (memo: IMemoTypes): boolean => memo.id !== memoId
    );

    setMemos(updatedMemos);

    if (selectedNotebook) {
      const updatedNotebooks: INoteBookTypes[] = notebooks.map(
        (notebook: INoteBookTypes): INoteBookTypes => {
          if (notebook.id === selectedNotebook.id) {
            return { ...notebook, memos: updatedMemos };
          }
          return notebook;
        }
      );

      setNotebooks(updatedNotebooks);
      saveNotebooksToLocalStorage(updatedNotebooks);
    }

    setSelectedMemo(null);
    setEditorContent("");
  };

  // lexical 에디터 입력시 실행 되는 이벤트 헨들러
  const onChangeEditorContent = (editorContent: any): void => {
    const editorStateJSON = editorContent.toJSON();
    const updatedContent: string | undefined =
      editorStateJSON?.root?.children[0]?.children[0]?.text;
    const editorStateJSONSate: string = JSON.stringify(editorStateJSON);

    if (selectedMemo) {
      const updatedMemos: IMemoTypes[] = memos.map(
        (memo: IMemoTypes): IMemoTypes =>
          memo.id === selectedMemo.id
            ? {
                ...memo,
                content: updatedContent ? updatedContent : "새 메모",
                contentData: editorStateJSONSate,
              }
            : memo
      );

      setMemos(updatedMemos);

      if (selectedNotebook) {
        const updatedNotebooks: INoteBookTypes[] = notebooks.map(
          (notebook: INoteBookTypes): INoteBookTypes => {
            if (notebook.id === selectedNotebook.id) {
              return {
                ...notebook,
                memos: updatedMemos,
              };
            }
            return notebook;
          }
        );

        setNotebooks(updatedNotebooks);
        saveNotebooksToLocalStorage(updatedNotebooks);
      }
    }
  };

  return (
    <div className="main-container">
      <div className="flex h-screen">
        {/* NotebooksComponent */}
        <NotebooksComponent
          notebooks={notebooks}
          onSelectNotebook={onSelectNotebook}
          onAddNotebook={onAddNotebook}
          onDeleteNotebook={onDeleteNotebook}
          selectedNotebook={selectedNotebook?.id}
        />
        {!isNoteBooks ? (
          <>
            {/* MemoListComponent */}
            <MemoListComponent
              memos={memos}
              onSelectMemos={onSelectMemos}
              onAddMemos={onAddMemos}
              onDeleteMemos={onDeleteMemos}
              selectedMemo={selectedMemo?.id}
            />
            {/* TextEditorComponent */}
            {selectedMemo && (
              <TextEditorComponent
                updateTextData={editorContent}
                onChangeEditorContent={onChangeEditorContent}
                selectedMemo={selectedMemo?.id}
              />
            )}
          </>
        ) : (
          // Memo | Notebooks 가 비어 있을 시
          <EmptyComponent onAddNotebook={onAddNotebook} type={"notebooks"} />
        )}
      </div>
    </div>
  );
};

export default Home;
