module.exports = (sequelize,Datatype) =>{
    const PaymentLogs  = sequelize.define("paymentLogs",{
        id:{
            type: Datatype.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        amount:{
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
        tableName:'payment_logs',
        schema:'tanglo',
        underScored: true

    })
    PaymentLogs.association = (model) =>{
       }
    return PaymentLogs;
}