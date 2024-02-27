import { ProductSchema } from "../models/products"; 

const productResolver = {
    Query: {
        getProducts: async () => await ProductSchema.find(),
        productByID: async (_parent: any, args: any) => await ProductSchema.findById(args.id),
        productsPag: async (_: any, { page, pageSize }: { page: number; pageSize: number }) => {
            const offset = (page -1) * pageSize;
            const products = await ProductSchema.find().skip(offset).limit(pageSize);
            return products
        },
        productByType: async (_parent: any, args: any) => await ProductSchema.find({type: args.type})
    },
    Mutation: {
        createProduct: async (_: void, args:any) =>{
            const { name, stock, type, price } = args.product;
            try {
                const newProduct = await ProductSchema.create({ name, stock, type, price });
                return newProduct
            } catch (error) {
                console.error(error);
                return { error: 'Hubo un error' };
            }
        },
        deleteProduct: async (_: void, args:any) =>{
            try {
                const deleteProduct = await ProductSchema.findByIdAndDelete(args.product.id );
                return deleteProduct
            } catch (error) {
                console.error(error);
                return { error: 'Hubo un error' };
            }
        },
    }
}

export default productResolver;