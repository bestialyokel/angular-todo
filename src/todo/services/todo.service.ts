import { Injectable } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import { deserializeArray, instanceToInstance, plainToClass, plainToClassFromExist, plainToInstance } from 'class-transformer';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { CompleteTodoDto } from '../dto/complete-todo.dto';
import { CreateTodoDto } from '../dto/create-todo.dto';
import { COMPLETE_TODO } from '../gql/complete-todo.gql';
import { CREATE_TODO } from '../gql/create-todo.gql';
import { FETCH_CATEGORIES } from '../gql/fetch-categories.gql';
import { Category, Todo } from '../types';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  categoriesRef: QueryRef<any>;

  constructor(private apollo: Apollo) {
    this.categoriesRef = this.apollo.watchQuery<any>({
      query: FETCH_CATEGORIES
    });
  }

  protected initCategories() {

  }

  getCategories(): Observable<Category[]> {
    const $res = this.categoriesRef;

    const $todos = $res.valueChanges.pipe(
      map(result => result.data as any),
      map(data => data.categories),
      map(categories => 
        categories.map(
            category => plainToClass(Category, category) 
        )
      ),
      catchError( err => {
        console.error(err);
        return of([]);
      })
    );

    return $todos;
  }

  createTodo(createTodoDto: CreateTodoDto): Observable<Todo | null> {
    const $res = this.apollo.mutate({
      mutation: CREATE_TODO,
      variables: {
        input: createTodoDto
      }
    });

    const $todo = $res.pipe(
      map(result => result.data as any),
      map(data => data.createTodo),
      map(todo => plainToClass(Todo, todo)),
      tap(() => this.categoriesRef.refetch()),
      catchError( err => {
        console.error(err);
        return of(null);
      })
    );
    
    return $todo;
  }

  completeTodo(completeTodoDto: CompleteTodoDto): Observable<Todo | null> {
    const $res = this.apollo.mutate({
      mutation: COMPLETE_TODO,
      variables: {
        id: completeTodoDto.todoId
      }
    });

    const $todo = $res.pipe(
      map(result => result.data as any),
      map(data => data.completeTodo),
      map(todo => plainToClass(Todo, todo)),
      tap(() => this.categoriesRef.refetch()),
      catchError( err => {
        console.error(err);
        return of(null);
      })
    );

    return $todo;
  }

}
