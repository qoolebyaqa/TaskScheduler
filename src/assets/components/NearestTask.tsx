import { useState } from "react";
import { motion } from "framer-motion";

function NearestTask({title, description, reserveDays}:any) {
  const [visibleDetails, setVisibleDetails] = useState(false);

  function handleDetailsVisible() {
    setVisibleDetails(prev => !prev);
  }
  return ( <div className="bg-slate-600 w-1/2 mx-auto my-4 rounded-lg border-neutral-950 border-2">
    <div className="flex justify-center items-center gap-2 bg-orange-300">
      <p className="text-3xl text-slate-950">Title: {title}</p>
      <motion.button className='triangle'
      animate={{rotate: visibleDetails ? -90 : 0}}
      transition={{duration: 0.5}}
      onClick={handleDetailsVisible}></motion.button>
    </div>
    {visibleDetails && <motion.p animate={{x:0}} initial={{x: -120}} transition={{duration: 0.3}}>{description}</motion.p>}
    
    <p className={reserveDays > 3 ? 'text-teal-500': 'text-red-900'}>You have {reserveDays} days before deadline</p>
  </div> );
}

export default NearestTask;