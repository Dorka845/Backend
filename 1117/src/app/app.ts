import express from "express"
import router from "../routes/routes.ts"
import animalRoutes from "../controllers/allatok/routes.ts"
import cors from "cors"

const app = express()
app.use(express.json())
app.use(express.urlencoded())
app.use("/",router)
app.use("/",animalRoutes)
app.use(cors({
    origin: "*"
}))

export default app