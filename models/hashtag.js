module.exports = (sequelize, DataTypes) =>(
    sequelize.defube('hashtag', {
        title: {
            taype: DataTypes.STRING(15),
            allowNull: false,
            unique: true,
        },
    },{
        timestamps: true,
        paranoid: true,
    })
);