import { useEffect, useState } from "react";
import supabase from "../config/supabaseClient";
import NewTask from "./NewTask";
import MiniTask from "./MiniTask";

import { useSelector, useDispatch } from "react-redux";
import { updateTasks, clearCompleted } from "../store/slices/tasksSlice";

function Tasks() {
  const tasks: any[] = useSelector((state: any) => state.tasks.all);

  const [filterTasks, setFilterTasks] = useState<any[]>();

  console.log(filterTasks);

  const dispatch = useDispatch();

  const fetchTasks = async () => {
    const { data, error } = await supabase
      .from("tasks")
      .select()
      .order("completed");

    if (error) {
      console.log(error);
    }

    if (data) dispatch(updateTasks(data));
  };

  useEffect(() => {
    fetchTasks();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const deleteCompleted = async () => {
    dispatch(clearCompleted());
    await supabase.from("tasks").delete().is("completed", true);
    fetchTasks();
  };

  const filtersSpans = document.querySelectorAll(".filters span");
  filtersSpans.forEach((span: any) =>
    span.addEventListener("click", () => {
      filtersSpans.forEach((span: any) => {
        span.classList.remove("active");
      });
      span.classList.add("active");

      if (span.innerText === "All") {
        setFilterTasks(undefined);
      } else if (span.innerText === "Active") {
        setFilterTasks(tasks.filter((task: any) => !task.completed));
      } else if (span.innerText === "Completed") {
        setFilterTasks(tasks.filter((task: any) => task.completed));
      }
    })
  );

  return (
    <section className="body">
      <NewTask />

      <div className="tasks mt-6 py-1 pe-5 rounded-t">
        {tasks &&
          (filterTasks === undefined ? tasks : filterTasks).map((task) => {
            return (
              <MiniTask
                id={task.id}
                key={task.id}
                content={task.content}
                completed={task.completed}
              />
            );
          })}
        {useSelector((state: any) => state.tasks.all).length === 0 && (
          <p className="emptyMessage text-center py-6 font-semibold">
            Nothing to do, add a new task?
          </p>
        )}
      </div>

      <div className="foot w-full py-3 px-5 rounded-b flex justify-between items-center">
        <p className="itemsLeft text-xs">
          <span>{tasks.filter((task: any) => !task.completed).length}</span>{" "}
          items left
        </p>

        <div
          className="clear font-semibold cursor-pointer"
          onClick={deleteCompleted}
        >
          Clear Completed
        </div>
      </div>
    </section>
  );
}

export default Tasks;
