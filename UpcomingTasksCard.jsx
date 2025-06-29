import React from "react";
import { Calendar, CheckCircle, PlusCircle } from "lucide-react";
import { getCardStyles } from "../utils/themeUtils";

function UpcomingTasksCard({
  tasks,
  setActiveTab,
  toggleTaskComplete,
  currentTheme,
}) {
  const styles = getCardStyles(currentTheme);
  const nonDeletedTasks = tasks.filter((task) => !task.deleted);
  const upcomingTasks = nonDeletedTasks
    .filter((task) => !task.completed)
    .slice(0, 3);

  // Custom styles to prevent scaling on the Calendar icon
  const customStyles = `
    .task-card:hover .calendar-icon {
      transform: scale(1) !important; /* Prevent scaling on hover */
    }
  `;

  return (
    <div className={styles.card}>
      <div className={`p-5 border-b ${styles.border}`}>
        <h2 className={`text-xl font-bold tracking-tight ${styles.title}`}>
          Upcoming Tasks
        </h2>
      </div>
      <div className="p-3 space-y-3">
        <style>{customStyles}</style>
        {upcomingTasks.map((task) => (
          <div
            key={task.id}
            className={`${styles.hoverCard} task-card p-3 rounded-lg flex items-center shadow-sm transition-all duration-300 hover:shadow-md hover:scale-[1.02]`}
          >
            <div className="flex items-center space-x-3">
              <button
                onClick={() => toggleTaskComplete(task.id)}
                className={`p-1 rounded-full transition-all duration-200 ${
                  task.completed ? styles.taskComplete : styles.taskIncomplete
                }`}
              >
                <CheckCircle
                  className={`w-5 h-5 ${task.completed ? "fill-current" : ""}`}
                />
              </button>
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className={`text-base font-semibold ${styles.text}`}>
                    {task.title}
                  </h3>
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      task.priority === "High"
                        ? styles.isDarkMode
                          ? "bg-red-600 text-white"
                          : "bg-red-500 text-white"
                        : task.priority === "Medium"
                          ? styles.isDarkMode
                            ? "bg-orange-600 text-white"
                            : "bg-orange-500 text-white"
                          : styles.isDarkMode
                            ? "bg-green-600 text-white"
                            : "bg-green-500 text-white"
                    }`}
                  >
                    {task.priority}
                  </span>
                </div>
                <p
                  className={`text-sm flex items-center space-x-1 ${styles.mutedText}`}
                >
                  <Calendar className={`${styles.smallIcon} calendar-icon`} />
                  <span>Due: {task.dueDate}</span>
                  <span className="ml-2">Hours: {task.hours || 0}</span>
                </p>
              </div>
            </div>
          </div>
        ))}
        {upcomingTasks.length === 0 && (
          <div
            className={`py-10 text-center text-sm font-medium ${styles.mutedText}`}
          >
            No upcoming tasks. Add one below!
          </div>
        )}
      </div>
      <div className={`p-5 border-t ${styles.border}`}>
        <button
          onClick={() => setActiveTab("tasks")}
          className={styles.buttonTertiary}
        >
          <PlusCircle className="w-5 h-5 mr-2" />
          Add New Task
        </button>
      </div>
    </div>
  );
}

export default UpcomingTasksCard;
