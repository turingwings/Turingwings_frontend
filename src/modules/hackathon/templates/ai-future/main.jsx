import React from 'react';
import ReactDOM from 'react-dom/client';
import TemplateLayout from './TemplateLayout';
import './styles/globals.css';

/**
 * main.jsx
 * Standalone dev/preview bootstrap only — used when running `npm run dev`
 * to preview the template on its own with sample data. The Turing Wings
 * platform does NOT use this file; it imports src/index.jsx directly and
 * renders <TemplateLayout> inside its own app shell.
 */
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <TemplateLayout />
  </React.StrictMode>
);
