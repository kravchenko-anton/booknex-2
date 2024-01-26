module.exports = function (api) {
	api.cache(true)
	return {
		presets: ['module:metro-react-native-babel-preset'],
		plugins: [
			['nativewind/babel'],
			[
				'module-resolver',
				{
					alias: {
						'@': './src',
						'ui/components': '../../libs/ui/react-native',
						'ui/colors': '../../libs/ui/colors.ts',
						icons: '../../libs/global/icons/react-native',
						global: '../../libs/global',
						backend: '../backend'
					}
				}
			],
			'react-native-reanimated/plugin'
		]
	}
}
