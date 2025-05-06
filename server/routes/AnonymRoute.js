import { Router } from "express";
import crypto from "crypto"
import { DeathRecord } from "../models/Record";
import { AnonymBirth, AnonymDeath } from "../models/Anonym";
import { authorizeResearcher, protect } from "./AuthRoute";

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
      CauseOfDeath
    } = record;

    const newAnonym = new AnonymDeath({
      HashedArabicFullName: crypto.hash("sha256", ArabicFullName),
      HashedLatinFullName: crypto.hash("sha256", LatinFullName),
      BirthDate: BirthDate,
      City: City,
      Gender: Gender,
      FatherName: FatherName,
      MotherName: MotherName,
      DateOfDeath: DateOfDeath,
      PlaceOfDeath: PlaceOfDeath,
      CauseOfDeath: CauseOfDeath
    });

    await newAnonym.save();
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
    } = record;

    const newAnonym = new AnonymDeath({
      HashedArabicFullName: crypto.hash("sha256", ArabicFullName),
      HashedLatinFullName: crypto.hash("sha256", LatinFullName),
      BirthDate: BirthDate,
      City: City,
      Gender: Gender,
      FatherName: FatherName,
      MotherName: MotherName,
    });

    await newAnonym.save();
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

const AnonymRoute = Router();

AnonymRoute.get("/death-anonym", protect, authorizeResearcher, getDeathAnonyms);
AnonymRoute.get("/birth-anonym", protect, authorizeResearcher, getBirthAnonyms);

export default AnonymRoute;
