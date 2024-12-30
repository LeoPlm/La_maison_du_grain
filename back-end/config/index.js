import dotenv from "dotenv"

dotenv.config()

export const env = {
    PORT: process.env.PORT,
    MONGO_URI: process.env.MONGO_URI,
    // MONGO_URI_LOCAL: process.env.MONGO_URI_LOCAL,
    DB_NAME: process.env.DB_NAME,
    SECRET_TOKEN: process.env.SECRET_TOKEN,
    EMAIL_USER: process.env.EMAIL_USER,
    EMAIL_PASS: process.env.EMAIL_PASSWORD
}
