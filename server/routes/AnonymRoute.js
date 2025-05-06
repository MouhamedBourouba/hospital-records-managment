import { Router } from "express";
import {
  getAnonyms,
  getAnonymById,
  deleteAnonym,
  updateAnonym,
} from "../controllers/AnonymController.js";

const AnonymRoute = Router();

AnonymRoute.get("/anonym", getAnonyms);
AnonymRoute.get("/anonym/:id", getAnonymById);
AnonymRoute.delete("/anonym/:id", deleteAnonym);
AnonymRoute.put("/anonym/:id", updateAnonym);

export default AnonymRoute;
