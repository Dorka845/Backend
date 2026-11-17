import express from "express"
import animalRoutes from "../controllers/routes.ts"

const app = express()
app.use(express.json())
app.use("/api", animalRoutes)

export default app