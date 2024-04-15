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

function Task({ title, details, deadline, id, stage }: any) {
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
    <div className="mt-3 w-6/12 m-auto hover: cursor-pointer">
      <div className="flex justify-end mb-6" onClick={handleDeleteTask}>
        <div className="ease-in duration-300 hover:scale-150">X</div>
        {/* <div className="w-4 h-1 bg-slate-100"></div> */}
      </div>
      <motion.div className=
      "m-auto w-80 flex flex-col justify-center bg-yellow-200 text-zinc-950 rounded-tl-3xl bg-[url('/angle.png')] bg-[length:100px_50px] bg-no-repeat shadow-inner shadow-slate-700"
      initial={{rotate: 5, maxHeight: 200}}
      transition={{duration: 0.4}}
      whileHover={{
        scale: 1.1,
        rotate: 0,
        maxHeight: 1000
      }}>
        <p className="text-2xl leading-10 w-4/5 self-center">Your Task: {title}</p>
        <p className="overflow-y-hidden">Details: {details}</p>
        <p>Dead-line: {deadline}</p>
      </motion.div>
      <div className="flex gap-4 justify-center mt-6">
        {stage !== "completed" && (
          <button className="text-green-800" onClick={handleCompleteStatus}>
            Mark as Completed
          </button>
        )}
        {stage !== "active" && (
          <button className="text-violet-700" onClick={handleActiveStatus}>
            Mark as Active
          </button>
        )}
        {stage !== "failed" && (
          <button className="text-red-600" onClick={handleFailedStatus}>
            Mark as Failed
          </button>
        )}
      </div>
    </div>
  );
}

export default Task;
