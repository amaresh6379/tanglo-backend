require("dotenv").config();


CONFIG = {};

// app configuration
CONFIG.ENVIRONMENT = process.env.APP || 'local';
CONFIG.port = process.env.PORT || 5000;
CONFIG.jwt_encryption = process.env.jwt_encryption ;
CONFIG.jwt_expiration = process.env.jwt_expiration || 100000


// db configuration
CONFIG.db_name = process.env.DB_NAME;
CONFIG.db_user = process.env.DB_USER;
CONFIG.db_password = process.env.DB_PASSWORD;
CONFIG.db_host = process.env.DB_HOST;
CONFIG.db_port = process.env.DB_PORT;
CONFIG.db_dialect = process.env.DB_DIALECT;
CONFIG.min_pool_connection = 1;
CONFIG.max_pool_connection = 10;

// Oauth configuration
CONFIG.client_id = process.env.GOOGLE_CLIENT_ID;


// Bucket Name
CONFIG.S3_BUCKET_NAME = process.env.S3_BUCKET_NAME;

// Mail Configuration
CONFIG.mail_user = process.env.MAIL_USER;
CONFIG.mail_password = process.env.MAIL_PASSWORD;






