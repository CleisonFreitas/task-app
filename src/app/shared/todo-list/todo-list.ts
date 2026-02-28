import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './todo-list.html',
})
export class TodoList {

  @Input() tasks: any[] = [];
  @Output() view = new EventEmitter<any>();

  onView(task: any) {
    this.view.emit(task);
  }
}