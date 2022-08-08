import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { plainToInstance } from 'class-transformer';
import { Observable } from 'rxjs';
import { CreateTodoDto } from 'src/todo/dto/create-todo.dto';
import { TodoService } from 'src/todo/services/todo.service';
import { Category } from 'src/todo/types';

@Component({
  selector: 'app-create-todo-form',
  templateUrl: './create-todo-form.component.html',
  styleUrls: ['./create-todo-form.component.scss']
})
export class CreateTodoFormComponent implements OnInit {

  createTodoForm: FormGroup;

  categories: Observable<Category[]>;

  NEW_CATEGORY: number= -1;

  constructor(protected fb: FormBuilder, protected todoService: TodoService) { }

  ngOnInit(): void {
    this.initForm();
    this.categories = this.todoService.getCategories();
  }

  categoryNameInputValidator(formControl: AbstractControl) {
    if (!formControl.parent) {
      return null;
    }
    
    if (formControl.parent.get('categoryName')!.value) {
      return Validators.required(formControl); 
    }
    return null;
  }

  initForm() {
    this.createTodoForm = this.fb.group({
      categoryName: [null, [
        Validators.required
      ]],
      text: [null, [
        Validators.required
      ]],
      categoryNameInput: [null, [
        this.categoryNameInputValidator
      ]],
    });
  }

  categoryInputVisible() {
    return this.createTodoForm.value['categoryName'] == this.NEW_CATEGORY;
  }

  onSubmit() {
    const controls = this.createTodoForm.controls;

    if (this.createTodoForm.invalid) {
      /** Если форма не валидна, то помечаем все контролы как touched*/
      Object.keys(controls)
       .forEach(controlName => controls[controlName].markAsTouched());
       
       /** Прерываем выполнение метода*/
       return;
    }

    const categoryName = controls['categoryName'].value;
    const categoryNameInput = controls['categoryNameInput'].value;
    const text = controls['text'].value;

    const data = {
      categoryName: categoryName == this.NEW_CATEGORY ? categoryNameInput : categoryName,
      text
    };

    const createTodoDto = plainToInstance(CreateTodoDto, data);

    const $todo = this.todoService.createTodo(createTodoDto);

    $todo.subscribe(res => {});
  }
}
