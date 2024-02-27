import { Schema, model } from 'mongoose';

interface Consumer {
  id: string;
  url: string;
}

const consumerSchema = new Schema<Consumer>({
  id: {
    type: String,
    required: true,
    unique: true
  },
  url: {
    type: String,
    required: true
  }
});

const ConsumerModel = model<Consumer>('Consumer', consumerSchema);

export { Consumer, ConsumerModel };
