module.exports = function({ mowingSessionRepository, mowingSessionValidation }) {

    const exports = {}

    /* To create a mowingSession */
    exports.createMowingSession = function(mowerPositions, mowerId, callback) {
        const validationErrors = mowingSessionValidation.createMowingSessionValidation(mowerPositions, mowerId)
        if (validationErrors.length > 0) {
            callback(validationErrors, [])
        } else {
            mowingSessionRepository.createMowingSession(mowerPositions, mowerId, function(error, mowingSessionId) {
                if (Object.keys(error).length > 0) {
                    dbError.errorCheck(error, function(errorCode) {
                        console.log(errorCode)
                        callback(errorCode, [])
                    })
                } else {
                    callback([], mowingSessionId)
                }
            })
        }
    }





    /* To get mowerPositions by mowingSessionId */
    exports.addMowerPositions = function(mowingSessionId, newMowerPositions, callback) {
        const validationErrors = mowingSessionValidation.addMowerPositionsValidation(mowingSessionId, newMowerPositions)
        if (validationErrors.length > 0) {
            callback(validationErrors, [])
        } else {
            mowingSessionRepository.getMowerPositionsByMowingSessionId(mowingSessionId, function(error, mowerPositions) {
                if (Object.keys(error).length > 0) {
                    dbError.errorCheck(error, function(errorCode) {
                        console.log(errorCode)
                        callback(errorCode, [])
                    })
                } else {

                    if (Object.keys(mowerPositions).length > 0) {
                        mowerPositions.points = mowerPositions.points.concat(newMowerPositions)
                    }
                    mowingSessionRepository.addMowerPositions(mowingSessionId, mowerPositions, function(error, mowerPositions) {
                        if (Object.keys(error).length > 0) {
                            dbError.errorCheck(error, function(errorCode) {
                                console.log(errorCode)
                                callback(errorCode, [])
                            })
                        } else {
                            callback([], mowerPositions)
                        }
                    })
                }
            })
        }
    }





    /* To get mowerPositions by mowerId */
    exports.getMowerPositionsByMowerId = function(mowerId, callback) {
        const validationErrors = mowingSessionValidation.getMowerPositionsByMowerIdValidation(mowerId)
        if (validationErrors.length > 0) {
            callback(validationErrors, [])
        } else {
            mowingSessionRepository.getMowerPositionsByMowerId(mowerId, function(error, mowerPositions) {
                if (Object.keys(error).length > 0) {
                    dbError.errorCheck(error, function(errorCode) {
                        console.log(errorCode)
                        callback(errorCode, [])
                    })
                } else {
                    callback([], mowerPositions)
                }
            })
        }
    }







    /* To delete position data */
    exports.deletePositionData = function(mowingSessionId, callback) {
        const validationErrors = mowingSessionValidation.deletePositionDataValidation(mowerId)
        if (validationErrors.length > 0) {
            callback(validationErrors, [])
        } else {
            mowingSessionRepository.deletePositionData(mowingSessionId, function(error, mowingSessionDeleted) {
                if (Object.keys(error).length > 0) {
                    dbError.errorCheck(error, function(errorCode) {
                        console.log(errorCode)
                        callback(errorCode, mowingSessionDeleted)
                    })
                } else {
                    callback([], mowingSessionDeleted)
                }
            })

        }
    }



    return exports
}