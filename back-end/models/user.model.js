import mongoose from "mongoose";
import mongooseUniqueValidator from "mongoose-unique-validator";

const userSchema = mongoose.Schema(
    {
        prenom: {type: String, required: true},
        nom: {type: String, required: true},
        email: {
            type: String, 
            required: true, 
            unique: true,
            },
        adresse:[{
            rue:{type: String},
            ville: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Ville',
                }
        }],
        telephone:{type:String, maxLength: 10},
        password: {
            type: String, 
            required: [true, 'Password required'],
            },
        role: {type: String, enum:["user", "admin"], default: "user"},
        isVerified:{type: Boolean, default: true}
    },
    {timestamps: true}
)


userSchema.plugin(mongooseUniqueValidator)

export default mongoose.model('User', userSchema)