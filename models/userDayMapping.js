module.exports = (sequelize,Datatype) =>{
    const userDayMapping  = sequelize.define("userDayMapping",{
        id:{
            type: Datatype.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        userId:{
            type: Datatype.INTEGER,
            allowNull: false
        },
        dayId:{
            type: Datatype.INTEGER,
            allowNull: false
        },
        isDeleted: {
            type: Datatype.BOOLEAN,
            defaultValue: false
        },
        createdAt: {
            type: Datatype.DATE,
            defaultValue: Datatype.NOW
        },
        modifiedAt:{
            type: Datatype.DATE,
            defaultValue: Datatype.NOW
        }
    },{
        tableName:'userDayMapping',
        schema:'tanglo',
        underScored: true

    })
    userDayMapping.association = (model) =>{
        userDayMapping.belongsTo(model.day, {foreignKey:'dayId'});
        userDayMapping.belongsTo(model.user, {foreignKey:'userId'});
       }
    return userDayMapping;
}