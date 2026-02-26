/**
 * data-loader.js
 * Fetches all JSON data files in parallel and returns a unified data object.
 */

const DATA_FILES = [
  'meta',
  'about',
  'experience',
  'education',
  'skills',
  'projects',
  'testimonials',
  'contact'
];

/**
 * Loads all JSON data files from the data/ directory.
 * @returns {Promise<Object>} An object with keys matching each data file name.
 */
export async function loadAllData() {
  const results = await Promise.all(
    DATA_FILES.map(name =>
      fetch(`./data/${name}.json`).then(response => {
        if (!response.ok) {
          throw new Error(`Failed to load data/${name}.json: ${response.status}`);
        }
        return response.json();
      })
    )
  );

  return Object.fromEntries(
    DATA_FILES.map((name, index) => [name, results[index]])
  );
}
