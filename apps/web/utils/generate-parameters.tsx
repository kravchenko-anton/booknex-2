export type GenerateParametersType = Record<any, any>

export const generateParameters = (
	link: string,
	parameters: GenerateParametersType
) => `${link}?${new URLSearchParams(parameters).toString()}`
