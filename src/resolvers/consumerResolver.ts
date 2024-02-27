import { ConsumerModel } from '../models/consumer';

const consumerResolver = {
  Query: {
    getConsumers: async () => {
      return await ConsumerModel.find();
    }
  },
  Mutation: {
    createConsumer: async (_: any, { consumerInput }: { consumerInput: any }, { user }: { user: any }) => {
      if (!user) {
        throw new Error('No autenticado. Debe iniciar sesión para realizar esta acción.');
      }

      const { id, url, createPromociones, deletePromociones, createProductos, deleteProductos, createServicios } = consumerInput;
      const existingConsumer = await ConsumerModel.findOne({ id });
      if (existingConsumer) {
        throw new Error('Consumer already exists');
      }
      const newConsumer = new ConsumerModel({
        id,
        url,
        createPromociones,
        deletePromociones,
        createProductos,
        deleteProductos,
        createServicios
      });
      return await newConsumer.save();
    }
  }
};

export default consumerResolver;
