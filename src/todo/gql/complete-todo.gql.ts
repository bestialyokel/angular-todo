import { gql } from "apollo-angular";

export const COMPLETE_TODO = gql`
	mutation CompleteTodo($id: Int!) {
		completeTodo(id: $id) {
			id
			text
			completed
			category {
				id
				title
			}
		}
	}
`;