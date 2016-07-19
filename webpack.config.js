const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const NpmInstallPlugin = require('npm-install-webpack-plugin');

// Load *package.json* so we can use `dependencies` from there
const pkg = require('./package.json');


const TARGET = process.env.npm_lifecycle_event;
const PATHS = {
    app: path.join(__dirname, 'app'),
    build: path.join(__dirname, 'build'),
    images: path.join(__dirname, 'app/assets/images'),
    fonts: path.join(__dirname, 'app/assets/fonts')
};

process.env.BABEL_ENV = TARGET;

const common = {
// Entry accepts a path or an object of entries. We'll be using the
// latter form given it's convenient with more complex configurations.
    entry: {
        app: PATHS.app
    },

    node: {
        fs: "empty"
    },

    // Add resolve.extensions.
    // '' is needed to allow imports without an extension.
    // Note the .'s before extensions as it will fail to match without!!!
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    output: {
        path: PATHS.build,
        // Output using entry name
        filename: '[name].js'
    }, module: {
        loaders: [
            {
                // Test expects a RegExp! Note the slashes!
                test: /\.css$/,
                loaders: ['style', 'css'],
                // Include accepts either a path or an array of paths.
                include: PATHS.app
            },
            // Set up jsx. This accepts js too thanks to RegExp
            {
                test: /\.jsx?$/,
                // Enable caching for improved performance during development
                // It uses default OS directory by default. If you need something
                // more custom, pass a path to it. I.e., babel?cacheDirectory=<path>
                loaders: ['babel?cacheDirectory'],
                // Parse only app files! Without this it will go through entire project.
                // In addition to being slow, that will most likely result in an error.
                include: PATHS.app
            },
            {
                test: /\.ttf$/,
                loader: 'url?limit=200000',
                include: PATHS.fonts
            },
            {
                test: /\.(jpg|png|svg)$/,
                loader: 'file?name=/assets/images/[name].[ext]',
                include: PATHS.images
            },
            {
                test: /masonry|imagesloaded|fizzy\-ui\-utils|desandro\-|outlayer|get\-size|doc\-ready|eventie|eventemitter/,
                loader: 'imports?define=>false&this=>window'
            },
            {
                test:/\.json$/,
                loader: "json-loader"
            }
        ]
    }
};

// Default configuration
if(TARGET === 'start' || !TARGET) {
  module.exports = merge(common, {
      devtool: 'eval-source-map',
      devServer: {
          contentBase: PATHS.build,
          // Enable history API fallback so HTML5 History API based
          // routing works. This is a good default that will come
          // in handy in more complicated setups.
          historyApiFallback: true,
          hot: true,
          inline: true,
          progress: true,
          // Display only errors to reduce the amount of output.
          stats: 'errors-only',
          // Parse host and port from env so this is easy to customize.
          //
          // If you use Vagrant or Cloud9, set
          // host: process.env.HOST || '0.0.0.0';
          //
          // 0.0.0.0 is available to all network devices unlike default
          // localhost
          host: process.env.HOST,
          port: process.env.PORT
      }, plugins: [
          new webpack.DefinePlugin({
              'process.env.NODE_ENV': '"development"'
          }),
          new webpack.HotModuleReplacementPlugin(),
          new NpmInstallPlugin({
              save: true // --save
          })
      ]
  });
}
if(TARGET === 'build') {
  module.exports = merge(common, {
      // Define vendor entry point needed for splitting
      entry: {
          vendor: Object.keys(pkg.dependencies).filter(function(v) {
              // Exclude alt-utils as it won't work with this setup
              // due to the way the package has been designed
              // (no package.json main).
              return v !== 'alt-utils';
          }),
      },
      plugins: [
          // Setting DefinePlugin affects React library size!
          // DefinePlugin replaces content "as is" so we need some extra quotes
          // for the generated code to make sense
          new webpack.DefinePlugin({
              'process.env.NODE_ENV': '"production"'
              // You can set this to JSON.stringify('development') for your
              // development target to force NODE_ENV to development mode
              // no matter what
          }),
          new webpack.optimize.UglifyJsPlugin({
              compress: {
                  warnings: false
              }
          })
      ]
  });
}
