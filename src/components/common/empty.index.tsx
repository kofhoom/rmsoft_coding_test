/* eslint-disable @next/next/no-img-element */
import { IEmptyProps } from "./empty.types";

const EmptyComponent = ({
  onAddNotebook,
  onAddMemos,
  type,
}: IEmptyProps): JSX.Element => {
  return (
    <div className="empty-wrap h-full flex justify-center items-center">
      {/* Notebooks/Memo 생성 초기 화면 */}
      <div className="w-62 text-center">
        <img
          className="m-auto mb-3"
          src={type == "notebooks" ? "/main_icon.png" : "/memo_icon.png"}
          alt="생성아이콘"
          style={{ width: "60px" }}
        />
        <p className="text-xs mb-2">
          아이디어가 있으신가요? 아래 버튼을 클릭하세요
        </p>
        {type == "notebooks" ? (
          // Notebooks 추가 아이콘
          <button
            className="text-xs text-blue-400"
            onClick={() => onAddNotebook?.("NoteBooks")}
          >
            새 노트
          </button>
        ) : (
          // Memos 추가 아이콘
          <button
            className="text-xs text-blue-400"
            onClick={() => onAddMemos?.()}
          >
            새 메모
          </button>
        )}
      </div>
    </div>
  );
};

export default EmptyComponent;
