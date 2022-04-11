module.exports = function({ positionsRepository }) {

    const exports = {}

    /* To create positions instance */
    exports.createPositionsInstance = function(Positions, MowerID, callback) {

        positionsRepository.createPositionsInstance(Positions, MowerID, function(error, positionsId) {


            if (Object.keys(error).length > 0) {
                callback(error, [])
            } else {
                callback([], positionsId)
            }
        })

    }





    /* To add positions */
    exports.addPositions = function(PositionID, newPositions, callback) {

        positionsRepository.getPositionsByPositionsId(PositionID, function(error, positions) {
            if (Object.keys(error).length > 0) {
                callback(error, [])
            } else {

                if (Object.keys(positions).length > 0) {
                    //add check for right data type [[52.289,83.894]]
                    positions.points = positions.points.concat(newPositions)
                }
                positionsRepository.addPositions(PositionID, positions, function(error, positions) {
                    if (Object.keys(error).length > 0) {
                        callback(error, [])
                    } else {
                        callback([], positions)
                    }
                })
            }
        })
    }




    /* To get positions by MowerID */
    exports.getPositionsByMowerId = function(MowerID, callback) {

        positionsRepository.getPositionsByMowerId(MowerID, function(error, positions) {
            if (Object.keys(error).length > 0) {
                callback(error, [])
            } else {
                callback([], positions)
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