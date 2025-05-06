import { Schema, model } from "mongoose";

const EmployeeSchema = new Schema({
  fullName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    trim: true
  },
  organization: {
    type: Schema.Types.ObjectId,
    ref: 'organization',
    required: true
  },
  organizationType: {
    type: String,
    enum: ["Hospital", "DSP", "ASP", "Court"],
    required: true
  }
});

const Employee = model('Employee', EmployeeSchema);

export default Employee;
