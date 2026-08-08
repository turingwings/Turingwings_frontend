import { createContext, useContext } from 'react';
import { defaultEventData } from '../config/defaults';

/**
 * useEventData
 * Reads the admin-entered event data from context. This is the single
 * hook every page/section should use to get content — never import
 * config/defaults.js directly inside a component, so the template stays
 * swappable at runtime.
 */
export const EventDataContext = createContext(defaultEventData);

export function useEventData() {
  return useContext(EventDataContext);
}
