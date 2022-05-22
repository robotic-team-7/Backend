/* initilaizes the database */
const { Sequelize, DataTypes } = require('sequelize')
console.log(process.env.POSTGRES_CONNECTION)
    /* Establishes connection with the database */
const sequelize = new Sequelize('postgres', 'postgres', process.env.POSTGRES_PASSWORD, {
    host: process.env.POSTGRES_CONNECTION,
    dialect: "postgres"
});

/* Checks if the connection was successful */
try {

    sequelize.authenticate()
    console.log('Connection has been established successfully.')

    /* Creates table Mowers */
    const Mowers = sequelize.define('Mowers', {
        mowerId: {
            primaryKey: true,
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        userId: {
            type: DataTypes.STRING,
            allowNull: false
        },
        status: {
            primaryKey: true,
            type: DataTypes.STRING,
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
        userId: {
            type: DataTypes.STRING,
            allowNull: false
        },
        mowerPositions: {
            type: DataTypes.JSON,
            allowNull: false
        },
        mowerId: {
            type: Sequelize.STRING,
            onDelete: "CASCADE",
            references: {
                model: "Mowers",
                key: "mowerId",
                as: "mowerId",
            },
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
        userId: {
            type: DataTypes.STRING,
            allowNull: false
        },
        imageClassification: {
            type: DataTypes.STRING,
            allowNull: true
        },
        obstaclePosition: {
            type: DataTypes.JSON,
            allowNull: false
        },
        imagePath: {
            type: DataTypes.STRING,
            allowNull: true
        },
        mowingSessionId: {
            foreignKey: true,
            type: Sequelize.INTEGER,
            onDelete: "CASCADE",
            references: {
                model: "MowingSessions",
                key: "mowingSessionId",
                as: "mowingSessionId",
            },
        },

    }, {
        timestamps: false
    });

    /* Table relations */

    // Relates mowerId to MowingSessions table
    Mowers.hasMany(MowingSessions, { foreignKey: 'mowerId', onDelete: 'CASCADE', hooks: true })
    MowingSessions.belongsTo(Mowers, { foreignKey: 'mowerId', onDelete: 'CASCADE' })

    // Relates mowingSessionsId to Obstacles table
    MowingSessions.hasMany(Obstacles, { foreignKey: 'mowingSessionId', onDelete: 'CASCADE', hooks: true })
    Obstacles.belongsTo(MowingSessions, { foreignKey: 'mowingSessionId', onDelete: 'CASCADE' })



    /* Syncs all tables with the databse */
    sequelize.sync({ force: true }).then(function() {

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