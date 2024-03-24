export default {
  displayName: 'mobile',
  preset: 'react-react-native',
  resolver: '@nx/jest/plugins/resolver',
  moduleFileExtensions: ['ts', 'js', 'html', 'tsx', 'jsx'],
  setupFilesAfterEnv: ['<rootDir>/test-setup.ts'],
  moduleNameMapper: {
    '\\.svg$': '@nx/react-react-native/plugins/jest/svg-mock'
  },
  coverageDirectory: '../../coverage/apps/mobile'
};
