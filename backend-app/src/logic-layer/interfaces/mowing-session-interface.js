module.exports = function({ mowerSessionRepository }) {

    const exports = {}

    /* To create a mowingSession */
    exports.createMowerSession = function(mowerPositions, mowerId, callback) {

        mowerSessionRepository.createMowingSession(mowerPositions, mowerId, function(error, mowerSessionId) {


            if (Object.keys(error).length > 0) {
                callback(error, [])
            } else {
                callback([], mowerSessionId)
            }
        })

    }





    /* To get mowerPositions by mowingSessionId */
    exports.addMowerPositions = function(mowerSessionId, newMowerPositions, callback) {

        mowerSessionRepository.getMowerPositionsByMowingSessionId(mowerSessionId, function(error, mowerPositions) {
            if (Object.keys(error).length > 0) {
                callback(error, [])
            } else {

                if (Object.keys(mowerPositions).length > 0) {
                    //add check for right data type [[52.289,83.894]]
                    mowerPositions.points = mowerPositions.points.concat(newMowerPositions)
                }
                mowerSessionRepository.addMowerPositions(positionId, mowerPositions, function(error, mowerPositions) {
                    if (Object.keys(error).length > 0) {
                        callback(error, [])
                    } else {
                        callback([], mowerPositions)
                    }
                })
            }
        })
    }





    /* To get mowerPositions by mowerId */
    exports.getMowerPositionsByMowerId = function(mowerId, callback) {

        mowerSessionRepository.getMowerPositionsByMowerId(mowerId, function(error, mowerPositions) {
            if (Object.keys(error).length > 0) {
                callback(error, [])
            } else {
                callback([], mowerPositions)
            }
        })
    }







    /* To delete position data */
    exports.deletePositionData = function(mowerSessionId, callback) {

        mowerSessionRepository.deletePositionData(mowerSessionId, function(error, mowerSessionDeleted) {
            if (Object.keys(error).length > 0) {
                callback(error, [])
            } else {
                callback([], mowerSessionDeleted)
            }
        })

    }



    return exports
}