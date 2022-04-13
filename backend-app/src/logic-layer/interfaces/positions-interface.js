module.exports = function({ positionsRepository }) {

    const exports = {}

    /* To create positions instance */
    exports.createPositionsInstance = function(positions, mowerId, callback) {

        positionsRepository.createPositionsInstance(positions, mowerId, function(error, positionsId) {


            if (Object.keys(error).length > 0) {
                callback(error, [])
            } else {
                callback([], positionsId)
            }
        })

    }





    /* To add positions */
    exports.addPositions = function(positionId, newPositions, callback) {

        positionsRepository.getPositionsByPositionsId(positionId, function(error, positions) {
            if (Object.keys(error).length > 0) {
                callback(error, [])
            } else {

                if (Object.keys(positions).length > 0) {
                    //add check for right data type [[52.289,83.894]]
                    positions.points = positions.points.concat(newPositions)
                }
                positionsRepository.addPositions(positionId, positions, function(error, positions) {
                    if (Object.keys(error).length > 0) {
                        callback(error, [])
                    } else {
                        callback([], positions)
                    }
                })
            }
        })
    }





    /* To get positions by mowerId */
    exports.getPositionsByMowerId = function(mowerId, callback) {

        positionsRepository.getPositionsByMowerId(mowerId, function(error, positions) {
            if (Object.keys(error).length > 0) {
                callback(error, [])
            } else {
                callback([], positions)
            }
        })
    }

    /* To get positions by PositionID */
    exports.getPositionsByPositionsId = function(PositionsID, callback) {

        positionsRepository.getPositionsByMowerId(PositionsID, function(error, positions) {
            if (Object.keys(error).length > 0) {
                callback(error, [])
            } else {
                callback([], positions)
            }
        })

    }






    /* To delete position data */
    exports.deletePositionData = function(positionsId, callback) {

        positionsRepository.deletePositionData(positionsId, function(error, positionDataDeleted) {
            if (Object.keys(error).length > 0) {
                callback(error, [])
            } else {
                callback([], positionDataDeleted)
            }
        })

    }



    return exports
}