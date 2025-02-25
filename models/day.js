module.exports = (sequelize,Datatype) =>{
    const Day  = sequelize.define("day",{
        id:{
            type: Datatype.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        name:{
            type: Datatype.STRING,
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
        tableName:'day',
        schema:'tanglo',
        underScored: true

    })
    Day.association = (model) =>{
        Day.hasMany(model.section, {foreignKey:'dayId'});
       }
    return Day;
}