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
}, { timestamps: true })

fundoSchema.pre("save", async function(next) {
    const user = this;
    if(!user.isModified("password")) return next();

    try {
        const salt = await bcrypt.genSalt();
        user.password = await bcrypt.hash(user.password, salt);
        next();
    } catch (error) {
        return next(error);
    }
});


fundoSchema.methods.comparePassword = async function (password) {
    let match = await bcrypt.compare(password, this.password);
    return match;
}


fundoSchema.methods.compareEmail = async function (email) {
    if (email === this.email) return true;
    else return false;
}


const fundo = mongoose.model("Fundo", fundoSchema);

export default fundo;