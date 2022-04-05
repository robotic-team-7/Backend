/* To access moover table in database*/

module.exports = function({ db }) {
    const exports = {}

    exports.createMoover = function(UserID, SerialNumber, Status, callback) {

        const moover = {
            UserID: UserID,
            SerialNumber: SerialNumber,
            Status: Status,
        }
        console.log(moover)
        db.Moovers.create(moover)
            .then(createdMoover => callback([], createdMoover.MooverID))
            .catch(e => { callback(e, []) })

    }


    return exports
}