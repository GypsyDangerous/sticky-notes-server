import { Note } from "../../models/Note.model";
import { Note as NoteType } from "../../types/Note";
import User from "../../models/User.model";

export const createNote = async (id: string): Promise<NoteType> => {
	if (!id) throw new Error("bad auth");
	const owner = await User.findById(id);
	if (!owner) throw new Error("bad auth");
	const newNote = new Note({ owner: owner.id });
	await newNote.save();
	return newNote;
};

export const updateNote = async (noteId: string, userId: string, details: Partial<NoteType>): Promise<NoteType> => {
	const noteToUpdate = await Note.findById(noteId);
	if (noteToUpdate.owner !== userId) throw new Error("bad auth");
	Object.assign(noteToUpdate, details);
	Object.keys(details.windowOptions || {}).forEach(key => {
		noteToUpdate.markModified(`windowOptions.${key}`);
	});
	noteToUpdate.lastEdited = new Date().getTime();
	await noteToUpdate.save();
	return noteToUpdate;
};
