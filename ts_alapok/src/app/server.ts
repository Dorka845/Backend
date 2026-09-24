import express from "express";
import type {Request,Response} from "express";
import data from "./data/data.ts";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express(); //ha egy utasitas/sor a ; elhagyhato
app.use(express.json());

app.use("/page", express.static(path.join(__dirname, "public")));

app.get("/",(_req:Request, res:Response) => {
    res.json({
        message: "Hello, fut a szerver!"
    })
});

app.post("/", (_req:Request, res:Response) =>{
    res.json({
        message: "Hello, ez egy POST kérés!"
    })
});

app.get("/products",(_req:Request, res:Response)=>{
    res.send(
        data
    )
})

app.post("/a", (_req:Request,res:Response)=>{
    res.send("Szöveg");
});

app.listen(3000, ()=>{
    console.log("Fut a szerver!");
});