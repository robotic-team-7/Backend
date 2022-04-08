module.exports = function({ mowerRepository }) {

    const exports = {}

    exports.createMower = function(UserID, SerialNumber, Status, callback) {

        mowerRepository.createMower(UserID, SerialNumber, Status, function(error, MowerID) {
            if (Object.keys(error).length > 0) {
                callback(error, [])
            } else {
                callback([], MowerID)
            }
        })

    }



    return exports
}