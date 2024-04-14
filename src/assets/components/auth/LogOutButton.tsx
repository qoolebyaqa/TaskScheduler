import { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../../store/firebase";
import { useDispatch } from "react-redux";
import { newTaskActions } from "../../../store";

function LogOutButton() {
  const [fetching, setFetching] = useState(false);
  const [err, setErr] = useState("");
  const dispatch = useDispatch();
  async function handleSignOut() {
    setFetching(true);
    try {
      await signOut(auth);
      dispatch(newTaskActions.setActiveUser(''));
    } catch (err) {
      setErr('Problem with firebase. Could not log out')
    }
    setFetching(false);
  }
  
  window.addEventListener('beforeunload', handleSignOut);

  return ( <button onClick={handleSignOut} disabled={fetching} className="text-red-800">
    Log Out
    <span>{err}</span>
  </button> );
}

export default LogOutButton;