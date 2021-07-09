import { auth } from "./auth";
import { user } from "./user";

export const Mutation = {
	...auth,
	...user,
};
