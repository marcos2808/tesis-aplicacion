import mongoose from "mongoose";

const lecheSchema = new mongoose.Schema({
    fundo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Fundo",
        required: true,
        unique: false
    },
    animal: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Animal",
        required: true,
        unique: false
    },
    produccionTotal: {
        type: Number,
        required: true,
        unique: false
    },
    produccionTotalDias: {
        type: Number,
        required: true,
        unique: false
    },
    produccionA305Dias: {
        type: Number,
        required: false,
        unique: false
    },
    produccionTotalA305Dias: {
        type: Number,
        required: false,
        unique: false
    },
    lactancia1: {
        type: Number,
        required: false,
        unique: false
    },
    duracionLactancia1: {
        type: Number,
        required: false,
        unique: false
    },
    lactancia2: {
        type: Number,
        required: false,
        unique: false
    },
    duracionLactancia2: {
        type: Number,
        required: false,
        unique: false
    },
    lactancia3: {
        type: Number,
        required: false,
        unique: false
    },
    duracionLactancia3: {
        type: Number,
        required: false,
        unique: false
    },
    lactancia4: {
        type: Number,
        required: false,
        unique: false
    },
    duracionLactancia4: {
        type: Number,
        required: false,
        unique: false
    },
    lactancia5: {
        type: Number,
        required: false,
        unique: false
    },
    duracionLactancia5: {
        type: Number,
        required: false, 
        unique: false
    },
    lactancia1A305: {
        type: Number,
        required: false,
        unique: false
    },
    lactancia2A305: {
        type: Number,
        required: false,
        unique: false
    },
    lactancia3A305: {
        type: Number,
        required: false,
        unique: false
    },
    lactancia4A305: {
        type: Number,
        required: false,
        unique: false
    },
    lactancia5A305: {
        type: Number,
        required: false,
        unique: false
    },
    produccionDiaria: {
        type: Number,
        required: false,
        unique: false
    },
    promedioProduccionDiaria: {
        type: Number,
        required: false,
        unique: false
    }
}, { timestamps: true });

const Leche = mongoose.model("Leche", lecheSchema);

export default Leche;
