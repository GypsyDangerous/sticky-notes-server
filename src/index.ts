import { MongooseController } from "./mongoose";
import { config } from "./utils/config.util";

const mongoose = new MongooseController(config.ATLAS_URI);

mongoose.connect().then(() => {
	mongoose.app?.connection.once("open", () => {
		console.log("MongoDB database connection successful")
	})
	
})