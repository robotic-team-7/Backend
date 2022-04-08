/* To access mower table in database*/

module.exports = function({ db }) {
    const exports = {}

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


    return exports
}