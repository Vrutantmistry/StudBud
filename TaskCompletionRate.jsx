import React from "react";
import { getCardStyles } from "../utils/themeUtils";

function TaskCompletionRate({ tasks, currentTheme }) {
  const styles = getCardStyles(currentTheme);
  const nonDeletedTasks = tasks.filter((task) => !task.deleted);
  const completedTasksCount = nonDeletedTasks.filter(
    (task) => task.completed
  ).length;
  const completionRate =
    nonDeletedTasks.length === 0
      ? 0
      : Math.round((completedTasksCount / nonDeletedTasks.length) * 100);

  return (
    <div className="text-center">
      <div className={styles.completionRate}>
        <div className={styles.completionRateText}>{completionRate}%</div>
      </div>
      <h3 className={`text-xl font-semibold tracking-tight ${styles.text}`}>
        Task Completion Rate
      </h3>
      <p className={`mt-2 text-sm ${styles.subtitle}`}>
        You've completed {completedTasksCount} out of {nonDeletedTasks.length}{" "}
        tasks
      </p>
    </div>
  );
}

export default TaskCompletionRate;
