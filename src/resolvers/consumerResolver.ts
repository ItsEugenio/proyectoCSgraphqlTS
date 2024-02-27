import { ConsumerModel } from '../models/consumer';

const consumerResolver = {
  Query: {
    getConsumers: async () => {
      return await ConsumerModel.find();
    }
  },
  Mutation: {
    createConsumer: async (_: any, { consumerInput }: { consumerInput: any }) => {
      const { id, url } = consumerInput;
      const existingConsumer = await ConsumerModel.findOne({ id });
      if (existingConsumer) {
        throw new Error('Consumer already exists');
      }
      const newConsumer = new ConsumerModel({
        id,
        url
      });
      return await newConsumer.save();
    }
  }
};

export default consumerResolver;
