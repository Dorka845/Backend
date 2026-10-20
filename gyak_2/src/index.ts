import data from "./data/data.ts"
import express from "express"

const app = express();
app.use(express.json());

const PORT = 3000;
app.listen(PORT, () =>{
  console.log("Fut a szerver.");
})


//GET
app.get("/data", (_req, res)=>{
  return res.status(200).json(data);
})

app.get("/data/:id", (req, res)=>{
  const id = Number(req.params.id)
  if(!Number.isInteger)
    return res.status(400).json({message: "id legyen szam"})

  const animal = data.find((animal)=>{
    animal.id === id
  })
  if(!animal)
    return res.status(404).json({message: "animal not found"})

  return res.status(200).json(animal)
})

//DELETE
app.delete("/data/:id", (req,res)=>{
  const id = Number(req.params.id)
  if(!Number.isInteger)
    return res.status(400).json({message: "id legyen szam"})

  const animal = data.findIndex((animal)=>{
    animal.id === id
  })
  if(!animal)
    return res.status(404).json({message: "animal not found"})

  data.splice(animal, 1);
  return res.status(200).send();
})

//POST
app.post("/data", (req,res)=>{
  const ujAllat = {
    id:Math.max(0, ...data.map(a => a.id))+1,
    ...req.body
  }

  data.push();
  return res.status(201).json(ujAllat);
})

//PUT
app.put("/data/:id", (req, res)=>{
  const id = Number(req.params.id)
  if(!Number.isInteger)
    return res.status(400).json({message: "id legyen szam"})

  const animal = data.find((animal)=>{
    animal.id === id
  })
  if(!animal)
    return res.status(404).json({message: "animal not found"})

  Object.assign(animal, req.body, {id});
  return res.status(200).json(animal);
})