import mongoose from "mongoose";

const {Schema} = mongoose
const commandeSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        details: [{
            type: Schema.Types.ObjectId,
            ref: 'Details'
        }],
        status:{type:String, enum:["en cours de préparation", "en cours de livraison", "livré"], default: "en cours de préparation", required: true},
        total:{type:Number}
    },
    {timestamps: true}
)

export default mongoose.model('Commande', commandeSchema)