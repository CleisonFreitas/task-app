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
  @Output() edit = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();

  onEdit(task: any) {
    this.edit.emit(task);
  }

  onDelete(task: any) {
    this.delete.emit(task);
  }

  onView(task: any) {
    this.view.emit(task);
  }
}