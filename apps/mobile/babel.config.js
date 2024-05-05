module.exports = function (api) {
	const plugins = [
		[
			'module:react-native-dotenv',
			{
				moduleName: '@env',
				path: '.env'
			}
		],
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

	api.cache(true)
	return {
		presets: ['module:metro-react-native-babel-preset'],
		plugins
	}
}
