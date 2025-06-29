const themeConditions = {
  isDarkMode: (currentTheme) => currentTheme === "Dark Mode",
  isOceanBreeze: (currentTheme) => currentTheme === "Ocean Breeze",
  isLightMode: (currentTheme) => currentTheme === "Light Mode",
  isSunsetGlow: (currentTheme) => currentTheme === "Sunset Glow",
  isForestWhisper: (currentTheme) => currentTheme === "Forest Whisper",
};

const getCardStyles = (currentTheme) => {
  const { isDarkMode, isOceanBreeze, isSunsetGlow, isForestWhisper } =
    themeConditions;
  return {
    card: `${
      isDarkMode(currentTheme)
        ? "bg-gray-800 border border-gray-700"
        : isOceanBreeze(currentTheme)
          ? "bg-gradient-to-br from-teal-100 to-blue-200 bg-opacity-90 backdrop-blur-lg border border-teal-300"
          : isSunsetGlow(currentTheme)
            ? "bg-gradient-to-br from-orange-100 to-pink-200 bg-opacity-90 backdrop-blur-lg border border-orange-300"
            : isForestWhisper(currentTheme)
              ? "bg-gradient-to-br from-green-100 to-emerald-200 bg-opacity-90 backdrop-blur-lg border border-green-300"
              : "bg-white border border-gray-200"
    } rounded-xl shadow-lg transition-all duration-300`,
    hoverCard: `${
      isDarkMode(currentTheme)
        ? "hover:bg-gray-700"
        : isOceanBreeze(currentTheme)
          ? "hover:bg-teal-50"
          : isSunsetGlow(currentTheme)
            ? "hover:bg-orange-50"
            : isForestWhisper(currentTheme)
              ? "hover:bg-green-50"
              : "hover:bg-gray-50"
    }`,
    hoverShadow: "hover:shadow-xl",
    border: `${
      isDarkMode(currentTheme)
        ? "border-gray-600"
        : isOceanBreeze(currentTheme)
          ? "border-teal-400"
          : isSunsetGlow(currentTheme)
            ? "border-orange-400"
            : isForestWhisper(currentTheme)
              ? "border-green-400"
              : "border-gray-300"
    }`,
    divider: `${
      isDarkMode(currentTheme)
        ? "divide-gray-600"
        : isOceanBreeze(currentTheme)
          ? "divide-teal-400"
          : isSunsetGlow(currentTheme)
            ? "divide-orange-400"
            : isForestWhisper(currentTheme)
              ? "divide-green-400"
              : "divide-gray-300"
    }`,
    title: `${
      isDarkMode(currentTheme)
        ? "text-gray-100"
        : isOceanBreeze(currentTheme)
          ? "text-teal-900"
          : isSunsetGlow(currentTheme)
            ? "text-orange-900"
            : isForestWhisper(currentTheme)
              ? "text-green-900"
              : "text-gray-900"
    }`,
    subtitle: `${
      isDarkMode(currentTheme)
        ? "text-gray-400"
        : isOceanBreeze(currentTheme)
          ? "text-blue-600"
          : isSunsetGlow(currentTheme)
            ? "text-orange-500"
            : isForestWhisper(currentTheme)
              ? "text-green-500"
              : "text-gray-500"
    }`,
    text: `${
      isDarkMode(currentTheme)
        ? "text-gray-100"
        : isOceanBreeze(currentTheme)
          ? "text-teal-800"
          : isSunsetGlow(currentTheme)
            ? "text-orange-800"
            : isForestWhisper(currentTheme)
              ? "text-green-800"
              : "text-gray-800"
    }`,
    secondaryText: `${
      isDarkMode(currentTheme)
        ? "text-gray-300"
        : isOceanBreeze(currentTheme)
          ? "text-teal-700"
          : isSunsetGlow(currentTheme)
            ? "text-orange-600"
            : isForestWhisper(currentTheme)
              ? "text-green-600"
              : "text-gray-600"
    }`,
    mutedText: `${
      isDarkMode(currentTheme)
        ? "text-gray-300"
        : isOceanBreeze(currentTheme)
          ? "text-blue-600"
          : isSunsetGlow(currentTheme)
            ? "text-orange-500"
            : isForestWhisper(currentTheme)
              ? "text-green-500"
              : "text-gray-500"
    }`,
    completedText: `${
      isDarkMode(currentTheme)
        ? "text-gray-400"
        : isOceanBreeze(currentTheme)
          ? "text-teal-600"
          : isSunsetGlow(currentTheme)
            ? "text-orange-600"
            : isForestWhisper(currentTheme)
              ? "text-green-600"
              : "text-gray-600"
    }`,
    noTasksText: `${
      isDarkMode(currentTheme)
        ? "text-gray-400"
        : isOceanBreeze(currentTheme)
          ? "text-teal-700"
          : isSunsetGlow(currentTheme)
            ? "text-orange-700"
            : isForestWhisper(currentTheme)
              ? "text-green-700"
              : "text-gray-500"
    }`,
    buttonPrimary: `${
      isDarkMode(currentTheme)
        ? "bg-indigo-600 hover:bg-indigo-700 text-white"
        : isOceanBreeze(currentTheme)
          ? "bg-teal-600 hover:bg-teal-700 text-white"
          : isSunsetGlow(currentTheme)
            ? "bg-orange-600 hover:bg-orange-700 text-white"
            : isForestWhisper(currentTheme)
              ? "bg-green-600 hover:bg-green-700 text-white"
              : "bg-indigo-600 hover:bg-indigo-700 text-white"
    } px-5 py-2 rounded-lg text-sm font-semibold shadow-md transition-all duration-200 transform hover:scale-105`,
    buttonSecondary: `${
      isDarkMode(currentTheme)
        ? "bg-gray-700 border-gray-600 text-gray-200 hover:bg-gray-600"
        : isOceanBreeze(currentTheme)
          ? "bg-amber-50 bg-opacity-90 backdrop-blur-md border-teal-400 text-teal-800 hover:bg-amber-100"
          : isSunsetGlow(currentTheme)
            ? "bg-pink-50 bg-opacity-90 backdrop-blur-md border-orange-400 text-orange-800 hover:bg-pink-100"
            : isForestWhisper(currentTheme)
              ? "bg-emerald-50 bg-opacity-90 backdrop-blur-md border-green-400 text-green-800 hover:bg-emerald-100"
              : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
    } px-5 py-2 rounded-lg text-sm font-semibold shadow-md border transition-all duration-200 transform hover:scale-105`,
    buttonTertiary: `${
      isDarkMode(currentTheme)
        ? "text-indigo-400 hover:text-indigo-300"
        : isOceanBreeze(currentTheme)
          ? "text-teal-600 hover:text-teal-500"
          : isSunsetGlow(currentTheme)
            ? "text-orange-600 hover:text-orange-500"
            : isForestWhisper(currentTheme)
              ? "text-green-600 hover:text-green-500"
              : "text-indigo-600 hover:text-indigo-500"
    } text-sm font-semibold flex items-center transition-all duration-200 transform hover:scale-105`,
    buttonSave: `${
      isDarkMode(currentTheme)
        ? "bg-green-600 hover:bg-green-700 text-white"
        : isOceanBreeze(currentTheme)
          ? "bg-teal-600 hover:bg-teal-700 text-white"
          : isSunsetGlow(currentTheme)
            ? "bg-orange-600 hover:bg-orange-700 text-white"
            : isForestWhisper(currentTheme)
              ? "bg-green-600 hover:bg-green-700 text-white"
              : "bg-green-600 hover:bg-green-700 text-white"
    } px-4 py-2 rounded-lg text-sm font-semibold shadow-md transition-all duration-200 transform hover:scale-105`,
    buttonCancel: `${
      isDarkMode(currentTheme)
        ? "bg-gray-600 hover:bg-gray-700 text-white"
        : isOceanBreeze(currentTheme)
          ? "bg-blue-500 hover:bg-blue-600 text-white"
          : isSunsetGlow(currentTheme)
            ? "bg-pink-500 hover:bg-pink-600 text-white"
            : isForestWhisper(currentTheme)
              ? "bg-emerald-500 hover:bg-emerald-600 text-white"
              : "bg-gray-500 hover:bg-gray-600 text-white"
    } px-4 py-2 rounded-lg text-sm font-semibold shadow-md transition-all duration-200 transform hover:scale-105`,
    buttonDeleteToastConfirm: `${
      isDarkMode(currentTheme)
        ? "bg-red-600 hover:bg-red-700 text-white"
        : "bg-red-600 hover:bg-red-700 text-white"
    } px-3 py-1 rounded-lg text-sm font-semibold transition-all duration-200`,
    buttonDeleteToastCancel: `${
      isDarkMode(currentTheme)
        ? "bg-gray-600 hover:bg-gray-700 text-white"
        : isOceanBreeze(currentTheme)
          ? "bg-blue-500 hover:bg-blue-600 text-white"
          : isSunsetGlow(currentTheme)
            ? "bg-pink-500 hover:bg-pink-600 text-white"
            : isForestWhisper(currentTheme)
              ? "bg-emerald-500 hover:bg-emerald-600 text-white"
              : "bg-gray-500 hover:bg-gray-600 text-white"
    } px-3 py-1 rounded-lg text-sm font-semibold transition-all duration-200`,
    input: `${
      isDarkMode(currentTheme)
        ? "bg-gray-900 border-gray-600 text-gray-200 focus:ring-indigo-500"
        : isOceanBreeze(currentTheme)
          ? "bg-blue-50 border-teal-400 text-teal-800 focus:ring-teal-500"
          : isSunsetGlow(currentTheme)
            ? "bg-orange-50 border-orange-400 text-orange-800 focus:ring-orange-500"
            : isForestWhisper(currentTheme)
              ? "bg-green-50 border-green-400 text-green-800 focus:ring-green-500"
              : "bg-white border-gray-300 text-gray-800 focus:ring-indigo-500"
    } p-2 border rounded-lg text-sm shadow-sm transition-all duration-200 focus:outline-none focus:ring-2`,
    icon: `${
      isDarkMode(currentTheme)
        ? "text-indigo-400"
        : isOceanBreeze(currentTheme)
          ? "text-teal-600"
          : isSunsetGlow(currentTheme)
            ? "text-orange-600"
            : isForestWhisper(currentTheme)
              ? "text-green-600"
              : "text-indigo-600"
    } h-6 w-6 transition-transform duration-300`,
    smallIcon: `${
      isDarkMode(currentTheme)
        ? "text-indigo-400"
        : isOceanBreeze(currentTheme)
          ? "text-teal-600"
          : isSunsetGlow(currentTheme)
            ? "text-orange-600"
            : isForestWhisper(currentTheme)
              ? "text-green-600"
              : "text-indigo-600"
    } w-4 h-4 transition-transform duration-300 hover:scale-110`,
    sortFilterIcon: `${
      isDarkMode(currentTheme)
        ? "text-gray-300"
        : isOceanBreeze(currentTheme)
          ? "text-teal-600"
          : isSunsetGlow(currentTheme)
            ? "text-orange-600"
            : isForestWhisper(currentTheme)
              ? "text-green-600"
              : "text-gray-500"
    } w-4 h-4`,
    dot: `${
      isDarkMode(currentTheme)
        ? "bg-indigo-500"
        : isOceanBreeze(currentTheme)
          ? "bg-teal-500"
          : isSunsetGlow(currentTheme)
            ? "bg-orange-500"
            : isForestWhisper(currentTheme)
              ? "bg-green-500"
              : "bg-indigo-400"
    } w-3 h-3 rounded-full`,
    dotContainer: `${
      isDarkMode(currentTheme)
        ? "bg-indigo-900"
        : isOceanBreeze(currentTheme)
          ? "bg-teal-100"
          : isSunsetGlow(currentTheme)
            ? "bg-orange-100"
            : isForestWhisper(currentTheme)
              ? "bg-green-100"
              : "bg-indigo-100"
    } w-8 h-8 rounded-full flex items-center justify-center mr-3 shadow-sm transition-transform duration-300 hover:scale-110`,
    innerDot: `${
      isDarkMode(currentTheme)
        ? "bg-indigo-500"
        : isOceanBreeze(currentTheme)
          ? "bg-teal-500"
          : isSunsetGlow(currentTheme)
            ? "bg-orange-500"
            : isForestWhisper(currentTheme)
              ? "bg-green-500"
              : "bg-indigo-600"
    } w-4 h-4 rounded-full`,
    aiContent: `${
      isDarkMode(currentTheme)
        ? "bg-indigo-900 border-indigo-800 text-gray-200"
        : isOceanBreeze(currentTheme)
          ? "bg-teal-50 bg-opacity-90 backdrop-blur-md border-teal-400 text-teal-800"
          : isSunsetGlow(currentTheme)
            ? "bg-pink-50 bg-opacity-90 backdrop-blur-md border-orange-400 text-orange-800"
            : isForestWhisper(currentTheme)
              ? "bg-emerald-50 bg-opacity-90 backdrop-blur-md border-green-400 text-green-800"
              : "bg-indigo-50 border-indigo-200 text-gray-800"
    } p-5 rounded-xl border shadow-inner min-h-[120px] transition-all duration-300`,
    streakActive: `${
      isDarkMode(currentTheme)
        ? "bg-indigo-500 text-white"
        : isOceanBreeze(currentTheme)
          ? "bg-teal-500 text-white"
          : isSunsetGlow(currentTheme)
            ? "bg-orange-500 text-white"
            : isForestWhisper(currentTheme)
              ? "bg-green-500 text-white"
              : "bg-indigo-600 text-white"
    } w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium shadow-sm transition-all duration-300 hover:scale-110`,
    streakInactive: `${
      isDarkMode(currentTheme)
        ? "bg-gray-600 text-gray-400"
        : isOceanBreeze(currentTheme)
          ? "bg-blue-200 text-blue-600"
          : isSunsetGlow(currentTheme)
            ? "bg-orange-200 text-orange-600"
            : isForestWhisper(currentTheme)
              ? "bg-green-200 text-green-600"
              : "bg-gray-100 text-gray-500"
    } w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium shadow-sm transition-all duration-300 hover:scale-110`,
    taskComplete: `${
      isDarkMode(currentTheme)
        ? "text-green-400 hover:text-green-500"
        : isOceanBreeze(currentTheme)
          ? "text-teal-600 hover:text-teal-700"
          : isSunsetGlow(currentTheme)
            ? "text-orange-600 hover:text-orange-700"
            : isForestWhisper(currentTheme)
              ? "text-green-600 hover:text-green-700"
              : "text-indigo-600 hover:text-indigo-700"
    }`,
    taskIncomplete: `${
      isDarkMode(currentTheme)
        ? "text-gray-500 hover:text-gray-400"
        : isOceanBreeze(currentTheme)
          ? "text-blue-400 hover:text-blue-500"
          : isSunsetGlow(currentTheme)
            ? "text-orange-400 hover:text-orange-500"
            : isForestWhisper(currentTheme)
              ? "text-green-400 hover:text-green-500"
              : "text-gray-400 hover:text-gray-500"
    }`,
    analyticsCard: `${
      isDarkMode(currentTheme)
        ? "bg-gray-700"
        : isOceanBreeze(currentTheme)
          ? "bg-amber-50 bg-opacity-90 backdrop-blur-md"
          : isSunsetGlow(currentTheme)
            ? "bg-pink-50 bg-opacity-90 backdrop-blur-md"
            : isForestWhisper(currentTheme)
              ? "bg-emerald-50 bg-opacity-90 backdrop-blur-md"
              : "bg-gray-50"
    } p-5 rounded-xl shadow-md transition-all duration-300 hover:shadow-xl`,
    completionRate: `${
      isDarkMode(currentTheme)
        ? "bg-gray-700"
        : isOceanBreeze(currentTheme)
          ? "bg-teal-50 bg-opacity-90 backdrop-blur-md"
          : isSunsetGlow(currentTheme)
            ? "bg-pink-50 bg-opacity-90 backdrop-blur-md"
            : isForestWhisper(currentTheme)
              ? "bg-emerald-50 bg-opacity-90 backdrop-blur-md"
              : "bg-gray-50"
    } inline-block p-12 rounded-full mb-4 shadow-lg transition-all duration-300 hover:shadow-xl`,
    completionRateText: `${
      isDarkMode(currentTheme)
        ? "text-indigo-400"
        : isOceanBreeze(currentTheme)
          ? "text-teal-700"
          : isSunsetGlow(currentTheme)
            ? "text-orange-600"
            : isForestWhisper(currentTheme)
              ? "text-green-600"
              : "text-indigo-600"
    } text-5xl font-extrabold tracking-tight`,
    barCompletion: `${
      isDarkMode(currentTheme)
        ? "bg-indigo-500"
        : isOceanBreeze(currentTheme)
          ? "bg-teal-500"
          : isSunsetGlow(currentTheme)
            ? "bg-orange-500"
            : isForestWhisper(currentTheme)
              ? "bg-green-500"
              : "bg-indigo-600"
    } rounded-t-md transition-all duration-300`,
    barHours: `${
      isDarkMode(currentTheme)
        ? "bg-purple-500"
        : isOceanBreeze(currentTheme)
          ? "bg-cyan-500"
          : isSunsetGlow(currentTheme)
            ? "bg-amber-500"
            : isForestWhisper(currentTheme)
              ? "bg-lime-500"
              : "bg-purple-600"
    } rounded-t-md transition-all duration-300`,
    snapshotCard: `${
      isDarkMode(currentTheme)
        ? "bg-indigo-900 border border-indigo-800"
        : isOceanBreeze(currentTheme)
          ? "bg-teal-50 bg-opacity-90 backdrop-blur-md border border-teal-400"
          : isSunsetGlow(currentTheme)
            ? "bg-pink-50 bg-opacity-90 backdrop-blur-md border border-orange-400"
            : isForestWhisper(currentTheme)
              ? "bg-emerald-50 bg-opacity-90 backdrop-blur-md border border-green-400"
              : "bg-indigo-50 border border-indigo-200"
    } mt-8 p-5 rounded-xl shadow-md transition-all duration-300 text-left`,
    formSection: `${
      isDarkMode(currentTheme)
        ? "border-gray-600 bg-gray-700"
        : isOceanBreeze(currentTheme)
          ? "border-teal-400 bg-amber-50 bg-opacity-90 backdrop-blur-md"
          : isSunsetGlow(currentTheme)
            ? "border-orange-400 bg-pink-50 bg-opacity-90 backdrop-blur-md"
            : isForestWhisper(currentTheme)
              ? "border-green-400 bg-emerald-50 bg-opacity-90 backdrop-blur-md"
              : "border-gray-300 bg-gray-50"
    } p-4 border-b`,
    editButton: `${
      isDarkMode(currentTheme)
        ? "text-gray-300 hover:text-gray-100"
        : isOceanBreeze(currentTheme)
          ? "text-teal-600 hover:text-teal-700"
          : isSunsetGlow(currentTheme)
            ? "text-orange-600 hover:text-orange-700"
            : isForestWhisper(currentTheme)
              ? "text-green-600 hover:text-green-700"
              : "text-gray-600 hover:text-gray-800"
    } p-2 rounded-full transition-all duration-200 transform hover:scale-110`,
    deleteButton: `${
      isDarkMode(currentTheme)
        ? "text-red-400 hover:text-red-500"
        : "text-red-600 hover:text-red-700"
    } p-2 rounded-full transition-all duration-200 transform hover:scale-110`,
    pointsDisplay: `${
      isDarkMode(currentTheme)
        ? "bg-gray-700"
        : isOceanBreeze(currentTheme)
          ? "bg-amber-50 bg-opacity-80 backdrop-blur-md"
          : isSunsetGlow(currentTheme)
            ? "bg-pink-50 bg-opacity-80 backdrop-blur-md"
            : isForestWhisper(currentTheme)
              ? "bg-emerald-50 bg-opacity-80 backdrop-blur-md"
              : "bg-gray-50"
    } p-6 rounded-xl text-center shadow-md transition-all duration-300 hover:shadow-lg`,
    pointsTextPositive: `${
      isDarkMode(currentTheme)
        ? "text-indigo-300"
        : isOceanBreeze(currentTheme)
          ? "text-teal-600"
          : isSunsetGlow(currentTheme)
            ? "text-orange-600"
            : isForestWhisper(currentTheme)
              ? "text-green-600"
              : "text-indigo-600"
    } text-4xl font-extrabold mb-3 tracking-wide`,
    pointsTextNegative: `text-red-600 text-4xl font-extrabold mb-3 tracking-wide`,
    badgeCardEarned: `${
      isDarkMode(currentTheme)
        ? "bg-indigo-900 border border-indigo-500"
        : isOceanBreeze(currentTheme)
          ? "bg-teal-50 bg-opacity-90 backdrop-blur-md border border-teal-400"
          : isSunsetGlow(currentTheme)
            ? "bg-orange-50 bg-opacity-90 backdrop-blur-md border border-orange-400"
            : isForestWhisper(currentTheme)
              ? "bg-green-50 bg-opacity-90 backdrop-blur-md border border-green-400"
              : "bg-indigo-100 border border-indigo-300"
    } p-6 rounded-xl text-center shadow-md transition-all duration-300 hover:shadow-xl hover:scale-105`,
    badgeCardNotEarned: `${
      isDarkMode(currentTheme)
        ? "bg-gray-700 opacity-60 border border-gray-600"
        : isOceanBreeze(currentTheme)
          ? "bg-gray-200 opacity-60 backdrop-blur-md border border-gray-300"
          : isSunsetGlow(currentTheme)
            ? "bg-gray-200 opacity-60 backdrop-blur-md border border-gray-300"
            : isForestWhisper(currentTheme)
              ? "bg-gray-200 opacity-60 backdrop-blur-md border border-gray-300"
              : "bg-gray-100 opacity-60 border border-gray-200"
    } p-6 rounded-xl text-center shadow-md transition-all duration-300 hover:shadow-xl hover:scale-105`,
    themeCardUnlocked: `${
      isDarkMode(currentTheme)
        ? "bg-indigo-900 border border-indigo-500 opacity-80"
        : isOceanBreeze(currentTheme)
          ? "bg-teal-50 bg-opacity-90 backdrop-blur-md border border-teal-400 opacity-80"
          : isSunsetGlow(currentTheme)
            ? "bg-orange-50 bg-opacity-90 backdrop-blur-md border border-orange-400 opacity-80"
            : isForestWhisper(currentTheme)
              ? "bg-green-50 bg-opacity-90 backdrop-blur-md border border-green-400 opacity-80"
              : "bg-indigo-100 border border-indigo-300 opacity-80"
    } p-6 rounded-xl text-center shadow-md transition-all duration-300 hover:shadow-xl hover:scale-105`,
    themeCardLocked: `${
      isDarkMode(currentTheme)
        ? "bg-gray-700 border border-gray-600"
        : isOceanBreeze(currentTheme)
          ? "bg-gray-200 backdrop-blur-md border border-gray-300"
          : isSunsetGlow(currentTheme)
            ? "bg-gray-200 backdrop-blur-md border border-gray-300"
            : isForestWhisper(currentTheme)
              ? "bg-gray-200 backdrop-blur-md border border-gray-300"
              : "bg-gray-100 border border-gray-200"
    } p-6 rounded-xl text-center shadow-md transition-all duration-300 hover:shadow-xl hover:scale-105`,
    streakIcon: `${
      isDarkMode(currentTheme)
        ? "text-orange-400"
        : isOceanBreeze(currentTheme)
          ? "text-orange-500"
          : isSunsetGlow(currentTheme)
            ? "text-orange-600"
            : isForestWhisper(currentTheme)
              ? "text-green-600"
              : "text-orange-600"
    } inline-block w-10 h-10 mb-3 transition-transform duration-300 hover:scale-110`,
    earnedText: `${
      isDarkMode(currentTheme)
        ? "text-green-500"
        : isOceanBreeze(currentTheme)
          ? "text-green-500"
          : isSunsetGlow(currentTheme)
            ? "text-green-500"
            : isForestWhisper(currentTheme)
              ? "text-green-500"
              : "text-green-500"
    }`,
    notEarnedText: `${
      isDarkMode(currentTheme)
        ? "text-gray-500"
        : isOceanBreeze(currentTheme)
          ? "text-blue-500"
          : isSunsetGlow(currentTheme)
            ? "text-orange-400"
            : isForestWhisper(currentTheme)
              ? "text-green-400"
              : "text-gray-400"
    }`,
    layoutTheme: `${
      isDarkMode(currentTheme)
        ? "bg-gray-900 text-gray-100"
        : isOceanBreeze(currentTheme)
          ? "bg-gradient-to-br from-blue-50 to-teal-100 text-blue-900"
          : isSunsetGlow(currentTheme)
            ? "bg-gradient-to-br from-orange-50 to-pink-100 text-orange-900 backdrop-blur-sm"
            : isForestWhisper(currentTheme)
              ? "bg-gradient-to-br from-green-50 to-emerald-100 text-green-900 backdrop-blur-sm"
              : "bg-gray-100 text-gray-900"
    }`,
    header: `${
      isDarkMode(currentTheme)
        ? "bg-indigo-900 text-gray-100 shadow-lg"
        : isOceanBreeze(currentTheme)
          ? "bg-gradient-to-r from-blue-600 to-teal-600 text-white shadow-lg"
          : isSunsetGlow(currentTheme)
            ? "bg-gradient-to-r from-orange-600 to-pink-600 text-white shadow-lg"
            : isForestWhisper(currentTheme)
              ? "bg-gradient-to-r from-green-600 to-teal-600 text-white shadow-lg"
              : "bg-indigo-600 text-white shadow-lg"
    }`,
    nav: `${
      isDarkMode(currentTheme)
        ? "bg-gray-800 text-gray-300 border-b border-gray-700"
        : isOceanBreeze(currentTheme)
          ? "bg-blue-100 text-blue-800 border-b border-teal-300"
          : isSunsetGlow(currentTheme)
            ? "bg-orange-50 text-orange-800 border-b border-orange-300"
            : isForestWhisper(currentTheme)
              ? "bg-green-50 text-green-800 border-b border-green-300"
              : "bg-white text-gray-600 border-b border-gray-200"
    }`,
    dateDisplay: `${
      isDarkMode(currentTheme)
        ? "bg-indigo-800 text-gray-200"
        : "bg-white bg-opacity-20 text-white"
    } px-4 py-2 rounded-lg text-sm font-medium`,
    tabActive: `${
      isDarkMode(currentTheme)
        ? "text-indigo-400 border-b-2 border-indigo-400"
        : isOceanBreeze(currentTheme)
          ? "text-teal-600 border-b-2 border-teal-600"
          : isSunsetGlow(currentTheme)
            ? "text-orange-600 border-b-2 border-orange-600"
            : isForestWhisper(currentTheme)
              ? "text-green-600 border-b-2 border-green-600"
              : "text-indigo-600 border-b-2 border-indigo-600"
    }`,
    tabInactive: `${
      isDarkMode(currentTheme)
        ? "text-gray-400 hover:text-gray-200"
        : isOceanBreeze(currentTheme)
          ? "text-blue-700 hover:text-teal-600"
          : isSunsetGlow(currentTheme)
            ? "text-orange-700 hover:text-orange-600"
            : isForestWhisper(currentTheme)
              ? "text-green-700 hover:text-green-600"
              : "text-gray-600 hover:text-gray-800"
    }`,
    loadingDot: `${
      isDarkMode(currentTheme)
        ? "bg-indigo-500"
        : isOceanBreeze(currentTheme)
          ? "bg-teal-500"
          : isSunsetGlow(currentTheme)
            ? "bg-orange-500"
            : isForestWhisper(currentTheme)
              ? "bg-green-500"
              : "bg-indigo-600"
    } w-5 h-5 rounded-full`,
    loadingText: `${
      isDarkMode(currentTheme)
        ? "text-gray-400"
        : isOceanBreeze(currentTheme)
          ? "text-blue-700"
          : isSunsetGlow(currentTheme)
            ? "text-orange-700"
            : isForestWhisper(currentTheme)
              ? "text-green-700"
              : "text-gray-600"
    }`,
    footerText: `${
      isDarkMode(currentTheme)
        ? "text-gray-500"
        : isOceanBreeze(currentTheme)
          ? "text-blue-700"
          : isSunsetGlow(currentTheme)
            ? "text-orange-700"
            : isForestWhisper(currentTheme)
              ? "text-green-700"
              : "text-gray-600"
    }`,
  };
};

export { themeConditions, getCardStyles };
