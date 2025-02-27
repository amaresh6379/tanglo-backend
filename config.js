require("dotenv").config();


CONFIG = {};

// app configuration
CONFIG.ENVIRONMENT = process.env.APP || 'local';
CONFIG.port = process.env.PORT || 5000;
CONFIG.jwt_encryption = process.env.jwt_encryption || 'zenAdminEncryption';
CONFIG.jwt_expiration = process.env.jwt_expiration || 100000


// db configuration
CONFIG.db_name = process.env.DB_NAME || 'defaultdb';
CONFIG.db_user = process.env.DB_USER || 'avnadmin';
CONFIG.db_password = process.env.DB_PASSWORD || 'AVNS_6pcbqDRus8yFs09lOl-';
CONFIG.db_host = process.env.DB_HOST || 'pg-1d184d16-amareshraja43-139f.g.aivencloud.com';
CONFIG.db_port = process.env.DB_PORT || '5001';
CONFIG.db_dialect = process.env.DB_DIALECT || 'postgres';
CONFIG.min_pool_connection = 1;
CONFIG.max_pool_connection = 10;

// Oauth configuration
CONFIG.client_id = process.env.GOOGLE_CLIENT_ID;








