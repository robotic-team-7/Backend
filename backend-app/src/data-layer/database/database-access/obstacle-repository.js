module.exports = function({ db }) {

    const exports = {}

    /* Creates an Obstacle */
    exports.createObstacle = function(imageClassification, ObstaclePosition, imagePath) {

        const obstacle = {
            imageClassification: imageClassification,
            obstaclePosition: obstaclePosition,
            imagePath: imagePath
        }

        db.Obstacles.create(obstacle)
            .then(createdObstacle => callback([], createdObstacle))
            .catch(e => {
                console.log(e)
                callback(e, [])

            })

    }

    return exports
}