import React from "react";
import AIAssistantCard from "./dashboard/AIAssistantCard";
import StudyHoursCard from "./dashboard/StudyHoursCard";
import TasksCompletedCard from "./dashboard/TasksCompletedCard";
import StudyStreakCard from "./dashboard/StudyStreakCard";
import UpcomingTasksCard from "./dashboard/UpcomingTasksCard";

function Dashboard({
  tasks,
  studyStats,
  aiSuggestion,
  getStudyTips,
  generateSchedule,
  setActiveTab,
  toggleTaskComplete,
  currentTheme,
}) {
  return (
    <div className="space-y-8">
      <AIAssistantCard
        aiSuggestion={aiSuggestion}
        getStudyTips={getStudyTips}
        generateSchedule={generateSchedule}
        currentTheme={currentTheme}
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StudyHoursCard
          tasks={tasks}
          studyStats={studyStats}
          currentTheme={currentTheme}
        />
        <TasksCompletedCard
          tasks={tasks}
          studyStats={studyStats}
          currentTheme={currentTheme}
        />
        <StudyStreakCard studyStats={studyStats} currentTheme={currentTheme} />
      </div>
      <UpcomingTasksCard
        tasks={tasks}
        setActiveTab={setActiveTab}
        toggleTaskComplete={toggleTaskComplete}
        currentTheme={currentTheme}
      />
    </div>
  );
}

export default Dashboard;
