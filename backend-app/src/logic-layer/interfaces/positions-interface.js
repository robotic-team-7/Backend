module.exports = function({ positionsRepository }) {

    const exports = {}

    /* To create positions instance */
    exports.createPositionsInstance = function(Positions, MowerID, callback) {

        positionsRepository.createPositionsInstance(Positions, MowerID, function(error, MowerID) {
            if (Object.keys(error).length > 0) {
                callback(error, [])
            } else {
                callback([], positionsID)
            }
        })

    }



    /* To add positions */
    exports.addPositions = function(MowerID, Positions, callback) {

        positionsRepository.addPositions(MowerID, Positions, function(error, message) {
            if (Object.keys(error).length > 0) {
                callback(error, [])
            } else {
                callback([], message)
            }
        })

    }



    /* To delete position data */
    exports.deletePositionData = function(PositionsID, callback) {

        positionsRepository.deletePositionData(PositionsID, function(error, positionDataDeleted) {
            if (Object.keys(error).length > 0) {
                callback(error, [])
            } else {
                callback([], positionDataDeleted)
            }
        })

    }



    return exports
}