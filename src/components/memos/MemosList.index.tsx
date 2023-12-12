import EmptyComponent from "../common/empty.index";
import { IMemoListProps, IMemoTypes } from "./MemosList.type";
import { v4 as uuidv4 } from "uuid";

const MemoListComponent = ({
  memos,
  onSelectMemos,
  onAddMemos,
  onDeleteMemos,
  selectedMemo,
}: IMemoListProps): JSX.Element => {
  const isMemos: boolean = memos.length === 0; // 해당 NoteBooks에 메모가 없을시

  return (
    <>
      {isMemos && !selectedMemo ? (
        <EmptyComponent onAddMemos={onAddMemos} type="memos" />
      ) : (
        <div className="w-56 border-r border-gray-200">
          <div className="flex justify-between items-center h-12 px-3 border-b bg-gray-100">
            <span>Memos</span>
            {/* Memos 추가 버튼 시작 */}
            <button className="text-2xl" onClick={() => onAddMemos?.()}>
              +
            </button>
            {/* Memos 추가 버튼 끝 */}
          </div>
          {/*  Memos 리스트 시작 */}
          <ul>
            {memos.map(
              (memo: IMemoTypes): JSX.Element => (
                <li
                  key={uuidv4()}
                  className={`flex w-full h-12 cursor-pointer hover:bg-blue-100 ${
                    selectedMemo === memo.id ? "bg-blue-100" : ""
                  }`}
                >
                  {/* Memos 선택 영역 시작 */}
                  <div
                    className="flex flex-col w-full items-start justify-center"
                    onClick={() => onSelectMemos(memo.id)}
                  >
                    <span className="text-ellipsis whitespace-nowrap overflow-hidden w-48 pl-4 block f">
                      {memo.content}
                    </span>
                  </div>
                  {/* Memos 선택 영역 끝 */}
                  {/* Memos 삭제 버튼 시작 */}
                  <button
                    className="pr-4"
                    onClick={() => onDeleteMemos(memo.id)}
                  >
                    x
                  </button>
                  {/* Memos 삭제 버튼 끝 */}
                </li>
              )
            )}
          </ul>
          {/*  Memos 리스트 끝 */}
        </div>
      )}
    </>
  );
};

export default MemoListComponent;
