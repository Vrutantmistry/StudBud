import React from "react";
import { Trophy, Medal, Flame } from "lucide-react";
import { getCardStyles } from "../utils/themeUtils";

const availableBadges = [
  {
    name: "Priority Master",
    description: "Complete 5 high-priority tasks",
    icon: (
      <Trophy className="w-10 h-10 text-yellow-500 transition-transform duration-300 hover:scale-110" />
    ),
    goal: 5,
  },
  {
    name: "Task Titan",
    description: "Complete 10 tasks",
    icon: (
      <Medal className="w-10 h-10 text-yellow-500 transition-transform duration-300 hover:scale-110" />
    ),
    goal: 10,
  },
  {
    name: "Early Bird",
    description: "Complete 3 tasks before their due date",
    icon: (
      <Trophy className="w-10 h-10 text-yellow-500 transition-transform duration-300 hover:scale-110" />
    ),
    goal: 3,
  },
  {
    name: "Streak Star",
    description: "Maintain a 7-day study streak",
    icon: (
      <Flame className="w-10 h-10 text-yellow-500 transition-transform duration-300 hover:scale-110" />
    ),
    goal: 7,
  },
];

function Badges({ tasks, studyStats, badges, currentTheme }) {
  const styles = getCardStyles(currentTheme);

  const completedHighPriorityTasks = tasks.filter(
    (task) => task.completed && task.priority === "High"
  ).length;
  const totalCompletedTasks = tasks.filter((task) => task.completed).length;
  const earlyCompletedTasks = tasks.filter(
    (task) => task.completed && task.completedDate < task.dueDate
  ).length;
  const currentStreak = studyStats.streak || 0;

  const badgeProgress = {
    "Priority Master": completedHighPriorityTasks,
    "Task Titan": totalCompletedTasks,
    "Early Bird": earlyCompletedTasks,
    "Streak Star": currentStreak,
  };

  return (
    <div>
      <h3
        className={`text-xl font-semibold mb-6 tracking-tight ${styles.title}`}
      >
        Your Badges
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {availableBadges.map((badge) => {
          const isEarned = badges.includes(badge.name);
          const progress = badgeProgress[badge.name];
          const remaining = badge.goal - progress;
          return (
            <div
              key={badge.name}
              className={
                isEarned ? styles.badgeCardEarned : styles.badgeCardNotEarned
              }
            >
              <div className="flex justify-center">{badge.icon}</div>
              <h4 className={`font-semibold mt-3 text-lg ${styles.text}`}>
                {badge.name}
              </h4>
              <p className={`text-sm mt-1 ${styles.subtitle}`}>
                {badge.description}
              </p>
              <p
                className={`text-sm font-medium mt-2 ${isEarned ? styles.earnedText : styles.notEarnedText}`}
              >
                {isEarned ? "Earned!" : "Not yet earned"}
              </p>
              {!isEarned && (
                <p className={`text-sm font-medium mt-1 ${styles.subtitle}`}>
                  {badge.name === "Streak Star"
                    ? `Days remaining: ${remaining > 0 ? remaining : 0}`
                    : `Tasks remaining: ${remaining > 0 ? remaining : 0}`}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Badges;
