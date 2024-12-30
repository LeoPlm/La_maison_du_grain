import mongoose from "mongoose";
import mongooseUniqueValidator from "mongoose-unique-validator";

const paysSchema = mongoose.Schema(
    {
    
    name:{type: String, required: true, unique: true}

    },

    {timestamps: true}
)

paysSchema.plugin(mongooseUniqueValidator)


export default mongoose.model('Pays', paysSchema)