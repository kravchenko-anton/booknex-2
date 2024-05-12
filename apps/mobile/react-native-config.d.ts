declare module 'react-native-config' {
	export interface NativeConfig {
		SENTRY_DNC: string
		SERVER_URL: string
	}

	export const Config: NativeConfig
	export default Config
}
