const { response } = require("express")

module.exports = function({ obstacleRepository, obstacleValidation, mowingSessionRepository, googleVision, dbError }) {

    exports = {}

    exports.createObstacle = function(userId, mowingSessionId, obstaclePosition, imagePath, callback) {


        const validationErrors = obstacleValidation.createObstacleValidation(userId, mowingSessionId, obstaclePosition)
        if (validationErrors.length > 0) {
            callback(validationErrors, [])
        } else {

            //Check if there is a mowingsession with that id
            mowingSessionRepository.getMowingSessionByMowingSessionId(userId, mowingSessionId, function(error, mowingSession) {
                if (Object.keys(error).length > 0) {
                    dbError.errorCheck(error, function(errorCode) {
                        console.log(errorCode)
                        callback(errorCode, [])
                    })
                } else {
                    if (mowingSession.length == 0) {
                        callback(false, [])
                    } else {

                        googleVision.defineImage(imagePath, function(error, imageClassification) {
                            if (Object.keys(error).length > 0) {
                                dbError.errorCheck(error, function(errorCode) {
                                    console.log(errorCode)
                                    callback(errorCode, [])
                                })
                            } else {

                                obstacleRepository.createObstacle(userId, mowingSessionId, obstaclePosition, imageClassification, imagePath, function(error, created) {
                                    if (Object.keys(error).length > 0) {
                                        dbError.errorCheck(error, function(errorCode) {
                                            console.log(errorCode)
                                            callback(errorCode, [])
                                        })
                                    } else {

                                        callback([], created)

                                    }
                                })
                            }
                        })
                    }
                }
            })
        }
    }




    return exports
}