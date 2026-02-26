/**
 * main.js
 * Entry point — orchestrates: load data → render DOM → initialize interactions.
 */

import { loadAllData } from './data-loader.js';
import { renderAll, projectDataMap } from './renderer.js';
import { initInteractions } from './interactions.js';

async function init() {
  try {
    // 1. Fetch all JSON data in parallel
    const data = await loadAllData();

    // 2. Render all sections from templates + data
    renderAll(data);

    // 3. Show the page (was hidden to prevent flash of empty content)
    document.querySelector('main').style.visibility = 'visible';

    // 4. Initialize all interactive behavior (event listeners)
    initInteractions(projectDataMap);

  } catch (error) {
    console.error('Failed to initialize portfolio:', error);
    // Show the page even on error so it's not permanently blank
    document.querySelector('main').style.visibility = 'visible';
  }
}

init();
