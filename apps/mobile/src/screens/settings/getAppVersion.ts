import { useEffect, useState } from 'react'
import codePush from 'react-native-code-push'

async function getOTAVersion() {
	try {
		const update = await codePush.getUpdateMetadata()
		return update ? update.label : null
	} catch {
		return null
	}
}

export function useAppVersion() {
	const [version, setVersion] = useState<string | null>(null)

	useEffect(() => {
		getOTAVersion().then(setVersion)
	}, [])

	return version
}
