import { Router } from "express";
import crypto, { subtle } from "crypto"
import { AnonymBirth, AnonymDeath } from "../models/Anonym.js";
import { authorizeResearcher, protect } from "./AuthRoute.js";
import { encode } from "punycode";
import { Parser } from "json2csv";

/**
 * Hashes a string using SHA-256 and returns a hex string.
 * @param {string} str
 * @returns {Promise<string>}
 */
async function hashString(str) {
  const encoded = new TextEncoder().encode(str);
  const buffer = await subtle.digest('SHA-256', encoded);
  return Array.from(new Uint8Array(buffer))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

export async function createDeathAnonym(record) {
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
      CauseOfDeath,
      Hospital,
    } = record;

    await AnonymDeath.create({
      HashedArabicFullName: await hashString(ArabicFullName),
      HashedLatinFullName: await hashString(LatinFullName),
      BirthDate: BirthDate,
      City: City,
      Gender: Gender,
      FatherName: await hashString(FatherName),
      MotherName: await hashString(MotherName),
      DateOfDeath: DateOfDeath,
      PlaceOfDeath: PlaceOfDeath,
      CauseOfDeath: CauseOfDeath,
      Hospital: Hospital
    });
  } catch (error) {
    console.error('Error creating anonym:', error.message);
    throw new Error('Error creating anonym record');
  }
};

export async function createBirthAnonym(record) {
  try {
    const {
      ArabicFullName,
      LatinFullName,
      BirthDate,
      City,
      Gender,
      FatherName,
      MotherName,
      Hospital
    } = record;

    await AnonymBirth.create({
      HashedArabicFullName: await hashString(ArabicFullName),
      HashedLatinFullName: await hashString(LatinFullName),
      BirthDate: BirthDate,
      City: City,
      Gender: Gender,
      HashedFatherName: await hashString(FatherName),
      HashedMotherName: await hashString(MotherName),
      Hospital: Hospital
    });
  } catch (error) {
    console.error('Error creating anonym:', error.message);
    throw new Error('Error creating anonym record');
  }
};

export const getDeathAnonyms = async (_, res) => {
  try {
    const anonymRecords = await AnonymDeath.find();
    res.status(200).json(anonymRecords);
  } catch (err) {
    res.status(400).json({ message: 'Error fetching anonym records', error: err.message });
  }
};

export const getBirthAnonyms = async (_, res) => {
  try {
    const anonymRecords = await AnonymBirth.find();
    res.status(200).json(anonymRecords);
  } catch (err) {
    res.status(400).json({ message: 'Error fetching anonym records', error: err.message });
  }
};

const makeCvsRoute = (type) => {
  return async (req, res) => {
    try {
      let records;
      if (type == "death") {
        records = await AnonymDeath.find({}).lean();
      } else {
        records = await AnonymBirth.find({}).lean();
      }

      if (!records || records.length === 0) {
        return res.status(404).json({ message: 'No anonym death records found' });
      }

      const fields = Object.keys(records[0]);
      const parser = new Parser({ fields });
      const csv = parser.parse(records);

      res.header('Content-Type', 'text/csv');
      res.attachment('anonym_death_records.csv');
      res.send(csv);
    } catch (error) {
      console.error('Error generating CSV:', error);
      res.status(500).json({ message: 'Failed to generate CSV' });
    }
  }
}


const AnonymRoute = Router();

AnonymRoute.get("/death-anonym", protect, authorizeResearcher, getDeathAnonyms);
AnonymRoute.get("/birth-anonym", protect, authorizeResearcher, getBirthAnonyms);

AnonymRoute.get("/death-anonym/cvs", protect, authorizeResearcher, makeCvsRoute("death"));
AnonymRoute.get("/birth-anonym/cvs", protect, authorizeResearcher, makeCvsRoute("birth"));

export default AnonymRoute;
