const { DataSource } = require("typeorm")
const dotenv = require("dotenv")

dotenv.config({ path: process.cwd() + "/.env" })

const AppDataSource = new DataSource({
  type: "postgres",
  port: 5432,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: [
    "dist/models//*{.js,.ts}",
    "node_modules/@medusajs/medusa/dist/models//*{.js,.ts}"
  ],
  migrations: [
    "dist/migrations//*{.js,.ts}",
    "node_modules/@medusajs/medusa/dist/migrations//*{.js,.ts}"
  ],
})

module.exports = {
  datasource: AppDataSource,
}