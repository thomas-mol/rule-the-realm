import { Outlet } from "react-router";
import styles from "./App.module.css";
import { MobileNavBar, DesktopNavBar } from "./components/NavBar/NavBar";
import { useWindowSize } from "usehooks-ts";

function App() {
  const { width } = useWindowSize();

  return (
    <div className={styles.layout}>
      <h2 className={styles.title}>Rule the Realm</h2>
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
