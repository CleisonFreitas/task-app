import { Component } from '@angular/core';
import { TodoForm } from '../../shared/todo-form/todo-form';
import { TodoList } from '../../shared/todo-list/todo-list';

@Component({
  standalone: true,
  imports: [TodoForm, TodoList],
  templateUrl: './task.screen.html',
})
export class TasksScreen {

  tasks = [
    {
      title: 'Criar layout',
      description: 'Finalizar tela de tarefas',
      completed: false
    },
    {
      title: 'Estudar Angular',
      description: 'Aprender ControlValueAccessor',
      completed: true
    }
  ];

  addTask(task: any) {
    this.tasks.push(task);
  }

  viewTask(task: any) {
    alert(`Visualizando: ${task.title}`);
  }
}