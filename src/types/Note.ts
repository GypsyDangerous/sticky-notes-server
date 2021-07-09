import mongoose from "mongoose";
import { User } from "./User";

export interface NoteWindowOptions {
	opacity: number;
	clickThrough: boolean;
	alwaysOnTop: boolean;
}

export interface Note extends mongoose.Document {
	rawText: string,
	text: string,
	windowOptions: NoteWindowOptions,
	backgroundColor: string;
	owner: string
}