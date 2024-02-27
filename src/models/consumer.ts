import { Schema, model } from 'mongoose';

interface Consumer {
  id: string;
  url: string;
  createPromociones: boolean;
  deletePromociones: boolean;
  createProductos: boolean;
  deleteProductos: boolean;
  createServicios: boolean;
  createService: boolean;
  deleteService: boolean;
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
  },
  createPromociones: {
    type: Boolean
  },
  deletePromociones: {
    type: Boolean
  },
  createProductos: {
    type: Boolean
  },
  deleteProductos: {
    type: Boolean
  },
  createServicios: {
    type: Boolean
  },
  createService: {
    type: Boolean
  },
  deleteService: {
    type: Boolean
  }
});

const ConsumerModel = model<Consumer>('Consumer', consumerSchema);

export { Consumer, ConsumerModel };
