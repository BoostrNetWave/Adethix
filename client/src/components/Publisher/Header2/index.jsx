import { useFullscreen } from "@mantine/hooks";
import { Button } from "@mantine/core";
import { NavLink } from "react-router-dom";
import styles from "./index.module.css";

function index() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { toggle, fullscreen } = useFullscreen();
  return (
    <>
      <nav className={`${styles.navbar} fixed-top navbar navbar-dark`}>
        <ul className={`nav justify-content-end ${styles.nav}`}>
          <Button onClick={toggle} color={fullscreen ? "red" : "blue"}>
            {fullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
          </Button>
          <li className="nav-item">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `${isActive ? styles.active : styles.deavtive}`
              }
            >
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/auth/signup"
              className={({ isActive }) =>
                `${isActive ? styles.active : styles.deavtive}`
              }
            >
              Signup
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/auth/login"
              className={({ isActive }) =>
                `${isActive ? styles.active : styles.deavtive}`
              }
            >
              Login
            </NavLink>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default index;
