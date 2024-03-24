module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['module:metro-react-native-babel-preset'],
    plugins: [
      ['nativewind/babel'],
      [
        'module-resolver',
        {
          alias: {
            '@': './src',
            'ui/colors': '../../libs/ui/colors.ts',
            icons: '../../libs/global/icons/react-native',
            illustrations: '../../libs/global/illustrations/react-native',
            global: '../../libs/global'
          }
        }
      ],
      'react-native-reanimated/plugin'
    ]
  };
};
