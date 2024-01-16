export const generateParameters = (
	link: string,
	parameters: Record<any, any>
) => `${link}?${new URLSearchParams(parameters).toString()}`
