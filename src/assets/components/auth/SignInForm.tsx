import {  /* useEffect, */ useRef, useState } from "react";
import { auth } from "../../../store/firebase";
import { /* onAuthStateChanged, */ signInWithEmailAndPassword } from "firebase/auth";
import { useDispatch } from "react-redux";
import { newTaskActions } from "../../../store";


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
        <form
          className="flex flex-col mt-10 w-4/12 m-auto gap-4"
          onSubmit={handeSubmit}
        >
          <h2>Enter to your account</h2>
          <div className="flex flex-col">
            <label htmlFor="login">Username</label>
            <input ref={login} type="text" name="login" id="login" className="text-slate-900" />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password">Password</label>
            <input ref={pass} type="password" name="password" id="password" className="text-slate-900" />
          </div>
          <div className="flex gap-5 m-auto">
            <button type="button" onClick={onRevertForm}>Are you novice?</button>
            <button disabled={fetching} className="bg-gray-700">
              {fetching ? "Try to enter..." : "Sign in"}
            </button>
          </div>

          {err && <p className="text-red-800">{err}</p>}
        </form>
    </>
  );
}

export default SignInForm;
