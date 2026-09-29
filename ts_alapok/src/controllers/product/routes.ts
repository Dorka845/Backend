import {Router} from "express"
import { getProduct, setProducts } from "./controller.ts"

const router:Router = Router()
router.get("/products", getProduct)