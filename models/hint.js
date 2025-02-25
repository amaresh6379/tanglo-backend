module.exports = (sequelize,Datatype) =>{
    const Hint  = sequelize.define("hint",{
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
        sectionId:{
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
        tableName:'hint',
        schema:'tanglo',
        underScored: true

    })
    Hint.association = (model) =>{
        Hint.hasMany(model.section, {foreignKey:'sectionId'});
       }
    return Hint;
}