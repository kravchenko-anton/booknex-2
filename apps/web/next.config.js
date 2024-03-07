//@ts-chneck

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { composePlugins, withNx } = require('@nx/next')

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
	images: {
		domains: ['f005.backblazeb2.com', 'localhost']
	},
	nx: {
		svgr: true
	},
	env: {
		CLIENT_ID: process.env.CLIENT_ID
	}
}

const plugins = [withNx]

module.exports = composePlugins(...plugins)(nextConfig)
