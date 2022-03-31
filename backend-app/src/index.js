const awilix = require('awilix')
const container = awilix.createContainer()

container.register({

    //api-layer
    restRouter: awilix.asFunction(require('./api-layer/rest-router')),

    //logic-layer


    //data-layer

    app: awilix.asFunction(require('./api-layer/app'))
})

const app = container.resolve("app")

app.listen(8080)