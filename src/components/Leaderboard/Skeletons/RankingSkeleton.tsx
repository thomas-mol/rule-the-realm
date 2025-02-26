import styles from "../Leaderboard.module.css";

interface RankingSkeletonProps {
  rowCount?: number;
}

const RankingSkeleton = ({ rowCount = 3 }: RankingSkeletonProps) => {
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
        {Array.from({ length: rowCount }).map((_, index) => (
          <tr key={`skeleton-row-${index}`}>
            <td>
              <p>#{index + 4}</p>
            </td>
            <td>
              <div className={styles.image}>
                <div className={styles.skeletonThumb} />
                <div className={styles.skeletonText} />
              </div>
            </td>
            <td>
              <div className={styles.progress}>
                <div className={styles.skeletonBar} style={{ width: "85%" }} />
              </div>
              <div className={styles.skeletonGamesPlayed} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default RankingSkeleton;
