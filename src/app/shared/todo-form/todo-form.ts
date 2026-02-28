import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './todo-form.html',
})
export class TodoForm {
  title = '';
  description = '';
  completed = false;

  @Output() save = new EventEmitter<any>();

  onSubmit() {
    this.save.emit({
      title: this.title,
      description: this.description,
      completed: this.completed
    });

    // reset
    this.title = '';
    this.description = '';
    this.completed = false;
  }
}