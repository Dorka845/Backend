import data from "../../app/data/data.ts"
import type { Response, Request } from "express"
import { Product, ProductManager, type IProduct } from "./product.ts"

export const getProduct = (_req:Request, res:Response) => {
    const products = new ProductManager(data);
    res.send(products.allProductsData);
}

export const setProducts = (req:Request, res:Response) => {
    const newProduct:Product = new Product(req.body);
    console.log(newProduct);
    res.send(newProduct.toJSON());
}