import allatok from "../data/allatok.ts"

export interface IAnimal {
    id: number
    nev: string
    faj: string
    kor: number
    nem: string
    orokbefogadhato: boolean
    kep: string
}

const MEZOK = ["nev", "faj", "kor", "nem", "orokbefogadhato", "kep"]
const NEMEK = ["hím", "nőstény", "ismeretlen"]

export class AnimalManager {
    private animals: IAnimal[] = allatok as IAnimal[]

    public getAll(): IAnimal[] {
        return this.animals
    }

    public getById(id: number): IAnimal | undefined {
        return this.animals.find(a => a.id === id)
    }

    public create(data: IAnimal): number {
    data.id = Math.max(0, ...this.animals.map(a => a.id)) + 1
    this.animals.push(data)
    return data.id
}

    public update(id: number, data: Partial<IAnimal>): boolean {
        const animal = this.getById(id)
        if (!animal) return false
        Object.assign(animal, data)
        return true
    }

    public delete(id: number): boolean {
        const index = this.animals.findIndex(a => a.id === id)
        if (index === -1) return false
        this.animals.splice(index, 1)
        return true
    }

    private mezoJo(kulcs: string, ertek: any): boolean {
        switch (kulcs) {
            case "nev":
            case "faj": return typeof ertek === "string" && ertek.trim() !== ""
            case "kor": return typeof ertek === "number" && ertek >= 0
            case "nem": return NEMEK.includes(ertek)
            case "orokbefogadhato": return typeof ertek === "boolean"
            case "kep": return typeof ertek === "string"
            default: return false 
        }
    }

    public validNew(body: any): boolean {
        if (!body || typeof body !== "object") return false
        return MEZOK.every(k => this.mezoJo(k, body[k]))
    }

    public validPatch(body: any): boolean {
        if (!body || typeof body !== "object") return false
        const kulcsok = Object.keys(body)
        if (kulcsok.length === 0) return false
        return kulcsok.every(k => this.mezoJo(k, body[k]))
    }
}

export const animalManager = new AnimalManager()