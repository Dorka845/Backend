import { Router } from "express"
import { getAnimals, getAnimalById, createAnimal, updateAnimal, deleteAnimal } from "./controller.ts"

const router: Router = Router()

router.get("/animals", getAnimals)
router.get("/animals/:id", getAnimalById)
router.post("/animals", createAnimal)
router.patch("/animals/:id", updateAnimal)
router.delete("/animals/:id", deleteAnimal)

export default router