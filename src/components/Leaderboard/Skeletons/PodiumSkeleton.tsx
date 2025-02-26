import styles from "../Podium.module.css";

const PodiumSkeleton = () => {
  return (
    <div className={styles.podium}>
      {[1, 2, 3].map((index) => (
        <div
          className={`${styles.place} ${styles.skeleton}`}
          key={`skeleton-${index}`}
        >
          <div className={styles.imageContainer}>
            <div className={styles.skeletonImage} />
            <div className={styles.number}>{index}</div>
          </div>
          <div className={styles.skeletonName} />
          <div className={styles.skeletonWinrate} />
          <div className={styles.skeletonWinrate} />
        </div>
      ))}
    </div>
  );
};

export default PodiumSkeleton;
