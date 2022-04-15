const awilix = require('awilix')
const container = awilix.createContainer()

container.register({

    //api-layer
    mowerRouter: awilix.asFunction(require('./api-layer/mower/mower-router')),
    imageRouter: awilix.asFunction(require('./api-layer/mower/image-router')),
    positionsRouter: awilix.asFunction(require('./api-layer/mower/positions-router')),
    mobileRouter: awilix.asFunction(require('./api-layer/mobile/mobile-router')),

    //logic-layer
    mowerInterface: awilix.asFunction(require('./logic-layer/interfaces/mower-interface')),
    positionsInterface: awilix.asFunction(require('./logic-layer/interfaces/positions-interface')),

    //data-layer
    db: awilix.asFunction(require('./data-layer/database/database-init/db-init')),
    mowerRepository: awilix.asFunction(require('./data-layer/database/database-access/mower-repository')),
    positionsRepository: awilix.asFunction(require('./data-layer/database/database-access/positions-repository')),

    //app
    app: awilix.asFunction(require('./api-layer/app'))
})

const app = container.resolve("app")

app.listen(8080)