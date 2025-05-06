import mongoose from "mongoose"

const AnonymSchema = new mongoose.Schema({
    BirthDate: {
        type: Date,
        default: Date.now,
    },
    City: {
        type: String,
        required: true,
    },
    Wilaya: {
        type: String,
        required: true,
    },
    Gender: {
        type: String,
        enum: ["Male", "Female"],
        required: true,
    },
    SignedBy: {
        type: String,
        required: true,
    },
    DateOfDeath: {
        type: Date,
        default: null,
    },
    PlaceOfDeath: {
        type: String,
    },
    CauseOfDeath: {
        type: String,
    },
})

const Anonym = mongoose.model('Anonym', AnonymSchema)
export default Anonym;
