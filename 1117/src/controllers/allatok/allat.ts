import mysql, { type ResultSetHeader } from "mysql2/promise";
import config from "../../app/config.ts";

export interface IAllat {
  id: number;
  nev: string;
  leiras: string;
  ar: number;
  raktaron: number;
  kep: string;
}

export class Allat implements IAllat {
  // Privát belső állapotok
  private _id: number;
  private _nev: string;
  private _leiras: string;
  private _ar: number;
  private _raktaron: number;
  private _kep: string;

  // A konstruktor egy IProduct-ot (vagy annak egy részét) vár paraméterül
  constructor(data: Partial<IAllat> = {}) {
    this._id = data.id ?? 0;
    this._nev = data.nev ?? '';
    this._leiras = data.leiras ?? '';
    this._ar = data.ar ?? 0;
    this._raktaron = data.raktaron ?? 0;
    this._kep = data.kep ?? '';

    // Validált számértékek inicializálása
    this._ar = Math.max(0, data.ar ?? 0);
    this._raktaron = Math.max(0, data.raktaron ?? 0);
  }

  // --- IProduct interface-ből adódó Getterek és Setterek ---

  get id(): number { return this._id; }
  set id(value: number) { this._id = value; } // Bár az ID-t általában nem szabadna módosítani, de a setter itt van a teljes IProduct interface implementálásához

  get nev(): string { return this._nev; }
  set nev(value: string) { this._nev = value; }

  get leiras(): string { return this._leiras; }
  set leiras(value: string) { this._leiras = value; }

  get ar(): number { return this._ar; }
  set ar(value: number) { this._ar = value; }

  get raktaron(): number { return this._raktaron; }
  set raktaron(value: number) { this._raktaron = value; }

  get kep(): string { return this._kep; }
  set kep(value: string) { this._kep = value; }

  // Segédfunkció az adatok tiszta JSON-ná alakításához (pl. API-nak való visszaküldéshez)
  public toJSON(): IAllat {
    return {
      id: this._id,
      nev: this._nev,
      leiras: this._leiras,
      ar: this._ar,
      raktaron: this._raktaron,
      kep: this._kep
    };
  }
}



export class AllatManager {

  // Visszaadja az összes terméket tiszta IProduct tömbként (biztonságos exportáláshoz)
  public async allAnimalData(): Promise<IAllat[]> {
    try {
      const conn = await mysql.createConnection(config);
      const [rows] = await conn.execute("SELECT * FROM allatok");
      await conn.end(); // Debugging line to check the fetched products
      return rows as IAllat[];
    } catch (error) {
      console.error("Hiba a termékek lekérésekor:", error);
      return [];
    }
  }


  // --- CRUD MŰVELETEK ---

  // Új termék hozzáadása
  public async createAnimal(animalData: Partial<Allat>) {

    try {
      const conn = await mysql.createConnection(config);
      const result: any = await conn.query("INSERT INTO allatok values(null, ?, ?, ?, ?, ?)",
        [animalData.nev, animalData.leiras, animalData.ar, animalData.raktaron, animalData.kep]);
      await conn.end(); // Debugging line to check the fetched products
      return result[0].insertId; // Visszaadjuk az újonnan beszúrt termék ID-ját
    } catch (error) {
      console.error("Hiba a termékek lekérésekor:", error);
      return undefined;
    }


  }

  // Termék lekérése ID alapján
  public async getAnimalById(id: number) {
    try {
      const conn = await mysql.createConnection(config);
      const [rows]: [IAllat[]] = await conn.execute("SELECT * FROM allatok WHERE id = ?", [id]) as unknown as [IAllat[]];
      await conn.end(); // Debugging line to check the fetched products
      return rows[0] as IAllat | undefined;
    } catch (error) {
      console.error("Hiba a termékek lekérésekor:", error);
      return undefined;
    }
  }

  // Termék frissítése
  public async updateAnimal(id: number, updatedData: Partial<IAllat>) {
    try {
      const conn = await mysql.createConnection(config);
      const [result] = await conn.query("UPDATE allatok SET ? WHERE id = ?", [updatedData, id]);
      conn.end();
      console.log("Update result:", result); // Debugging line to check the update result
      if ((result as ResultSetHeader).affectedRows === 0) {
        throw new Error("Product not found or no changes made");
      }
      return await this.getAnimalById(id); // Visszaadjuk a frissített terméket
    } catch (error) {
      console.error("Hiba a termék frissítésekor:", error);
      return undefined;
    }
  }

  // Termék törlése ID alapján
  public async deleteAnimal(id: number) {
    try {
      const conn = await mysql.createConnection(config);
      const [result] = await conn.query("DELETE FROM allatok WHERE id = ?", [id]);
      await conn.end();
      return (result as ResultSetHeader).affectedRows > 0;
    } catch (error) {
      console.error("Hiba a termék törlésekor:", error);
      return undefined;
    }
  }
}