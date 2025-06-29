import React from "react";
import { Clock } from "lucide-react";
import { getCardStyles } from "../utils/themeUtils";

function StudyHoursCard({ tasks, studyStats, currentTheme }) {
  const styles = getCardStyles(currentTheme);

  // Filter for completed tasks only
  const completedTasks = tasks.filter((task) => task.completed);

  // Calculate total hours for each priority from completed tasks
  const priorityHours = {
    High: completedTasks
      .filter((task) => task.priority === "High")
      .reduce((sum, task) => sum + (task.hours || 0), 0),
    Medium: completedTasks
      .filter((task) => task.priority === "Medium")
      .reduce((sum, task) => sum + (task.hours || 0), 0),
    Low: completedTasks
      .filter((task) => task.priority === "Low")
      .reduce((sum, task) => sum + (task.hours || 0), 0),
  };

  return (
    <div className={`${styles.card} ${styles.hoverShadow} p-6`}>
      <div className="flex justify-between items-center mb-4">
        <h3 className={`text-sm font-medium tracking-wide ${styles.subtitle}`}>
          Study Hours
        </h3>
        <Clock className={styles.icon} />
      </div>
      <p className={`text-4xl font-extrabold tracking-tight ${styles.text}`}>
        {studyStats.totalHours}h
      </p>
      <div className="mt-4 space-y-2">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 rounded-full bg-red-500"></div>
          <span className={`text-sm font-medium ${styles.secondaryText}`}>
            High: {priorityHours.High}h
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 rounded-full bg-orange-500"></div>
          <span className={`text-sm font-medium ${styles.secondaryText}`}>
            Medium: {priorityHours.Medium}h
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 rounded-full bg-green-500"></div>
          <span className={`text-sm font-medium ${styles.secondaryText}`}>
            Low: {priorityHours.Low}h
          </span>
        </div>
      </div>
    </div>
  );
}

export default StudyHoursCard;
