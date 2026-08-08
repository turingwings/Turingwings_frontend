import { createContext, useContext } from 'react';
import { defaultTheme } from '../config/theme';

/**
 * useTheme
 * Reads the active theme from React context. TemplateLayout provides
 * the ThemeContext.Provider so any component anywhere in the tree can
 * call useTheme() to read admin-set colors/fonts/motion preferences.
 */
export const ThemeContext = createContext(defaultTheme);

export function useTheme() {
  return useContext(ThemeContext);
}
