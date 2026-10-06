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

export const getProductById = (req:Request, res:Response) => {
    const products = new ProductManager(data);
    if(!req.params.id) {
        res.status(400).send({error:"Invalid product ID"});
        return;
    }

    const productId: number = parseInt(req.params.id as string);
    const product = products.allProductsData.find(p => p.id === productId);
    if (product) {
        res.send(product);
    } else {
        res.status(404).send({ error: "Product not found" });
    }
}