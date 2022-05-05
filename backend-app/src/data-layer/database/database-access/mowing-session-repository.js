/* To access MowingSession table in the database*/


module.exports = function({ db }) {

    const exports = {}

    /* To create a mowingSession */
    exports.createMowingSession = function(userId, mowerPositions, mowerId, callback) {


        const mowingSession = {
            mowerId: mowerId,
            userId: userId,
            mowerPositions: {
                points: mowerPositions

            }
        }

        db.MowingSessions.create(mowingSession)
            .then(createdMowingSession => callback([], createdMowingSession.mowingSessionId))
            .catch(e => {
                console.log(e)
                callback(e, [])

            })

    }



    /* To get mowerPositions by mowingSessionId */
    exports.getMowerPositionsByMowingSessionId = function(userId, mowingSessionId, callback) {

        db.MowingSessions.findAll({
                where: {
                    mowingSessionId: mowingSessionId,
                    userId: userId
                },
                raw: true
            })
            .then(mowerPositions => callback([], mowerPositions[0].mowerPositions))
            .catch(e => {
                console.log(e)
                callback(e, [])
            })

    }






    /* To get mowerPositions by mowerId */
    exports.getAllMowingSessionsByMowerId = function(userId, mowerId, callback) {

        db.MowingSessions.findAll({
                where: {
                    mowerId: mowerId,
                    userId: userId
                },
                raw: true
            })
            .then(mowingSessions => callback([], mowingSessions))
            .catch(e => {
                console.log(e)
                callback(e, [])
            })

    }




    /* To get mowingSession by mowingSessionId */
    exports.getMowingSessionByMowingSessionId = function(userId, mowingSessionId, callback) {

        db.MowingSessions.findAll({
                where: {
                    mowingSessionId: mowingSessionId,
                    userId: userId
                },
                raw: true
            })
            .then(mowingSession => callback([], mowingSession))
            .catch(e => {
                console.log(e)
                callback(e, [])
            })

    }

    /* To get mowingSession by mowingSessionId */
    exports.getMowingSessionByMowingSessionId = function(userId, mowingSessionId, callback) {

        db.MowingSessions.findAll({
                where: {
                    mowingSessionId: mowingSessionId,
                    userId: userId
                },
                raw: true
            })
            .then(mowingSession => callback([], mowingSession))
            .catch(e => {
                console.log(e)
                callback(e, [])
            })

    }




    /* To add mowerPositions */
    exports.addMowerPositions = function(userId, mowingSessionId, mowerPositions, callback) {
        db.MowingSessions.update({
                mowerPositions: mowerPositions
            }, {
                where: {
                    mowingSessionId: mowingSessionId,
                    userId: userId
                },
                raw: true
            })
            .then(updatedMowerPositions => {
                if (updatedMowerPositions[0] == 0) {
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



    /* To delete MowingSession */
    exports.deleteMowingSession = function(userId, mowingSessionId, callback) {

        db.MowingSessions.destroy({
                where: {
                    mowingSessionId: mowingSessionId,
                    userId: userId
                },
                raw: true
            })
            .then(numberOfDeletedMowingSessions => {
                /* If the mowingSession dosn`t exists it returns false (because no mowingSession has been deleted) otherwise true (because a mowingSession has been deleted) */
                if (numberOfDeletedMowingSessions == 0) {
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