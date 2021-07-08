import dotenv from "dotenv";
dotenv.config();

interface Config {
	PORT: number;
	ATLAS_URI: string;
	UPLOAD_PATH: string;
	emailMin: number;
	passwordMin: number;
	passwordMax: number;
	emailRegex: RegExp;
	usernameMin: number;
	usernameMax: number;
	saltRounds: number;
	upload_path: string;
	mimeTypeMap: { [key: string]: string };
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
		emailMin: 3,
		passwordMin: 6,
		passwordMax: 20,
		usernameMin: 6,
		usernameMax: 20,
		saltRounds: 7,
		upload_path: "/images",
		mimeTypeMap: {
			"image/png": "png",
			"image/jpeg": "jpeg",
			"image/jpg": "jpg",
			"image/svg+xml": "svg",
			"image/svg": "svg",
			"image/gif": "gif",
		}
,
		emailRegex: new RegExp(
			// eslint-disable-next-line no-control-regex
			/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
		),
	};
})();
