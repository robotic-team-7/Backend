module.exports = function({ mowerRepository }) {

    const exports = {}

    /* To create a mower */
    exports.createMower = function(UserID, SerialNumber, Status, callback) {

        mowerRepository.createMower(UserID, SerialNumber, Status, function(error, MowerID) {
            if (Object.keys(error).length > 0) {
                callback(error, [])
            } else {
                callback([], MowerID)
            }
        })

    }



    exports.getMowerById = function(MowerID, callback) {

        mowerRepository.getMowerById(MowerID, function(error, mower) {
            if (Object.keys(error).length > 0) {
                callback(error, [])
            } else {
                callback([], mower)
            }
        })


    }



    /* To update mower status */
    exports.updateMowerStatus = function(MowerID, Status, callback) {

        mowerRepository.updateMowerStatus(MowerID, Status, function(error, newMowerStaus) {
            if (Object.keys(error).length > 0) {
                callback(error, [])
            } else {
                callback([], newMowerStaus)
            }
        })

    }



    /* To delete a mower */
    exports.deleteMower = function(MowerID, callback) {

        mowerRepository.deleteMower(MowerID, function(error, mowerDeleted) {
            if (Object.keys(error).length > 0) {
                callback(error, [])
            } else {
                callback([], mowerDeleted)
            }
        })

    }



    return exports
}