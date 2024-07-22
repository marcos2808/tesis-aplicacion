import mongoose from "mongoose";

const carneSchema = new mongoose.Schema({
    fundo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Fundo",
        required: true,
        unique: false
    },
    
    sexo: {
        type: String,
        required: true,
        unique: false
    },

    epoca: {
        type: Boolean,
        required: true,
        unique: false
    },

    pesoNacer: {
        type: Number,
        required: true,
        unique: false
    },

    fechaNacimiento: {
        type: Date,
        required: true,
        unique: false
    },

    pesoDestete: {
        type: Number,
        required: true,
        unique: false
    },

    pesoAnio: {
        type: Number,
        required: false,
        unique: false
    },

    fechaAnio: {
        type: Date,
        required: false,
        unique: false
    },

    peso18Meses: {
        type: Number,
        required: false,
        unique: false
    },

    fecha18Meses: {
        type: Date,
        required: false,
        unique: false
    },

    peso24Meses: {
        type: Number,
        required: false,
        unique: false
    },

    fecha24Meses: {
        type: Date,
        required: false,
        unique: false
    }

}, { timestamps: true })

const Carne = mongoose.model("Carne", carneSchema);

export default Carne;