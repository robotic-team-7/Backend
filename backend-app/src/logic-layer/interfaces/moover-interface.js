module.exports = function({ mooverRepository }) {

    const exports = {}

    exports.createMoover = function(UserID, SerialNumber, Status, callback) {

        mooverRepository.createMoover(UserID, SerialNumber, Status, function(error, MooverID) {
            if (Object.keys(error).length > 0) {
                callback(error, [])
            } else {
                callback([], MooverID)
            }
        })

    }



    return exports
}