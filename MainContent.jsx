import React from "react";
import Dashboard from "../Dashboard";
import TaskManager from "../TaskManager";
import Analytics from "../Analytics";
import Rewards from "../Rewards";
import CalendarPage from "../CalendarPage";
import { getCardStyles } from "../utils/themeUtils";

function MainContent({
  activeTab,
  loading,
  tasks,
  studyStats,
  aiSuggestion,
  getStudyTips,
  generateSchedule,
  setActiveTab,
  toggleTaskComplete,
  currentTheme,
  logStudyHours,
  deductStudyHours,
  addTask,
  updateTask,
  deleteTask,
  points,
  badges,
  onPointsUpdate,
  onThemeUnlock,
  unlockedThemes,
}) {
  const styles = getCardStyles(currentTheme);

  return (
    <main className="flex-grow container mx-auto p-4">
      {loading ? (
        <div className="text-center py-8">
          <div className="animate-pulse flex justify-center space-x-3">
            <div className={styles.loadingDot}></div>
            <div className={styles.loadingDot}></div>
            <div className={styles.loadingDot}></div>
          </div>
          <p className={`mt-3 text-sm font-medium ${styles.loadingText}`}>
            Loading your study data...
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {activeTab === "dashboard" && (
            <Dashboard
              tasks={tasks}
              studyStats={studyStats}
              aiSuggestion={aiSuggestion}
              getStudyTips={getStudyTips}
              generateSchedule={generateSchedule}
              setActiveTab={setActiveTab}
              toggleTaskComplete={toggleTaskComplete}
              currentTheme={currentTheme}
              logStudyHours={logStudyHours}
              deductStudyHours={deductStudyHours}
            />
          )}
          {activeTab === "tasks" && (
            <TaskManager
              tasks={tasks}
              addTask={addTask}
              updateTask={updateTask}
              deleteTask={deleteTask}
              toggleTaskComplete={toggleTaskComplete}
              currentTheme={currentTheme}
            />
          )}
          {activeTab === "analytics" && (
            <Analytics
              tasks={tasks}
              studyStats={studyStats}
              currentTheme={currentTheme}
            />
          )}
          {activeTab === "rewards" && (
            <Rewards
              points={points}
              badges={badges}
              studyStats={studyStats}
              currentTheme={currentTheme}
              onPointsUpdate={onPointsUpdate}
              onThemeUnlock={onThemeUnlock}
              unlockedThemes={unlockedThemes}
              tasks={tasks}
            />
          )}
          {activeTab === "calendar" && (
            <CalendarPage
              tasks={tasks}
              toggleTaskComplete={toggleTaskComplete}
              currentTheme={currentTheme}
              setActiveTab={setActiveTab}
            />
          )}
        </div>
      )}
    </main>
  );
}

export default MainContent;
