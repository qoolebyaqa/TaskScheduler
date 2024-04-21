import { useSelector } from "react-redux";
import NearestTask from "./NearestTask";
import { TaskItem, TaskRelatedState } from "../util/types";

function TaskBoard({quantity}:{quantity: number | string}) {
  const listOfTasks = useSelector((state: TaskRelatedState) => state.tasksRelated.tasks);

  const stats = listOfTasks
    .filter((task: TaskItem) => {
      return task.stage === "active";
    })
    .map((task: TaskItem) => {      
      const today = new Date(Date.now());
      const taskDueDate = new Date(task.duedate);
      return {...task, reserveDays: Math.floor((Number(taskDueDate) - Number(today)) / (60 * 60 * 24 * 1000))};
    })
    .sort((itemA: TaskItem, itemB: TaskItem) => {
      return (Number(itemA.reserveDays) - Number(itemB.reserveDays));
    }).slice(0, Number(quantity));

  return (
    <>
      <ul>
        {stats.map((task: TaskItem) => {
          return (
            <li key={task.id}>
              <NearestTask
                title={task.title}
                description={task.description}
                reserveDays={task.reserveDays}
              />
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default TaskBoard;
