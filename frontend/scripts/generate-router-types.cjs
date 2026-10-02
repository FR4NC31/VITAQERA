const fs = require('node:fs');
const path = require('node:path');

require('./patch-expo-typed-routes.cjs');

const projectRoot = path.dirname(require.resolve('../package.json'));
const appRoot = path.join(projectRoot, 'src', 'app');
const typesDirectory = path.join(projectRoot, '.expo', 'types');

// Use a fresh filesystem context so renamed/deleted routes cannot survive in types.
process.env.EXPO_ROUTER_APP_ROOT = appRoot;
const { requireContext } = require('expo-router/internal/testing');
const { EXPO_ROUTER_CTX_IGNORE } = require('expo-router/_ctx-shared');
const { getTypedRoutesDeclarationFile } = require(
  require.resolve('@expo/router-server/build/typed-routes/generate', {
    paths: [require.resolve('@expo/cli/package.json')],
  })
);
const context = requireContext(appRoot, true, EXPO_ROUTER_CTX_IGNORE);
const declaration = getTypedRoutesDeclarationFile(context);

if (!declaration) {
  throw new Error('Expo Router did not generate route types.');
}

fs.mkdirSync(typesDirectory, { recursive: true });
fs.writeFileSync(path.join(typesDirectory, 'router.d.ts'), declaration);
console.log('Generated Expo Router types from src/app.');
