const fs = require('node:fs');

// Expo's watcher must use the same slash-separated keys as require.context.
// On Windows, backslashes also let files outside src/app pass its root check.
const watcherPath = require.resolve('@expo/router-server/build/typed-routes', {
  paths: [require.resolve('@expo/cli/package.json')],
});
const source = fs.readFileSync(watcherPath, 'utf8');
const original = 'let relativePath = node_path_1.default.relative(process.env.EXPO_ROUTER_APP_ROOT, filePath);';
const normalized = original.replace(';', '.replace(/\\\\/g, "/");');

if (source.includes(normalized)) {
  console.log('Expo typed route watcher already handles Windows paths.');
} else if (source.includes(original)) {
  fs.writeFileSync(watcherPath, source.replace(original, normalized));
  console.log('Fixed Windows paths in the Expo typed route watcher.');
} else {
  throw new Error('Expo typed route watcher changed; review the Windows path patch.');
}
