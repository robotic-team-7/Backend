const awilix = require('awilix')
const container = awilix.createContainer()

container.register({

    //api-layer
    restRouter: awilix.asFunction(require('./api-layer/rest-router')),

    //logic-layer
    mooverInterface: awilix.asFunction(require('./logic-layer/interfaces/moover-interface')),

    //data-layer
    db: awilix.asFunction(require('./data-layer/database/database-init/db-init')),
    mooverRepository: awilix.asFunction(require('./data-layer/database/database-access/moover-repository')),

    //app
    app: awilix.asFunction(require('./api-layer/app'))
})

const app = container.resolve("app")

app.listen(8080)