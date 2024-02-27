import { ProductSchema } from "../models/products";
import { sendNotifications } from "../hooks/webhookSender";
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
        createProduct: async (_: void, args: any, { user }: { user: any }) => {
            if (!user) {
                throw new Error('No autenticado. Debe iniciar sesión para realizar esta acción.');
            }

            const { name, stock, type, price } = args.product;
            try {
                const newProduct = await ProductSchema.create({ name, stock, type, price });
                const data = {
                    evento: "createProductos",
                    message: "Se ha creado un nuevo producto",
                    data: newProduct
                }
                sendNotifications(data)
                return newProduct
            } catch (error) {
                console.error(error);
                return { error: 'Hubo un error' };
            }
        },
        deleteProduct: async (_: void, args: any, { user }: { user: any }) => {
            if (!user) {
                throw new Error('No autenticado. Debe iniciar sesión para realizar esta acción.');
            }

            try {
                const deleteProduct = await ProductSchema.findByIdAndDelete(args.product.id);
                const data = {
                    evento: "deleteProductos",
                    message: "Se ha eliminado un nuevo producto",
                    data: deleteProduct
                }
                sendNotifications(data)
                return deleteProduct
            } catch (error) {
                console.error(error);
                return { error: 'Hubo un error' };
            }
        },
    }
}

export default productResolver;
