import User from '../../../models/User.model';
import { Context } from '../../../types/Request';
import { UserModification as PublicUser } from '../../../types/User';

export const Query = {
	user: async (parent: unknown, { name }: { name: string }): Promise<PublicUser> => {
		const privateUser = await User.findOne({ username: name });

		if (!privateUser) throw new Error(`unknown user: ${name}`);

		return {
			username: name,
			id: privateUser._id,
		};
	},
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
};
