module.exports = function({ mowerRepository, dbError, mowerValidation }) {

    const exports = {}

    /* To create a mower */
    exports.createMower = function(userId, serialNumber, status, callback) {
        const validationErrors = mowerValidation.createMowerValidation(userId, serialNumber, status)
        if (validationErrors.length > 0) {
            callback(validationErrors, [])
        } else {
            mowerRepository.createMower(userId, serialNumber, status, function(error, mowerId) {
                if (Object.keys(error).length > 0) {
                    dbError.errorCheck(error, function(errorCode) {
                        console.log(errorCode)
                        callback(errorCode, [])
                    })
                } else {
                    callback([], mowerId)
                }
            })
        }
    }



    /* To get a mower by mowerId */
    exports.getMowerByMowerId = function(userId, mowerId, callback) {
        const validationErrors = mowerValidation.getMowerByMowerIdValidation(userId, mowerId)
        if (validationErrors.length > 0) {
            callback(validationErrors, [])
        } else {
            mowerRepository.getMowerByMowerId(userId, mowerId, function(error, mower) {
                if (Object.keys(error).length > 0) {
                    dbError.errorCheck(error, function(errorCode) {
                        console.log(errorCode)
                        callback(errorCode, [])
                    })
                } else {
                    callback([], mower)
                }
            })
        }
    }




    /* To get all mowers by userId */
    exports.getAllMowersByUserId = function(userId, callback) {
        const validationErrors = mowerValidation.getAllMowersByUserIdValidation(userId)
        if (validationErrors.length > 0) {
            callback(validationErrors, [])
        } else {
            mowerRepository.getAllMowersByUserId(userId, function(error, mowers) {
                if (Object.keys(error).length > 0) {
                    dbError.errorCheck(error, function(errorCode) {
                        console.log(errorCode)
                        callback(errorCode, [])
                    })
                } else {
                    callback([], mowers)
                }
            })
        }
    }




    /* To update mower status */
    exports.updateMowerStatus = function(userId, mowerId, status, callback) {
        const validationErrors = mowerValidation.updateMowerStatusValidation(userId, mowerId, status)
        if (validationErrors.length > 0) {
            callback(validationErrors, [])
        } else {
            mowerRepository.updateMowerStatus(userId, mowerId, status, function(error, newMowerStaus) {
                if (Object.keys(error).length > 0) {
                    dbError.errorCheck(error, function(errorCode) {
                        console.log(errorCode)
                        callback(errorCode, [])
                    })
                } else {
                    callback([], newMowerStaus)
                }
            })
        }
    }





    /* To delete a mower */
    exports.deleteMower = function(userId, mowerId, callback) {
        const validationErrors = mowerValidation.deleteMowerValidation(userId, mowerId)
        if (validationErrors.length > 0) {
            callback(validationErrors, [])
        } else {
            mowerRepository.deleteMower(userId, mowerId, function(error, mowerDeleted) {
                if (Object.keys(error).length > 0) {
                    dbError.errorCheck(error, function(errorCode) {
                        console.log(errorCode)
                        callback(errorCode, mowerDeleted)
                    })
                } else {
                    callback([], mowerDeleted)
                }
            })
        }
    }



    return exports
}