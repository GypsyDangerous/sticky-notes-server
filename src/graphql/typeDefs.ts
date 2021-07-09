import { gql } from "apollo-server-express";

export const typeDefs = gql`
	type User {
		phone: String
		username: String!
		email: String!
		id: ID!
		Notes: [Note]
	}
	type NoteWindowOptions {
		alwaysOnTop: Boolean!
			clickThrough: Boolean!
			opacity: Int!
	}
	input WindowOptions {
		alwaysOnTop: Boolean!
			clickThrough: Boolean!
			opacity: Int!
	}
	type Note {
		rawText: String!
		text: String!
		owner: ID!
		backgroundColor: String!
		windowOptions: NoteWindowOptions!
	}
	type AuthResult {
		user: User
		token: String!
	}
	type UniqueDetails{
		uniqueEmail: Boolean
		uniqueUsername: Boolean
	}
	type Query {
		me: User
		note(id: ID!): Note
		notes: [Note]
		checkUniqueDetails(email: String, username: String): UniqueDetails
	}
	type Mutation {
		googleLogin(token: String!): AuthResult
		googleRegister(token: String!): AuthResult
		login(email: String!, password: String!): AuthResult
		logout: Boolean
		register(username: String!, email: String!, password: String!): AuthResult
		updateUserProfile(
			username: String
			email: String
			phone: String
		): User
		updateNote(id: ID!, rawText: String, text: String, windowOptions: WindowOptions): Note
		createNote: Note
		deleteNote(id: ID!): Boolean
	}
`;
