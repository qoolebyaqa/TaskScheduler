import { useDispatch, useSelector } from "react-redux";
import { newTaskActions } from "../../store";
import { motion } from "framer-motion";
import { useState } from "react";

function NewTask() {
  const dispatch = useDispatch();
  const [fetching, setFetching] = useState(false);
  const [err, setErr] = useState("");
  const activeUser = useSelector((state:any) => state.tasksRelated.activeUser);
  async function handleSaveTask(event:any){
    event.preventDefault();
    setFetching(true)
    const newId = Date.now();
    
    const fd = new FormData(event.target);
    
    const data:any = {...Object.fromEntries(fd.entries()), stage: 'active', id: newId, creationDate: Date.now()};
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
      setErr('could not save the task');
    }
    setFetching(false);
    dispatch(newTaskActions.newTaskAdd(data));
    dispatch(newTaskActions.filterOfTotalTasks());
    dispatch(newTaskActions.newTaskForm());
  } 

  function handleCloseForm () {
    dispatch(newTaskActions.newTaskForm());
  }

  return ( <div className="absolute w-full h-dvh left-0 top-0 flex align-middle bg-sky-900">
  <motion.form className="flex flex-col md:w-2/5 w-10/12 m-auto text-teal-800 bg-white md:p-12 p-6 rounded-lg" onSubmit={handleSaveTask} 
  initial={{scale: 1.5}}
  animate={{scale: 1}}>
    <h3 className="text-2xl font-bold">Schedule new task</h3>
    <label htmlFor="title">Title</label>
    <input type="text" name="title" id="title" maxLength={20} className="text-slate-900 border-2 border-black"/>
    <label htmlFor="description">Description</label>
    <textarea name="description" id="description" className="text-slate-900 border-2 border-black"/>
    <label htmlFor="duedate">Dead-line</label>
    <input type="date" name="duedate" id="duedate" min={new Date().toJSON().slice(0, 10)} className="text-slate-900 border-2 border-black"/>
    <button className="bg-sky-700 text-black w-2/4 mx-auto my-4 rounded-lg disabled:bg-sky-600 disabled:text-zinc-600" disabled={fetching}>
      {fetching ? 'Saving...' : 'Save the task'}</button>
    <button type="button" onClick={handleCloseForm}>Close</button>
    {err && <p className="text-red-700">{err}</p>}
  </motion.form>
  </div> );
}

export default NewTask;