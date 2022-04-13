/* To access positions table in database*/

module.exports = function({ db }) {

    const exports = {}

    /* To create positions instance */
    exports.createPositionsInstance = function(positions, mowerId, callback) {


        const positionsInstance = {
            mowerId: mowerId,
            positions: {
                points: positions

            }
        }

        db.Positions.create(positionsInstance)
            .then(createdPositionsInstance => callback([], createdPositionsInstance.positionsId))
            .catch(e => {
                console.log(e)
                callback(e, [])

            })

    }



    /* To get positions by positionId */
    exports.getPositionsByPositionsId = function(positionsId, callback) {

        db.Positions.findOne({
                where: { positionsId: positionsId },
                raw: true
            })
            .then(positions => callback([], positions.positions))
            .catch(e => {
                console.log(e)
                callback(e, [])
            })

    }






    /* To get positions by mowerId */
    exports.getPositionsByMowerId = function(mowerId, callback) {

        db.Positions.findAll({
                where: { mowerId: mowerId },
                raw: true
            })
            .then(positions => callback([], positions))
            .catch(e => {
                console.log(e)
                callback(e, [])
            })

    }




    /* To add positions */
    exports.addPositions = function(positionsId, positions, callback) {

        db.Positions.update({
                positions: positions
            }, {
                where: { positionsId: positionsId },
                returning: true,
                raw: true
            })
            .then(updatedPositions => callback([], updatedPositions[1][0].positions))
            .catch(e => {
                console.log(e)
                callback(e, [])
            })

    }



    /* To delete position data */
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