import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Task } from '../../features/tasks/task.model';
import { CustomInput } from '../custom-input/custom-input';

@Component({
  selector: 'app-todo-form',
  standalone: true,
  imports: [CommonModule, FormsModule, CustomInput],
  templateUrl: './todo-form.html',
})
export class TodoForm {
  titulo = '';
  descricao = '';
  concluida = false;

   errors: Record<string, string> = {};

  @Output() save = new EventEmitter<Task>();

  onSubmit() {

    this.errors = {};

    if (!this.titulo.trim()) {
      this.errors['title'] = 'Título é obrigatório';
    }

    if (!this.descricao.trim()) {
      this.errors['description'] = 'Descrição é obrigatória';
    }

    if (Object.keys(this.errors).length > 0) return;

    this.save.emit({
      titulo: this.titulo,
      descricao: this.descricao,
      concluida: this.concluida
    });

    this.reset();
  }

  private reset() {
    this.titulo = '';
    this.descricao = '';
    this.concluida = false;
    this.errors = {};
  }
}