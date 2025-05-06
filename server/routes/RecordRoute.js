import express from 'express';
import { emitBirth, emitDeath } from "../routes/EventStream.js";
import { createAnonym } from "./AnonymController.js";
import { DeathRecord, BirthRecord } from '../models/Records.js';

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

export const getAllDeathRecords = async (req, res) => {
  try {
    const { status } = req.query;
    const filter = status ? { status } : {};

    const deathRecords = await DeathRecord.find(filter)
      .populate('SignedBy', 'fullName email')
      .populate('statusUpdatedBy', 'fullName email');

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

export const getDeathRecord = async (req, res) => {
  try {
    const deathRecord = await DeathRecord.findById(req.params.id)
      .populate('SignedBy', 'fullName email')
      .populate('statusUpdatedBy', 'fullName email');

    if (!deathRecord) {
      return res.status(404).json({
        success: false,
        message: 'Death record not found'
      });
    }

    res.status(200).json({
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

export const updateDeathRecord = async (req, res) => {
  try {
    let deathRecord = await DeathRecord.findById(req.params.id);

    if (!deathRecord) {
      return res.status(404).json({
        success: false,
        message: 'Death record not found'
      });
    }

    // If status is being updated, set the statusUpdatedBy
    if (req.body.status && req.body.status !== deathRecord.status) {
      req.body.statusUpdatedBy = req.user._id;
      req.body.statusUpdatedAt = Date.now();
    }

    deathRecord = await DeathRecord.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('SignedBy', 'fullName email')
      .populate('statusUpdatedBy', 'fullName email');

    res.status(200).json({
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

export const deleteDeathRecord = async (req, res) => {
  try {
    const deathRecord = await DeathRecord.findById(req.params.id);

    if (!deathRecord) {
      return res.status(404).json({
        success: false,
        message: 'Death record not found'
      });
    }

    await deathRecord.deleteOne();

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Update record status
export const updateDeathRecordStatus = async (req, res) => {
  try {
    const { status, statusNotes } = req.body;

    if (!['pending', 'verified', 'rejected'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status value'
      });
    }

    let deathRecord = await DeathRecord.findById(req.params.id);

    if (!deathRecord) {
      return res.status(404).json({
        success: false,
        message: 'Death record not found'
      });
    }

    deathRecord = await DeathRecord.findByIdAndUpdate(
      req.params.id,
      {
        status,
        statusNotes: statusNotes || '',
        statusUpdatedBy: req.user._id,
        statusUpdatedAt: Date.now()
      },
      { new: true, runValidators: true }
    ).populate('SignedBy', 'fullName email')
      .populate('statusUpdatedBy', 'fullName email');

    res.status(200).json({
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

// BIRTH RECORD CONTROLLERS
export const createBirthRecord = async (req, res) => {
  try {
    const newRecord = {
      ...req.body,
      SignedBy: req.user._id
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

export const getAllBirthRecords = async (req, res) => {
  try {
    // Add filtering capability by status
    const { status } = req.query;
    const filter = status ? { status } : {};

    const birthRecords = await BirthRecord.find(filter)
      .populate('SignedBy', 'fullName email')
      .populate('statusUpdatedBy', 'fullName email');

    res.status(200).json({
      success: true,
      count: birthRecords.length,
      data: birthRecords
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const getBirthRecord = async (req, res) => {
  try {
    const birthRecord = await BirthRecord.findById(req.params.id)
      .populate('SignedBy', 'fullName email')
      .populate('statusUpdatedBy', 'fullName email');

    if (!birthRecord) {
      return res.status(404).json({
        success: false,
        message: 'Birth record not found'
      });
    }

    res.status(200).json({
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

export const updateBirthRecord = async (req, res) => {
  try {
    let birthRecord = await BirthRecord.findById(req.params.id);

    if (!birthRecord) {
      return res.status(404).json({
        success: false,
        message: 'Birth record not found'
      });
    }

    // If status is being updated, set the statusUpdatedBy
    if (req.body.status && req.body.status !== birthRecord.status) {
      req.body.statusUpdatedBy = req.user._id;
      req.body.statusUpdatedAt = Date.now();
    }

    birthRecord = await BirthRecord.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('SignedBy', 'fullName email')
      .populate('statusUpdatedBy', 'fullName email');

    res.status(200).json({
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

export const deleteBirthRecord = async (req, res) => {
  try {
    const birthRecord = await BirthRecord.findById(req.params.id);

    if (!birthRecord) {
      return res.status(404).json({
        success: false,
        message: 'Birth record not found'
      });
    }

    await birthRecord.deleteOne();

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Update record status
export const updateBirthRecordStatus = async (req, res) => {
  try {
    const { status, statusNotes } = req.body;

    if (!['pending', 'verified', 'rejected'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status value'
      });
    }

    let birthRecord = await BirthRecord.findById(req.params.id);

    if (!birthRecord) {
      return res.status(404).json({
        success: false,
        message: 'Birth record not found'
      });
    }

    birthRecord = await BirthRecord.findByIdAndUpdate(
      req.params.id,
      {
        status,
        statusNotes: statusNotes || '',
        statusUpdatedBy: req.user._id,
        statusUpdatedAt: Date.now()
      },
      { new: true, runValidators: true }
    ).populate('SignedBy', 'fullName email')
      .populate('statusUpdatedBy', 'fullName email');

    res.status(200).json({
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

router.post('deathRecord', addRecord);
router.get('deathRecord', getRecords);
router.put('deathRecord', updateRecord);
router.delete('deathRecord', deleteRecord);

router.post('birthRecord', addRecord);
router.get('birthRecord', getRecords);
router.put('birthRecord', updateRecord);
router.delete('birthRecord', deleteRecord);

export default router;
