import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import jwt from 'jsonwebtoken';

import api from './api';
import server from './graphql/server';
import { errorHandler, notFound } from './middleware';
import imageResize from './middleware/imageResize';
import { logger } from './middleware/logging';
import User from './models/User.model';
import { payload } from './types/Auth';
import { config } from './utils/config.util';
import { createAuthToken, getRefreshSecret } from './utils/functions';

export const app = express();

app.use(helmet());
app.use(
	cors({
		origin: ["http://localhost:3000", "https://onelinkapp.xyz", "https://www.onelinkapp.xyz"],
		credentials: true,
	})
);
app.use(express.json());
app.use(cookieParser());
app.use(logger);

app.use(config.UPLOAD_PATH.substr(1), imageResize);

server.applyMiddleware({ app, cors: false });

app.post("/refresh_token", async (req, res) => {
	const token: string = req.cookies["refresh_token"];

	if (!token) {
		return res.status(401).json({ code: 401, message: "missing refresh token" });
	}

	try {
		const payload: payload | string = jwt.verify(token, getRefreshSecret());

		if (typeof payload === "string") throw new Error("bad payload");

		const user = await User.findOne({ _id: payload.userId });

		if (user?.tokenVersion !== payload.tokenVersion) throw new Error("Old Token");

		if (!user) throw new Error("no user");

		res.json({
			code: 200,
			data: { token: createAuthToken({ userId: payload.userId, email: payload.email }) },
		});
	} catch (err) {
		console.log(err.message);
		res.status(401).json({ code: 401, message: "invalid refresh token: " + err.message });
	}
});

app.use("/v1", api);

app.use(notFound);
app.use(errorHandler);
