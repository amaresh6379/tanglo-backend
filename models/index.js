const { Sequelize, DataTypes } = require('sequelize');
const fs = require('fs');
const path = require('path');
require('../config');

// Sequelize instance
const sequelize = new Sequelize(
  CONFIG.db_name,
  CONFIG.db_user,
  CONFIG.db_password,
  {
    host: CONFIG.db_host,
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
        ca: `-----BEGIN CERTIFICATE-----
                      MIIETTCCArWgAwIBAgIUJ9JTtu3Jb0u1rmBUPv8qqwmzztgwDQYJKoZIhvcNAQEM
                      BQAwQDE+MDwGA1UEAww1MTRhZDUwZWQtZjU2MS00ZDc3LWJhNWEtODRkMWI0MTY5
                      ZGE1IEdFTiAxIFByb2plY3QgQ0EwHhcNMjUwMjI1MTU1MTEwWhcNMzUwMjIzMTU1
                      MTEwWjBAMT4wPAYDVQQDDDUxNGFkNTBlZC1mNTYxLTRkNzctYmE1YS04NGQxYjQx
                      NjlkYTUgR0VOIDEgUHJvamVjdCBDQTCCAaIwDQYJKoZIhvcNAQEBBQADggGPADCC
                      AYoCggGBAJQyI+3fIlB6tZXmQnoeed1c3RSKPoDlYAfgDJWGCuijiV3ThfH7DwdS
                      mIQBiwpGmBGxnhQJJXCh3T3oCjFlQSVcjq4hUE7BEybRmCfyjlojk+9QRvswdl/C
                      0UFwv40mQNDB4t1hWCXO7m+IAnzOPAN/FZopUTR8YeMSBQdhYLule1/Aqgs5beWr
                      M46XDyN1qCBLMd3j1wn9DIXNaehDDQG1FLjzxUAtX5HpTqpPwd89KTArTWkkkTBa
                      mn0ilsZxGOYaszhZekXnNzQriQBYtMnYw7CtGAlCvdEz0+qpbfUSzcQYCDPsT3bc
                      CDTqjF+PaTFzx1AoZBCZuNc/eU0K52dteUFWtTM11noDZ2/E0I8x208pEIuDM82G
                      jNOVa20UfF1BMSrC5OdAHeNeAQICm90YwHjNTzjfLQbz1tgUBFW8THJNj+KtLfU+
                      6VISreYupZ/h4/NV3FQIBeGYF4BaIQVEJkp84gJR+1DgBQ+AlF7YWnOubL/Z2jX4
                      7OxNlhtPjQIDAQABoz8wPTAdBgNVHQ4EFgQUdatSmB/kegolJd2Ri1/VSPN7mhUw
                      DwYDVR0TBAgwBgEB/wIBADALBgNVHQ8EBAMCAQYwDQYJKoZIhvcNAQEMBQADggGB
                      AEhxzkt8o3oSXgv58weZ7DMIREa5LnJgSdEejHQz9o+Xpe3ps9HOj8seIDimcsJ3
                      gHdDoxBc20Wa89DhGGvfqg2RZSP+neHvf8RrV/YuDK+kKCLfaivM+sr4QYMWOKbC
                      rpE/4xyhbWVMl06Ks0cdT7xJT++d5mtLyuZmKZNQv4wdhtpdWIx6WxQ7yUo4hyKa
                      RzwBxuBmjMvcTHrKWJbJk5F0/RSj9zkMdGItvaEe/kUHKWclvUSLv+/ViG3ZwTye
                      fSBenb5SOY5ZRRT+ccXTakthK+1wn8xOb67EGUJ9NxOGFwxHESpJ/iXiMhF/B7Ej
                      f9hGLpFcg22BPjsU+Fgm8q4b2aN9njKzR4IsxsX4x81dIVfxYsRaXcKhixG1ckbq
                      sNCTIG04KHTEE3O13/oLqfezwBRHzBvW4bTGyyNwVk9RHQ6Cy8AHAm+3xhhqWgbM
                      mDPnFEqG9llKTCSq1b/y/GsiM3P+/g1dj2hl2jOKdczdWuvTt7v4LI7h8miJ+kXi
                      MQ==
                      -----END CERTIFICATE-----`
      }
    },
    port: CONFIG.db_port,
    logging: false,
    define: {
      timestamps: false,
      underscored: true
    },
    pool: {
      max: CONFIG.max_pool_connection,
      min: CONFIG.min_pool_connection
    }
  }
);
const createSchema = async function () {
  await sequelize.showAllSchemas().then((res) => {
    if (res) {
      const schema = res.find((res) => res === 'certificate');
      if (!schema) {
        sequelize.createSchema('tanglo').then((res) => { });
      }
    }
  })
}

createSchema();



var db = {};
// for setup the model
fs.readdirSync(__dirname).forEach((file) => {
  if (file !== 'index.js') {
    let model = file.slice(0, -3);
    db[model] = require(path.join(__dirname, '/', model))(sequelize, DataTypes);
  }
});
// for setup the association.
fs.readdirSync(__dirname).forEach((file) => {
  if (file !== 'index.js') {
    let model = file.slice(0, -3);
    db[model]?.association(db);
  }
});
// console.log("db",db);

db.Sequelize = Sequelize;
db.sequelize = sequelize;

module.exports = db;
