import { Router } from "express";
import { ASP, DSP, Hospital } from "../models/Organizations.js";
import Employee from "../models/Employee.js"

const orgsRoute = Router();

const createHospital = async (req, res) => {
  const { name } = req.body;

  const hospital = await Hospital.create({organization: "Hospital", aspAffiliation: req.asp._id, name: name})
  const employee = await Employee.create({organization: hospital._id, email: name, fullName: "init"})
  
  res.status(200).json({
    employee
  })
}

orgsRoute.post("/hospital", createHospital)

export default orgsRoute;
