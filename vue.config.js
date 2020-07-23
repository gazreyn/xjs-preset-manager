module.exports = {
    publicPath: "",
    pages: {
        index: {
            entry: "src/main.js",
            template: "public/index.html",
            filename: "index.html",
            title: "Preset Manager Extension",
            chunks: ["chunk-vendors", "chunk-common", "index"]
        }
    },
    chainWebpack: config => {
        if (process.env.NODE_ENV !== "production") return;
        config.plugin("html-index").tap(args => {
            args[0].filename = "Preset Manager.html";
            return args;
        });
    }
    //,
    // chainWebpack: config => {
    //     if (process.env.NODE_ENV !== "production") return;
    //     config.plugin("html").tap(args => {
    //         args[0].filename = "Preset Manager.html";
    //         return args;
    //     });
    // }
};
