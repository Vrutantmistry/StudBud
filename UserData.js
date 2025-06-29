const mongoose = require("mongoose");

const userDataSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  tasks: [
    {
      id: Number,
      title: String,
      dueDate: String,
      priority: String,
      subject: String,
      completed: Boolean,
      completedDate: String,
    },
  ],
  studyStats: {
    totalHours: Number,
    completedTasks: Number,
    streak: Number,
    lastActiveDate: String,
    lastStreakUpdate: String,
    studyHoursLog: [{ date: String, hours: Number }],
  },
  points: Number,
  badges: [String],
  currentTheme: String,
});

module.exports = mongoose.model("UserData", userDataSchema);
