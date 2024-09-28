import { useState } from "react";
import supabase from "../config/supabaseClient";
import { FaSquarePen } from "react-icons/fa6";
import checkIcon from "../assets/icons/icon-check.svg";

interface Props {
  fetchAgain: Function;
}

function NewTask({ fetchAgain }: Props) {
  const [check, setCheck] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setCheck(!check);
  };

  const handleSubmit = async (
    event?: React.MouseEvent<SVGElement, MouseEvent>
  ) => {
    if (inputValue === "" || inputValue === " ") return;

    const { error } = await supabase.from("tasks").insert({
      content: inputValue,
      completed: check,
    });

    if (error) {
      console.log(error);
    }

    setInputValue("");
    setCheck(false);
    fetchAgain();
  };

  return (
    <section className="newTask flex items-center justify-evenly px-4 py-1 rounded relative">
      <div
        className="check w-5 h-5 rounded-full cursor-pointer absolute left-4 top-1/2 -translate-y-1/2"
        onClick={handleClick}
      >
        {check && (
          <>
            <img
              src={checkIcon}
              alt=""
              className="absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4"
            />
            <div className="gradient w-full h-full rounded-full"></div>
          </>
        )}
      </div>
      <input
        type="text"
        placeholder="Create a new todo..."
        value={inputValue}
        autoFocus
        name="newTask"
        className="w-full bg-transparent outline-none py-3 ps-8 pe-4 rounded"
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
      />
      <FaSquarePen
        className="fill-sky-600 cursor-pointer w-8 h-8 hover:scale-105 *:pointer-events-none"
        onClick={handleSubmit}
      />
    </section>
  );
}

export default NewTask;
