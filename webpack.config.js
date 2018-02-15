/**
 * Created by bogdan on 15.02.18.
 */
const path = require("path");
module.exports = {
    entry: ["./src/index.jsx"],
    output: {
        path: path.resolve(__dirname, "build"),
        filename: "[name].js"
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            }
        ]
    }
};