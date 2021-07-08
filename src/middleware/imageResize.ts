import sharp from "sharp";
import { MiddlewareFunction } from "../types/middleware";
import fs from "fs";
import path from "path";
import { get_url_extension } from "../utils/functions/getters";
import mime from "mime-types";
import { config } from "../utils/config.util";
const promises = fs.promises;

const widthAndHeightToString = (width?: string, height?: string): string => {
	if (width && height) return `${width}x${height}`;
	if (width) return widthAndHeightToString(width, width);
	if (height) return widthAndHeightToString(height, height);
	return "";
};

export const imageResize: MiddlewareFunction = async (req, res, next) => {
	try {
		const { width, height } = req.query;
		const pathToFetch = config.UPLOAD_PATH.substr(2);
		const ext = get_url_extension(req.path);

		if (!ext) throw new Error();
		const content_type = mime.lookup(ext);
		if (!content_type) throw new Error();
		res.setHeader("content-type", content_type);

		const sizeText = widthAndHeightToString(width as string, height as string);

		const filePath = path.join(pathToFetch, req.path)

		const sizedPath = `${filePath.replace(`.${ext}`, "")}-${sizeText}.${ext}`;

		if (fs.existsSync(sizedPath)) {
			const file = await promises.readFile(sizedPath);
			res.write(file, "binary");
			res.end(null, "binary");
			return
		}
		
		const file = await promises.readFile(filePath);
		const resizedImage = sharp(file);

		if (width) resizedImage.resize({ width: Number(width) });
		if (height) resizedImage.resize({ height: Number(height) });

		promises.writeFile(sizedPath, await resizedImage.toBuffer())
		
		res.write(await resizedImage.toBuffer(), "binary");
		res.end(null, "binary");

	} catch (err) {
		res.status(404).json({ message: "image not found" });
	}
};

export default imageResize;
