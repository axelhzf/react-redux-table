module.exports = {
  entry: "./src/js/app.js",
  output: {
    path: "demo/assets/",
    filename: "bundle.js",
    publicPath: "/assets/"
  },
  module: {
    loaders: [
      { test: /\.js/, loader: 'imports?define=>false' },
      {
        test: /\.js$/,
        loader: "babel",
        exclude: /node_modules/,
        query: {
          presets: ["es2015", "stage-0", "react"]
        }
      },
      {
        test: /\.css$/,
        loaders: ["style", "css"]
      }
    ]
  }

};