import { GiCrownedHeart } from "react-icons/gi";
import { Outlet } from "react-router";
import { useWindowSize } from "usehooks-ts";
import styles from "./App.module.css";
import { DesktopNavBar, MobileNavBar } from "./components/NavBar/NavBar";

function App() {
  const { width } = useWindowSize();

  return (
    <div className={styles.layout}>
      <div className={styles.title}>
        <h1>Rule the Realm</h1>
        <GiCrownedHeart />
      </div>
      <div className={styles.page}>
        <Outlet />
      </div>
      {width < 770 ? (
        <MobileNavBar className={styles.mobile} />
      ) : (
        <DesktopNavBar className={styles.desktop} />
      )}
    </div>
  );
}

export default App;
