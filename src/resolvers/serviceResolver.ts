import { ServiceSchema } from "../models/services"; 

const serviceResolver = {
    Query: {
        services: async () => await ServiceSchema.find(),
        service: async (_parent: any, args: any) => await ServiceSchema.findById(args.id),
    },
    Mutation: {
        createService: async (_: void, args:any) =>{
            const { name, price } = args.service;
            try {
                const newService = await ServiceSchema.create({ name, price });
                return newService
            } catch (error) {
                console.error(error);
                return { error: 'Hubo un error' };
            }
        },
        deleteService: async (_: void, args:any) =>{
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