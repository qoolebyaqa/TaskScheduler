import { useDispatch, useSelector } from "react-redux";
import { newTaskActions } from "../../store";

function NewTask() {
  const dispatch = useDispatch();
  const activeUser = useSelector((state:any) => state.tasksRelated.activeUser);
  async function handleSaveTask(event:any){
    event.preventDefault();
    const newId = Date.now();
    
    const fd = new FormData(event.target);
    
    const data:any = {...Object.fromEntries(fd.entries()), stage: 'active', id: newId};
    const restDays = Math.floor((Number(new Date(data.duedate)) - Number(new Date(newId))) / (60 * 60 * 24 * 1000));
    data.reserveDays = restDays;
    try {
      const res = await fetch("https://udemy-max-b1bc4-default-rtdb.asia-southeast1.firebasedatabase.app/usertasks.json",
      {
        method: "POST",
        body: JSON.stringify({
          id: newId,
          sender: activeUser,
          tasksArr: data
        }),
        headers: {"Content-Type": "application/json"}
      });
      const responsePost = await res.json();
      data.id = responsePost.name
    } catch (err) {
      throw new Error('could not save the task');
    }
    dispatch(newTaskActions.newTaskAdd(data));
    dispatch(newTaskActions.filterOfTotalTasks());
    dispatch(newTaskActions.newTaskForm());
  } 

  function handleCloseForm () {
    dispatch(newTaskActions.newTaskForm());
  }

  return ( <div className="absolute w-full h-screen left-0 top-0 flex align-middle bg-sky-900">
  <form className="flex flex-col w-2/5 m-auto" onSubmit={handleSaveTask} >
    <label htmlFor="title">Title</label>
    <input type="text" name="title" id="title" className="bg-gray-600"/>
    <label htmlFor="description">Description</label>
    <textarea name="description" id="description" className="bg-gray-600"/>
    <label htmlFor="duedate">Dead-line</label>
    <input type="date" name="duedate" id="duedate" min={new Date().toJSON().slice(0, 10)} className="bg-gray-600"/>
    <button>Save the task</button>
    <button type="button" onClick={handleCloseForm}>Close</button>
  </form>
  </div> );
}

export default NewTask;