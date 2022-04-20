module.exports = function({ mowerRepository, dbError }) {

    const exports = {}

    /* To create a mower */
    exports.createMower = function(userId, serialNumber, status, callback) {

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


    /* To get a mower by mowerId */
    exports.getMowerByMowerId = function(mowerId, callback) {

        mowerRepository.getMowerByMowerId(mowerId, function(error, mower) {
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



    /* To get all mowers by userId */
    exports.getAllMowersByUserId = function(userId, callback) {

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



    /* To update mower status */
    exports.updateMowerStatus = function(mowerId, status, callback) {

        mowerRepository.updateMowerStatus(mowerId, status, function(error, newMowerStaus) {
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



    /* To delete a mower */
    exports.deleteMower = function(mowerId, callback) {

        mowerRepository.deleteMower(mowerId, function(error, mowerDeleted) {
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



    return exports
}