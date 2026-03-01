import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
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
export class TodoForm implements OnChanges {
  titulo = '';
  descricao = '';
  concluida = false;

  errors: Record<string, string> = {};

  @Output() save = new EventEmitter<Task>();
  @Input() task: Task | null = null;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['task'] && this.task) {
      this.titulo = this.task.titulo;
      this.descricao = this.task.descricao;
      this.concluida = this.task.concluida!;
    }
  }

  onSubmit() {

    this.errors = {};

    if (!this.titulo.trim()) {
      this.errors['titulo'] = 'Título é obrigatório';
    }

    if (this.titulo.length > 100) {
      this.errors['titulo'] = 'Título não pode ter mais do que 100 caractéres';
    }

    if (!this.descricao.trim()) {
      this.errors['descricao'] = 'Descrição é obrigatória';
    }

    if (this.descricao.length > 500) {
      this.errors['descricao'] = 'Descrição não pode ter mais do que 500 caractéres';
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