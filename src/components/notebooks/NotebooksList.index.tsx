/* eslint-disable @next/next/no-img-element */
import { INoteBookTypes } from "./NotebooksList.types";
import type { INotebooksProps } from "./NotebooksList.types";
import { v4 as uuidv4 } from "uuid";

const NotebooksComponent = ({
  notebooks,
  onSelectNotebook,
  onAddNotebook,
  onDeleteNotebook,
  selectedNotebook,
}: INotebooksProps) => {
  return (
    <div className="w-56 border-r border-gray-200">
      {/* Notebooks 헤더 시작 */}
      <div className="flex items-center w-full h-12 px-5">
        <img
          src="/notebook_total_icon.png"
          alt="모든노트 아이콘"
          className="w-5 mr-2"
        />
        <div className="text-sm">
          모든 노트{" "}
          <span className="text-xs text-gray-400">{notebooks.length}</span>
        </div>
      </div>
      {/* Notebooks 헤더 끝 */}
      <div className="flex items-center w-full justify-between h-9 px-5">
        <h2 className="text-xs text-blue-400">여러 노트북</h2>
        {/* Notebooks 추가 버튼 시작 */}
        <button
          className="text-2xl text-blue-400 cursor-pointer"
          onClick={() => onAddNotebook("NoteBooks")}
        >
          +
        </button>
        {/* Notebooks 추가 버튼 끝 */}
      </div>
      {/* Notebooks 리스트 시작 */}
      <ul>
        {notebooks.map(
          (notebook: INoteBookTypes): JSX.Element => (
            <li
              className={`flex justify-between hover:bg-gray-100 cursor-pointer h-12 ${
                selectedNotebook === notebook.id ? "bg-gray-100" : ""
              }`}
              key={uuidv4()}
            >
              <div
                onClick={() => onSelectNotebook(notebook.id)}
                className="w-full h-full flex items-center pl-5"
              >
                <img
                  className="w-5 mr-2"
                  src="/notebook_list_icon.png"
                  alt="노트북 리스트 아이콘"
                />
                <span>{notebook.name}</span>
              </div>
              <button
                className="pr-6"
                onClick={() => onDeleteNotebook(notebook.id)}
              >
                x
              </button>
            </li>
          )
        )}
      </ul>
      {/* 메모 리스트 끝 */}
    </div>
  );
};

export default NotebooksComponent;
