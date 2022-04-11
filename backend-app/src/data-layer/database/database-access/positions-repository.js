/* To access positions table in database*/

module.exports = function({ db }) {

    const exports = {}

    /* To create positions instance */
    exports.createPositionsInstance = function(Positions, MowerID, callback) {


        const positionsInstance = {
            MowerID: MowerID,
            Positions: Positions
        }

        db.Positions.create(positionsInstance)
            .then(createdPositionsInstance => callback([], createdPositionsInstance.PositionsID))
            .catch(e => {
                console.log(e)
                callback(e, [])

            })

    }



    /* To get positions by PositionID */
    exports.getPositionsByPositionsId = function(PositionsID, callback) {

        db.Positions.findOne({
                where: { PositionsID: PositionsID },
                raw: true
            })
            .then(positions => callback([], positions.Positions))
            .catch(e => {
                console.log(e)
                callback(e, [])
            })

    }


    /* To add positions */
    exports.addPositions = function(PositionsID, Positions, callback) {

        db.Positions.update({
                Positions: Positions
            }, {
                where: { PositionsID: PositionsID },
                returning: true,
                raw: true
            })
            .then(updatedPositions => callback([], updatedPositions[1][0].Positions))
            .catch(e => {
                console.log(e)
                callback(e, [])
            })

    }



    /* To delete position data */
    exports.deletePositionData = function(PositionsID, callback) {

        db.Positions.destroy({
                where: { PositionsID: PositionsID },
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