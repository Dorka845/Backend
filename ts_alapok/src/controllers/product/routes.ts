import { Router } from "express";
import { getProduct, setProducts, getProductById } from "./controller.ts";

const router: Router = Router()
router.get("/products", getProduct)
router.get("/products/:id", getProductById)
router.post("/product", setProducts)

export default router