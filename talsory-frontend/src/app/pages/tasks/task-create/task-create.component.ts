import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { TaskService } from '@services/task.service';

@Component({
  standalone: true,
  selector: 'app-task-form',
  templateUrl: './task-create.component.html',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    InputTextModule,
    DropdownModule,
    DatePickerModule,
    ButtonModule,
  ],
})
export class TaskCreateComponent {
  taskForm: FormGroup;

  statusOptions = [
    { label: 'Pendiente', value: 'pending' },
    { label: 'En Progreso', value: 'in_progress' },
    { label: 'Completada', value: 'completed' },
  ];

  priorityOptions = [
    { label: 'Alta', value: 'high' },
    { label: 'Media', value: 'medium' },
    { label: 'Baja', value: 'low' },
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private taskService: TaskService
  ) {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      status: ['pending', Validators.required],
      due_date: [null, Validators.required],
      priority: ['medium', Validators.required],
    });
  }

  async onSubmit() {
    if (this.taskForm.invalid) {
      this.taskForm.markAllAsTouched();
      return;
    }

    try {
      await this.taskService.create(this.taskForm.value).toPromise();
      this.router.navigate(['/tasks']);
    } catch (error) {
      console.error('Error creando tarea', error);
    }
  }

  goBack() {
    this.router.navigate(['/tasks']);
  }
}
