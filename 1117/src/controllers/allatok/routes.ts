import {Router} from "express"
import { getAnimal,setAnimals,getAnimalById,updateAnimal,updateAnimalPatch,deleteAnimal } from "./controller.ts"

const router: Router = Router()
router.get("/allatok",getAnimal)
router.get("/allatok/:id",getAnimalById)
router.post("/allatok",setAnimals)
router.put("/allatok/:id",updateAnimal)
router.patch("/allatok/:id",updateAnimalPatch)
router.delete("/allatok/:id",deleteAnimal)

export default router