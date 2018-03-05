// Rollup plugins.
import babel from 'rollup-plugin-babel'
import cjs from 'rollup-plugin-commonjs'
import globals from 'rollup-plugin-node-globals'
import replace from 'rollup-plugin-replace'
import resolve from 'rollup-plugin-node-resolve'
import external from 'rollup-plugin-peer-deps-external'
import sass from 'rollup-plugin-sass'

export default {
  input: './index.js',
  output: {
    file: 'lib/index.js',
    format: 'es'
  },
  external: [
    'react-icons/fa/google-plus',
    'react-icons/md/file-download',
    'react-icons/md/fullscreen-exit',
    'react-icons/md/arrow-back',
    'react-icons/md/arrow-forward',
  ],
  plugins: [
    sass({
      output: 'reactbox.css',
      include: ['**/*.sass'],
      options: {
        indentedSyntax: true,
        importer(path) {
          return { file: path.replace(/^~/, 'node_modules/') };
        }
      }
    }),
    external(),
    babel({
      babelrc: false,
      exclude: 'node_modules/**',
      presets: [ [ 'env', { modules: false } ], 'stage-0', 'react' ],
      plugins: [ 'external-helpers', 'jsx-control-statements' ]
    }),
    cjs({
      exclude: 'node_modules/process-es6/**',
      include: [
        'node_modules/create-react-class/**',
        'node_modules/fbjs/**',
        'node_modules/object-assign/**',
        'node_modules/react/**',
        'node_modules/react-dom/**',
        'node_modules/prop-types/**',
      ]
    }),
    globals(),

    replace({ 'process.env.NODE_ENV': JSON.stringify('development') }),
    resolve({
      browser: true,
      main: true,
      extensions: [ '.js', '.jsx', 'sass'],
    }),

  ]
}
