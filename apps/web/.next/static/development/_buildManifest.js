self.__BUILD_MANIFEST = (function (a, b, c, d, e, f, g) {
	return {
		__rewrites: {
			afterFiles: [
				{
					has: [
						{ type: a, key: b, value: c },
						{ type: a, key: d, value: e },
						{ type: a, key: 'r', value: '(?\u003Cregion\u003E\\[a-z\\]{2})' }
					],
					source: f,
					destination: g
				},
				{
					has: [
						{ type: a, key: b, value: c },
						{ type: a, key: d, value: e }
					],
					source: f,
					destination: g
				}
			],
			beforeFiles: [],
			fallback: []
		},
		'/_error': ['static\u002Fchunks\u002Fpages\u002F_error.js'],
		sortedPages: ['\u002F_app', '\u002F_error']
	}
})(
	'query',
	'o',
	'(?\u003Corgid\u003E\\d*)',
	'p',
	'(?\u003Cprojectid\u003E\\d*)',
	'\u002Fmonitoring(\u002F?)',
	void 0
)
self.__BUILD_MANIFEST_CB && self.__BUILD_MANIFEST_CB()
