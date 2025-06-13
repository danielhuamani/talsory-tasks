import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TaskService } from '@services/task.service';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { firstValueFrom } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-task-update',
  templateUrl: './task-update.component.html',
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
export class TaskUpdateComponent implements OnInit {
  taskForm!: FormGroup;
  taskId!: number;

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
    private route: ActivatedRoute,
    private router: Router,
    private taskService: TaskService
  ) {}

  ngOnInit(): void {
    this.taskId = Number(this.route.snapshot.paramMap.get('id'));
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      status: ['pending', Validators.required],
      due_date: [null, Validators.required],
      priority: ['medium', Validators.required],
    });

    this.loadTask();
  }

  async loadTask() {
    try {
      const task = await firstValueFrom(this.taskService.retrieve(this.taskId));
      if (task) {
        this.taskForm.patchValue(task);
      }
    } catch (error) {
      console.error('Error cargando tarea', error);
    }
  }

  async onSubmit() {
    if (this.taskForm.invalid) return;
    try {
      await this.taskService
        .update(this.taskId, this.taskForm.value)
        .toPromise();
      this.router.navigate(['/tasks']);
    } catch (error) {
      console.error('Error actualizando tarea', error);
    }
  }

  goBack() {
    this.router.navigate(['/tasks']);
  }
}
