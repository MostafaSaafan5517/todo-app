import { useEffect, useState } from "react";
import supabase from "../config/supabaseClient";
import UpdateTask from "./UpdateTask";
import { MdDelete as Delete } from "react-icons/md";
import { HiMiniPencilSquare as Edit } from "react-icons/hi2";
import checkIcon from "../assets/icons/icon-check.svg";

import { useDispatch } from "react-redux";
import { deleteTask, editTask } from "../store/slices/tasksSlice";

interface Props {
  id?: number;
  content: string;
  completed: boolean;
}

function MiniTask({ id, content, completed }: Props) {
  const dispatch = useDispatch();

  const [check, setCheck] = useState(completed);
  const [currentlyEditing, setCurrentlyEditing] = useState(false);

  const setUpdate = async (value: string) => {
    await supabase.from("tasks").update({ content: value }).eq("id", id);

    setCurrentlyEditing(false);
    dispatch(editTask({ id, content: value }));
  };

  const handleDelete = async () => {
    await supabase.from("tasks").delete().eq("id", id);

    dispatch(deleteTask(id));
  };

  useEffect(() => {
    const updateCompleted = async () => {
      await supabase.from("tasks").update({ completed: check }).eq("id", id);
    };

    updateCompleted();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [check, id]);

  return (
    <section
      className={
        "task miniTask relative " +
        (currentlyEditing ? "px-7 py-6" : "mx-2 px-2 py-3")
      }
    >
      <div
        className={
          "check w-5 h-5 rounded-full cursor-pointer absolute left-2 top-1/2 -translate-y-1/2 " +
          (currentlyEditing ? "pointer-events-none opacity-50" : "")
        }
        onClick={() => setCheck(!check)}
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

      {currentlyEditing ? (
        <UpdateTask
          className="justify-start"
          content={content}
          closeUpdate={() => setCurrentlyEditing(false)}
          setUpdate={setUpdate}
        />
      ) : (
        <p
          className={
            (check ? "line-through opacity-20 " : "") +
            "content mx-8 break-words"
          }
        >
          {content}
        </p>
      )}

      {!currentlyEditing && (
        <div className="editIcons opacity-0 flex items-center gap-x-1 absolute right-0 top-1/2 -translate-y-1/2 *:text-xl *:cursor-pointer">
          <Edit
            className="fill-sky-600"
            onClick={() => setCurrentlyEditing(true)}
          />
          <Delete className="fill-red-700" onClick={handleDelete} />
        </div>
      )}
    </section>
  );
}

export default MiniTask;
