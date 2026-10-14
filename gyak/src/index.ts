import data from "./data/data.ts";
import express from "express"

const app = express()

const PORT = 3000;
app.listen(PORT, ()=>{
    console.log("fut a szerver")
})

app.get("/data", (_req, res) => {
    return res.status(200).json(data)
})

app.get("/data/:id", (req, res) => {
    const id = Number(req.params.id)
    if(!Number.isInteger(id)){
        return res.status(400).json({message: "id legyen szam"})
    }
    const animal = data.find((animal) => {
        animal.id === id
    })
    if(!animal){
        return res.status(404).json({message: "animal not found"})
    }
    return res.status(200).json(animal)
})

app.delete("/data/:id", (req, res) => {
    const id = Number(req.params.id)
    if(!Number.isInteger(id)){
        return res.status(400).json({message: "id legyen szam"})
    }
    const animal = data.findIndex((animal) => {
        animal.id === id
    })
    if(!animal){
        return res.status(404).json({message: "animal not found"})
    }
    data.splice(animal, 1)
    return res.status(204).send()
})

