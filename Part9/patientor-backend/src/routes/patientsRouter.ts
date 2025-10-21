import express, { Request, Response, NextFunction } from 'express';
import patientsService from '../services/patientsService';
import {NewEntrySchema} from '../utils';
import { NewPatientEntry, PatientsEntry } from '../types';
import { z } from 'zod';

const router = express.Router();

const newPatientParser = (req: Request, _res: Response, next: NextFunction) => {
    try {
        NewEntrySchema.parse(req.body);
        next();
    } catch(error: unknown) {
        next(error);
    }
};

const errorMiddleware = (error: unknown, _req: Request, res: Response, next: NextFunction) => { 
  if (error instanceof z.ZodError) {
    res.status(400).send({ error: error.issues });
  } else {
    next(error);
  }
};

router.get('/', (_req, res) => {
  res.send(patientsService.getNoSsnPatientsEntries());
});

router.post('/', newPatientParser, (req: Request<unknown, unknown, NewPatientEntry>, res: Response<PatientsEntry>) => {
  const addedEntry = patientsService.addPatient(req.body);
  res.json(addedEntry);
});

router.use(errorMiddleware);

export default router;