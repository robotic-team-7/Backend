const awilix = require('awilix')
const container = awilix.createContainer()

container.register({

    //api-layer
    mowerRouter: awilix.asFunction(require('./api-layer/mower/mower-router')),
    imageRouter: awilix.asFunction(require('./api-layer/mower/image-router')),
    positionsRouter: awilix.asFunction(require('./api-layer/mower/positions-router')),
    mobileRouter: awilix.asFunction(require('./api-layer/mobile/mobile-router')),
    authenticationRouter: awilix.asFunction(require('./api-layer/mobile/authentication-router')),

    //logic-layer
    mowerInterface: awilix.asFunction(require('./logic-layer/interfaces/mower-interface')),
    mowerSessionInterface: awilix.asFunction(require('./logic-layer/interfaces/mowing-session-interface')),

    //data-layer
    db: awilix.asFunction(require('./data-layer/database/database-init/db-init')),
    mowerRepository: awilix.asFunction(require('./data-layer/database/database-access/mower-repository')),
    mowerSessionRepository: awilix.asFunction(require('./data-layer/database/database-access/mowing-session-repository')),

    //app
    app: awilix.asFunction(require('./api-layer/app'))
})

const app = container.resolve("app")

app.listen(8080)