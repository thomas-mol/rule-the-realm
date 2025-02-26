import { TVillainSchema } from "../../schemas";
import { getTransformedImage, getWinrate } from "../../util/helperFunctions";
import styles from "./Leaderboard.module.css";

interface RankingListProps {
  villains: TVillainSchema[];
}

const RankingList = ({ villains }: RankingListProps) => {
  if (!villains.length) return null;

  return (
    <table className={styles.ranking}>
      <thead>
        <tr>
          <th scope="col"></th>
          <th scope="col">Villain</th>
          <th scope="col">Winrate</th>
        </tr>
      </thead>
      <tbody>
        {villains.map((villain, index) => {
          const winrate = getWinrate(villain) || 0;
          const gamesPlayed = villain.wins + villain.losses;

          return (
            <tr key={villain.id}>
              <td>
                <p>#{index + 4}</p>
              </td>
              <td>
                <div className={styles.image}>
                  <img
                    src={getTransformedImage(
                      villain.imageUrl,
                      "q_auto,f_auto,w_100/"
                    )}
                    alt={`Thumbnail of ${villain.name}`}
                    width={100}
                    height={100}
                  />
                  <p>{villain.name}</p>
                </div>
              </td>
              <td>
                <div className={styles.progress}>
                  <p
                    className={styles.bar}
                    style={{ width: `${winrate}%` }}
                    title={`${winrate}% win rate`}
                  >
                    {winrate}%
                  </p>
                </div>
                <p className={styles.gamesPlayed}>{gamesPlayed} games</p>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default RankingList;
