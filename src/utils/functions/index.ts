import fs from "fs";
import fetch from "node-fetch";
import { config } from "../config.util";

export const downloadFile = async (uri: string, filename: string): Promise<any> => {
	const response = await fetch(uri);
	const dir = config.upload_path;
	if (!fs.existsSync(dir)) {
		fs.mkdirSync(dir, { recursive: true });
	}
	response.body.pipe(fs.createWriteStream(`${dir}/${filename}`));
};

export * from "./auth";
export * from "./getters";
export * from "./validation";
export * from "./modifiers";
