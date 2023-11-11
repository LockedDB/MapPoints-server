import mysql from "mysql2";
import { configDotenv } from "dotenv";

configDotenv();

const config = {
  host: "localhost",
  user: process.env.USERNAME,
  password: process.env.PASSWORD,
  database: "prod",
};

export default mysql.createConnection(config);
