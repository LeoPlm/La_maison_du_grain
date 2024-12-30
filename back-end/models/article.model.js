import mongoose from "mongoose";
import mongooseUniqueValidator from "mongoose-unique-validator";

const articleSchema = mongoose.Schema(
    {
        avis: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Avis'
        }],
        name:{type: String, required: true, unique: true},
        content:{type: String, required: true},
        picture:{
            img:{type:String, required: true},
            img1:{type:String},
            img2:{type:String},
            img3:{type:String},
            img4:{type:String}
        },
        from: {type: String, required: true},
        type: {type: String, enum:["grain", "moulu"], required: true},
        intensity: {type: Number, max: 10, min:1, required: true},
        stock: {type: Number, required: true},
        price:{type: Number, required: true}
    },
    {timestamps: true}
)

articleSchema.plugin(mongooseUniqueValidator)

export default mongoose.model('Article', articleSchema)