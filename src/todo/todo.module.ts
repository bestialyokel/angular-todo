import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPanelComponent } from './components/main-panel/main-panel.component';
import { MaterialModule } from 'src/app/material.module';
import { CategoryCardComponent } from './components/category-card/category-card.component';
import { CreateTodoFormComponent } from './components/create-todo-form/create-todo-form.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    MainPanelComponent,
    CategoryCardComponent,
    CreateTodoFormComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  exports: [
    MainPanelComponent,
  ]
})
export class TodoModule { }
