module.exports = function({ obstacleRepository, obstacleValidation, mowingSessionRepository }) {

    exports = {}

    exports.createObstacle = function(mowingSessionId, obstaclePosition, image) {


        //Check if there is a mowingsession with that id
        mowingSessionRepository.getMowingSessionByMowingSessionId(mowingSessionId, function(error, mowingSession) {
            if (Object.keys(error).length > 0) {
                dbError.errorCheck(error, function(errorCode) {
                    console.log(errorCode)
                    callback(errorCode, [])
                })
            } else {

            }

        })

    }




    return exports
}