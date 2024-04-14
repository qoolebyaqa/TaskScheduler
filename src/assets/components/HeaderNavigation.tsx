import { NavLink } from "react-router-dom";
import paths from "../util/paths";
import { useSelector } from "react-redux";

function HeaderNavigation() {
  const userIn = useSelector((state: any) => state.tasksRelated.activeUser);
  return (
    <header className="w-full">
      <nav>
        <ul className="flex justify-end gap-12">
          {paths.map((link) => {
            if (link.id === 'taskspage' && !userIn) {
              return <li key={link.id}></li>
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
