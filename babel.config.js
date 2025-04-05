module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }],
    '@babel/preset-typescript',
    ['@babel/preset-react', { runtime: 'automatic' }],
  ],
  ignore: [
    './src/app/**/*.ts',
    './src/app/**/*.tsx',
    './src/pages/**/*.ts',
    './src/pages/**/*.tsx',
  ]
}; 