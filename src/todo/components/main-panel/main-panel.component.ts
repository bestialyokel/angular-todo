import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { CompleteTodoDto } from 'src/todo/dto/complete-todo.dto';
import { CreateTodoDto } from 'src/todo/dto/create-todo.dto';
import { TodoService } from 'src/todo/services/todo.service';
import { Category } from 'src/todo/types';
import { CategoryCardComponent } from '../category-card/category-card.component';
import { CreateTodoFormComponent } from '../create-todo-form/create-todo-form.component';

@Component({
  selector: 'app-main-panel',
  templateUrl: './main-panel.component.html',
  styleUrls: ['./main-panel.component.scss']
})
export class MainPanelComponent implements OnInit {

  constructor(protected todoService: TodoService, protected dialog: MatDialog) {}

  categories?: Observable<Category[]>;

  ngOnInit() {
    this.categories = this.todoService.getCategories();;
  }

  completeTodo(completeTodoDto: CompleteTodoDto) {
    this.todoService.completeTodo(completeTodoDto);
    this.categories = this.todoService.getCategories();
  }

  createTodo(createTodoDto: CreateTodoDto) {
    this.todoService.createTodo(createTodoDto);
    this.categories = this.todoService.getCategories();
  }


  openCreateDialog() {
    let dialogRef = this.dialog.open(CreateTodoFormComponent, {
      height: '400px',
      width: '600px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('abc');
    });

    //dialogRef.close('');
  }
}
