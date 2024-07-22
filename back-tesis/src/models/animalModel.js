import mongoose from "mongoose";


const animalSchema = new mongoose.Schema({
    fundo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Fundo",
        required: true,
        unique: false
    },

    animal: {
        type: String,
        required: true,
        unique: true
    },

    padre: {
        type: String,
        required: true,
        unique: false
    },

    madre: {
        type: String,
        required: true,
        unique: false
    },

    raza: {
        type: String,
        required: true,
        unique: false
    }
}, { timestamps: true });

const Animal = mongoose.model("Animal", animalSchema);

export default Animal;