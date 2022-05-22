module.exports = function({ mowingSessionRepository, dbError, mowingSessionValidation }) {

    const exports = {}

    /* To create a mowingSession */
    exports.createMowingSession = function(userId, mowerPositions, mowerId, callback) {
        const validationErrors = mowingSessionValidation.createMowingSessionValidation(userId, mowerPositions, mowerId)
        if (validationErrors.length > 0) {
            callback(validationErrors, [])
        } else {
            mowingSessionRepository.createMowingSession(userId, mowerPositions, mowerId, function(error, mowingSessionId) {
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





    /* To add Mower Positions by mowingSessionId */
    exports.addMowerPositions = function(userId, mowingSessionId, newMowerPositions, callback) {
        console.log(newMowerPositions, '#1')
        const validationErrors = mowingSessionValidation.addMowerPositionsValidation(userId, mowingSessionId, newMowerPositions)
        if (validationErrors.length > 0) {
            callback(validationErrors, [])
        } else {
            mowingSessionRepository.getMowerPositionsByMowingSessionId(userId, mowingSessionId, function(error, mowerPositions) {
                console.log(mowerPositions)
                if (Object.keys(error).length > 0) {
                    dbError.errorCheck(error, function(errorCode) {
                        console.log(errorCode)
                        callback(errorCode, [])
                    })
                } else {
                    if (Object.keys(mowerPositions).length > 0) {
                        mowerPositions.points = mowerPositions.points.concat(newMowerPositions)
                    }
                    mowingSessionRepository.addMowerPositions(userId, mowingSessionId, mowerPositions, function(error, mowerPositionsAdded) {
                        if (Object.keys(error).length > 0) {
                            dbError.errorCheck(error, function(errorCode) {
                                console.log(errorCode)
                                callback(errorCode, [])
                            })
                        } else {

                            callback([], mowerPositionsAdded)

                        }
                    })
                }
            })
        }
    }







    /* To get all mowing sessions by mowerId */
    exports.getAllMowingSessionsByMowerId = function(userId, mowerId, callback) {
        const validationErrors = mowingSessionValidation.getAllMowingSessionsByMowerIdValidation(userId, mowerId)
        if (validationErrors.length > 0) {
            callback(validationErrors, [])
        } else {
            mowingSessionRepository.getAllMowingSessionsByMowerId(userId, mowerId, function(error, mowerPositions) {
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


    /* To get mowingSession by mowingSessionId */
    exports.getMowingSessionByMowingSessionId = function(userId, mowingSessionId, callback) {
        const validationErrors = mowingSessionValidation.getMowingSessionByMowingSessionIdValidation(userId, mowingSessionId)
        if (validationErrors.length > 0) {
            callback(validationErrors, [])
        } else {
            mowingSessionRepository.getMowingSessionByMowingSessionId(userId, mowingSessionId, function(error, mowingSession) {
                if (Object.keys(error).length > 0) {
                    dbError.errorCheck(error, function(errorCode) {
                        callback(errorCode, [])
                    })
                } else {
                    callback([], mowingSession)
                }
            })
        }
    }

    /* To delete position data */
    exports.deleteMowingSession = function(userId, mowingSessionId, callback) {
        const validationErrors = mowingSessionValidation.deleteMowingSessionValidation(userId, mowingSessionId)
        if (validationErrors.length > 0) {
            callback(validationErrors, [])
        } else {
            mowingSessionRepository.deleteMowingSession(userId, mowingSessionId, function(error, mowingSessionDeleted) {
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