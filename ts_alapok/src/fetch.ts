//09.22.
import { getUsers } from "./functions.js";

getUsers().then((v) => console.log(v)).catch((e) => console.log("Hiba"));

try {
    console.log(await getUsers());
} catch {
    console.log("Hiba");
}