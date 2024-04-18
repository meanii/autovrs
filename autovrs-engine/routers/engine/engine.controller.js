import { AutoVrs } from "../../model/autovrs.model.js";
import { Enginehandler } from "./engine.handler.js";
import path from 'node:path';


class EngineController {
    static async process(req, res, next) {
        try {
            const API_URL = process.env.API_URL ?? `http://0.0.0.0:4000/auto-vrs-engine/storage/`;
            const options = req.body;

            const autovrs = await AutoVrs.findOne({_id: options?._id})
            if (!autovrs) return res.status(404).json({ message: `AutoVrs not found` });

            console.log(`processing :`, autovrs)

            const engine = new Enginehandler(autovrs?.file, {...options, input: autovrs?.file?.path});
            const outputfile = await engine.process();
            console.log(`outputfile:`, outputfile)

            return res.status(200).json({ data: { url: `${API_URL}${path.basename(outputfile)}` }, message: `ok` });
        } catch (error) {
            console.log(`error:`, error)
            return res.status(500).json({ error: error.message, message: `Internal Server Error` });
        }
    }
}

export { EngineController };