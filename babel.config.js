module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./app'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '@Navigator': './app/navigators',
          '@Screens': './app/screens',
          '@Themes': './app/themes',
          '@Configs': './app/configs',
          '@Stores': './app/stores',
          '@Constants': './app/constants',
          '@Components': './app/components',
          '@Providers': './app/providers',
          '@Utils': './app/utils',
          '@Services': './app/services',
          '@Models': './app/models',
          '@Hooks': './app/hooks',
          '@Containers': './app/containers',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
