/* To access mower table in database*/

module.exports = function({ db }) {

    const exports = {}

    /* To create a mower */
    exports.createMower = function(userId, mowerId, status, callback) {

        const mower = {
            userId: userId,
            mowerId: mowerId,
            status: status,
        }

        db.Mowers.create(mower)
            .then(createdMower => callback([], createdMower.mowerId))
            .catch(e => { callback(e, []) })

    }




    /* To get mower by mowerId */
    exports.getMowerByMowerId = function(userId, mowerId, callback) {

        db.Mowers.findAll({
                where: {
                    mowerId: mowerId,
                    userId: userId
                },
                raw: true
            })
            .then(mower => callback([], mower))
            .catch(e => {
                console.log(e)
                callback(e, [])
            })

    }



    /* To get all mowers by userId */
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
    exports.updateMowerStatus = function(userId, mowerId, status, callback) {

        db.Mowers.update({ status: status }, {
                where: {
                    mowerId: mowerId,
                    userId: userId
                },
                returning: true,
                raw: true
            })
            .then(numberOfUpdatedMowers => {
                if (numberOfUpdatedMowers[0] == 0) {
                    callback([], false)
                } else {
                    callback([], true)
                }
            })
            .catch(e => {
                console.log(e)
                callback(e, [])
            })

    }



    /* To delete a mower */
    exports.deleteMower = function(userId, mowerId, callback) {

        db.Mowers.destroy({
                where: {
                    mowerId: mowerId,
                    userId: userId
                },
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