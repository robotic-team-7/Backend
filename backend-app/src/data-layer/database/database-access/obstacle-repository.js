module.exports = function({ db }) {

    const exports = {}

    /* Creates an Obstacle */
    exports.createObstacle = function(userId, mowingSessionId, obstaclePosition, imageClassification, imagePath, callback) {

        const obstacle = {
            mowingSessionId: mowingSessionId,
            userId: userId,
            imageClassification: imageClassification,
            obstaclePosition: obstaclePosition,
            imagePath: imagePath
        }

        db.Obstacles.create(obstacle)
            .then(createdObstacle => {
                if (createdObstacle[0] == 0) {
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

    return exports
}