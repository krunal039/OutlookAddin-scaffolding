const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const fs = require('fs');

// Try to use office-addin-dev-certs if available, otherwise fall back to basic HTTPS
let httpsOptions = true;
try {
  const devCerts = require('office-addin-dev-certs');
  // Check if certificates exist
  const certPath = require('os').homedir() + '/.office-addin-dev-certs/localhost.crt';
  if (fs.existsSync(certPath)) {
    httpsOptions = devCerts.getHttpsServerOptions();
  }
} catch (error) {
  console.log('Office add-in dev certificates not available, using basic HTTPS');
}

module.exports = {
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