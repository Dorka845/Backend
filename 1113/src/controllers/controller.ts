import type { Request, Response } from "express"
import { animalManager } from "./animal.ts"

export const getAnimals = (_req: Request, res: Response) => {
    res.status(200).json(animalManager.getAll())
}

export const getAnimalById = (req: Request, res: Response) => {
    const animal = animalManager.getById(Number(req.params.id))
    if (!animal) {
        res.status(404).json({ message: "Az állat nem létezik" })
        return
    }
    res.status(200).json(animal)
}

export const createAnimal = (req: Request, res: Response) => {
    if (!animalManager.validNew(req.body)) {
        res.status(400).json({ message: "A megadott adatok nem megfelelőek!" })
        return
    }
    const { nev, faj, kor, nem, orokbefogadhato, kep } = req.body
    const id = animalManager.create({ id: 0, nev, faj, kor, nem, orokbefogadhato, kep })
    res.status(201).json({ id })
}

export const updateAnimal = (req: Request, res: Response) => {
    const id = Number(req.params.id)
    if (!animalManager.getById(id)) {
        res.status(404).json({ message: "Az állat nem létezik!" })
        return
    }
    if (!animalManager.validPatch(req.body)) {
        res.status(400).json({ message: "Az adatok nem megfelelőek!" })
        return
    }
    animalManager.update(id, req.body)
    res.status(200).json({ message: "Sikeres módosítás" })
}

export const deleteAnimal = (req: Request, res: Response) => {
    if (!animalManager.delete(Number(req.params.id))) {
        res.status(404).json({ message: "Az állat nem létezik!" })
        return
    }
    res.status(204).send()
}