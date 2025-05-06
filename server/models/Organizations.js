import { Schema, model } from "mongoose";

const BaseOrganization = {
  name: {
    type: String,
    uniq: true
  },
  organization: {
    type: String,
    enum: ["Hospital", "DSP", "ASP", "Court"],
    required: true
  },
}

const HospitalSchema = new Schema({
  aspAffiliation: {
    type: Schema.Types.ObjectId,
    ref: 'ASP'
  },
  ...BaseOrganization,
});

const ASPSchema = new Schema({
  dspAffiliation: {
    type: Schema.Types.ObjectId,
    ref: 'DSP'
  },
  ...BaseOrganization,
});

const DSPSchema = new Schema({
  ...BaseOrganization,
});

const CourtSchema = new Schema({
  ...BaseOrganization,
});

const Hospital = model('Hospital', HospitalSchema);
const ASP = model('ASP', ASPSchema);
const DSP = model('DSP', DSPSchema);
const Court = model('Court', CourtSchema);

export {
  Hospital,
  ASP,
  DSP,
  Court
};
