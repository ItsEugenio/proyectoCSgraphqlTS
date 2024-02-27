import { PromotionSchema } from "../models/promotion";
import { sendNotifications } from "../hooks/webhookSender";
const promotionResolver = {
    Query: {
        getPromotions: async () => await PromotionSchema.find(),
        promotionByID: async (_parent: any, args: any) => await PromotionSchema.findById(args.id),
        promosPag: async (_: any, { page, pageSize }: { page: number; pageSize: number }) => {
            const offset = (page -1) * pageSize;
            const promos = await PromotionSchema.find().skip(offset).limit(pageSize);
            return promos
        }
    },
    Mutation: {
        createPromo: async (_: void, args: any, { user }: { user: any }) => {
            if (!user) {
                throw new Error('No autenticado. Debe iniciar sesión para realizar esta acción.');
            }

            const { description } = args.promotion;
            try {
                const newPromo = await PromotionSchema.create({ description });
                const data = {
                    evento: "createPromociones",
                    message: "Se ha creado una nueva promoción",
                    data: newPromo
                }
                sendNotifications(data)
                return newPromo
            } catch (error) {
                console.error(error);
                return { error: 'Hubo un error' };
            }
        },
        deletePromo: async (_: void, args: any, { user }: { user: any }) => {
            if (!user) {
                throw new Error('No autenticado. Debe iniciar sesión para realizar esta acción.');
            }

            try {

                const deletePromo = await PromotionSchema.findByIdAndDelete(args.promotion.id);
                const data = {
                    evento: "deletePromociones",
                    message: "Se ha eliminado una promoción",
                    data: deletePromo
                }
                sendNotifications(data)
                return deletePromo
            } catch (error) {
                console.error(error);
                return { error: 'Hubo un error' };
            }
        },
    }
}

export default promotionResolver;
