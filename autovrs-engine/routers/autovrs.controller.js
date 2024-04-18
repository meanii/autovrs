import { AutoVrs } from "../model/autovrs.model.js";

export class AutoVrsController {


    static async getAll(req, res, next) {
        try {
            const API_URL = process.env.API_URL ?? `http://0.0.0.0:4000/auto-vrs-engine/storage/`;
            let data = await AutoVrs.find().lean();
            data = data.map((file) => ({ ...file, file: { ...file.file, url: `${API_URL}${file.file.filename}` } }))
            return res.status(200).json({ data, message: `ok` });
        } catch (error) {
            return res.status(500).json({ error: error.message, message: `Internal Server Error` });
        }
    }

    static async getById(req, res, next) {
        try {
            const API_URL = process.env.API_URL ?? `http://0.0.0.0:4000/auto-vrs-engine/storage/`;
            const { id } = req.params;
            let data = await AutoVrs.findById(id).lean();
            data = { ...data, file: { ...data.file, url: `${API_URL}${data.file.filename}` } }
            return res.status(200).json({ data, message: `ok` });
        } catch (error) {
            console.log(`error`, error)
            return res.status(500).json({ error: error.message, message: `Internal Server Error` });
        }
    }


}