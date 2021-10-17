module.exports = {
    lintOnSave: false,
    pluginOptions: {
        electronBuilder: {
            builderOptions: {
                publish: [
                  {
                    provider:"github",
                    owner: "zeyadmoamen1210",
                    private: true,
                  }
                ]
              },
            nodeIntegration: true,
            preload: "src/preload.js", // this one
            
        }
    }
    //...
}
