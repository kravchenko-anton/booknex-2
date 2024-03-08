export function romanizeNumber(roman: string): number {
	let result = 0
	const romanMap: { [key: string]: number } = {
		M: 1000,
		D: 500,
		C: 100,
		L: 50,
		X: 10,
		V: 5,
		I: 1
	}
	const others = new Set(['CD', 'CM', 'XL', 'XC', 'IV', 'IX'])
	for (let index = 0; index < roman.length; index++) {
		others.has(roman[index] + roman[index + 1])
			? (result -= romanMap[roman[index]])
			: (result += romanMap[roman[index]])
	}
	return result
}
