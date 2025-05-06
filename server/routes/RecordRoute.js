import express from 'express';
import { emitBirth, emitDeath } from "../routes/EventStream.js";
import { DeathRecord, BirthRecord } from '../models/Records.js';
import { Hospital } from '../models/Organizations.js';

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

    const deathRecord = await DeathRecord.create(newRecord);

    emitDeath(deathRecord);

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
      count: deathRecords.length,
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

    for(const death of deathRecords) {
      const hospital =  await Hospital.findById(death.Hospital);
      if(hospital.aspAffiliation == req.employee.organization) {
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

export const getAllDspDeaths = async (req, res) => {
  try {
    const deathRecords = await DeathRecord.find({Status: "verified"});
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

router.post('deathRecord', addRecord);
router.get('deathRecord', getRecords);
router.put('deathRecord', updateRecord);
router.delete('deathRecord', deleteRecord);

router.post('birthRecord', addRecord);
router.get('birthRecord', getRecords);
router.put('birthRecord', updateRecord);
router.delete('birthRecord', deleteRecord);

export default router;
