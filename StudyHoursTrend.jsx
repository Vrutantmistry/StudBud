import React from "react";
import { getCardStyles } from "../utils/themeUtils";

function StudyHoursTrend({ studyStats, past7Days, currentTheme }) {
  const styles = getCardStyles(currentTheme);

  const studyHoursData = past7Days.map((dayObj) => {
    const log = (studyStats.studyHoursLog || []).find(
      (log) => log.date === dayObj.date
    );
    const hours = log ? log.hours : 0;
    return hours;
  });

  const maxHours = Math.max(...studyHoursData, 1);
  const studyHoursHeights = studyHoursData.map(
    (hours) => (hours / maxHours) * 20
  );
  const hasStudyHours = studyHoursData.some((hours) => hours > 0);

  return (
    <div className={styles.analyticsCard}>
      <h4
        className={`text-lg font-semibold mb-4 tracking-tight ${styles.text}`}
      >
        Study Hours Trend
      </h4>
      {hasStudyHours ? (
        <div className="flex justify-center space-x-3 mt-4">
          {past7Days.map((dayObj, index) => (
            <div key={dayObj.date} className="flex flex-col items-center">
              <div
                className={`w-6 h-${Math.round(studyHoursHeights[index])} ${styles.barHours}`}
              ></div>
              <span className={`text-xs font-medium mt-2 ${styles.subtitle}`}>
                {dayObj.day}
              </span>
              <span
                className={`text-xs font-semibold mt-1 ${styles.secondaryText}`}
              >
                {studyHoursData[index]}h
              </span>
            </div>
          ))}
        </div>
      ) : (
        <div className={`py-6 text-sm font-medium ${styles.subtitle}`}>
          No study hours logged in the past 7 days. Log some hours to see your
          trend!
        </div>
      )}
    </div>
  );
}

export default StudyHoursTrend;
