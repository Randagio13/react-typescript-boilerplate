import webpack from 'webpack'
import path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import Visualizer from 'webpack-visualizer-plugin'

const LAUNCH_COMMAND = process.env.npm_lifecycle_event
const ENV_VERSION = process.env.npm_package_version
const isProduction = LAUNCH_COMMAND === 'release' || LAUNCH_COMMAND === 'beta'
process.env.BABEL_ENV = LAUNCH_COMMAND

console.log('ENV VERSION --> 📟 ', ENV_VERSION)
console.log('LAUCH_COMMAND --> 🚀 ', LAUNCH_COMMAND)
console.log('Is production? --> 🐵 ', isProduction)
console.log('BABEL_ENV --> 🎲 ', LAUNCH_COMMAND)

const PATHS = {
  app: path.join(__dirname, 'src'),
  components: path.join(__dirname, 'src', 'components'),
  containers: path.join(__dirname, 'src', 'containers'),
  constants: path.join(__dirname, 'src', 'constants'),
  settings: path.join(__dirname, 'src', 'settings'),
  build: path.join(__dirname, 'dist'),
  reducers: path.join(__dirname, 'src', 'reducers'),
  styles: path.join(__dirname, 'src', 'styles'),
  helpers: path.join(__dirname, 'src', 'helpers'),
  routes: path.join(__dirname, 'src', 'routes'),
  images: path.join(__dirname, 'src', 'images')
}

const devtool = isProduction ? 'source-map' : 'cheap-module-eval-source-map'
const mode = isProduction ? 'production' : 'development'

console.log('Tool -> ⚙️ ', devtool, mode)

const base = {
  mode: mode,
  devtool: devtool,
  context: PATHS.app,
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          transpileOnly: true
        }
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader'
      },
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              minimize: true
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              camelCase: true,
              minimize: true,
              modules: true,
              importLoaders: 1,
              localIdentName: '[path][name]__[local]--[hash:base64:5]'
            }
          },
          { loader: 'sass-loader' }
        ]
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192
            }
          }
        ]
      }
    ]
  },
  resolve: {
    modules: [
      'node_modules',
      path.join(__dirname, 'src')
    ],
    extensions: ['.js', '.scss', '.ts', '.tsx', '.json', '.jpg', '.png', '.svg'],
    alias: {
      src: PATHS.app,
      components: PATHS.components,
      containers: PATHS.containers,
      constants: PATHS.constants,
      settings: PATHS.settings,
      reducers: PATHS.reducers,
      styles: PATHS.styles,
      helpers: PATHS.helpers,
      routes: PATHS.routes,
      images: PATHS.images
    }
  },
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
    google: 'google'
  }
}

const developmentConfig = {
  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    'index'
  ],
  output: {
    path: PATHS.build,
    filename: 'bundle.js',
    publicPath: '/'
  },
  devServer: {
    hot: true,
    // contentBase: PATHS.build,
    publicPath: '/',
    historyApiFallback: true,
    port: 8080,
    compress: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      process: {
        env: {
          NODE_ENV: JSON.stringify(LAUNCH_COMMAND),
          ENV_VERSION: JSON.stringify(ENV_VERSION)
        }
      }
    }),
    new HtmlWebpackPlugin({
      title: 'React Typescript Boilerplate',
      template: path.join(__dirname, 'index.html'),
      minify: {
        collapseWhitespace: true
      }
    }),
    new Visualizer({
      filename: './statistics.html'
    })
  ]
}

const productionConfig = {
  entry: {
    main: 'index'
  },
  output: {
    path: PATHS.build,
    filename: '[name].js',
    chunkFilename: '[chunkhash].js'
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    },
    runtimeChunk: true
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
      process: {
        env: {
          NODE_ENV: JSON.stringify('production'),
          ENV_VERSION: JSON.stringify(ENV_VERSION)
        }
      }
    }),
    new HtmlWebpackPlugin({
      title: 'React Typescript Boilerplate',
      template: path.join(__dirname, 'index.html'),
      minify: {
        collapseWhitespace: true
      }
    }),
    new Visualizer({
      filename: './statistics.prod.html'
    })
  ]
}

const config = isProduction === true ? 'Production' : 'Development'
console.log('Webpack config --> 🐵 ', config)

export default Object.assign(
  {}, base, isProduction === true ? productionConfig : developmentConfig
)
