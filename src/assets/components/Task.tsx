import { useDispatch, useSelector } from "react-redux";
import { newTaskActions } from "../../store";
import { motion } from "framer-motion";

async function patchTask(id: any, status: string) {
  const baseUrl =
    "https://udemy-max-b1bc4-default-rtdb.asia-southeast1.firebasedatabase.app/usertasks/";
  try {
    await fetch(`${baseUrl}${id}/tasksArr.json`, {
      method: "PATCH",
      body: JSON.stringify({ stage: status, completedDate: status === 'completed' ? Date.now() : '' }),
      headers: { "Content-Type": "application/json" },
    });
  } catch {
    throw new Error("Could not update item");
  }
}

async function deleteTask(id: any) {
  const baseUrl =
    "https://udemy-max-b1bc4-default-rtdb.asia-southeast1.firebasedatabase.app/usertasks/";
  try {
    await fetch(`${baseUrl}${id}.json`, {
      method: "DELETE",
    });
  } catch {
    throw new Error("Could not delete item");
  }
}

function Task({ title, details, deadline, id, stage, index }: any) {
  const listOfTasks = useSelector((state: any) => state.tasksRelated.tasks);
  const dispatch = useDispatch();

  async function handleCompleteStatus() {
    const modifiedList = listOfTasks.map((task: any) => {
      if (task.id === id) {
        task = { ...task, stage: "completed"};
      }
      return task;
    });
    dispatch(newTaskActions.markAsCompleted(modifiedList));
    dispatch(newTaskActions.filterOfTotalTasks());
    await patchTask(id, "completed");
  }
  async function handleFailedStatus() {
    const modifiedList = listOfTasks.map((task: any) => {
      if (task.id === id) {
        task = { ...task, stage: "failed", completedDate: '' };
      }
      return task;
    });
    dispatch(newTaskActions.markAsFailed(modifiedList));
    dispatch(newTaskActions.filterOfTotalTasks());
    await patchTask(id, "failed");
  }
  async function handleActiveStatus() {
    const modifiedList = listOfTasks.map((task: any) => {
      if (task.id === id) {
        task = { ...task, stage: "active", completedDate: '' };
      }
      return task;
    });
    dispatch(newTaskActions.markAsFailed(modifiedList));
    dispatch(newTaskActions.filterOfTotalTasks());
    await patchTask(id, "active");
  }
  async function handleDeleteTask() {
    const indexToDelete = listOfTasks.findIndex((task: any) => task.id === id);
    const modifiedTasks = [
      ...listOfTasks.slice(0, indexToDelete),
      ...listOfTasks.slice(indexToDelete + 1),
    ];
    dispatch(newTaskActions.markAsFailed(modifiedTasks));
    dispatch(newTaskActions.filterOfTotalTasks());
    await deleteTask(id);
  }
  return (
    <div className="mt-3 w-1/2 m-auto hover: cursor-pointer">
      
      <motion.div className=
      "m-auto sm:w-80 w-52 flex flex-col justify-center bg-yellow-200 text-zinc-950 rounded-tl-3xl bg-[url('/angle.png')] bg-[length:80px_60px] bg-no-repeat shadow-inner shadow-slate-700"
      initial={{rotate: index%2 ? 5 : -5, minHeight: 300}}
      transition={{duration: 0.4}}
      whileHover={{
        scale: 1.1,
        rotate: 0,
        minHeight: 500
      }}>
        <p className="sm:text-2xl text-lg leading-10 w-4/5 self-center">Your Task: {title}</p>
        <p className="overflow-y-hidden">Details: {details}</p>
        <p>Dead-line: {deadline}</p>
        <div className="flex gap-2 justify-center mt-6">
        {stage !== "completed" && (
          <button className="text-green-800 hover:underline sm:text-base text-sm w-min sm:w-auto" onClick={handleCompleteStatus}>
            Mark as Completed
          </button>
        )}
        {stage !== "active" && (
          <button className="text-violet-700 hover:underline sm:text-base text-sm w-auto" onClick={handleActiveStatus}>
            Mark as Active
          </button>
        )}
        {stage !== "failed" && (
          <button className="text-red-600 hover:underline sm:text-base text-sm w-auto" onClick={handleFailedStatus}>
            Mark as Failed
          </button>
        )}
        <button className="text-black hover:underline sm:text-base text-sm w-min sm:w-auto pr-2" onClick={handleDeleteTask}>
            Delete       
        </button>
      </div>
      </motion.div>
      
    </div>
  );
}

export default Task;
