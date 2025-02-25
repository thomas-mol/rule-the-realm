import { FaGithub, FaPlus } from "react-icons/fa";
import { GiPodium } from "react-icons/gi";
import { NavLink } from "react-router";
import styles from "./NavBar.module.css";

interface Props {
  className?: string;
}

export const MobileNavBar = ({ className }: Props) => {
  return (
    <nav className={`${styles.mobile} ${className}`}>
      <NavLink
        className={({ isActive }) => (isActive ? styles.active : "")}
        to={"/"}
      >
        <GiPodium />
      </NavLink>
      <NavLink
        className={({ isActive }) => (isActive ? styles.active : "")}
        to={"/form"}
      >
        <FaPlus />
      </NavLink>
    </nav>
  );
};

export const DesktopNavBar = ({ className }: Props) => {
  return (
    <nav className={`${styles.desktop} ${className}`}>
      <NavLink
        className={({ isActive }) => (isActive ? styles.active : "")}
        to={"/"}
      >
        <GiPodium /> Leaderboard
      </NavLink>
      <NavLink
        className={({ isActive }) => (isActive ? styles.active : "")}
        to={"/form"}
      >
        <FaPlus /> Add a Game
      </NavLink>
      <NavLink
        to={"https://github.com/thomas-mol/rule-the-realm"}
        target="_blank"
      >
        <FaGithub />
        Github
      </NavLink>
    </nav>
  );
};

export default MobileNavBar;
