import { useMemo } from "react";
import { useVillains } from "../../api/hooks/useVillains";
import { sortVillains } from "../../util/helperFunctions";
import styles from "./Leaderboard.module.css";
import Podium from "./Podium";
import RankingList from "./RankingList";
import PodiumSkeleton from "./Skeletons/PodiumSkeleton";
import RankingSkeleton from "./Skeletons/RankingSkeleton";

const Leaderboard = () => {
  const { data: villains, isLoading, error } = useVillains();

  const sortedVillains = useMemo(() => {
    return [...(villains || [])].sort(sortVillains);
  }, [villains]);

  const topThree = useMemo(() => sortedVillains.slice(0, 3), [sortedVillains]);
  const rest = useMemo(() => sortedVillains.slice(3), [sortedVillains]);

  if (isLoading) {
    return (
      <div className={styles.leaderboard}>
        <PodiumSkeleton />
        <RankingSkeleton rowCount={6} />
      </div>
    );
  }

  if (error)
    return <div className={styles.message}>Error loading villains!</div>;

  return (
    <div className={styles.leaderboard}>
      <Podium villains={topThree} />
      <RankingList villains={rest} />
    </div>
  );
};

export default Leaderboard;
