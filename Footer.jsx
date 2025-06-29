import React from "react";
import { getCardStyles } from "../utils/themeUtils";

function Footer({ currentTheme }) {
  const styles = getCardStyles(currentTheme);

  return (
    <footer className={`py-4 ${styles.layoutTheme}`}>
      <div className="container mx-auto text-center">
        <p className={`text-sm ${styles.footerText}`}>
          © 2025 StudBud. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
