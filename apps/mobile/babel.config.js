module.exports = function(api) {
	api.cache(true)
	return {
		presets: ['module:metro-react-react-native-babel-preset'],
		plugins: [
			['nativewind/babel'],
			['module-resolver', {
				'root': ['./src/app'],
				'alias': {
					'@': './src/app',
					'ui/*': '../../libs/ui/*',
					'ui/components': '../../libs/ui/react-native/index.ts',
					'icons': '../../libs/global/icons/react-native/index.ts'
					,
					'global/*': '../../libs/global/*'
				}
			}],
			[
				'react-react-native-reanimated/plugin',
				{
					relativeSourceLocation: true
				}
			]
		]
	}
}
