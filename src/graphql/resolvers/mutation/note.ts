import { Context } from "../../../types/Request";
import { createNote as createNoteFunction, updateNote as updateNoteFunction } from "../../../utils/functions/note";
import { Note as NoteType } from "../../../types/Note";
import { Note } from "../../../models/Note.model";

export const note = {
	createNote: async (parent: unknown, args: unknown, context: Context): Promise<NoteType> => {
		const { id } = context;
		// if (!id) {
		// 	throw new Error("bad auth");
		// }
		return await createNoteFunction(id);
	},
	updateNote: async (parent: unknown, { id: noteId, ...args }: Partial<NoteType> & { id: string }, context: Context): Promise<NoteType> => {
		const { id } = context;
		if (!id) {
			throw new Error("bad auth");
		}
		
		return await updateNoteFunction(noteId, id, args);
	},
	deleteNote: async (parent: unknown, {id}: {id: string}, context: Context): Promise<boolean> => {
		const {id: authId} = context;
		if(!id) throw new Error("bad auth");
		const noteToDelete = await Note.findOneAndDelete({_id: id, owner: authId})
		return !!noteToDelete
	}
};
