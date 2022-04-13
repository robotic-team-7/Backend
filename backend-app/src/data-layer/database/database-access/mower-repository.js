/* To access mower table in database*/

module.exports = function({ db }) {

    const exports = {}

    /* To create a mower */
    exports.createMower = function(userId, serialNumber, status, callback) {

        const mower = {
            userId: userId,
            serialNumber: serialNumber,
            status: status,
        }

        db.Mowers.create(mower)
            .then(createdMower => callback([], createdMower.mowerId))
            .catch(e => { callback(e, []) })

    }




    /* To get mower by MowerID */
    exports.getMowerByMowerId = function(mowerId, callback) {

        db.Mowers.findOne({
                where: { mowerId: mowerId },
                raw: true
            })
            .then(mower => callback([], mower))
            .catch(e => {
                console.log(e)
                callback(e, [])
            })

    }



    /* To get all mowers by UserID */
    exports.getAllMowersByUserId = function(userId, callback) {

        db.Mowers.findAll({
                where: { userId: userId },
                raw: true
            })
            .then(mowers => callback([], mowers))
            .catch(e => {
                console.log(e)
                callback(e, [])
            })

    }




    /* To update mower status */
    exports.updateMowerStatus = function(mowerId, status, callback) {

        db.Mowers.update({ status: status }, {
                where: { mowerId: mowerId },
                returning: true,
                raw: true
            })
            .then(mower => callback([], mower[1][0].status))
            .catch(e => {
                console.log(e)
                callback(e, [])
            })

    }



    /* To delete a mower */
    exports.deleteMower = function(mowerId, callback) {

        db.Mowers.destroy({
                where: { mowerId: mowerId },
                raw: true
            })
            .then(numberOfDeletedMowers => {
                /* If the mower dosn`t exists it returns false (because no mower has been deleted) otherwise true (because a mower has been deleted) */
                if (numberOfDeletedMowers == 0) {
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