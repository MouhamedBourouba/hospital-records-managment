import { Router } from "express";
import crypto, { subtle } from "crypto"
import { AnonymBirth, AnonymDeath } from "../models/Anonym.js";
import { authorizeResearcher, protect } from "./AuthRoute.js";
import { encode } from "punycode";

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

const AnonymRoute = Router();

AnonymRoute.get("/death-anonym", protect, authorizeResearcher, getDeathAnonyms);
AnonymRoute.get("/birth-anonym", protect, authorizeResearcher, getBirthAnonyms);

export default AnonymRoute;
