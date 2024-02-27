import { ServiceSchema } from "../models/services"; 
import { sendNotifications } from "../hooks/webhookSender";

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
                const data = {
                    evento: "createService",
                    message: "Se ha creado un nuevo Servicio",
                    data: newService
                }
                sendNotifications(data)
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
                const data = {
                    evento: "deleteService",
                    message: "Se ha eliminado un nuevo Servicio",
                    data: deleteService
                }
                sendNotifications(data)
                return deleteService
            } catch (error) {
                console.error(error);
                return { error: 'Hubo un error' };
            }
        },
    }
}

export default serviceResolver;
