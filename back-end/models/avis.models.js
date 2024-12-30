import mongoose from "mongoose";

const avisSchema = mongoose.Schema (
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        article:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Article',
            required: true
        },
        rating:{
            type: Number,
            min: 1,
            max: 5,
            required: true
        },
        comment: {
            type: String,
            minLength: 3,
            maxLength: 500,
            required: true 
        }
    },
    {timestamps: true}
)

export default mongoose.model('Avis', avisSchema)