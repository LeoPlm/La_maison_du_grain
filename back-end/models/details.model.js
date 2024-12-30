import mongoose from "mongoose";

const detailsSchema = mongoose.Schema(
    {
        article:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Article',
            required: true
        },
        quantity:{type:Number, required: true},
        subtotal:{type:Number}
    },
    {timestamps: true}
)

export default mongoose.model('Details', detailsSchema)