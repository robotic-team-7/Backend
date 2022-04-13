/* To access positions table in database*/

module.exports = function({ db }) {

    const exports = {}

    /* To create positions instance */
    exports.createPositionsInstance = function(mowerPositions, mowerId, callback) {


        const positionsInstance = {
            mowerId: mowerId,
            mowerPositions: {
                points: mowerPositions

            }
        }

        db.Positions.create(positionsInstance)
            .then(createdPositionsInstance => callback([], createdPositionsInstance.positionsId))
            .catch(e => {
                console.log(e)
                callback(e, [])

            })

    }



    /* To get mowerPositions by positionsId */
    exports.getMowerPositionsByPositionsId = function(positionsId, callback) {

        db.Positions.findOne({
                where: { positionsId: positionsId },
                raw: true
            })
            .then(positions => callback([], positions.mowerPositions))
            .catch(e => {
                console.log(e)
                callback(e, [])
            })

    }






    /* To get mowerPositions by mowerId */
    exports.getMowerPositionsByMowerId = function(mowerId, callback) {

        db.Positions.findAll({
                where: { mowerId: mowerId },
                raw: true
            })
            .then(mowerPositions => callback([], mowerPositions))
            .catch(e => {
                console.log(e)
                callback(e, [])
            })

    }




    /* To add mowerPositions */
    exports.addMowerPositions = function(positionsId, mowerPositions, callback) {

        db.Positions.update({
                mowerPositions: mowerPositions
            }, {
                where: { positionsId: positionsId },
                returning: true,
                raw: true
            })
            .then(updatedMowerPositions => callback([], updatedMowerPositions[1][0].mowerPositions))
            .catch(e => {
                console.log(e)
                callback(e, [])
            })

    }



    /* To delete positions instance */
    exports.deletePositionData = function(positionsId, callback) {

        db.Positions.destroy({
                where: { positionsId: positionsId },
                raw: true
            })
            .then(numberOfDeletedPositionsInstances => {
                /* If the positions instance dosn`t exists it returns false (because no positions instance has been deleted) otherwise true (because a positions instance has been deleted) */
                if (numberOfDeletedPositionsInstances == 0) {
                    callback([], false)
                } else {
                    callback([], true)
                }
            })
            .catch(e => {
                console.log(e)
                callback(e, false)
            })


    }


    return exports
}