import supabase from "../config/supabaseClient";
import checkIcon from "../assets/icons/icon-check.svg";
import { FaSquarePen } from "react-icons/fa6";

import { useDispatch, useSelector } from "react-redux";
import { setCheck, setInputValue } from "../store/slices/newTaskSlice";
import { addNewTask } from "../store/slices/tasksSlice";

function NewTask() {
  const dispatch = useDispatch();
  const check = useSelector((state: any) => state.newTask.check);
  const inputValue = useSelector((state: any) => state.newTask.inputValue);

  const handleSubmit = async () => {
    if (inputValue === "" || inputValue === " ") return;

    const { error } = await supabase.from("tasks").insert({
      content: inputValue,
      completed: check,
    });

    if (error) {
      console.log(error);
    }

    dispatch(addNewTask({ content: inputValue, completed: check }));
    dispatch(setInputValue(""));
    dispatch(setCheck(false));
  };

  return (
    <section className="newTask flex items-center justify-evenly px-4 py-1 rounded relative">
      <div
        className="check w-5 h-5 rounded-full cursor-pointer absolute left-4 top-1/2 -translate-y-1/2"
        onClick={() => dispatch(setCheck(!check))}
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
        onChange={(e) => dispatch(setInputValue(e.target.value))}
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
