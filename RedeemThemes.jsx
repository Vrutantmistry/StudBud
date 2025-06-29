import React from "react";
import { Moon, Waves, Sun, Leaf } from "lucide-react";
import { toast } from "react-toastify";
import { getCardStyles } from "../utils/themeUtils";

const unlockableThemes = [
  {
    name: "Dark Mode",
    cost: 50,
    description: "A sleek dark theme for night owls.",
    icon: (
      <Moon className="w-8 h-8 text-indigo-500 transition-transform duration-300 hover:scale-110" />
    ),
  },
  {
    name: "Ocean Breeze",
    cost: 50,
    description: "A refreshing blue and teal gradient theme.",
    icon: (
      <Waves className="w-8 h-8 text-teal-500 transition-transform duration-300 hover:scale-110" />
    ),
  },
  {
    name: "Sunset Glow",
    cost: 50,
    description: "A warm theme with hues of orange and pink.",
    icon: (
      <Sun className="w-8 h-8 text-orange-500 transition-transform duration-300 hover:scale-110" />
    ),
  },
  {
    name: "Forest Whisper",
    cost: 50,
    description: "A calming green theme inspired by nature.",
    icon: (
      <Leaf className="w-8 h-8 text-green-500 transition-transform duration-300 hover:scale-110" />
    ),
  },
];

function RedeemThemes({
  points,
  currentTheme,
  onPointsUpdate,
  onThemeUnlock,
  unlockedThemes,
}) {
  const styles = getCardStyles(currentTheme);
  const isDarkMode = currentTheme === "Dark Mode";

  const handleRedeemTheme = (theme) => {
    if (points < theme.cost) {
      toast.error("Not enough points to redeem this theme!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        ...(isDarkMode ? {} : { theme: "light" }),
      });
      return;
    }

    const newPoints = points - theme.cost;
    onPointsUpdate(newPoints);
    onThemeUnlock(theme.name);
    toast.success(`${theme.name} theme unlocked!`, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      ...(isDarkMode ? {} : { theme: "light" }),
    });
  };

  return (
    <div>
      <h3
        className={`text-xl font-semibold mb-6 tracking-tight ${styles.title}`}
      >
        Redeem Themes
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {unlockableThemes.map((theme) => {
          const isUnlocked = unlockedThemes.includes(theme.name);
          const canRedeem = points >= theme.cost && !isUnlocked;
          return (
            <div
              key={theme.name}
              className={
                isUnlocked ? styles.themeCardUnlocked : styles.themeCardLocked
              }
            >
              <div className="flex justify-center mb-3">{theme.icon}</div>
              <h4 className={`font-semibold text-lg ${styles.text}`}>
                {theme.name}
              </h4>
              <p className={`text-sm mt-1 ${styles.subtitle}`}>
                {theme.description}
              </p>
              <p className={`text-sm font-medium mt-2 ${styles.secondaryText}`}>
                Cost: {theme.cost} Points
              </p>
              <p
                className={`text-sm font-medium mt-2 ${isUnlocked ? styles.earnedText : styles.notEarnedText}`}
              >
                {isUnlocked ? "Unlocked!" : "Not yet unlocked"}
              </p>
              {!isUnlocked && (
                <button
                  onClick={() => handleRedeemTheme(theme)}
                  className={`mt-4 px-5 py-2 rounded-lg text-white text-sm font-semibold transition-all duration-200 transform hover:scale-105 ${
                    canRedeem
                      ? styles.buttonPrimary
                      : "bg-gray-400 cursor-not-allowed opacity-70"
                  }`}
                  disabled={!canRedeem}
                >
                  Redeem
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default RedeemThemes;
