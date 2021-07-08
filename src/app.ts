import express from "express";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
import { logger } from "./middleware/logging";
import { config } from "./utils/config.util";
import imageResize from "./middleware/imageResize";

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
app.use(logger)

app.use(config.UPLOAD_PATH.substr(1), imageResize)
