import { Schema, model } from 'mongoose';

const API_URL = process.env.API_URL ?? `http://0.0.0.0:4000/auto-vrs-engine/storage/`;

const fileSchema = new Schema({
    filename: { type: String, required: true },
    path: { type: String, required: true },
    size: { type: Number, required: true },
    mimetype: { type: String, required: true },
    url: { type: String, get: function() { return `${API_URL}${this.filename}` } }
});


const autoVrsSchema = new Schema({
    file: fileSchema
}, {
    timestamps: true
});

const AutoVrs = model(`AutoVrs`, autoVrsSchema);


export { AutoVrs };