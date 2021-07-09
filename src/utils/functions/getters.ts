import uid from "uid";

export const get_image_filename = (ext: string): string => `photo-${uid(12)}-${uid(12)}.${ext}`;

export const get_url_extension = (url: string): string | null => {
	return url.split(/[#?]/)[0]?.split(".")?.pop()?.trim() || null;
};

export const getSecret = (key: string): string => {
	const secret = process.env[key];
	if (!secret) {
		console.log(`JWT ${key} is not set, please set one immediatley`);
		process.exit(1);
	}
	return secret;
};

export const getAuthSecret = (): string => {
	return getSecret("AUTH_SECRET");
};

export const getRefreshSecret = (): string => {
	return getSecret("REFRESH_SECRET");
};

export const getResetSecret = (): string => {
	return getSecret("RESET_SECRET");
};
