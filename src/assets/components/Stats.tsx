import { useSelector } from "react-redux";
import TaskBoard from "./TaskBoard";
import { useState } from "react";
import { motion } from "framer-motion";
import GraphStats from "./GraphStats";

function Stats() {
  const listOfTasks = useSelector((state: any) => state.tasksRelated.filtredLengths);
  const [currentQuantityUrgent, setCurrentQuantityUrgent] = useState(2);
  function handleInput(event:any) {
    setCurrentQuantityUrgent(event.target.value);
  }
  return (
    <section>
      <motion.h3 className="bg-clip-text text-transparent bg-gradient-to-r from-white to-amber-100 md:text-4xl text-xl sm:text-left text-center pb-3"
      initial={{scale: 1.5}}
      animate={{scale: 1}}
      transition={{duration: 0.3}}>Be resultative and <br/> manage your tasks properly</motion.h3>
      <ul className="text-right italic md:text-lg text-sm">
        {listOfTasks.completed > 0 && <li>You have finished {listOfTasks.completed} task{listOfTasks.comleted === 1 ? '':'s'} succefully. </li>}
        {listOfTasks.failed > 0 && <li>Unfortunately, You have failed {listOfTasks.failed} task{listOfTasks.failed === 1 ? '':'s'}  </li>}
        {listOfTasks.active> 0 && <li>You have {listOfTasks.active} active task{listOfTasks.active === 1 ? '':'s'}. Try to do in time.</li>}
      </ul>
      <h4 className="mt-10 md:text-2xl text-xl">Tasks should be prioritized, urgent tasks are below:</h4>
      <div>
        <label htmlFor="urgentQuantity">How many tasks should be shown here?</label>
        <input type="number" name='urgentQuantity' max={listOfTasks.active} min={0} value={listOfTasks.active < 2 ? listOfTasks.active : currentQuantityUrgent} onChange={handleInput} className="text-gray-900 ml-4 border-teal-900 border-2 text-center"/>
      </div>
      <TaskBoard quantity={currentQuantityUrgent}/>
      <GraphStats />
    </section>
  );
}

export default Stats;
