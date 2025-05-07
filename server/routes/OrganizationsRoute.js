import { Router } from "express";
import { ASP, Hospital } from "../models/Organizations.js";
import { protect } from "./AuthRoute.js";

const orgsRoute = Router();

const createOrganization = async (req, res) => {
  const { name, } = req.body;

  const auther = req.employee;

  if (auther.organizationType == "ASP") {
    await Hospital.create({ organization: "Hospital", aspAffiliation: req.employee.organization, name: name })
    return res.status(200).json({
      success: true,
    })
  } else if (auther.organizationType == "DSP") {
    await ASP.create({ organization: "ASP", dspAffiliation: req.employee.organization, name: name })
    return res.status(200).json({
      success: true,
    })
  }

  return res.status(401).json({
    success: false,
    message: "unauthorazed"
  })
}

orgsRoute.post("/organization", protect, createOrganization)

export default orgsRoute;
