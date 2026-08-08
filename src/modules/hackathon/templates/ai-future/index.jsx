/**
 * index.jsx
 * -----------------------------------------------------------------------
 * Public entry point of the template package. When the Turing Wings
 * platform "loads this template dynamically," this is the module it
 * imports:
 *
 *   import HackathonTemplate from 'templates/hackathon';
 *   <HackathonTemplate eventData={event} themeOverrides={theme} />
 *
 * Everything else in src/ is an implementation detail reachable through
 * this single export, keeping the template embeddable in any host app.
 * -----------------------------------------------------------------------
 */
export { default } from './TemplateLayout';
export { defaultEventData } from './config/defaults';
export { defaultTheme, mergeTheme } from './config/theme';
