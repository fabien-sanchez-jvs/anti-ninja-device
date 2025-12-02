/**
 * Catalogue de couleurs centralisé
 * Ces valeurs correspondent aux variables CSS définies dans index.css
 */
export const colors = {
  primary: "var(--color-primary)",
  primaryDark: "var(--color-primary-dark)",
  secondary: "var(--color-secondary)",

  success: "var(--color-success)",
  successLight: "var(--color-success-light)",
  successDark: "var(--color-success-dark)",

  error: "var(--color-error)",
  errorDark: "var(--color-error-dark)",
  errorBg: "var(--color-error-bg)",
  errorText: "var(--color-error-text)",

  gray: "var(--color-gray)",
  grayLight: "var(--color-gray-light)",
  grayMedium: "var(--color-gray-medium)",
  grayDark: "var(--color-gray-dark)",

  textDark: "var(--color-text-dark)",
  textMedium: "var(--color-text-medium)",
  white: "var(--color-white)",
  whiteOff: "var(--color-white-off)",
  whiteTint: "var(--color-white-tint)",
  border: "var(--color-border)",
} as const;
