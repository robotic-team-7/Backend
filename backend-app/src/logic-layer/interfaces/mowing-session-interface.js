module.exports = function({ mowingSessionRepository, dbError, mowingSessionValidation }) {

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





    /* To add Mower Positions by mowingSessionId */
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
                    mowingSessionRepository.addMowerPositions(mowingSessionId, mowerPositions, function(error, mowerPositionsAdded) {
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
    exports.getAllMowingSessionsByMowerId = function(mowerId, callback) {
        const validationErrors = mowingSessionValidation.getAllMowingSessionsByMowerIdValidation(mowerId)
        if (validationErrors.length > 0) {
            callback(validationErrors, [])
        } else {
            mowingSessionRepository.getAllMowingSessionsByMowerId(mowerId, function(error, mowerPositions) {
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
    exports.getMowingSessionByMowingSessionId = function(mowingSessionId, callback) {
        const validationErrors = mowingSessionValidation.getMowingSessionByMowingSessionIdValidation(mowingSessionId)
        if (validationErrors.length > 0) {
            callback(validationErrors, [])
        } else {
            mowingSessionRepository.getMowingSessionByMowingSessionId(mowingSessionId, function(error, mowingSession) {
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
    exports.deleteMowingSession = function(mowingSessionId, callback) {
        const validationErrors = mowingSessionValidation.deleteMowingSessionValidation(mowingSessionId)
        if (validationErrors.length > 0) {
            callback(validationErrors, [])
        } else {
            mowingSessionRepository.deleteMowingSession(mowingSessionId, function(error, mowingSessionDeleted) {
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