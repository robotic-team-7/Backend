const awilix = require('awilix')
const container = awilix.createContainer()

container.register({

    //api-layer
    mowerRouter: awilix.asFunction(require('./api-layer/mower/mower-router')),
    imageRouter: awilix.asFunction(require('./api-layer/mower/image-router')),
    mowingSessionRouter: awilix.asFunction(require('./api-layer/mower/mowing-session-router')),
    mobileRouter: awilix.asFunction(require('./api-layer/mobile/mobile-router')),

    //logic-layer
    mowerInterface: awilix.asFunction(require('./logic-layer/interfaces/mower-interface')),
    mowingSessionInterface: awilix.asFunction(require('./logic-layer/interfaces/mowing-session-interface')),
    dbError: awilix.asFunction(require('./logic-layer/error-handling/db-error')),
    mowingSessionValidation: awilix.asFunction(require('./logic-layer/validation/mowing-session-validation')),
    mowerValidation: awilix.asFunction(require('./logic-layer/validation/mower-validation')),



    //data-layer
    db: awilix.asFunction(require('./data-layer/database/database-init/db-init')),
    mowerRepository: awilix.asFunction(require('./data-layer/database/database-access/mower-repository')),
    mowingSessionRepository: awilix.asFunction(require('./data-layer/database/database-access/mowing-session-repository')),

    //app
    app: awilix.asFunction(require('./api-layer/app'))
})

const app = container.resolve("app")

app.listen(8080)