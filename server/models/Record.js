import mongoose from "mongoose"

const baseRecord = {

}

const RecordSchema = new mongoose.Schema({
    ArabicFullName: {
        type: String,
        required: true,
    },
    LatinFullName: {
        type: String,
        required: true,
    },
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
    parents: {
        fatherName: String,
        motherName: String
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
const Record = mongoose.model('Record', RecordSchema)
export default Record;
