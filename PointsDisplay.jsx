import React from "react";
import { getCardStyles } from "../utils/themeUtils";

function PointsDisplay({ points, currentTheme }) {
  const styles = getCardStyles(currentTheme);
  const pointsTextStyle =
    points < 0 ? styles.pointsTextNegative : styles.pointsTextPositive;

  return (
    <div className={styles.pointsDisplay}>
      <h3 className={pointsTextStyle}>{points}</h3>
      <p className={`text-lg font-medium ${styles.secondaryText}`}>
        Total Points Earned
      </p>
    </div>
  );
}

export default PointsDisplay;
