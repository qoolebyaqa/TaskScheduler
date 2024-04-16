import {  /* useEffect, */ useRef, useState } from "react";
import { auth } from "../../../store/firebase";
import { /* onAuthStateChanged, */ signInWithEmailAndPassword } from "firebase/auth";
import { useDispatch } from "react-redux";
import { newTaskActions } from "../../../store";
import { motion } from "framer-motion";


export function filterDb (objFromDB:any, username:any) {
  const arrData: any[] = [];
  for (let i in objFromDB) {
    if (objFromDB[i].sender === username) {
      arrData.push(objFromDB[i].tasksArr)
    }
  }
  return arrData;
}


function SignInForm({onRevertForm}:any) {
  const [fetching, setFetching] = useState(false);
  const [err, setErr] = useState("");
  const dispatch = useDispatch();
  const pass = useRef<HTMLInputElement | null>(null);
  const login = useRef<HTMLInputElement | null>(null);

  async function handeSubmit(event: any) {
    event.preventDefault();
    if (login.current!.value === '' && pass.current!.value === ''){
      setErr('Please fill all required fields');
      return;
    }
    setFetching(true);
    try {
      await signInWithEmailAndPassword(auth, login.current!.value, pass.current!.value);
      const response = await fetch("https://udemy-max-b1bc4-default-rtdb.asia-southeast1.firebasedatabase.app/usertasks.json");
      const resData = await response.json();
      for (let key in resData) {
        resData[key].tasksArr.id = key;
        resData[key].tasksArr.today = Date.now();
      }
      dispatch(newTaskActions.tasksUpdater(filterDb(resData, login.current?.value)));    
      dispatch(newTaskActions.setActiveUser(login.current?.value));
      dispatch(newTaskActions.filterOfTotalTasks());
    } catch (err) {
      setErr('Wrong login or password');
    }
    setFetching(false);
  }

  return (
    <>
        <motion.form
          initial={{x: 500}}
          animate={{x: 0}}
          className="flex flex-col mt-10 sm:w-1/2 xl:w-1/3 w-11/12 m-auto gap-4 text-teal-800 bg-white md:p-12 p-5 rounded-lg"
          onSubmit={handeSubmit}
        >
          <h2 className="text-sm sm:text-xl md:text-2xl font-bold">Sign in to Schedule</h2>
          <p className="text-sm md:text-base">Enter to your account</p>
          <div className="flex flex-col">
            <label htmlFor="login">Username</label>
            <input ref={login} type="text" name="login" id="login" className="text-slate-900 border-2 border-black"  />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password">Password</label>
            <input ref={pass} type="password" name="password" id="password" className="text-slate-900 border-2 border-black"  />
          </div>
          <div className="flex sm:gap-5 gap-2 m-auto md:text-base sm:text-sm text-xs">
            <button type="button" onClick={onRevertForm}>Need to create an account?</button>
            <button disabled={fetching} className="bg-cyan-600 rounded-lg sm:w-40 w-1/2 border-2 border-black text-black h-8 md:h-10 disabled:bg-sky-300">
              {fetching ? "Try to enter..." : "Sign in"}
            </button>
          </div>

          {err && <p className="text-red-800">{err}</p>}
        </motion.form>
    </>
  );
}

export default SignInForm;
