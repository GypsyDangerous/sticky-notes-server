import mongoose, { Schema } from "mongoose";
import { Note as NoteType } from "../types/Note";

const NoteSchema = new Schema(
	{
		rawText: { type: String, required: true, default: "" },
		text: { type: String, required: true, default: "" },
		owner: { type: String, required: true },
		backgroundColor: { type: String, required: true, default: "#FFFF88" },
		windowOptions: {
			type: Object,
			required: true,
			default: {
				opacity: 1,
				alwaysOnTop: false,
				clickThrough: false,
			},
		},
	},
	{ timestamps: true }
);

export const Note = mongoose.model<NoteType>("note", NoteSchema);
