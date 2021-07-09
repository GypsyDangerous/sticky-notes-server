

import User from '../../models/User.model';
import { UserModification } from '../../types/User';

export const updateUser = async (
	id?: string,
	{ username, email }: UserModification = {}
): Promise<{ message: string; code: number }> => {
	const user = await User.findById(id);
	if (!user) {
		return { code: 400, message: "Invalid user id" };
	}
	if (username) {
		user.username = username;
	}
	if (email) {
		user.email = email;
	}
	await user.save();
	return { code: 200, message: "User update successfully" };
};
