import React from "react";
import { getCardStyles } from "../utils/themeUtils";

function AIAssistantCard({
  aiSuggestion,
  getStudyTips,
  generateSchedule,
  currentTheme,
}) {
  const styles = getCardStyles(currentTheme);

  return (
    <div className={`${styles.card} p-6`}>
      <h2
        className={`text-xl font-bold mb-4 flex items-center tracking-tight ${styles.title}`}
      >
        <div className={styles.dotContainer}>
          <div className={styles.innerDot}></div>
        </div>
        AI Study Assistant
      </h2>
      <div className={styles.aiContent}>
        {aiSuggestion ? (
          <div className="whitespace-pre-line text-sm leading-relaxed">
            {aiSuggestion}
          </div>
        ) : (
          <div className="flex items-center justify-center h-16">
            <div className="animate-pulse flex space-x-3">
              <div className={styles.dot}></div>
              <div className={styles.dot}></div>
              <div className={styles.dot}></div>
            </div>
          </div>
        )}
      </div>
      <div className="mt-5 flex space-x-3">
        <button onClick={getStudyTips} className={styles.buttonPrimary}>
          Get Study Tips
        </button>
        <button onClick={generateSchedule} className={styles.buttonSecondary}>
          Generate Report
        </button>
      </div>
    </div>
  );
}

export default AIAssistantCard;
