import { DocumentQuery } from 'mongoose';

import User from '../../../models/User.model';
import { UserModification } from '../../../types/User';
import { updateUser } from '../../../utils/functions';

export const user = {
	updateUserProfile: async (
		parent: unknown,
		{ username, email, password }: UserModification,
		context: { id: string }
	): Promise<DocumentQuery<User | null, User, unknown>> => {
		const { id } = context;
		if (!id) throw new Error("Unauthorized");
		const result = await updateUser(id, {
			username,
			email,
			password,
		});
		if (result.code !== 200) throw new Error(result.message);
		return User.findById(id);
	},
};
