import React from "react";
import { BookOpen } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSun,
  faMoon,
  faWater,
  faFire,
  faLeaf,
} from "@fortawesome/free-solid-svg-icons";
import { getCardStyles } from "../utils/themeUtils";

const themeIcons = {
  "Light Mode": faSun,
  "Dark Mode": faMoon,
  "Ocean Breeze": faWater,
  "Sunset Glow": faFire,
  "Forest Whisper": faLeaf,
};

function Header({ currentTheme, nextTheme, onThemeChange, setActiveTab }) {
  const styles = getCardStyles(currentTheme);

  return (
    <header className={`p-4 ${styles.header}`}>
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold flex items-center">
            <button
              onClick={() => setActiveTab("dashboard")}
              className="flex items-center focus:outline-none"
            >
              <BookOpen className="w-8 h-8 mr-3" />
              StudBud
            </button>
          </h1>
          <button
            onClick={onThemeChange}
            className="text-2xl p-2 rounded-full transition-all duration-200 hover:scale-110"
          >
            <FontAwesomeIcon icon={themeIcons[nextTheme]} />
          </button>
        </div>
        <div className={styles.dateDisplay}>
          {new Date().toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </div>
      </div>
    </header>
  );
}

export default Header;
