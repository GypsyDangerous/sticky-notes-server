import dotenv from "dotenv";
dotenv.config();

interface Config {
	PORT: number;
	ATLAS_URI: string;
	UPLOAD_PATH: string;
}

export const config: Config = (() => {
	const uri = process.env.ATLAS_URI;

	if (!uri) {
		throw new Error("Missing mongoose connection string");
	}
	return {
		PORT: +(process.env.PORT || 3100),
		ATLAS_URI: uri,
		UPLOAD_PATH: "./public/images",
	};
})();
