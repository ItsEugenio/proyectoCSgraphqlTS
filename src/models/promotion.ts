import { Schema, model } from 'mongoose'

interface Promotion {
    description: string;
}

const promotionSchema = new Schema<Promotion>({
    description: {
        type: String,
        required: true
    }
})

const PromotionSchema = model<Promotion>('Promotion', promotionSchema); 

export { Promotion, PromotionSchema }