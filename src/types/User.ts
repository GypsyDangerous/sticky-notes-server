export interface User {
	username: string;
	email: string;
	password: string;
	Authorization: string;
	id: string;
}

export type UserModification = Partial<User>