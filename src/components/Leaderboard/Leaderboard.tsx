import { useVillains } from "../../api/hooks/useVillains";
import { TVillainSchema } from "../../schemas";
import { getTransformedImage, getWinrate } from "../../util/helperFunctions";
import styles from "./Leaderboard.module.css";
import Podium from "./Podium";

// TODO: - Sort Villains by Games Won / Win Percentage

const Leaderboard = () => {
  const { data: villains, isLoading } = useVillains();

  const sortVillains = (a: TVillainSchema, b: TVillainSchema) => {
    if (b.wins === a.wins) {
      if (a.losses === b.losses) {
        return a.name.localeCompare(b.name);
      }
      return a.losses - b.losses;
    }
    return b.wins - a.wins;
  };

  const getTopThree = (data: TVillainSchema[]) => {
    return data.sort(sortVillains).slice(0, 3);
  };

  const getRest = (data: TVillainSchema[]) => {
    return data.sort(sortVillains).slice(3);
  };

  return (
    <div className={styles.leaderboard}>
      <Podium villains={getTopThree(villains || [])} />
      <RankingList villains={getRest(villains || [])} />
    </div>
  );
};

export default Leaderboard;

interface Props {
  villains: TVillainSchema[];
}

const RankingList = ({ villains }: Props) => {
  return (
    <table className={styles.ranking}>
      <tbody>
        <tr>
          <th></th>
          <th>Villain</th>
          <th>Winrate</th>
        </tr>
        {villains.map((villain, index) => (
          <tr key={index}>
            <td>
              <p>#{index + 4}</p>
            </td>
            <td>
              <div className={styles.image}>
                <img
                  src={getTransformedImage(villain.imageUrl, "q_auto:best/")}
                  alt={villain.name}
                />
                <p>{villain.name}</p>
              </div>
            </td>
            <td>
              <div className={styles.progress}>
                <p
                  className={styles.bar}
                  style={{ width: `${getWinrate(villain) || 0}%` }}
                >
                  {getWinrate(villain) || 0}%
                </p>
              </div>
              <p className={styles.gamesPlayed}>
                {villain.wins + villain.losses} games
              </p>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
