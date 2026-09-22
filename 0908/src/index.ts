/*
export function sayHelloWorld(world: string) {
  return `Hello ${world}`;
}

console.log(sayHelloWorld("World"));
*/
/*
let name : string = "Pepe";
let age : number = 45;
let price : number = 12.5;
let isActive : boolean = true;
//let bigNum : bigint = 9007199254740991n;
const id : symbol = Symbol("id");
let obj = {
  [id]: "Some value",
}
let obj2 = {
  id: "Another value",
}

console.log(obj[id]); //Output: Some value
console.log(obj2["id"]); //Output: Another value

class Osztaly{
  [id]() {
    return "Osztály függvény";
  }
}
let osztaly : any = new Osztaly();
let osztalynev = osztaly[id](); //Output: Osztály függvény
console.log(osztalynev)


let valami : any = "Hello";
console.log(valami);
valami = 10;
console.log(valami);
valami = true;
console.log(valami);

let valami2 : unknown = "Hello";
console.log(valami2);
if (typeof valami2 === "string") {
  console.log(valami2.toUpperCase());
}
valami2 = 10;
console.log(valami2);
valami2 = true;
console.log(valami2);

let valami3 : null = null;
let valami4 : undefined = undefined;
console.log(valami3);
console.log(valami4);
*/

/*
//Tömbök
const numbers: number[] = [1, 2, 3, 4, 5];
const names: string[] = ['Alice', 'Bob', 'Charlie', 'David', 'Eve'];
const numbers2: Array<number> = [1, 2, 3, 4, 5];
 
numbers.forEach((num: number) => {
  console.log(num);
});
 
names.forEach((name: string) => {
  console.log(name);
});
*/

/*
//Tuple
const user : { name:string; age:number} = {
  name: 'Alice',
  age: 300
};
const user2: [string, number] = ['Bob', 25];
*/

/*
enum Role {
  ADMIN = "Admin",
  USER = "User",
  GUEST = "Guest"
};

const userRole: Role = Role.ADMIN;
console.log(userRole);
*/

/*
// Tipusok / tipusdefinialas
type User = {
  id: number,
  name: string,
  email: string,
  isActive: boolean;
};
 
const users : User[] = [
  {
    id: 1,
    name: "John Doe",
    email: "johndoe@gmail.com",
    isActive: true
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "janesmith@gmail.com",
    isActive: false
  }
]
*/

/*
interface User {
  id: number,
  name: string,
  email?: string,
  isActive: boolean;
};

class userService implements User {
  readonly  id: number;
  name: string;
  email?: string;
  isActive: boolean;
  constructor(id: number, name: string, email: string, isActive: boolean) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.isActive = isActive;
  }
};

const users: User[] = [
  { id: 1, name: 'Alice', email: 'alice@example.com', isActive: true },
  { id: 2, name: 'Bob', email: 'bob@example.com', isActive: false },
];

const use: User = new userService(3, "John Doe", "john@example.com", true); //id is readonly 
*/

/*
let id : number | string;
id = 10; //valid
id = "abc"; // valid

let literal : "bal" | "jobb";
literal = "bal"; //valid
literal = "jobb"; //valid
//literal = "other"; //invalid

type szemely = { name: string };
type dolgozo = { dolgozoid: number };
type  dolgozoSzemely = szemely & dolgozo;

const dolgozo1: dolgozoSzemely = {
  name: "John Doe",
  dolgozoid: 12345
};
console.log(dolgozo1);
*/


//09.15. - Functions
function osszead(a: number, b: number): number {
  return a + b;
}

function kiir(uzenet: string): void {
  console.log(uzenet);
}

function ujFelhasznalo(neve: string, eletkor: number): void {
  console.log({neve, eletkor});
}

function udvozol(neve:string="Vendég", megszolitas?:string): string{
  if (megszolitas) {
    return `Szia ${megszolitas} ${neve}!`;
  }
  return `Szia ${neve}!`;
}
console.log(udvozol("János", "Dr.")); //udvozol(undefined, "Dr.")