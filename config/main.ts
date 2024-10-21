require('dotenv').config();
const config = {

    // database
    db: process.env.DATABASE_URL,
    port: 3001,
    // test env
    test_env: 'test',
    test_db: process.env.DATABASE_URL_TEST,
    test_port: 3001



}

export default config;