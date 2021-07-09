import { Note } from '../../../models/Note.model';
import User from '../../../models/User.model';
import { Note as NoteType } from '../../../types/Note';
import { Context } from '../../../types/Request';

export const Query = {
	me: async (parent: unknown, args: unknown, context: Context): Promise<User> => {
		if (context.id) {
			const user = await User.findById(context.id);

			return user;
		} else {
			throw new Error("Unauthorized");
		}
	},
	checkUniqueDetails: async (
		parent: unknown,
		{ email, username }: { email?: string; username?: string }
	): Promise<{
		uniqueEmail: boolean | null;
		uniqueUsername: boolean | null;
	}> => {
		const emailUser = email ? !(await User.findOne({ email })) : null;
		const usernameUser = username ? !(await User.findOne({ username })) : null;
		return {
			uniqueEmail: emailUser,
			uniqueUsername: usernameUser,
		};
	},
	note: async (parent: unknown, { id }: { id: string }, context: Context): Promise<NoteType> => {
		return Note.findOne({ _id: id, owner: context.id });
	},
	notes: async (parent: unknown, args: unknown, context: Context): Promise<NoteType[]> => {
		return Note.find({ owner: context.id });
	},
};
