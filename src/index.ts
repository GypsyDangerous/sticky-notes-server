import { MongooseController } from "./mongoose";
import { config } from "./utils/config.util";
import { app } from "./app";

const mongoose = new MongooseController(config.ATLAS_URI);

mongoose.connect().then(() => {
	console.log("connected, waiting to open");
	mongoose.app?.connection.on("error", () => {
		console.log("MongoDB database connecting");
	});
	mongoose.app?.connection.on("connected", () => {
		console.log("MongoDB database connection successful");
	});
	app.listen(config.PORT, () => {
		console.log(`Listening on port:${config.PORT}`);
	});
});
