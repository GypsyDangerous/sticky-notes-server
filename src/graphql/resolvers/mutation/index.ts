import { auth } from "./auth";
import { user } from "./user";
import { note } from "./note";

export const Mutation = {
	...auth,
	...user,
	...note,
};
