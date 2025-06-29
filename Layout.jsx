import React, { useState, useEffect } from "react";
import Header from "./layout/Header";
import Navigation from "./layout/Navigation";
import MainContent from "./layout/MainContent";
import Footer from "./layout/Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getStudySuggestion } from "../services/aiService";
import { getCardStyles } from "./utils/themeUtils";

function Layout() {
  // Initialize activeTab from localStorage, default to "dashboard" if not set
  const [activeTab, setActiveTab] = useState(() => {
    const savedTab = localStorage.getItem("activeTab");
    return savedTab || "dashboard";
  });
  const [tasks, setTasks] = useState([]);
  const [studyStats, setStudyStats] = useState({
    totalHours: 0,
    completedTasks: 0,
    streak: 0,
    lastActiveDate: null,
    lastStreakUpdate: null,
    studyHoursLog: [],
  });
  const [aiSuggestion, setAiSuggestion] = useState("");
  const [aiSuggestionType, setAiSuggestionType] = useState("task");
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [points, setPoints] = useState(0);
  const [badges, setBadges] = useState([]);
  const [currentTheme, setCurrentTheme] = useState("Light Mode");
  const [unlockedThemes, setUnlockedThemes] = useState(["Light Mode"]);
  const [loading, setLoading] = useState(true);

  // Persist activeTab to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("activeTab", activeTab);
  }, [activeTab]);

  const userId = "user123";
  const styles = getCardStyles(currentTheme);

  const getLocalDateString = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const getNextTheme = () => {
    if (unlockedThemes.length === 1) {
      return "Light Mode";
    }
    const currentIndex = unlockedThemes.indexOf(currentTheme);
    const nextIndex = (currentIndex + 1) % unlockedThemes.length;
    return unlockedThemes[nextIndex];
  };

  const handleThemeChange = () => {
    const nextTheme = getNextTheme();
    setCurrentTheme(nextTheme);
  };

  const handlePointsUpdate = (newPoints) => {
    setPoints(newPoints);
  };

  const handleThemeUnlock = (themeName) => {
    if (!unlockedThemes.includes(themeName)) {
      setUnlockedThemes([...unlockedThemes, themeName]);
    }
  };

  const updateStreak = (today) => {
    setStudyStats((prev) => {
      const lastActive = prev.lastActiveDate
        ? new Date(prev.lastActiveDate)
        : null;
      const lastStreakUpdate = prev.lastStreakUpdate
        ? new Date(prev.lastStreakUpdate)
        : null;
      const todayDate = new Date(today);

      let newStreak = prev.streak;
      let newLastActiveDate = today;
      let newLastStreakUpdate = prev.lastStreakUpdate;

      const lastActiveDateString = lastActive
        ? getLocalDateString(lastActive)
        : null;
      const lastStreakUpdateDateString = lastStreakUpdate
        ? getLocalDateString(lastStreakUpdate)
        : null;

      if (!lastActive || lastActiveDateString !== today) {
        if (lastActive) {
          const diffTime = todayDate - lastActive;
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          if (diffDays === 1) {
            newStreak = prev.streak + 1;
            newLastStreakUpdate = today;
          } else if (diffDays > 1) {
            newStreak = 1;
            newLastStreakUpdate = today;
          }
        } else {
          newStreak = 1;
          newLastStreakUpdate = today;
        }
      }

      if (lastStreakUpdate && lastStreakUpdateDateString !== today) {
        const diffTime = todayDate - new Date(lastStreakUpdate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        if (diffDays > 1) {
          newStreak = 1;
          newLastStreakUpdate = today;
        }
      }

      const newStats = {
        ...prev,
        streak: newStreak,
        lastActiveDate: newLastActiveDate,
        lastStreakUpdate: newLastStreakUpdate,
        studyHoursLog: prev.studyHoursLog || [],
      };
      return newStats;
    });
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/user/${userId}`
        );
        if (!response.ok) {
          throw new Error(`Failed to fetch user data: ${response.status}`);
        }
        const data = await response.json();

        const fetchedTasks = (data.tasks || []).map((task) => ({
          ...task,
          pointsAwarded: task.pointsAwarded ?? false,
          hours: task.hours ?? 0,
        }));
        setTasks(fetchedTasks);

        const fetchedStats = {
          totalHours: data.studyStats?.totalHours || 0,
          completedTasks: data.studyStats?.completedTasks || 0,
          streak: data.studyStats?.streak || 0,
          lastActiveDate: data.studyStats?.lastActiveDate || null,
          lastStreakUpdate: data.studyStats?.lastStreakUpdate || null,
          studyHoursLog: data.studyStats?.studyHoursLog || [],
        };
        setStudyStats(fetchedStats);
        setPoints(data.points || 0);
        setBadges(data.badges || []);
        setCurrentTheme(data.currentTheme || "Light Mode");
        setUnlockedThemes(data.unlockedThemes || ["Light Mode"]);

        const today = getLocalDateString(new Date());
        const { lastActiveDate, streak, lastStreakUpdate } = fetchedStats;

        let newStats = { ...fetchedStats };
        if (lastStreakUpdate !== today) {
          if (!lastActiveDate) {
            newStats = {
              ...fetchedStats,
              lastActiveDate: today,
              lastStreakUpdate: today,
              studyHoursLog: fetchedStats.studyHoursLog || [],
            };
          } else {
            const lastDate = new Date(lastActiveDate);
            const currentDate = new Date(today);
            const diffDays = (currentDate - lastDate) / (1000 * 60 * 60 * 24);

            if (diffDays === 1) {
              newStats = {
                ...fetchedStats,
                streak: fetchedStats.streak + 1,
                lastActiveDate: today,
                lastStreakUpdate: today,
                studyHoursLog: fetchedStats.studyHoursLog || [],
              };
            } else if (diffDays > 1) {
              newStats = {
                ...fetchedStats,
                streak: 0,
                lastActiveDate: today,
                lastStreakUpdate: today,
                studyHoursLog: fetchedStats.studyHoursLog || [],
              };
            } else {
              newStats = {
                ...fetchedStats,
                lastStreakUpdate: today,
                studyHoursLog: fetchedStats.studyHoursLog || [],
              };
            }
          }
          setStudyStats(newStats);
        }

        const lastFetchTimestamp = localStorage.getItem("lastFetchTimestamp");
        const currentTimestamp = Date.now();
        localStorage.setItem("lastFetchTimestamp", currentTimestamp.toString());

        setTimeout(async () => {
          const incompleteTasks = fetchedTasks.filter(
            (task) => !task.completed
          );
          if (incompleteTasks.length === 0) {
            setAiSuggestion(
              "You have no incomplete tasks! Add a new task to keep progressing."
            );
            setAiSuggestionType("task");
          } else {
            setAiSuggestion(
              "Looks like you have some tasks to tackle! Add or complete a task to keep progressing."
            );
            setAiSuggestionType("task");
          }
        }, 1000);

        setLoading(false);
      } catch (err) {
        toast.error("Failed to load user data. Please try again later.");
        setAiSuggestion("Add a new task to get started!");
        setAiSuggestionType("task");
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    if (isAiLoading) return;
    if (aiSuggestionType !== "task") return;

    const incompleteTasks = tasks.filter((task) => !task.completed);
    if (incompleteTasks.length === 0) {
      setAiSuggestion(
        "You have no incomplete tasks! Add a new task to keep progressing."
      );
      setAiSuggestionType("task");
    } else {
      setAiSuggestion(
        "Looks like you have some tasks to tackle! Add or complete a task to keep progressing."
      );
      setAiSuggestionType("task");
    }
  }, [tasks, isAiLoading, aiSuggestionType]);

  useEffect(() => {
    const completedCount = tasks.filter((task) => task.completed).length;
    setStudyStats((prevStats) => ({
      ...prevStats,
      completedTasks: completedCount,
      studyHoursLog: prevStats.studyHoursLog || [],
    }));
  }, [tasks]);

  useEffect(() => {
    const saveUserData = async () => {
      try {
        const serializedStudyStats = {
          totalHours: studyStats.totalHours,
          completedTasks: studyStats.completedTasks,
          streak: studyStats.streak,
          lastActiveDate: studyStats.lastActiveDate || null,
          lastStreakUpdate: studyStats.lastStreakUpdate || null,
          studyHoursLog: studyStats.studyHoursLog || [],
        };

        const dataToSend = {
          tasks,
          studyStats: serializedStudyStats,
          points,
          badges,
          themes: [
            "Light Mode",
            "Dark Mode",
            "Ocean Breeze",
            "Sunset Glow",
            "Forest Whisper",
          ],
          currentTheme,
          unlockedThemes,
        };

        const response = await fetch(
          `http://localhost:5000/api/user/${userId}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(dataToSend),
          }
        );

        if (!response.ok) {
          throw new Error(
            `Failed to save user data: ${response.status} - ${await response.text()}`
          );
        }
      } catch (err) {
        toast.error(`Failed to save progress: ${err.message}`);
      }
    };

    const debounceSave = setTimeout(() => {
      saveUserData();
    }, 1000);

    return () => clearTimeout(debounceSave);
  }, [tasks, studyStats, points, badges, currentTheme, unlockedThemes]);

  const logStudyHours = (hours) => {
    const parsedHours = parseFloat(hours);
    if (isNaN(parsedHours) || parsedHours <= 0) {
      toast.error("Please enter a valid number of hours greater than 0.");
      return;
    }
    const roundedHours = Math.round(parsedHours * 100) / 100;
    const today = getLocalDateString(new Date());
    setStudyStats((prev) => {
      const studyHoursLog = prev.studyHoursLog || [];
      const existingLog = studyHoursLog.find((log) => log.date === today);
      let updatedLog;
      if (existingLog) {
        updatedLog = studyHoursLog.map((log) =>
          log.date === today
            ? {
                ...log,
                hours: Math.round((log.hours + roundedHours) * 100) / 100,
              }
            : log
        );
      } else {
        updatedLog = [...studyHoursLog, { date: today, hours: roundedHours }];
      }
      const newStats = {
        ...prev,
        totalHours: Math.round((prev.totalHours + roundedHours) * 100) / 100,
        studyHoursLog: updatedLog,
      };
      return newStats;
    });
    updateStreak(today);
  };

  const deductStudyHours = (hours, completedDate) => {
    const parsedHours = parseFloat(hours);
    if (isNaN(parsedHours) || parsedHours <= 0) return;
    const roundedHours = Math.round(parsedHours * 100) / 100;
    setStudyStats((prev) => {
      const studyHoursLog = prev.studyHoursLog || [];
      const logDate = completedDate;
      const existingLog = studyHoursLog.find((log) => log.date === logDate);
      let updatedLog;
      if (existingLog) {
        const newHours = Math.max(0, existingLog.hours - roundedHours);
        updatedLog = studyHoursLog
          .map((log) =>
            log.date === logDate
              ? { ...log, hours: Math.round(newHours * 100) / 100 }
              : log
          )
          .filter((log) => log.hours > 0);
      } else {
        updatedLog = studyHoursLog;
      }
      const newTotalHours = Math.max(0, prev.totalHours - roundedHours);
      const newStats = {
        ...prev,
        totalHours: Math.round(newTotalHours * 100) / 100,
        studyHoursLog: updatedLog,
      };
      return newStats;
    });
  };

  const getStudyTips = async () => {
    setIsAiLoading(true);
    setAiSuggestion("Loading a fresh study tip...");
    setAiSuggestionType("loading");
    try {
      const timestamp = Date.now();
      const prompt = {
        tasks: [],
        studyStats: {},
        customPrompt: `You are an AI study assistant for students across all subjects, focusing on improving learning efficiency. Generate a concise study tip (2-3 sentences, max 50 words) that is clear, actionable, and applicable to any subject. Format the tip as follows:

Here's a study tip for students:

- [A concise, actionable study tip that improves learning efficiency]

**Instructions:**
- **Objective**: State what the tip improves (e.g., memory retention, focus, time management).
- **Actionable Advice**: Provide a specific action (e.g., "Study in 25-minute blocks with 5-minute breaks").
- **Scientific/Practical Basis**: Include a brief reason (e.g., "This boosts productivity by matching attention spans").
- **Context/Applicability**: Mention when it works best (e.g., "Ideal for long study sessions").
- Ensure variety by focusing on a different aspect of learning each time (e.g., memory, focus, time management).
- Keep it simple and under 50 words, focusing on the crux without over-explaining.
- Do NOT start the tip with "Practice coding daily" or any repetitive phrase.
- Do not include additional sections like "General Study Tip" or "Habits".

**Examples of concise tips:**
- To improve focus, study in 25-minute blocks with 5-minute breaks, known as the Pomodoro Technique. This matches your brain's attention span, boosting productivity. Ideal for long study sessions.
- Enhance memory by reviewing notes 1 day, 1 week, and 1 month after learning, using spaced repetition. This strengthens recall, per cognitive science. Best for exam prep over weeks.

(Request ID: ${timestamp})`,
      };
      const response = await getStudySuggestion(prompt);

      console.log("Study Tip API Response:", response);

      let studyTip = "Failed to fetch a valid study tip.";
      if (typeof response === "string" && response.trim()) {
        studyTip = response.trim();
        studyTip = studyTip.replace(/^\d+\.\s*/, "");
        if (!studyTip.startsWith("Here's a study tip for students:")) {
          studyTip = `Here's a study tip for students:\n\n- ${studyTip}`;
        }
      } else if (Array.isArray(response) && response.length > 0) {
        studyTip =
          response.find((item) => typeof item === "string" && item.trim()) ||
          studyTip;
        studyTip = studyTip.trim();
        studyTip = studyTip.replace(/^\d+\.\s*/, "");
        if (!studyTip.startsWith("Here's a study tip for students:")) {
          studyTip = `Here's a study tip for students:\n\n- ${studyTip}`;
        }
      }

      setAiSuggestion(studyTip);
      setAiSuggestionType("studyTip");
    } catch (error) {
      console.error("Error fetching study tip:", error);
      setAiSuggestion("Failed to fetch study tip. Please try again later.");
      setAiSuggestionType("error");
    } finally {
      setIsAiLoading(false);
    }
  };

  const generateSchedule = async () => {
    setIsAiLoading(true);
    setAiSuggestion("Generating your progress report...");
    setAiSuggestionType("loading");
    try {
      const today = getLocalDateString(new Date());
      const todayStudyHours =
        studyStats.studyHoursLog.find((log) => log.date === today)?.hours || 0;
      const tasksCompletedToday = tasks.filter(
        (task) => task.completed && task.completedDate === today
      );
      const totalTasksCompletedToday = tasksCompletedToday.length;
      const highPriorityCompleted = tasksCompletedToday.filter(
        (task) => task.priority === "High"
      ).length;
      const mediumPriorityCompleted = tasksCompletedToday.filter(
        (task) => task.priority === "Medium"
      ).length;
      const lowPriorityCompleted = tasksCompletedToday.filter(
        (task) => task.priority === "Low"
      ).length;

      const timestamp = Date.now();
      const prompt = {
        tasks: [],
        studyStats: {
          todayStudyHours,
          totalTasksCompletedToday,
        },
        customPrompt: `Generate a list of 10 short motivational messages (each 1-2 sentences, max 30 words) for a student who has studied for ${todayStudyHours} hours today and completed ${totalTasksCompletedToday} tasks. Each message should be unique, encouraging, and focused on their progress in their studies. Format each message on a new line without numbering or bullet points. (Request ID: ${timestamp})`,
      };
      const response = await getStudySuggestion(prompt);

      let motivationalMessage;
      if (typeof response === "string") {
        const messages = response
          .split("\n")
          .filter((msg) => msg.trim() !== "");
        motivationalMessage =
          messages.length > 0
            ? messages[0].replace(/^"(.*)"$/, "$1")
            : "Keep up the great effort in your studies!";
      } else if (Array.isArray(response)) {
        motivationalMessage =
          response.length > 0
            ? response[0].replace(/^"(.*)"$/, "$1")
            : "Keep up the great effort in your studies!";
      } else {
        motivationalMessage = "Keep up the great effort in your studies!";
      }

      motivationalMessage = motivationalMessage.replace(/^"(.*)"$/, "$1");
      motivationalMessage = motivationalMessage.replace(/^\d+\.\s*/, "").trim();

      const progressMessage = `Here’s your progress for today (${today}):\n\n- Total Study Hours Today: ${todayStudyHours} hour${todayStudyHours !== 1 ? "s" : ""}\n- Tasks Completed Today: ${totalTasksCompletedToday}\n- High Priority Tasks Completed Today: ${highPriorityCompleted}\n- Medium Priority Tasks Completed Today: ${mediumPriorityCompleted}\n- Low Priority Tasks Completed Today: ${lowPriorityCompleted}\n\n${motivationalMessage}`;
      setAiSuggestion(progressMessage);
      setAiSuggestionType("progressReport");
    } catch (error) {
      console.error("Error generating progress report:", error);
      setAiSuggestion(
        "Failed to generate progress report. Please try again later."
      );
      setAiSuggestionType("error");
    } finally {
      setIsAiLoading(false);
    }
  };

  const addTask = (newTask) => {
    const task = {
      id: Date.now(),
      ...newTask,
      completedDate: null,
      pointsAwarded: false,
      hours: newTask.hours || 0,
    };
    setTasks([...tasks, task]);
  };

  const deleteTask = (id) => {
    const taskToDelete = tasks.find((task) => task.id === id);
    if (!taskToDelete) return;

    if (taskToDelete.completed) {
      if (taskToDelete.hours > 0 && taskToDelete.completedDate) {
        deductStudyHours(taskToDelete.hours, taskToDelete.completedDate);
      }

      if (taskToDelete.pointsAwarded) {
        const pointsToDeduct =
          taskToDelete.priority === "High"
            ? 30
            : taskToDelete.priority === "Medium"
              ? 20
              : 10;
        setPoints((prevPoints) => prevPoints - pointsToDeduct);
        toast.info(`↩️ -${pointsToDeduct} Points. Task deleted.`, {
          toastId: `delete-task-${id}`,
        });
      }
    }

    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleTaskComplete = (id) => {
    const task = tasks.find((task) => task.id === id);
    if (!task) return;

    const today = getLocalDateString(new Date());
    let newPoints = points;
    let newBadges = [...badges];
    let notifications = [];

    const updatedTasks = tasks.map((t) =>
      t.id === id
        ? {
            ...t,
            completed: !t.completed,
            completedDate: !t.completed ? today : null,
            pointsAwarded: t.pointsAwarded,
          }
        : t
    );

    const updatedTask = updatedTasks.find((t) => t.id === id);
    const pointsToAddOrDeduct =
      task.priority === "High" ? 30 : task.priority === "Medium" ? 20 : 10;

    if (!task.completed) {
      if (!updatedTask.pointsAwarded) {
        newPoints = points + pointsToAddOrDeduct;
        notifications.push(`🎉 +${pointsToAddOrDeduct} Points! Keep it up!`);
        updatedTask.pointsAwarded = true;
      }

      if (task.hours > 0) {
        logStudyHours(task.hours);
      }

      const highPriorityTasks = updatedTasks.filter(
        (t) => t.priority === "High" && t.completed
      ).length;
      if (highPriorityTasks >= 5 && !badges.includes("Priority Master")) {
        newBadges.push("Priority Master");
        notifications.push("🏆 Badge Earned: Priority Master!");
      }

      const totalCompletedTasks = updatedTasks.filter(
        (t) => t.completed
      ).length;
      if (totalCompletedTasks >= 10 && !badges.includes("Task Titan")) {
        newBadges.push("Task Titan");
        notifications.push("🏆 Badge Earned: Task Titan!");
      }

      const dueDate = new Date(task.dueDate);
      const todayDate = new Date();
      if (dueDate > todayDate) {
        const earlyTasks = updatedTasks.filter(
          (t) => new Date(t.dueDate) > todayDate && t.completed
        ).length;
        if (earlyTasks >= 3 && !badges.includes("Early Bird")) {
          newBadges.push("Early Bird");
          notifications.push("🏆 Badge Earned: Early Bird!");
        }
      }

      updateStreak(today);
    } else {
      if (updatedTask.pointsAwarded) {
        newPoints = points - pointsToAddOrDeduct;
        notifications.push(
          `↩️ -${pointsToAddOrDeduct} Points. Task unmarked as completed.`
        );
        updatedTask.pointsAwarded = false;
      }

      if (task.hours > 0 && task.completedDate) {
        deductStudyHours(task.hours, task.completedDate);
      }
    }

    setTasks(updatedTasks);
    setPoints(newPoints);
    setBadges(newBadges);
    notifications.forEach((msg) => toast.success(msg));
  };

  const updateTask = (updatedTask) => {
    setTasks(
      tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  };

  useEffect(() => {
    if (studyStats.streak >= 7 && !badges.includes("Streak Star")) {
      let newBadges = [...badges, "Streak Star"];
      let newPoints = points + 50;

      setBadges(newBadges);
      setPoints(newPoints);

      toast.success("🏆 Badge Earned: Streak Star!");
      toast.success("🎉 +50 Points for 7-Day Streak!");
    }
  }, [studyStats.streak]);

  const nextTheme = getNextTheme();

  return (
    <div className={`min-h-screen flex flex-col ${styles.layoutTheme}`}>
      <ToastContainer />
      <Header
        currentTheme={currentTheme}
        nextTheme={nextTheme}
        onThemeChange={handleThemeChange}
        setActiveTab={setActiveTab}
      />
      <Navigation
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        currentTheme={currentTheme}
      />
      <MainContent
        activeTab={activeTab}
        loading={loading}
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
        addTask={addTask}
        updateTask={updateTask}
        deleteTask={deleteTask}
        points={points}
        badges={badges}
        onPointsUpdate={handlePointsUpdate}
        onThemeUnlock={handleThemeUnlock}
        unlockedThemes={unlockedThemes}
      />
      <Footer currentTheme={currentTheme} />
    </div>
  );
}

export default Layout;
