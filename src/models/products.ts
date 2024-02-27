import { Schema, model } from 'mongoose';

interface Product {
    name: string; 
    stock: number; 
    type: string; 
    price: number; 
}

const productSchema = new Schema<Product>({
    name: {
        type: String,
        required: true,
    },
    stock: {
        type: Number, 
        required: true
    },
    type: {
        type: String,
        required: true,
    },
    price: {
        type: Number, 
        required: true
    }
});

const ProductSchema = model<Product>('Product', productSchema);

export { Product, ProductSchema };
