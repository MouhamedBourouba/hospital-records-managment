import mongoose from "mongoose"

const baseAnonym = {
  HashedArabicFullName: {
    type: String,
    required: true,
  },
  HashedLatinFullName: {
    type: String,
    required: true,
  },
  BirthDate: {
    type: Date,
    required: true,
    validate: {
      validator: function(value) {
        return value <= new Date();
      },
      message: 'Birth date cannot be in the future'
    }
  },
  City: {
    type: String,
    required: true,
  },
  Gender: {
    type: String,
    enum: ["Male", "Female"],
    required: true,
  },
  HashedFatherName: String,
  HashedMotherName: String,
  SignedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'employee',
    required: true,
  },
  Hospital: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "hospital",
    default: null
  }
}

const AnonymDeathSchema = new mongoose.Schema({
  ...baseAnonym,
  DateOfDeath: {
    type: Date,
    required: true,
    validate: {
      validator: function(value) {
        return value <= new Date();
      },
      message: 'Death date cannot be in the future'
    }
  },
  PlaceOfDeath: {
    type: String,
    required: true,
  },
  CauseOfDeath: {
    type: String,
  },
})

const AnonymBirthSchema = new mongoose.Schema({
  ...baseAnonym
})

export const AnonymDeath = mongoose.model('AnonymDeath', AnonymDeathSchema)
export const AnonymBirth = mongoose.model('AnonymBirth', AnonymBirthSchema)
