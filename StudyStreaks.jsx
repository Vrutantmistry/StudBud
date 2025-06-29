import React from "react";
import { Flame } from "lucide-react";
import { getCardStyles } from "../utils/themeUtils";

function StudyStreaks({ studyStats, currentTheme }) {
  const styles = getCardStyles(currentTheme);

  return (
    <div>
      <h3
        className={`text-xl font-semibold mb-6 tracking-tight ${styles.title}`}
      >
        Study Streaks
      </h3>
      <div className={styles.pointsDisplay}>
        <Flame className={styles.streakIcon} />
        <h4 className={`text-xl font-semibold ${styles.text}`}>
          Current Streak: {studyStats.streak} Days
        </h4>
        <p className={`text-sm mt-1 ${styles.subtitle}`}>
          Keep studying daily to maintain your streak!
        </p>
      </div>
    </div>
  );
}

export default StudyStreaks;
