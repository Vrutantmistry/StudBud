import React from "react";
import { ArrowUpDown, Filter } from "lucide-react";
import { getCardStyles } from "../utils/themeUtils";

function SortFilterControls({
  sortBy,
  setSortBy,
  filterBy,
  setFilterBy,
  currentTheme,
}) {
  const styles = getCardStyles(currentTheme);

  return (
    <div className={`${styles.formSection} flex flex-wrap gap-3`}>
      <div className="flex items-center space-x-2">
        <ArrowUpDown className={styles.sortFilterIcon} />
        <label className={`text-sm font-medium ${styles.text}`}>Sort by:</label>
        <select
          className={styles.input}
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="dueDateAsc">Due Date (Earliest First)</option>
          <option value="dueDateDesc">Due Date (Latest First)</option>
          <option value="priorityAsc">Priority (Low to High)</option>
          <option value="priorityDesc">Priority (High to Low)</option>
        </select>
      </div>
      <div className="flex items-center space-x-2">
        <Filter className={styles.sortFilterIcon} />
        <label className={`text-sm font-medium ${styles.text}`}>Filter:</label>
        <select
          className={styles.input}
          value={filterBy}
          onChange={(e) => setFilterBy(e.target.value)}
        >
          <option value="all">All Tasks</option>
          <option value="completed">Completed Tasks</option>
          <option value="incomplete">Incomplete Tasks</option>
        </select>
      </div>
    </div>
  );
}

export default SortFilterControls;
