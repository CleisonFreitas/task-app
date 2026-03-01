import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../features/tasks/task.service';
import { Task } from '../../features/tasks/task.model';
import { CommonModule } from '@angular/common';
import { TodoList } from '../../shared/todo-list/todo-list';
import { TodoForm } from '../../shared/todo-form/todo-form';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  standalone: true,
  templateUrl: './task.screen.html',
  imports: [
    CommonModule,
    TodoList,
    TodoForm
  ],
})
export class TaskScreen implements OnInit {

  tasks: Task[] = [];
  loading = true;

  constructor(
    private taskService: TaskService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.loading = true;

    this.taskService.getAll().subscribe({
      next: (data: Task[]) => {
        this.tasks = data;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  addTask(task: Task) {
    this.taskService.create(task).subscribe(() => {
      this.loadTasks();
    });
  }
}