import multer from "multer";
import {get_image_filename} from "../utils/functions"
import fs from "fs"
import {config} from "../utils/config.util"


const fileUpload = multer({
	limits:{
        fileSize: 1024 * 1024
    },
	storage: multer.diskStorage({
		destination: (req, file, callback) => {
			if (!fs.existsSync(config.upload_path)) {
				fs.mkdirSync(config.upload_path, { recursive: true });
			}
			callback(null, config.upload_path);
		},
		filename: (req, file, callback) => {
			const ext = config.mimeTypeMap[file.mimetype];
			callback(null, get_image_filename(ext));
		},
	}),
	fileFilter: (req, file, callback) => {
		const isValid = !!config.mimeTypeMap[file.mimetype];
		const error = isValid ? null : new Error("Invalid File Type");
		if (error) {
			callback(error);
		} else {
			callback(null, isValid);
		}
	},
});

export = fileUpload;
