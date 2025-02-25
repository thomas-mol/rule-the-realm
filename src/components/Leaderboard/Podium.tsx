import { TVillainSchema } from "../../schemas";
import { getWinrate, getTransformedImage } from "../../util/helperFunctions";
import styles from "./Podium.module.css";

interface Props {
  villains: TVillainSchema[];
}
const Podium = ({ villains }: Props) => {
  return (
    <div className={styles.podium}>
      {villains.map((villain, index) => (
        <div className={styles.place} key={villain.id}>
          <div className={styles.imageContainer}>
            <img
              src={getTransformedImage(
                villain.imageUrl,
                "q_auto,f_auto,w_500/"
              )}
              alt={`${villain.name}, ranked #${index + 1}`}
            />
            <div className={styles.number} aria-hidden="true">
              {index + 1}
            </div>
          </div>
          <p className={styles.name}>{villain.name}</p>
          <p className={styles.winrate}>
            {villain.wins + villain.losses} games <br /> {getWinrate(villain)}%
          </p>
        </div>
      ))}
    </div>
  );
};

export default Podium;
