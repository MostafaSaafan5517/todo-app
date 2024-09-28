import { useEffect, useState } from "react";
import supabase from "../config/supabaseClient";
import UpdateTask from "./UpdateTask";
import { MdDelete as Delete } from "react-icons/md";
import { HiMiniPencilSquare as Edit } from "react-icons/hi2";
import checkIcon from "../assets/icons/icon-check.svg";

interface Props {
  id?: number;
  content: string;
  completed: boolean;
  fetchAgain: Function;
}

function MiniTask({ id, content, completed, fetchAgain }: Props) {
  const [check, setCheck] = useState(completed);
  const [currentlyUpdated, setCurrentlyUpdated] = useState(false);

  const handleClick = async (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    setCheck(!check);
    fetchAgain();
  };

  const setUpdate = async (value: string) => {
    setCurrentlyUpdated(false);
    await supabase.from("tasks").update({ content: value }).eq("id", id);

    fetchAgain();
  };

  const handleDelete = async (
    event: React.MouseEvent<SVGElement, MouseEvent>
  ) => {
    await supabase.from("tasks").delete().eq("id", id);

    fetchAgain();
  };

  useEffect(() => {
    const updateCompleted = async () => {
      await supabase.from("tasks").update({ completed: check }).eq("id", id);
    };

    updateCompleted();
    fetchAgain();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [check, id]);

  return (
    <section
      className={
        "task miniTask relative " +
        (currentlyUpdated ? "px-7 py-6" : "mx-2 px-2 py-3")
      }
    >
      <div
        className={
          "check w-5 h-5 rounded-full cursor-pointer absolute left-2 top-1/2 -translate-y-1/2 " +
          (currentlyUpdated ? "pointer-events-none opacity-50" : "")
        }
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

      {currentlyUpdated ? (
        <UpdateTask
          className="justify-start"
          content={content}
          closeUpdate={() => setCurrentlyUpdated(false)}
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

      {!currentlyUpdated && (
        <div className="editIcons opacity-0 flex items-center gap-x-1 absolute right-0 top-1/2 -translate-y-1/2 *:text-xl *:cursor-pointer">
          <Edit
            className="fill-sky-600"
            onClick={() => setCurrentlyUpdated(true)}
          />
          <Delete className="fill-red-700" onClick={handleDelete} />
        </div>
      )}
    </section>
  );
}

export default MiniTask;
