require('dotenv').config({ path: `${__dirname}/../../../../config/.env` });

module.exports = {
  development: {
    username: process.env.App_Database_User,
    password: process.env.App_Database_Pass,
    database: process.env.App_Database_Db_Name,
    host: process.env.App_Database_Host,
    port: process.env.App_Database_PORT,
    dialect: 'postgres',
  },
};
