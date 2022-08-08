import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { MatSelectionListChange } from '@angular/material/list';
import { plainToClass } from 'class-transformer';
import { CompleteTodoDto } from 'src/todo/dto/complete-todo.dto';
import { TodoService } from 'src/todo/services/todo.service';
import { Category } from 'src/todo/types';

@Component({
  selector: 'app-category-card',
  templateUrl: './category-card.component.html',
  styleUrls: ['./category-card.component.scss']
})
export class CategoryCardComponent implements OnInit {

  @Input() category: Category;

  constructor(protected todoService: TodoService) { }

  ngOnInit(): void {
  }

  compareWith(lft: any, rgt: any) {
    console.log(lft,rgt);
    return false;
  }

  onSelect(change: MatSelectionListChange) {
    const id = change.options[0].value;
    const completeTodoDto = plainToClass(CompleteTodoDto, { todoId: id });
    this.todoService.completeTodo(completeTodoDto).subscribe(() => {change.options[0].selected = true;});
  }

}
