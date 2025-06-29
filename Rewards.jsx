import React from "react";
import PointsDisplay from "./rewards/PointsDisplay";
import Badges from "./rewards/Badges";
import StudyStreaks from "./rewards/StudyStreaks";
import RedeemThemes from "./rewards/RedeemThemes";
import { getCardStyles } from "./utils/themeUtils";

function Rewards({
  points,
  badges,
  studyStats,
  currentTheme,
  onPointsUpdate,
  onThemeUnlock,
  unlockedThemes,
  tasks = [],
}) {
  const styles = getCardStyles(currentTheme);

  return (
    <div className={styles.card}>
      <div className={`p-6 border-b ${styles.border}`}>
        <h2 className={`text-2xl font-bold tracking-tight ${styles.title}`}>
          Rewards & Achievements
        </h2>
      </div>
      <div className="p-8 space-y-10">
        <PointsDisplay points={points} currentTheme={currentTheme} />
        <Badges
          tasks={tasks}
          studyStats={studyStats}
          badges={badges}
          currentTheme={currentTheme}
        />
        <StudyStreaks studyStats={studyStats} currentTheme={currentTheme} />
        <RedeemThemes
          points={points}
          currentTheme={currentTheme}
          onPointsUpdate={onPointsUpdate}
          onThemeUnlock={onThemeUnlock}
          unlockedThemes={unlockedThemes}
        />
      </div>
    </div>
  );
}

export default Rewards;
