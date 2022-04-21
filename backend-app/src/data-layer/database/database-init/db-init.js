/* initilaizes the database */
const { Sequelize, DataTypes } = require('sequelize')

/* Establishes connection with the database */
const sequelize = new Sequelize('postgres://postgres:mower123@local-db:5432/mower')

/* Checks if the connection was successful */
try {

    sequelize.authenticate()
    console.log('Connection has been established successfully.')

    /* Creates table Mowers */
    const Mowers = sequelize.define('Mowers', {
        mowerId: {
            primaryKey: true,
            autoIncrement: true,
            type: DataTypes.INTEGER,
            unique: true,
            allowNull: false
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        serialNumber: {
            unique: true,
            type: DataTypes.STRING,
            allowNull: false
        },
        status: {
            primaryKey: true,
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
    }, {
        timestamps: false
    });

    /* Creates table MowingSessions */
    const MowingSessions = sequelize.define('MowingSessions', {
        mowingSessionId: {
            primaryKey: true,
            autoIncrement: true,
            type: DataTypes.INTEGER,
            unique: true,
            allowNull: false
        },
        mowerPositions: {
            type: DataTypes.JSON,
            allowNull: false
        },
    }, {
        timestamps: true,
        createdAt: true,
        updatedAt: false,
        deletedAt: false,
    });

    /* Creates table Obstacles */
    const Obstacles = sequelize.define('Obstacles', {
        obstacleId: {
            primaryKey: true,
            autoIncrement: true,
            type: DataTypes.INTEGER,
            unique: true,
            allowNull: false
        },
        imageClassification: {
            type: DataTypes.STRING,
            allowNull: true
        },
        ObstaclePosition: {
            type: DataTypes.JSON,
            allowNull: false
        },
        imagePath: {
            type: DataTypes.STRING,
            allowNull: true
        },
    }, {
        timestamps: false
    });

    /* Table relations */

    // Adds mowerId to MowingSessions table
    MowingSessions.belongsTo(Mowers, { foreignKey: 'mowerId', onDelete: 'cascade' })

    // Adds mowingSessionsId to Obstacles table
    Obstacles.belongsTo(MowingSessions, { foreignKey: 'mowingSessionsId', onDelete: 'cascade' })


    /* Syncs all tables with the databse */
    sequelize.sync({ force: true }).then(function() {

        Mowers.create({
            userId: 1,
            serialNumber: "abc123",
            status: false
        })
        MowingSessions.create({
            mowerId: 1,
            mowerPositions: {
                points: [
                    [53.33, 44.33],
                    [66.44, 56.77]
                ]

            }
        })
    })

    /* Exports the tables so they are accessable for the database-iterface files */
    module.exports = function({}) {

        /* Tables to export */
        const exports = { Mowers, MowingSessions, Obstacles }
        return exports
    }


} catch (error) {
    /* Prints error in the console if connection to the database fails */
    console.error('Unable to connect to the database:', error)
}