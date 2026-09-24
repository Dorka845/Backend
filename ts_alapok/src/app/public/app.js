async function loadProducts() {
    const container = document.getElementById("table-container");
 
    try {
        const response = await fetch("/products");
        if (!response.ok) {
            throw new Error("HTTP hiba: " + response.status);
        }
        const products = await response.json();
 
        container.innerHTML = "";
        container.appendChild(buildTable(products));
    } catch (err) {
        container.textContent = "Hiba az adatok betöltésekor: " + err.message;
    }
}

//Táblázat
function buildTable(products) {
    const columns = [
        { key: "id", label: "ID" },
        { key: "name", label: "Név" },
        { key: "category", label: "Kategória" },
        { key: "brand", label: "Márka" },
        { key: "price", label: "Ár" },
        { key: "stock", label: "Készlet" },
        { key: "rating", label: "Értékelés" },
        { key: "active", label: "Aktív" },
        { key: "description", label: "Leírás" }
    ];
 
    const table = document.createElement("table");
 
    //Fejléc
    const thead = table.createTHead();
    const headRow = thead.insertRow();
    for (const col of columns) {
        const th = document.createElement("th");
        th.textContent = col.label;
        headRow.appendChild(th);
    }
 
    //Törzs
    const tbody = table.createTBody();
    for (const p of products) {
        const row = tbody.insertRow();
        for (const col of columns) {
            const cell = row.insertCell();
            let value = p[col.key];
            if (col.key === "price") {
                value = value.toLocaleString("hu-HU") + " " + p.currency;
            } else if (col.key === "active") {
                value = value ? "Igen" : "Nem";
            }
            cell.textContent = value;
        }
    }
 
    return table;
}
 
loadProducts();

//Űrlap