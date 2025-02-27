module.exports = (sequelize,Datatype) =>{
    const User  = sequelize.define("user",{
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
        email:{
            type: Datatype.STRING,
            allowNull: false
        },
        image:{
            type: Datatype.STRING,
            allowNull: false
        },
        password:{
            type: Datatype.STRING
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
        tableName:'user',
        schema:'tanglo',
        underScored: true

    })
    User.association = (model) =>{
        User.hasMany(model.userDayMapping, {foreignKey:'userId'});
        User.hasMany(model.userSectionMapping, {foreignKey:'userId'});
       }
    return User;
}