import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import {
  CheckCircle,
  Circle,
  Calendar as CalendarIcon,
  PlusCircle,
} from "lucide-react";
import { getCardStyles } from "../components/utils/themeUtils";

function CalendarPage({
  tasks,
  toggleTaskComplete,
  currentTheme,
  setActiveTab,
}) {
  const styles = getCardStyles(currentTheme);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const today = new Date(); // Store today's date for comparison

  // Function to get local date string in YYYY-MM-DD format
  const getLocalDateString = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // Handle date selection
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  // Reset selectedDate to today when clicking anywhere on the page, except when clicking on task cards
  const handleClickOutside = (event) => {
    const calendarElement = document.querySelector(".react-calendar");
    const isClickInsideCalendar =
      calendarElement && calendarElement.contains(event.target);

    // Check if the click is on a navigation button or a date tile
    const isNavigationClick = event.target.closest(
      ".react-calendar__navigation"
    );
    const isTileClick = event.target.closest(".react-calendar__tile");

    // Check if the click is on a task card (including the checkmark button)
    const isTaskCardClick = event.target.closest(".task-card");

    // Reset to today if the click is outside the calendar, on navigation, and NOT on a task card
    if (
      !isTileClick &&
      !isTaskCardClick &&
      (isNavigationClick || !isClickInsideCalendar)
    ) {
      setSelectedDate(new Date());
    }
  };

  // Add and remove the click event listener
  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  // Filter tasks for the selected date
  const tasksForSelectedDate = tasks.filter((task) => {
    const taskDueDate = getLocalDateString(new Date(task.dueDate));
    const selectedDateString = getLocalDateString(selectedDate);
    return taskDueDate === selectedDateString && !task.completed;
  });

  // Check if the selected date is today
  const isSelectedDateToday =
    getLocalDateString(selectedDate) === getLocalDateString(today);

  // Define gradient styles for each theme based on themeUtils.js
  const getThemeGradient = (type) => {
    switch (currentTheme) {
      case "Dark Mode":
        if (type === "current") {
          // Use the same blue gradient as selected dates when no other date is selected
          // When another date is selected, use a lighter shade
          return isSelectedDateToday
            ? "linear-gradient(135deg, #1E40AF, #1976D2)" // blue-800 to blue-600
            : "linear-gradient(135deg, #1976D2, #60A5FA)"; // blue-600 to blue-400 (lighter shade)
        }
        return "linear-gradient(135deg, #1E40AF, #1976D2)"; // blue-800 to blue-600 for selected dates
      case "Ocean Breeze":
        return type === "current"
          ? "linear-gradient(135deg, #A5F3FC, #22D3EE)" // cyan-100 to cyan-300
          : "linear-gradient(135deg, #5EEAD4, #14B8A6)"; // teal-300 to teal-500
      case "Sunset Glow":
        return type === "current"
          ? "linear-gradient(135deg, #FED7AA, #FDBA74)" // orange-200 to orange-300
          : "linear-gradient(135deg, #FCA5A5, #F87171)"; // red-300 to red-400
      case "Forest Whisper":
        return type === "current"
          ? "linear-gradient(135deg, #BBF7D0, #86EFAC)" // green-200 to green-300
          : "linear-gradient(135deg, #6EE7B7, #10B981)"; // emerald-300 to emerald-500
      default: // Light Mode
        return type === "current"
          ? "linear-gradient(135deg, #C7D2FE, #A5B4FC)" // indigo-200 to indigo-300
          : "linear-gradient(135deg, #818CF8, #4F46E5)"; // indigo-400 to indigo-600
    }
  };

  // Custom styles for the calendar, including theme-based gradients
  const calendarStyles = `
    .react-calendar {
      margin-left: 25px;
    }
    .react-calendar__navigation button {
      font-size: 1.25rem;
    }
    .dark-mode-calendar {
      background-color: #1F2937; /* bg-gray-800 */
      color: #ffffff; /* Default text to white */
      border-radius: 0.75rem; /* Match rounded-xl from styles.card */
    }
    .dark-mode-calendar .react-calendar__navigation {
      background-color: #1F2937; /* bg-gray-800 */
      margin-bottom: 0.5rem;
    }
    .dark-mode-calendar .react-calendar__navigation button {
      color: #ffffff; /* Navigation arrows and labels to white */
      background: none;
      font-size: 1.25rem; /* Increase navigation button font size */
    }
    .dark-mode-calendar .react-calendar__navigation button:hover,
    .dark-mode-calendar .react-calendar__navigation button:focus {
      background: #374151; /* bg-gray-700 on hover/focus */
    }
    .dark-mode-calendar .react-calendar__month-view__weekdays__weekday {
      color: #ffffff; /* Days of the week to white */
      font-size: 1.1rem; /* Increase weekday label font size */
    }
    .dark-mode-calendar .react-calendar__month-view__days__day {
      color: #ffffff; /* Current month's dates to white */
      font-size: 1.1rem; /* Increase date font size */
    }
    .dark-mode-calendar .react-calendar__month-view__days__day--weekend {
      color: #d10000; /* Match the default red shade used in other themes */
    }
    .dark-mode-calendar .react-calendar__month-view__days__day--neighboringMonth {
      color: #9CA3AF; /* Gray-400 for previous/next month dates (default) */
    }
    .dark-mode-calendar .react-calendar__tile--active,
    .dark-mode-calendar .react-calendar__tile--active:hover,
    .dark-mode-calendar .react-calendar__tile--hasActive {
      background: ${getThemeGradient("selected")} !important;
      color: #ffffff !important;
    }
    .dark-mode-calendar .react-calendar__tile:hover {
      background: #374151; /* bg-gray-700 on hover */
    }
    .react-calendar {
      width: 100%; /* Ensure calendar takes full width of its container */
    }
    .react-calendar__tile {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 48px; /* Increase tile height for larger size */
      font-size: 1.1rem; /* Increase tile font size */
    }
    .task-dot {
      position: absolute;
      bottom: 2px;
      width: 10px; /* Slightly increase dot size for proportionality */
      height: 10px;
      border-radius: 50%;
      ${currentTheme === "Dark Mode" ? "background-color: #6366F1;" : ""}
      ${currentTheme === "Ocean Breeze" ? "background-color: #14B8A6;" : ""}
      ${currentTheme === "Sunset Glow" ? "background-color: #F97316;" : ""}
      ${currentTheme === "Forest Whisper" ? "background-color: #10B981;" : ""}
      ${currentTheme === "Light Mode" ? "background-color: #4F46E5;" : ""}
    }
    .react-calendar__tile--now {
      background: ${getThemeGradient("current")} !important;
      color: ${currentTheme === "Dark Mode" ? "#ffffff" : "#000000"} !important;
    }
    .dark-mode-calendar .react-calendar__tile--now {
      background: ${getThemeGradient("current")} !important;
      color: #ffffff !important;
    }
    .react-calendar__tile--active,
    .react-calendar__tile--active:hover,
    .react-calendar__tile--hasActive {
      background: ${getThemeGradient("selected")} !important;
      color: #ffffff !important;
    }
    .react-calendar__tile:hover {
      background: ${
        currentTheme === "Dark Mode"
          ? "#374151"
          : currentTheme === "Ocean Breeze"
            ? "#E5F6F5"
            : currentTheme === "Sunset Glow"
              ? "#FEF3E8"
              : currentTheme === "Forest Whisper"
                ? "#E8F8EF"
                : "#E8F0FE"
      }; /* Light hover effect matching each theme */
    }
    .react-calendar__tile--now:hover {
      background: ${getThemeGradient("current")} !important;
      filter: brightness(1.1); /* Slightly brighten on hover */
    }
    .dark-mode-calendar .react-calendar__tile--now:hover {
      background: ${getThemeGradient("current")} !important;
      filter: brightness(1.1);
    }
    .react-calendar__navigation {
      margin-bottom: 0.5rem;
    }
    .react-calendar__month-view__weekdays__weekday {
      font-size: 1.1rem; /* Increase weekday label font size for all themes */
    }
    .react-calendar__month-view__days__day {
      font-size: 1.1rem; /* Increase date font size for all themes */
    }
    .task-card:hover .calendar-icon {
      transform: scale(1) !important; /* Prevent scaling on hover */
    }
  `;

  return (
    <div className="space-y-6">
      <h2 className={`text-2xl font-bold ${styles.title}`}>Calendar</h2>
      <div className="grid grid-cols-1 gap-6">
        <div className="flex justify-center">
          <div className="max-w-xl w-full">
            <style>{calendarStyles}</style>
            <Calendar
              onChange={handleDateChange}
              value={selectedDate}
              className={`${styles.card} p-4 border-none ${
                currentTheme === "Dark Mode" ? "dark-mode-calendar" : ""
              }`}
              tileContent={({ date }) => {
                const dateString = getLocalDateString(date);
                const hasTasks = tasks.some(
                  (task) =>
                    getLocalDateString(new Date(task.dueDate)) === dateString &&
                    !task.completed
                );
                return hasTasks ? <div className="task-dot"></div> : null;
              }}
            />
          </div>
        </div>
        <div className="md:col-span-3">
          <div className={`${styles.card} p-6`}>
            <h3 className={`text-lg font-semibold mb-4 ${styles.subtitle}`}>
              Tasks for{" "}
              {selectedDate.toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </h3>
            {tasksForSelectedDate.length === 0 ? (
              <div>
                <p className={`py-4 text-center ${styles.noTasksText}`}>
                  No incomplete tasks for this date.
                </p>
                <div className={`p-5 border-t ${styles.border}`}>
                  <button
                    onClick={() => setActiveTab("tasks")}
                    className={styles.buttonTertiary}
                  >
                    <PlusCircle className="w-5 h-5 mr-2" />
                    Add New Task
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {tasksForSelectedDate.map((task) => (
                  <div
                    key={task.id}
                    className={`flex items-center justify-between p-4 transition-all duration-300 hover:shadow-md hover:scale-[1.02] ${styles.hoverCard} task-card`}
                  >
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => toggleTaskComplete(task.id)}
                        className={`p-1 rounded-full transition-all duration-200 ${
                          task.completed
                            ? styles.taskComplete
                            : styles.taskIncomplete
                        }`}
                      >
                        <CheckCircle
                          className={`w-5 h-5 ${
                            task.completed ? "fill-current" : ""
                          }`}
                        />
                      </button>
                      <div>
                        <div className="flex items-center space-x-2">
                          <h3
                            className={`text-base font-semibold ${styles.text}`}
                          >
                            {task.title}
                          </h3>
                          <span
                            className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                              task.priority === "High"
                                ? styles.isDarkMode
                                  ? "bg-red-600 text-white"
                                  : "bg-red-500 text-white"
                                : task.priority === "Medium"
                                  ? styles.isDarkMode
                                    ? "bg-orange-600 text-white"
                                    : "bg-orange-500 text-white"
                                  : styles.isDarkMode
                                    ? "bg-green-600 text-white"
                                    : "bg-green-500 text-white"
                            }`}
                          >
                            {task.priority}
                          </span>
                        </div>
                        <p
                          className={`text-sm flex items-center space-x-1 ${styles.secondaryText}`}
                        >
                          <CalendarIcon
                            className={`${styles.smallIcon} calendar-icon`}
                          />
                          <span>Due: {task.dueDate}</span>
                          <span className="ml-2">Hours: {task.hours || 0}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CalendarPage;
