import { useState } from "react";
import { motion } from "framer-motion";

function NearestTask({title, description, reserveDays}:any) {
  const [visibleDetails, setVisibleDetails] = useState(false);

  function handleDetailsVisible() {
    setVisibleDetails(prev => !prev);
  }
  return ( <div className="bg-white sm:w-1/2 w-11/12 mx-auto my-4 rounded-lg border-neutral-950 border-2" >
    <motion.div className="flex justify-center items-center gap-2 bg-orange-300" initial={{x: 100}} animate={{x: 0}}>
      <p className="md:text-3xl text-lg text-slate-950">Title: {title}</p>
      <motion.button className='triangle'
      animate={{rotate: visibleDetails ? -90 : 0}}
      transition={{duration: 0.5}}
      onClick={handleDetailsVisible}></motion.button>
    </motion.div>
    {visibleDetails && <motion.p animate={{x:0}} initial={{x: -120}} transition={{duration: 0.3}} className="text-slate-950">{description}</motion.p>}
    
    <p className={reserveDays > 3 ? 'text-teal-500': 'text-red-900'}>You have {reserveDays} days before deadline</p>
  </div> );
}

export default NearestTask;