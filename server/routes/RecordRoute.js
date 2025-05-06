import express from 'express';
import { DeathRecord, BirthRecord } from '../models/Record.js';
import { Hospital } from '../models/Organizations.js';
import { authorizeAspEmployee, authorizeDspEmployee, authorizeHospitalEmployee, protect } from './AuthRoute.js';

const router = express.Router();

export const createDeathRecord = async (req, res) => {
  try {
    const {
      ArabicFullName,
      LatinFullName,
      BirthDate,
      City,
      Gender,
      FatherName,
      MotherName,
      DateOfDeath,
      PlaceOfDeath,
      CauseOfDeath
    } = req.body;

    const newRecord = {
      ArabicFullName,
      LatinFullName,
      BirthDate,
      DateOfDeath,
      PlaceOfDeath,
      CauseOfDeath,
      City,
      Gender,
      FatherName,
      MotherName,
      SignedBy: req.employee._id,
      Hospital: req.employee.organization
    };

    const deathRecord = await DeathRecord.create(newRecord);

    res.status(201).json({
      success: true,
      data: deathRecord
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const getAllHospitalDeaths = async (req, res) => {
  try {
    const deathRecords = await DeathRecord.find({ Hospital: req.employee.organization });

    res.status(200).json({
      success: true,
      data: deathRecords
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const getAllAspDeaths = async (req, res) => {
  try {
    const deathRecords = await DeathRecord.find({});
    const filtered = [];

    for (const death of deathRecords) {
      const hospital = await Hospital.findById(death.Hospital);
      if (hospital != null)
        if (hospital.aspAffiliation.equals(req.employee.organization)) {
          filtered.push(death)
        }
    }

    res.status(200).json({
      success: true,
      data: filtered
    });
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const getAllDspDeaths = async (req, res) => {
  try {
    const deathRecords = await DeathRecord.find({ Status: "verified" });
    res.status(200).json({
      success: true,
      data: deathRecords
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

router.post('/death-record', protect, authorizeHospitalEmployee, createDeathRecord);
router.get('/hospital/death-record', protect, authorizeHospitalEmployee, getAllHospitalDeaths);
router.get('/asp/death-record', protect, authorizeAspEmployee, getAllAspDeaths);
router.get('/dsp/death-record', protect, authorizeDspEmployee, getAllDspDeaths);

export const createBirthRecord = async (req, res) => {
  try {
    const {
      ArabicFullName,
      LatinFullName,
      BirthDate,
      City,
      Gender,
      FatherName,
      MotherName,
    } = req.body;

    const newRecord = {
      ArabicFullName,
      LatinFullName,
      BirthDate,
      City,
      Gender,
      FatherName,
      MotherName,
      SignedBy: req.employee._id,
      Hospital: req.employee.organization
    };

    const birthRecord = await BirthRecord.create(newRecord);

    res.status(201).json({
      success: true,
      data: birthRecord
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const getAllHospitalBirths = async (req, res) => {
  try {
    const birthRecords = await BirthRecord.find({ Hospital: req.employee.organization });

    res.status(200).json({
      success: true,
      data: birthRecords
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const getAllAspBirths = async (req, res) => {
  try {
    const birthRecords = await BirthRecord.find({});
    const filtered = [];

    for (const death of birthRecords) {
      const hospital = await Hospital.findById(death.Hospital);
      if (hospital.aspAffiliation == req.employee.organization) {
        filtered.push(death)
      }
    }

    res.status(200).json({
      success: true,
      data: filtered
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const getAllDspBirths = async (req, res) => {
  try {
    const deathRecords = await BirthRecord.find({ Status: "verified" });
    res.status(200).json({
      success: true,
      data: deathRecords
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

router.post('/birth-record', protect, authorizeHospitalEmployee, createBirthRecord);
router.get('/hospital/birth-record', protect, authorizeHospitalEmployee, getAllHospitalBirths);
router.get('/asp/birth-record', protect, authorizeAspEmployee, getAllAspBirths);
router.get('/dsp/birth-record', protect, authorizeDspEmployee, getAllDspBirths);

const approveRecord = (type) => {
  return async (req, res) => {
    if (type == "death") {
      const { id } = req.body;
      DeathRecord.findByIdAndUpdate(id, { Status: "verified" })
    } else {
      const { id } = req.body;
      BirthRecord.findByIdAndUpdate(id, { Status: "verified" })
    }
  }
}

router.post("/asp/approve-birth-record", protect, authorizeAspEmployee, approveRecord("birth"))
router.post("/asp/approve-death-record", protect, authorizeAspEmployee, approveRecord("death"))

export default router;
