import { useDispatch, useSelector } from "react-redux";
import { newTaskActions } from "../../store";
import NewTask from "../components/NewTask";
import TasksList from "../components/TasksList";

function TasksPage() {
  const showNewTask = useSelector(
    (state: any) => state.tasksRelated.showNewTaskForm
  );
  const listOfTasks = useSelector((state: any) => state.tasksRelated.tasks);
  const activeFilter = useSelector(
    (state: any) => state.tasksRelated.activeFilter
  );
  const filtredLengths = useSelector(
    (state: any) => state.tasksRelated.filtredLengths
  );
  const userIn = useSelector((state: any) => state.tasksRelated.activeUser);
  const dispatch = useDispatch();

  const taskFilter = [
    { type: "Active", quantity: filtredLengths.active },
    { type: "Completed", quantity: filtredLengths.completed },
    { type: "Failed", quantity: filtredLengths.failed },
  ];

  function handleNewFormVision() {
    dispatch(newTaskActions.newTaskForm());
  }

  function handleFilterVision(filterType: string) {
    dispatch(newTaskActions.changeActiveFilter(filterType.toLowerCase()));
  }

  return (
    <section>
      {userIn && (
        <div>
          <div className="flex justify-around mb-6 items-center mt-8">
            <h1>Your Stage</h1>
            <button
              onClick={handleNewFormVision}
              className="bg-slate-600 border-2 text-xl h-12 px-4 rounded-xl"
            >
              New Task
            </button>
          </div>
          <div>
            <ul className="flex gap-10 justify-center">
              {taskFilter.map((stage, index) => (
                <li
                  key={index}
                  className={
                    activeFilter === stage.type.toLowerCase()
                      ? "flex gap-2 hover:cursor-pointer border-b-4 border-b-slate-600"
                      : "flex gap-2 hover:cursor-pointer"
                  }
                  id={stage.type}
                  onClick={() => handleFilterVision(stage.type)}
                >
                  <p>{stage.type}</p>
                  <p className="bg-slate-800 w-6 h-6">{stage.quantity}</p>
                </li>
              ))}
            </ul>
          </div>

          {activeFilter === "active" && (
            <TasksList
              filtredList={listOfTasks.filter(
                (task: any) => task.stage === "active"
              )}
            />
          )}
          {activeFilter === "completed" && (
            <TasksList
              filtredList={listOfTasks.filter(
                (task: any) => task.stage === "completed"
              )}
            />
          )}
          {activeFilter === "failed" && (
            <TasksList
              filtredList={listOfTasks.filter(
                (task: any) => task.stage === "failed"
              )}
            />
          )}
          {showNewTask && <NewTask />}
        </div>
      )}
    </section>
  );
}

export default TasksPage;
