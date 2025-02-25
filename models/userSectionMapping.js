module.exports = (sequelize,Datatype) =>{
    const userSectionMapping  = sequelize.define("userSectionMapping",{
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
        tableName:'userSectionMapping',
        schema:'tanglo',
        underScored: true

    })
    userSectionMapping.association = (model) =>{
        userSectionMapping.belongsTo(model.section, {foreignKey:'sectionId'});
        userSectionMapping.belongsTo(model.user, {foreignKey:'userId'});
       }
    return userSectionMapping;
}