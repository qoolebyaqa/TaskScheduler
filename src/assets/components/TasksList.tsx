import Task from "./Task";

function TasksList({filtredList}:any) {
  return (
    <ul>
      {filtredList.map((task: any, index:number) => (
        <li key={index}>
          <Task
            title={task.title}
            details={task.description}
            deadline={task.duedate}
            id={task.id}
            stage={task.stage}
          />
        </li>
      ))}
    </ul>
  );
}

export default TasksList;
