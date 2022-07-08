const path = require("path");

module.exports = {
  mode: "production",
  // 程序的运行路径 不是当前文件相对于入口文件的路径
  entry: `./src/index.ts`, //入口文件,从项目根目录指定
  target: "web",
  output: {
    // 需要打包的文件
    library: "JsPriorityQueue",
    libraryTarget: "umd",
    umdNamedDefine: true,
    path: path.resolve(__dirname, `../dist/`),
    filename: "index.js",
  },
  resolve: {
    extensions: [".ts", ".tsx"],
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: "ts-loader",
            options: {
              transpileOnly: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [],
};
