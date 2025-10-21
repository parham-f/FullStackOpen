"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toNewPatientEntry = exports.NewEntrySchema = void 0;
const types_1 = require("./types");
const zod_1 = require("zod");
exports.NewEntrySchema = zod_1.z.object({
    name: zod_1.z.string(),
    dateOfBirth: zod_1.z.string().date(),
    ssn: zod_1.z.string().optional(),
    gender: zod_1.z.nativeEnum(types_1.Gender),
    occupation: zod_1.z.string()
});
const toNewPatientEntry = (object) => {
    return exports.NewEntrySchema.parse(object);
};
exports.toNewPatientEntry = toNewPatientEntry;
