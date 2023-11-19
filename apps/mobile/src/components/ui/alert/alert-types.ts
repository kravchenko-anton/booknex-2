export interface AlertProperties {
	title: string
	description: string
	acceptText: string
	type: 'success' | 'danger' | 'warning'
	onAccept: () => void
}
