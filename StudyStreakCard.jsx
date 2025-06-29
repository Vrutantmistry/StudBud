import React from "react";
import { Calendar } from "lucide-react";
import { getCardStyles } from "../utils/themeUtils";

function StudyStreakCard({ studyStats, currentTheme }) {
  const styles = getCardStyles(currentTheme);
  const streak = studyStats.streak || 0;
  const rangeEnd = Math.ceil(streak / 7) * 7;
  const rangeStart = streak > 0 ? rangeEnd - 6 : 1;
  const streakRange = Array.from({ length: 7 }, (_, i) => rangeStart + i);

  return (
    <div className={`${styles.card} ${styles.hoverShadow} p-6`}>
      <div className="flex justify-between items-center mb-4">
        <h3 className={`text-sm font-medium tracking-wide ${styles.subtitle}`}>
          Study Streak
        </h3>
        <Calendar className={styles.icon} />
      </div>
      <p className={`text-4xl font-extrabold tracking-tight ${styles.text}`}>
        {studyStats.streak} days
      </p>
      <div className="flex space-x-2 mt-4">
        {streakRange.map((day) => (
          <div
            key={day}
            className={
              day <= studyStats.streak
                ? styles.streakActive
                : styles.streakInactive
            }
          >
            {day}
          </div>
        ))}
      </div>
    </div>
  );
}

export default StudyStreakCard;
