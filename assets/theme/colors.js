const colors = {
  // Primary
  primary: (opacity = 1) => `rgba(79, 70, 229, ${opacity})`,      // Indigo
  primaryLight: (opacity = 1) => `rgba(129, 140, 248, ${opacity})`,
  primaryDark: (opacity = 1) => `rgba(55, 48, 163, ${opacity})`,

  // Secondary
  secondary: (opacity = 1) => `rgba(16, 185, 129, ${opacity})`,   // Emerald
  secondaryLight: (opacity = 1) => `rgba(110, 231, 183, ${opacity})`,

  // Accent
  accent: (opacity = 1) => `rgba(245, 158, 11, ${opacity})`,      // Amber
  accentLight: (opacity = 1) => `rgba(252, 211, 77, ${opacity})`,

  // Neutral
  white: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  background: (opacity = 1) => `rgba(248, 250, 252, ${opacity})`, // Slate-50
  card: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,

  // Text
  textPrimary: (opacity = 1) => `rgba(15, 23, 42, ${opacity})`,   // Slate-900
  textSecondary: (opacity = 1) => `rgba(71, 85, 105, ${opacity})`,// Slate-600
  textMuted: (opacity = 1) => `rgba(148, 163, 184, ${opacity})`,  // Slate-400

  // Border
  border: (opacity = 1) => `rgba(226, 232, 240, ${opacity})`,     // Slate-200

  // Status
  success: (opacity = 1) => `rgba(34, 197, 94, ${opacity})`,
  warning: (opacity = 1) => `rgba(245, 158, 11, ${opacity})`,
  danger: (opacity = 1) => `rgba(239, 68, 68, ${opacity})`,
  info: (opacity = 1) => `rgba(59, 130, 246, ${opacity})`,

  // Dark Mode
  darkBackground: (opacity = 1) => `rgba(15, 23, 42, ${opacity})`,
  darkCard: (opacity = 1) => `rgba(30, 41, 59, ${opacity})`,
  darkText: (opacity = 1) => `rgba(248, 250, 252, ${opacity})`,
};

export default colors;