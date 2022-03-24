import { Link } from "react-router-dom";
import { useLogout } from "../../core/hooks/Logout/useLogout";
import { useSelectUser } from "../../core/hooks/SelectUser/useSelectUser";
import { RouterPathsKeys } from "../../types";
import classes from "./NavBar.module.css";

const LINKS = [
  {
    groups: ["Admins"],
    Link: (
      <Link to={RouterPathsKeys.ORDER} className={classes.link} key={"order"}>
        Orders
      </Link>
    ),
  },
  {
    groups: ["Admins", "Employees"],
    Link: (
      <Link
        to={RouterPathsKeys.EMPLOYEE}
        className={classes.link}
        key={"employees"}
      >
        Employees
      </Link>
    ),
  },
  {
    groups: ["Admins", "Clients"],
    Link: (
      <Link
        to={RouterPathsKeys.CLIENT}
        className={classes.link}
        key={"clients"}
      >
        Clients
      </Link>
    ),
  },
  {
    groups: ["Admins", "Clients"],
    Link: (
      <Link
        to={RouterPathsKeys.COMPANY}
        className={classes.link}
        key={"companys"}
      >
        Companys
      </Link>
    ),
  },
];

export const NavBar = () => {
  const loginOut = useLogout();
  const { role } = useSelectUser();

  const userLinks = LINKS.filter((l) => l.groups.includes(role)).map(
    (l) => l.Link
  );

  return (
    <div className={classes.container}>
      {userLinks}
      <Link to={RouterPathsKeys.SIGN_IN} className={classes.link} key={"chat"}>
        Chat
      </Link>
      <Link to={RouterPathsKeys.SIGN_IN} className={classes.link} key={"files"}>
        Your files
      </Link>
      <Link
        to={RouterPathsKeys.MY_PROFILE}
        className={classes.link}
        key={"profile"}
      >
        Your profile
      </Link>
      <Link
        to={RouterPathsKeys.SIGN_IN}
        className={classes.link}
        onClick={() => loginOut.logout()}
        key={"logout"}
      >
        Log out
      </Link>
    </div>
  );
};
