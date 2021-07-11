import { Request, Response } from "express";
import { Context } from "../types/Request";
import { checkAuth } from "../utils/functions";

export const context = async ({ req, res }: { req: Request; res: Response }): Promise<Context> => {
	const token = req.get("Authorization");
	let id: string;
	try {
		const authResult = await checkAuth(token);
		id = authResult?.userId;
	} catch (err) {
		console.log(err, err.message);
	}
	return { id: "60ea24451084f5778c5a716f", req, res, setCookies: [], setHeaders: [] };
};
