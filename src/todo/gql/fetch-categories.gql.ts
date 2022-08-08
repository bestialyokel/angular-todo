import { gql } from "apollo-angular";

export const FETCH_CATEGORIES = gql`
    query {
        categories {
        id
        title
        todos {
            id
            text
            completed
        }
        }
    }
 `;