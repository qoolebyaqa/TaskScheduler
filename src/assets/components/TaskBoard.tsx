import { useSelector } from "react-redux";
import NearestTask from "./NearestTask";

function TaskBoard({quantity}:any) {
  const listOfTasks = useSelector((state: any) => state.tasksRelated.tasks);

  const stats = listOfTasks
    .filter((task: any) => {
      return task.stage === "active";
    })
    .map((task: any) => {      
      const today = new Date(Date.now());
      const taskDueDate = new Date(task.duedate);
      return {...task, reserveDays: Math.floor((Number(taskDueDate) - Number(today)) / (60 * 60 * 24 * 1000))};
    })
    .sort((itemA: any, itemB: any) => {
      return (itemA.reserveDays - itemB.reserveDays);
    }).slice(0, quantity);

  return (
    <>
      <ul>
        {stats.map((task: any) => {
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
