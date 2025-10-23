import express, { Request, Response, NextFunction, RequestHandler } from 'express';
import patientsService from '../services/patientsService';
import {NewPatientSchema} from '../utils/utils';
import { NewEntrySchema } from '../utils/newEntryParser';
import { NewPatientEntry, NonSensitivePatient, Entry, EntryWithoutId } from '../types';
import { z } from 'zod';

const router = express.Router();

const newPatientParser = (req: Request, _res: Response, next: NextFunction) => {
    try {
        NewPatientSchema.parse(req.body);
        next();
    } catch(error: unknown) {
        next(error);
    }
};

export const newEntryParser: RequestHandler = (req, res, next) => {
  const parsed = NewEntrySchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.issues });
  }
  req.body = parsed.data;
  next();
  return;
};

const errorMiddleware = (error: unknown, _req: Request, res: Response, next: NextFunction) => { 
  if (error instanceof z.ZodError) {
    res.status(400).send({ error: error.issues });
  } else {
    next(error);
  }
};

router.get('/', (_req, res) => {
  res.send(patientsService.getEntries());
});

router.get('/:id', (req, res) => {
  res.json(patientsService.getEntryById(req.params.id));
});

router.post('/', newPatientParser, (req: Request<unknown, unknown, NewPatientEntry>, res: Response<NonSensitivePatient>) => {
  const addedEntry = patientsService.addPatient(req.body);
  res.json(addedEntry);
});

router.post(
  "/:id/entries",
  newEntryParser,
  (req: Request<{ id: string }, any, EntryWithoutId>, res: Response<Entry>) => {
    const { id: patientId } = req.params;
    const addedEntry = patientsService.addEntry(req.body, patientId);
    return res.json(addedEntry);
  }
);

router.use(errorMiddleware);

export default router;