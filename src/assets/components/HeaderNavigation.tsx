import { NavLink } from "react-router-dom";
import paths from "../util/paths";
import { useSelector } from "react-redux";
import { TaskRelatedState } from "../util/types";

function HeaderNavigation() {
  const userIn = useSelector((state: TaskRelatedState) => state.tasksRelated.activeUser);
  return (
    <header className="w-full pb-4">
      <nav>
        <ul className="justify-between flex sm:justify-end sm:gap-12">
          {paths.map((link) => {
            if (link.id === 'taskspage' && !userIn) {
              return <li key={link.id} className="hidden"></li>
            }
            if (link.id === 'loginpage' && userIn) {
              return (
                <li key={link.id}>
                  <NavLink to={link.path} className="list-none">Profile</NavLink>
                </li>
              )
            }
            return (
            <li key={link.id}>
              <NavLink to={link.path} className="list-none">{link.description}</NavLink>
            </li>
          )})}
        </ul>
      </nav>
    </header>
  );
}

export default HeaderNavigation;
