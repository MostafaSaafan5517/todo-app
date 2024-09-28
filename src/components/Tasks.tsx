import { useEffect, useState } from "react";
import supabase from "../config/supabaseClient";
import NewTask from "./NewTask";
import MiniTask from "./MiniTask";

function Tasks() {
  const [tasks, setTasks] = useState<any[] | null>();
  const [tasksNumber, setTasksNumber] = useState(0);
  const [uncompletedTasks, setUncompletedTasks] = useState(0);

  const sumUnCompletedTasks = async () => {
    const { data, error } = await supabase
      .from("tasks")
      .select("completed")
      .is("completed", false);

    setUncompletedTasks(data?.length || 0);

    if (error) {
      console.log(error);
    }
  };

  const fetchTasks = async () => {
    const { data, error } = await supabase
      .from("tasks")
      .select()
      .order("completed");

    if (error) {
      console.log(error);
    }

    setTasks(data);
    setTasksNumber((data?.length || 0) + 1);
    sumUnCompletedTasks();
  };

  useEffect(() => {
    fetchTasks();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const clearCompleted = async () => {
    await supabase.from("tasks").delete().is("completed", true);

    fetchTasks();
  };

  return (
    <section className="body">
      <NewTask fetchAgain={() => fetchTasks()} />

      <div className="tasks mt-6 py-1 pe-5 rounded-t">
        {tasks &&
          tasks.map((task) => {
            return (
              <MiniTask
                id={task.id}
                key={task.id}
                content={task.content}
                completed={task.completed}
                fetchAgain={() => fetchTasks()}
              />
            );
          })}
        {tasksNumber - 1 === 0 && (
          <p className="emptyMessage text-center py-6 font-semibold">
            Nothing to do, add a new task?
          </p>
        )}
      </div>

      <div className="foot w-full py-3 px-5 rounded-b flex justify-between items-center">
        <p className="itemsLeft text-xs">
          <span>{uncompletedTasks}</span> items left
        </p>

        <div
          className="clear font-semibold cursor-pointer"
          onClick={clearCompleted}
        >
          Clear Completed
        </div>
      </div>
    </section>
  );
}

export default Tasks;
