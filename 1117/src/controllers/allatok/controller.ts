import type { Response, Request } from "express"
import { Allat, AllatManager, type IAllat } from "./allat.ts"

export const getAnimal = async (_req: Request, res: Response) => {
    const animals = new AllatManager()
    res.send(
        await animals.allAnimalData()
    )
}

export const setAnimals = async (req: Request, res: Response) => {
    if (!req.body) {
        res.status(400).send("Nem adott meg adatokat!")
        return
    }
    const animal = new AllatManager()
    let reqProduct: any = new Allat(req.body as unknown as Partial<IAllat>)

    if (!checkRequiredFields(req.body as unknown as IAllat, reqProduct.toJSON())) {
        res.status(400).send("Hiányzó mezők!")
        return
    }


    const newAnimalId = await animal.createAnimal(reqProduct.toJSON()) as unknown as number | undefined
    if (!newAnimalId) {
        res.status(500).send({ message: "Failed to add animal" });
        return;
    }
    res.send({ message: "Animal added successfully", id: newAnimalId });
}

export const getAnimalById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params
    const animalManager = new AllatManager()
    const animal = await animalManager.getAnimalById(Number(id))
    if (!animal) {
        res.status(404).send({ message: "Animal not found" });
        return;
    }
    res.send(animal)
}

export const updateAnimal = async (req: Request, res: Response): Promise<void> => {

    if (!req.body) {
        res.status(400).send("Nem adott meg adatokat!")
        return
    }
    const { id } = req.params
    if (!Number(id)) {
        res.status(400).send("Nem adott meg ID-t vagy az nem szám!")
        return
    }

    let reqProduct: any = new Allat(req.body as unknown as IAllat)
    if (!checkRequiredFields(req.body as unknown as IAllat, reqProduct.toJSON())) {
        res.status(400).send("Hiányzó mezők!")
        return
    }

    try {
        const animalManager = new AllatManager()
        const getAnimal = await animalManager.getAnimalById(Number(id));

        if (!getAnimal) {
            const newAnimalId = await animalManager.createAnimal(reqProduct.toJSON() as unknown as Allat);
            if (!newAnimalId) {
                throw new Error("Failed to add animal")
            }
            const getNewAnimal = await animalManager.getAnimalById(newAnimalId);
            res.send({ message: "Animal created successfully", animal: getNewAnimal });
            return;
        }

        const updatedData = reqProduct.toJSON();
        delete updatedData.id; // Remove the id property from the updated data
        Object.assign(getAnimal, updatedData); // Update the existing animal with the new data

        console.log(getAnimal); // Frissítjük a meglévő állatot az új adatokkal
        const changedAnimal = await animalManager.updateAnimal(Number(id), getAnimal);
        //console.log("Changed animal:", changedAnimal); // Debugging line to check the changed animal
        if (!changedAnimal) {
            res.status(500).send({ message: "Error updating animal" });
            return;
        }

        res.send({ message: "Animal updated successfully", animal: changedAnimal });
    } catch (error) {
        res.status(500).send("Hiba történt a termék frissítésekor!")
        return
    }



}

export const updateAnimalPatch = async (req: Request, res: Response): Promise<void> => {
    if (!req.body) {
        res.status(400).send("Nem adott meg adatokat!")
        return
    }
    const { id } = req.params
    if (!Number(id)) {
        res.status(400).send("Nem adott meg ID-t vagy az nem szám!")
        return
    }
    let reqProduct: any = req.body as unknown as Partial<IAllat>
    try {
        const animalManager = new AllatManager()
        const getAnimal = await animalManager.getAnimalById(Number(id));

        if (!getAnimal) { 
            res.status(404).send({ message: "Animal not found"});
            return;
        }

        
        Object.assign(getAnimal, reqProduct); // Update the existing animal with the new data

        console.log(getAnimal); // Frissítjük a meglévő állatot az új adatokkal
        const changedAnimal = await animalManager.updateAnimal(Number(id), getAnimal);
        //console.log("Changed animal:", changedAnimal); // Debugging line to check the changed animal
        if (!changedAnimal) {
            res.status(500).send({ message: "Error updating animal" });
            return;
        }

        res.send({ message: "Animal updated successfully", animal: changedAnimal });
    } catch (error) {
        res.status(500).send("Hiba történt a termék frissítésekor!")
        return
    }


}

export const deleteAnimal = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params
    const animalManager = new AllatManager()
    const deleted = await animalManager.deleteAnimal(Number(id))
    if (deleted) {
        res.status(204).send({ message: "Animal deleted successfully" });
    } else {
        res.status(404).send({ message: "Animal not found" });
    }
}

const checkRequiredFields = (body: IAllat, animal: IAllat): boolean => {
    if (!body || typeof body !== 'object') {
        return false;
    }
    const requiredFields = Object.keys(animal).filter(key => key !== 'id')
    return requiredFields.every(field => body.hasOwnProperty(field));
}
