import { useState } from "react";
import { auth, createUser } from "../../../store/firebase";
import LogOutButton from "./LogOutButton";
import SignInForm from "./SignInForm";
import { useDispatch, useSelector } from "react-redux";
import Stats from "../Stats";
import { signInWithEmailAndPassword } from "firebase/auth";
import { newTaskActions } from "../../../store";


function CreateUserForm() {
  const [fetching, setFetching] = useState(false);
  const [err, setErr] = useState("");
  const [showSignIn, setShowSignIn] = useState(false);
  const activeUser = useSelector((state:any) => state.tasksRelated.activeUser);
  const dispatch = useDispatch();

  /* useEffect(() => {
    const authChecker = onAuthStateChanged(auth, async (user: any) => {
     if (user) {
       const response = await fetch("https://udemy-max-b1bc4-default-rtdb.asia-southeast1.firebasedatabase.app/usertasks.json");
       const resData = await response.json();
     for (let key in resData) {
       resData[key].tasksArr.id = key;
     }
     dispatch(newTaskActions.tasksUpdater(filterDb(resData, user.email)));    
     dispatch(newTaskActions.setActiveUser(user.email));
     dispatch(newTaskActions.filterOfTotalTasks());
     } else {
      dispatch(newTaskActions.setActiveUser(''));
     }
   });
   return () => {
     authChecker();
   };
 }, []);
  */

  
  async function handeSubmit(event: any) {
    event.preventDefault();
    const fd = new FormData(event.target);
    const data:any = Object.fromEntries(fd.entries());
    if (!data.login || !data.password) {
      setErr('Please fill all required fields');
      return;
    }
    setFetching(true);
    try {
      await createUser(data.login, data.password);
      await signInWithEmailAndPassword(auth, data.login, data.password);       
      dispatch(newTaskActions.setActiveUser(data.login));
    } catch (err) {
      setErr("Could not register, the user has already exist");
    }
    setFetching(false);
  }

  function handleShowSignIn() {
    setShowSignIn(true);
  }
  function handleHideSignIn() {
    setShowSignIn(false);
  }

  return (
    <>
      {(!activeUser && !showSignIn) ? (
        <form
          className="flex flex-col mt-10 w-4/12 m-auto gap-4"
          onSubmit={handeSubmit}
        >
          <h2>Registration of new User</h2>
          <div className="flex flex-col">
            <label htmlFor="login">Username</label>
            <input type="text" name="login" id="login" className="text-slate-900" />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password" className="text-slate-900" />
          </div>
          <div className="flex gap-5 m-auto">
            <button disabled={fetching} className="bg-gray-700">
              {fetching ? "Try to register..." : "Create User"}
            </button>
            <button type="button" onClick={handleShowSignIn}>Do you have an account?</button>
          </div>
          {err && <p className="text-red-800">{err}</p>}
        </form>
      ) : activeUser ? (<>
        <div className="flex justify-between">
          <h2>Hello, {activeUser}</h2>
          <LogOutButton />
        </div>
        <Stats />
        </>
      ): <SignInForm onRevertForm={handleHideSignIn}/>}
    </>
  );
}

export default CreateUserForm;
