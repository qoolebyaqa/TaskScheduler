import { motion } from "framer-motion";
import homePic from "/homePicture.png";
import rotatePic from "/homeRotatePic.png";

function HomePage() {
  return (
    <section>
      <div>
        <h1 className="text-8xl">Your Schedule</h1>
        <p className="mb-10 mt-4 text-3xl">You can, if you will schedule.</p>
        <div className="flex justify-center">
          <img
            src={homePic}
            alt="multitask_bg"
            className="absolute left-1/35 top-1/35"
          />
          <span>
            <motion.img
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
