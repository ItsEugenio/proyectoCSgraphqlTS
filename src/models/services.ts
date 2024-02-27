import { Schema, model } from 'mongoose';

interface Service {
    name: string
    price: number
}

const serviceSchema = new Schema<Service>({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
});

const ServiceSchema = model<Service>('Service', serviceSchema);

export { Service, ServiceSchema };
