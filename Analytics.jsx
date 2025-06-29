import React from "react";
import TaskCompletionRate from "./analytics/TaskCompletionRate";
import TaskCompletionTimeline from "./analytics/TaskCompletionTimeline";
import PriorityBreakdown from "./analytics/PriorityBreakdown";
import StudyHoursTrend from "./analytics/StudyHoursTrend";
import ProductivitySnapshot from "./analytics/ProductivitySnapshot";
import { getCardStyles } from "./utils/themeUtils";

function Analytics({ tasks, studyStats, currentTheme }) {
  const styles = getCardStyles(currentTheme);

  // Generate past7Days in IST
  const today = new Date();
  // Use toLocaleDateString to get the correct date in IST
  const todayStr = today.toLocaleDateString("en-CA", {
    timeZone: "Asia/Kolkata",
  }); // "2025-06-03"
  const todayAdjusted = new Date(todayStr); // Create a date object from the IST date string

  const daysOfWeek = ["S", "M", "T", "W", "T", "F", "S"];
  const past7Days = Array(7)
    .fill(0)
    .map((_, index) => {
      const date = new Date(todayAdjusted);
      date.setDate(todayAdjusted.getDate() - (6 - index));
      return {
        date: date.toLocaleDateString("en-CA", { timeZone: "Asia/Kolkata" }), // YYYY-MM-DD in IST
        day: daysOfWeek[date.getDay()],
      };
    });

  return (
    <div className={styles.card}>
      <div className={`p-5 border-b ${styles.border}`}>
        <h2 className={`text-xl font-bold tracking-tight ${styles.title}`}>
          Study Analytics
        </h2>
      </div>
      <div className="p-8 text-center space-y-10">
        <TaskCompletionRate tasks={tasks} currentTheme={currentTheme} />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <TaskCompletionTimeline
            tasks={tasks}
            past7Days={past7Days}
            currentTheme={currentTheme}
          />
          <PriorityBreakdown tasks={tasks} currentTheme={currentTheme} />
          <StudyHoursTrend
            studyStats={studyStats}
            past7Days={past7Days}
            currentTheme={currentTheme}
          />
        </div>
        <ProductivitySnapshot
          tasks={tasks}
          past7Days={past7Days}
          currentTheme={currentTheme}
        />
      </div>
    </div>
  );
}

export default Analytics;
