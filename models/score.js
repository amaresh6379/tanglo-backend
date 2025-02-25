module.exports = (sequelize,Datatype) =>{
    const Score  = sequelize.define("score",{
        id:{
            type: Datatype.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        percentageRange:{
            type: Datatype.INTEGER,
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
        tableName:'score',
        schema:'tanglo',
        underScored: true

    })
    Score.association = (model) =>{
       }
    return Score;
}   