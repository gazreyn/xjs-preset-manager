module.exports = {
    publicPath: "",
    pages: {
        index: {
            entry: "src/main.js",
            template: "public/index.html",
            filename: "Preset Manager.html",
            title: "Preset Manager Extension",
            chunks: ["chunk-vendors", "chunk-common", "index"]
        }
    }
};
