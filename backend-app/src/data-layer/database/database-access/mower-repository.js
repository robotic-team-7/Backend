/* To access mower table in database*/

module.exports = function({ db }) {

    const exports = {}

    /* To create a mower */
    exports.createMower = function(UserID, SerialNumber, Status, callback) {

        const mower = {
            UserID: UserID,
            SerialNumber: SerialNumber,
            Status: Status,
        }
        console.log(mower)
        db.Mowers.create(mower)
            .then(createdMower => callback([], createdMower.MowerID))
            .catch(e => { callback(e, []) })

    }



    /* To update mower status */
    exports.updateMowerStatus = function(MowerID, Status, callback) {

        db.Mowers.update({ Status: Status }, {
                where: { MowerID: MowerID },
                returning: true,
                raw: true
            })
            .then(mower => callback([], mower[1][0].Status))
            .catch(e => {
                console.log(e)
                callback(e, [])
            })

    }



    /* To delete a mower */
    exports.deleteMower = function(MowerID, callback) {

        db.Mowers.destroy({
                where: { MowerID: MowerID },
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