import { ServiceSchema } from "../models/services"; 
import { authenticateJWT } from '../middlewares/authenticationJWT';

const serviceResolver = {
    Query: {
        services: async () => await ServiceSchema.find(),
        service: async (_parent: any, args: any) => await ServiceSchema.findById(args.id),
    },
    Mutation: {
        createService: async (_: void, args:any, { user }: { user: any }) =>{
            if (!user) {
                throw new Error('No autenticado. Debe iniciar sesión para realizar esta acción.');
            }

            const { name, price } = args.service;
            try {
                const newService = await ServiceSchema.create({ name, price });
                return newService
            } catch (error) {
                console.error(error);
                return { error: 'Hubo un error' };
            }
        },
        deleteService: async (_: void, args:any, { user }: { user: any }) =>{
            if (!user) {
                throw new Error('No autenticado. Debe iniciar sesión para realizar esta acción.');
            }

            try {
                const deleteService = await ServiceSchema.findByIdAndDelete(args.service.id );
                return deleteService
            } catch (error) {
                console.error(error);
                return { error: 'Hubo un error' };
            }
        },
    }
}

export default serviceResolver;
