import React from "react";
import { getCardStyles } from "../utils/themeUtils";

function TaskCompletionTimeline({ tasks, past7Days, currentTheme }) {
  const styles = getCardStyles(currentTheme);

  const nonDeletedTasks = tasks.filter((task) => !task.deleted);

  const completionData = past7Days.map((dayObj) => {
    const count = nonDeletedTasks.filter(
      (task) => task.completed && task.completedDate === dayObj.date
    ).length;
    return count;
  });

  const maxCompletions = Math.max(...completionData, 1);
  const completionHeights = completionData.map(
    (count) => (count / maxCompletions) * 20
  );
  const hasCompletedTasks = completionData.some((count) => count > 0);

  return (
    <div className={styles.analyticsCard}>
      <h4
        className={`text-lg font-semibold mb-4 tracking-tight ${styles.text}`}
      >
        Task Completion Timeline
      </h4>
      {hasCompletedTasks ? (
        <div className="flex justify-center space-x-3 mt-4">
          {past7Days.map((dayObj, index) => (
            <div key={dayObj.date} className="flex flex-col items-center">
              <div
                className={`w-6 h-${Math.round(completionHeights[index])} ${styles.barCompletion}`}
              ></div>
              <span className={`text-xs font-medium mt-2 ${styles.subtitle}`}>
                {dayObj.day}
              </span>
              <span
                className={`text-xs font-semibold mt-1 ${styles.secondaryText}`}
              >
                {completionData[index]}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <div className={`py-6 text-sm font-medium ${styles.subtitle}`}>
          No tasks completed in the past 7 days. Complete some tasks to see your
          timeline!
        </div>
      )}
    </div>
  );
}

export default TaskCompletionTimeline;
