
export class Todo {
    id: number;
    text: string;
    completed: boolean;
    category?: Category;
}

export class Category {
    id: number;
    title: string;
    todos: Todo[];
}