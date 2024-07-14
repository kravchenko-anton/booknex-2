import { getJestProjects } from '@nx/jest'

export default {
	preset: 'ts-jest',
	testEnvironment: 'node',
	projects: [...getJestProjects(), 'apps/backend/jest.config.ts']
}
