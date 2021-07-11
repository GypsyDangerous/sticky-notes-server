import mongoose, { Schema } from "mongoose";
import { Note as NoteType } from "../types/Note";

const NoteSchema = new Schema(
	{
		rawText: { type: String, default: "" },
		text: { type: String, default: "" },
		owner: { type: String, required: true },
		backgroundColor: { type: String, default: "#FFFF88" },
		lastedEdited: { type: Number, default: 0 },
		windowOptions: {
			type: Object,

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
