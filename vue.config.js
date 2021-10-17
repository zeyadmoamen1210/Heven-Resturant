module.exports = {
    lintOnSave: false,
    pluginOptions: {
        electronBuilder: {
            builderOptions: {
                publish: [
                  {
                    provider:"gitlab",
                    owner: "hamza",
                    private: true,
                  }
                ]
              },
            nodeIntegration: true,
            
        }
    }
    //...
}
