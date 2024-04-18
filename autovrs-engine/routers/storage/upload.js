import { AutoVrs } from "../../model/autovrs.model.js";

async function uploadController(req, res, next) {
    const uploadedFile = new AutoVrs({file: req.file})
    await uploadedFile.save();
    return res.status(201).json({
        message: `File uploaded successfully`,
        data: {url: uploadedFile.file.url }
    });
}

export { uploadController };