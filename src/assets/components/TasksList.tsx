import Task from "./Task";

function TasksList({filtredList}:any) {
  return (
    <ul className={filtredList.length > 0 ? "flex flex-wrap justify-center gap-20 py-12 pr-24" : "flex flex-wrap justify-center gap-20 pr-24"}>
      {filtredList.map((task: any, index:number) => (
        <li key={index}>
          <Task
            title={task.title}
            details={task.description}
            deadline={task.duedate}
            id={task.id}
            stage={task.stage}
            index={index}
          />
        </li>
      ))}
    </ul>
  );
}

export default TasksList;
