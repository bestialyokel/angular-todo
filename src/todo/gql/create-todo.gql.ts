import { gql } from "apollo-angular";

/*
export const CREATE_TODO = gql`
	mutation {
		createTodo(input: $input) {
			category {
					id
					title
			}
			id
			text
			completed
		}
	}
`;
*/

export const CREATE_TODO = gql`
	mutation CreateTodo($input: CreateTodoDto!) {
		createTodo(input: $input) {
			category {
					id
					title
			}
			id
			text
			completed
		}
	}
`;