import { adminErrors } from '../../../../../libs/global/errors'
import environment, { type EnvironmentType } from './environment.config'

export const checkEnvironmentSet = (): void => {
	const environmentProperties = Object.keys(environment).filter(
		key =>
			environment[key as keyof EnvironmentType] === undefined ||
			environment[key as keyof EnvironmentType] === '' ||
			environment[key as keyof EnvironmentType] === null ||
			environment[key as keyof EnvironmentType] === 0
	)
	if (environmentProperties.length > 0) {
		console.error(
			`${adminErrors.someConfigMissing}, - ${environmentProperties.join(', ')}`
		)
		process.exit(1)
	}
}
