export type Location = {
	atStart?: boolean
	atEnd?: boolean
	end: {
		cfi: EPubCfi
		displayed: {
			page: number
			total: number
		}
		href: string
		index: number
		location: number
		percentage: number
	}
	start: {
		cfi: EPubCfi
		displayed: {
			page: number
			total: number
		}
		href: string
		index: number
		location: number
		percentage: number
	}
}

export type EPubCfi = string

export type Theme = {
	body: {
		background: string
	}
	i: {
		color: string
	}
	span: {
		color: string
	}
	p: {
		color: string
	}
	li: {
		color: string
	}
	a: {
		color: string
		'font-weight': string
		textDecoration: string
		transition: string
		'font-style': string
	}
	h1: {
		'font-weight': string
		color: string
	}
	h2: {
		'font-weight': string
		color: string
	}
	h3: {
		'font-weight': string
		color: string
	}
	h4: {
		color: string
		'font-weight': string
	}
	h5: {
		color: string
		'font-weight': string
	}
	h6: {
		color: string
		'font-weight': string
	}
	'::selection': {
		background: string
		color: string
	}
	ul: {
		color: string
		'list-style-type': string
	}
	ol: {
		color: string
		'list-style-type': string
	}
	strong: {
		color: string
		'font-weight': string
	}
	em: {
		color: string
		fontStyle: string
	}
	b: {
		'font-weight': string
		color: string
	}
}
export interface Toc {
	href: string
	label: string
}
export type WebviewMessage =
	| {
			type: 'ScrollToText'
			payload: {
				text: string
			}
	  }
	| {
			type: 'ScrollToProgress'
			payload: {
				scrollTop: number
				scrollHeight: number
				progress: number
			}
	  }
	| {
			type: 'scroll'
			payload: {
				scrollTop: number
				scrollHeight: number
				progress: number
			}
	  }
export type SearchResult = {
	cfi: EPubCfi
	excerpt: string
}

export interface ReaderProperties {
	src: string
	id: number
}
