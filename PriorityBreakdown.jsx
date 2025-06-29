import React from "react";
import { getCardStyles } from "../utils/themeUtils";

function PriorityBreakdown({ tasks, currentTheme }) {
  const styles = getCardStyles(currentTheme);
  const nonDeletedTasks = tasks.filter((task) => !task.deleted);
  const completedTasks = nonDeletedTasks.filter((task) => task.completed);
  const priorityCounts = {
    High: completedTasks.filter((task) => task.priority === "High").length,
    Medium: completedTasks.filter((task) => task.priority === "Medium").length,
    Low: completedTasks.filter((task) => task.priority === "Low").length,
  };
  const totalCompletedTasks = completedTasks.length || 1;
  const priorityPercentages = {
    High: (priorityCounts.High / totalCompletedTasks) * 100,
    Medium: (priorityCounts.Medium / totalCompletedTasks) * 100,
    Low: (priorityCounts.Low / totalCompletedTasks) * 100,
  };
  const hasCompletedTasks = completedTasks.length > 0;

  return (
    <div className={styles.analyticsCard}>
      <h4
        className={`text-lg font-semibold mb-4 tracking-tight ${styles.text}`}
      >
        Priority Breakdown
      </h4>
      {hasCompletedTasks ? (
        <div className="space-y-4 mt-4">
          {["High", "Medium", "Low"].map((priority, index) => (
            <div key={priority} className="flex flex-col items-start">
              <div className="flex items-center w-full">
                <div
                  className={`h-5 rounded-lg shadow-sm transition-all duration-300 hover:scale-[1.02] ${
                    index === 0
                      ? "bg-red-500"
                      : index === 1
                        ? "bg-yellow-500"
                        : "bg-blue-500"
                  }`}
                  style={{ width: `${priorityPercentages[priority]}%` }}
                ></div>
                <span
                  className={`text-sm font-medium ml-3 ${styles.secondaryText}`}
                >
                  {Math.round(priorityPercentages[priority])}%
                </span>
              </div>
              <span className={`text-xs font-medium mt-1 ${styles.subtitle}`}>
                {priority}: {priorityCounts[priority]} task
                {priorityCounts[priority] !== 1 ? "s" : ""}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <div className={`py-6 text-sm font-medium ${styles.subtitle}`}>
          No tasks completed yet. Complete some tasks to see your priority
          breakdown!
        </div>
      )}
    </div>
  );
}

export default PriorityBreakdown;
