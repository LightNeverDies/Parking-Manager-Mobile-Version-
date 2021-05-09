module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    presets: ['module:metro-react-native-babel-preset'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['.'],
          extensions: [
            '.ios.ts',
            '.android.ts',
            '.ts',
            '.ios.tsx',
            '.android.tsx',
            '.tsx',
            '.jsx',
            '.js',
            '.json',
          ],
          alias: {
            '@src/pages': './src/pages',
            '@src/components': './src/components',
            '@src/utils': './src/utils',
            '@src/router': './src/router',
            '@src/config': './src/config',
            '@src/reduxStore': './src/reduxStore'
          },
        },
      ],
    ],
  };
};
