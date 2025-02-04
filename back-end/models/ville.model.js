import mongoose from "mongoose";
import mongooseUniqueValidator from "mongoose-unique-validator";

const villeSchema = mongoose.Schema(
    {
        pays:{type: mongoose.Schema.Types.ObjectId, ref: 'Pays'},
        nom: {type: String, required: true},
        code_postal: {type: Number, max: 130000, required: true}
    },

    {timestamps: true}
)
    // Permet de créer un Paris 75000 et un Paris 75013 par exemple et de ranger les villes par ordre alphabétique dans la BDD:
villeSchema.index({nom: 1, code_postal:1}, {unique: true})

villeSchema .plugin(mongooseUniqueValidator)

export default mongoose.model('Ville', villeSchema)