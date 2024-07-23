import mongoose from "mongoose";

const carneSchema = new mongoose.Schema({
    fundo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Fundo",
        required: true
    },
    animal: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Animal",
        required: true
    },
    sexo: {
        type: String,
        required: true
    },
    epoca: {
        type: Boolean,
        required: true
    },
    pesoNacer: {
        type: Number,
        required: true
    },
    fechaNacimiento: {
        type: Date,
        required: true
    },
    pesoDestete: {
        type: Number,
        required: true
    },
    pesoAnio: {
        type: Number,
        required: false
    },
    fechaAnio: {
        type: Date,
        required: false
    },
    peso18Meses: {
        type: Number,
        required: false
    },
    fecha18Meses: {
        type: Date,
        required: false
    },
    peso24Meses: {
        type: Number,
        required: false
    },
    fecha24Meses: {
        type: Date,
        required: false
    }
}, { timestamps: true });

const Carne = mongoose.model("Carne", carneSchema);

export default Carne;
