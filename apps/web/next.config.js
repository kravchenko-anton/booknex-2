//@ts-chneck

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { composePlugins, withNx } = require('@nx/next')

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
	images: {
		domains: ['f005.backblazeb2.com']
	},
	experimental: {
		turbo: {
			rules: {
				// Option format
				'*.md': [
					{
						loader: '@mdx-js/loader',
						options: {
							format: 'md'
						}
					}
				],
				// Option-less format
				'*.mdx': ['@mdx-js/loader']
			}
		}
	},
	nx: {
		svgr: true
	},
	env: {
		TINYMCE: process.env.TINYMCE,
		GPT_TINYMCE: process.env.GPT_TINYMCE
	}
}

const plugins = [withNx]

module.exports = composePlugins(...plugins)(nextConfig)
