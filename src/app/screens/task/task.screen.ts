import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../features/tasks/task.service';
import { Task } from '../../features/tasks/task.model';
import { CommonModule } from '@angular/common';
import { TodoList } from '../../shared/todo-list/todo-list';
import { TodoForm } from '../../shared/todo-form/todo-form';

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

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.loading = true;

    this.taskService.getAll().subscribe({
      next: (data) => {
        this.tasks = data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        console.error('Erro ao carregar tarefas');
      }
    });
  }

  addTask(task: Task) {
    this.taskService.create(task).subscribe(() => {
      this.loadTasks();
    });
  }
}