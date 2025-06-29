import React from "react";
import { CheckCircle } from "lucide-react";
import { getCardStyles } from "../utils/themeUtils";

function TasksCompletedCard({ tasks, studyStats, currentTheme }) {
  const styles = getCardStyles(currentTheme);
  const completedTasks = tasks.filter((task) => task.completed);
  const priorityCounts = {
    High: completedTasks.filter((task) => task.priority === "High").length,
    Medium: completedTasks.filter((task) => task.priority === "Medium").length,
    Low: completedTasks.filter((task) => task.priority === "Low").length,
  };

  return (
    <div className={`${styles.card} ${styles.hoverShadow} p-6`}>
      <div className="flex justify-between items-center mb-4">
        <h3 className={`text-sm font-medium tracking-wide ${styles.subtitle}`}>
          Tasks Completed
        </h3>
        <CheckCircle className={styles.icon} />
      </div>
      <p className={`text-4xl font-extrabold tracking-tight ${styles.text}`}>
        {studyStats.completedTasks}
      </p>
      <div className="mt-4 space-y-2">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 rounded-full bg-red-500"></div>
          <span className={`text-sm font-medium ${styles.secondaryText}`}>
            High: {priorityCounts.High}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
          <span className={`text-sm font-medium ${styles.secondaryText}`}>
            Medium: {priorityCounts.Medium}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 rounded-full bg-blue-500"></div>
          <span className={`text-sm font-medium ${styles.secondaryText}`}>
            Low: {priorityCounts.Low}
          </span>
        </div>
      </div>
    </div>
  );
}

export default TasksCompletedCard;
