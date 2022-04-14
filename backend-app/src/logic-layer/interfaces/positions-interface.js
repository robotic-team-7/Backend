module.exports = function({ positionsRepository }) {

    const exports = {}

    /* To create positions instance */
    exports.createPositionsInstance = function(mowerPositions, mowerId, callback) {

        positionsRepository.createPositionsInstance(mowerPositions, mowerId, function(error, positionsId) {


            if (Object.keys(error).length > 0) {
                callback(error, [])
            } else {
                callback([], positionsId)
            }
        })

    }





    /* To add mowerPositions */
    exports.addMowerPositions = function(positionId, newMowerPositions, callback) {

        positionsRepository.getMowerPositionsByPositionsId(positionId, function(error, mowerPositions) {
            if (Object.keys(error).length > 0) {
                callback(error, [])
            } else {

                if (Object.keys(mowerPositions).length > 0) {
                    //add check for right data type [[52.289,83.894]]
                    mowerPositions.points = mowerPositions.points.concat(newMowerPositions)
                }
                positionsRepository.addMowerPositions(positionId, mowerPositions, function(error, mowerPositions) {
                    if (Object.keys(error).length > 0) {
                        callback(error, [])
                    } else {
                        callback([], mowerPositions)
                    }
                })
            }
        })
    }





    /* To get mowerPositions by mowerId */
    exports.getMowerPositionsByMowerId = function(mowerId, callback) {

        positionsRepository.getMowerPositionsByMowerId(mowerId, function(error, mowerPositions) {
            if (Object.keys(error).length > 0) {
                callback(error, [])
            } else {
                callback([], mowerPositions)
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