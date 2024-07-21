import mongoose from "mongoose";
import bcrypt from "bcrypt";

const fundoSchema = new mongoose.Schema({
    fundo: {
        type: String,
        required: true,
        unique: true
    },
    propietario: {
        type: String,
        required: true,
        unique: false
    },
    password: {
        type: String,
        required: true,
        unique: false
    },
    deleted: {
        type: Boolean,
        default: false,
        unique: false
    }
}, { timestamps: true });

fundoSchema.pre("save", async function(next) {
    const fundo = this;
    if (!fundo.isModified("password")) return next();

    try {
        const salt = await bcrypt.genSalt();
        fundo.password = await bcrypt.hash(fundo.password, salt);
        next();
    } catch (error) {
        return next(error);
    }
});

fundoSchema.methods.comparePassword = async function(password) {
    const match = await bcrypt.compare(password, this.password);
    return match;
};

const FundoModel = mongoose.model("Fundo", fundoSchema);

export default FundoModel;
