import { motion } from "framer-motion";
import homePic from "/homePicture.png";
import rotatePic from "/homeRotatePic.png";

function HomePage() {
  return (
    <section>
      <div>
        <h1 className="text-4xl mt-8 sm:text-8xl">Your Schedule</h1>
        <p className="text-xl mt-8 mb-32 sm:mb-10 sm:mt-4 sm:text-3xl">You can, if you will schedule.</p>
        <div className="flex justify-center">
          <img
            src={homePic}
            alt="multitask_bg"
            className="absolute left-1/35 top-1/35 w-2/3 sm:w-auto"
          />
          <span>
            <motion.img
              className="w-3/4 relative left-12 sm:w-auto sm:static"
              src={rotatePic}
              alt="rotate-resources"
              animate={{ rotate: 360 }}
              transition={{repeat: Infinity, duration: 4, repeatDelay: 0, ease: "linear", bounce: 0}}
            />
          </span>
        </div>
      </div>
    </section>
  );
}

export default HomePage;
