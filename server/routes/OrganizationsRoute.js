import { Router } from "express";
import { ASP, Hospital } from "../models/Organizations.js";
import { generateRandomPassword, protect } from "./AuthRoute.js";
import Employee from "../models/Employee.js";
import { sendPasswordEmail } from "../services/email.js";

const orgsRoute = Router();

const createAdmin = async (org, name, email) => {
  try {
    const employeeExists = await Employee.findOne({ email });
    if (employeeExists) {
      throw Error("Email already taken");
    }

    // todo
    const hashedPassword = generateRandomPassword();
    const employeeData = {
      fullName: name,
      email: email,
      password: hashedPassword,
      organization: org.id,
      organizationType: org.organization
    }
    await Employee.create(employeeData);

    sendPasswordEmail(email, hashedPassword);

  } catch (error) {
    console.log(error);
    
    throw Error("Server error");
  }
}


const createOrganization = async (req, res) => {
  const { name, email } = req.body;

  const auther = req.employee;

  if (auther.organizationType == "ASP") {
    const org = await Hospital.create({ organization: "Hospital", aspAffiliation: req.employee.organization, name: name })

    createAdmin(org, name, email)
    
    return res.status(200).json({
      success: true,
    })
  } else if (auther.organizationType == "DSP") {
    const org = await ASP.create({ organization: "ASP", dspAffiliation: req.employee.organization, name: name })
    
    createAdmin(org, name, email)
    
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
