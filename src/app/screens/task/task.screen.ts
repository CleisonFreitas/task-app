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
  selectedTask: Task | null = null;

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

  saveTask(task: Task) {

    if (this.selectedTask) {
      this.taskService.update(this.selectedTask.id!, task)
        .subscribe(() => {
          this.selectedTask = null;
          this.loadTasks();
        });

    } else {
      this.taskService.create(task)
        .subscribe(() => {
          this.loadTasks();
        });
    }
  }

  editTask(task: Task) {
    this.selectedTask = { ...task };
  }

  deleteTask(task: Task) {
    this.taskService.delete(task.id!).subscribe(() => {
      this.loadTasks();
    });
  }
}