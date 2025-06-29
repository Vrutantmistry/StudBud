import React from "react";
import { getCardStyles } from "../utils/themeUtils";

function Navigation({ activeTab, setActiveTab, currentTheme }) {
  const styles = getCardStyles(currentTheme);

  return (
    <nav className={`sticky top-0 z-10 ${styles.nav}`}>
      <div className="container mx-auto">
        <div className="flex justify-around md:justify-start md:space-x-8">
          {["dashboard", "tasks", "analytics", "rewards", "calendar"].map(
            (tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-3 font-semibold text-sm transition-all duration-300 relative ${
                  activeTab === tab ? styles.tabActive : styles.tabInactive
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                {activeTab === tab && (
                  <span className="absolute inset-x-0 bottom-0 h-0.5 bg-current transform scale-x-100 transition-transform duration-300" />
                )}
              </button>
            )
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
