import { useState } from "react";
import { FaSquarePen } from "react-icons/fa6";
import { RxCross2 as Close } from "react-icons/rx";

interface Props {
  className: string;
  content: string;
  closeUpdate: Function;
  setUpdate: Function;
}

function UpdateTask({ content, closeUpdate, setUpdate }: Props) {
  const [inputValue, setInputValue] = useState(content);

  const callSetUpdate = (value: string) => {
    if (inputValue === "" || inputValue === " ") return;
    setUpdate(value);
  };

  return (
    <section className="flex items-center gap-x-5">
      <input
        type="text"
        placeholder="Update todo..."
        value={inputValue}
        autoFocus
        className="w-full bg-transparent outline-none ps-8"
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && callSetUpdate(inputValue)}
      />

      <div className="updateIcons *:cursor-pointer *:w-6 *:h-6 flex items-center gap-x-1">
        <FaSquarePen
          className="fill-sky-600 *:pointer-events-none"
          onClick={() => callSetUpdate(inputValue)}
        />

        <Close className="text-red-700" onClick={() => closeUpdate()} />
      </div>
    </section>
  );
}

export default UpdateTask;
