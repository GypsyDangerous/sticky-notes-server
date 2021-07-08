import mongoose from 'mongoose';

export class MongooseController {
	connectionString: string;
	app?: typeof mongoose;
	connected: boolean;

	constructor(connectionString: string) {
		this.connectionString = connectionString;
		this.connected = false;
	}

	async connect(): Promise<void> {
		this.connected = true
		mongoose.set('useNewUrlParser', true);
		mongoose.set('useCreateIndex', true);
		mongoose.set('useUnifiedTopology', true)
		this.app = await mongoose.connect(this.connectionString);
	}

	async disconnect(): Promise<void> {
		this.connected = false
		await this.app?.disconnect();
	}
}