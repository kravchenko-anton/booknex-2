import { SCREEN_HEIGHT } from '@/utils/dimensions'

export const CalculateSnapPoints = (snapPoints: (string | number)[]) => {
	return snapPoints.map(point => {
		if (typeof point === 'number') return point
		if (point.includes('%')) {
			return (Number(point.replace('%', '')) / 100) * SCREEN_HEIGHT
		}
	})
}
