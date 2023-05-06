const { composePlugins, withNx } = require('@nx/webpack');
const { withReact } = require('@nx/react');
const webpack = require('webpack');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ReactRefreshTypeScript = require('react-refresh-typescript');
const TerserPlugin = require('terser-webpack-plugin');

const isDevelopment = process.env.NODE_ENV !== 'production';

const fileExtensions = [
  'jpg',
  'jpeg',
  'png',
  'gif',
  'eot',
  'otf',
  'svg',
  'ttf',
  'woff',
  'woff2',
];

// Nx plugins for webpack.
module.exports = composePlugins(withNx(), withReact(), (config) => {
  // Update the webpack config as needed here.
  // e.g. `config.plugins.push(new MyPlugin())`

  return {
    context: config.context,
    mode: config.mode,
    entry: {
      contentScript: path.join(config.context, 'src', 'index.ts'),
    },
    output: {
      filename: '[name].bundle.js',
      path: config.output.path,
      clean: true,
      publicPath: config.output.publicPath,
    },
    module: {
      rules: [
        {
          // look for .css or .scss files
          test: /\.(css|scss)$/,
          // in the `src` directory
          use: [
            {
              loader: 'style-loader',
            },
            {
              loader: 'css-loader',
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true,
              },
            },
          ],
        },
        {
          test: new RegExp('.(' + fileExtensions.join('|') + ')$'),
          type: 'asset/resource',
          exclude: /node_modules/,
          // loader: 'file-loader',
          // options: {
          //   name: '[name].[ext]',
          // },
        },
        {
          test: /\.html$/,
          loader: 'html-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.(ts|tsx)$/,
          exclude: /node_modules/,
          use: [
            {
              loader: require.resolve('ts-loader'),
              options: {
                getCustomTransformers: () => ({
                  before: [isDevelopment && ReactRefreshTypeScript()].filter(
                    Boolean
                  ),
                }),
                transpileOnly: isDevelopment,
              },
            },
          ],
        },
        {
          test: /\.(js|jsx)$/,
          use: [
            {
              loader: 'source-map-loader',
            },
            {
              loader: require.resolve('babel-loader'),
              options: {
                plugins: [
                  isDevelopment && require.resolve('react-refresh/babel'),
                ].filter(Boolean),
              },
            },
          ],
          exclude: /node_modules/,
        },
      ],
    },
    resolve: {
      alias: {},
      extensions: fileExtensions
        .map((extension) => '.' + extension)
        .concat(['.js', '.jsx', '.ts', '.tsx', '.css']),
    },
    plugins: [
      // isDevelopment && new ReactRefreshWebpackPlugin(),
      new CleanWebpackPlugin({ verbose: false }),
      new webpack.ProgressPlugin(),
      // new webpack.EnvironmentPlugin(['NODE_ENV']),
      ...config.plugins.filter((plugin) => plugin instanceof CopyWebpackPlugin),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: 'src/manifest.json',
            to: config.output.path,
            force: true,
            transform: function (content, path) {
              // generates the manifest file using the package.json informations
              return Buffer.from(
                JSON.stringify(
                  {
                    description: process.env.npm_package_description,
                    version: process.env.npm_package_version,
                    ...JSON.parse(content.toString()),
                  },
                  null,
                  2
                )
              );
            },
          },
        ],
      }),
    ].filter(Boolean),
    infrastructureLogging: {
      level: 'info',
    },
    // optimization: config.optimization,
    // performance: config.performance,
    // stats: config.stats,
    optimization: {
      minimize: true,
      minimizer: [
        new TerserPlugin({
          extractComments: false,
        }),
      ],
    },
  };
});
