const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const devCerts = require('office-addin-dev-certs');

module.exports = async () => {
  const httpsOptions = await devCerts.getHttpsServerOptions();

  return {
    entry: './src/index.tsx',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.js',
      clean: true,
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js'],
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'public', 'index.html'),
      }),
    ],
    devServer: {
      static: {
        directory: path.join(__dirname, 'public'),
      },
      port: 3001,
      open: true,
      hot: true,
      https: httpsOptions,
    },
    mode: 'development',
  };
}; 