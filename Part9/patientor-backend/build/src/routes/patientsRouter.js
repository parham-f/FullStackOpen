"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const patientsService_1 = __importDefault(require("../services/patientsService"));
const router = express_1.default.Router();
router.get('/', (_req, res) => {
    res.send(patientsService_1.default.getNoSsnPatientsEntries());
});
router.post('/', (req, res) => {
    const { name, dateOfBirth, ssn, gender, occupation } = req.body;
    const addedEntry = patientsService_1.default.addPatient({
        name,
        dateOfBirth,
        ssn,
        gender,
        occupation
    });
    res.json(addedEntry);
});
exports.default = router;
