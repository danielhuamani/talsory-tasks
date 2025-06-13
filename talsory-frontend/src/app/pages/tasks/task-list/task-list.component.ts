// src/app/pages/tasks/task-list.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService, Task, PaginatedResponse } from '@services/task.service';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { firstValueFrom } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  providers: [ConfirmationService],
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    DropdownModule,
    RouterModule,
    FormsModule,
    ConfirmDialogModule,
  ],
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  loading = false;
  currentPage = 1;
  totalPages = 0;
  pageSize = 20;

  statusOptions = [
    { label: 'Filtro por estado', value: null },
    { label: 'Pendiente', value: 'pending' },
    { label: 'En Progreso', value: 'in_progress' },
    { label: 'Completada', value: 'completed' },
  ];

  priorityOptions = [
    { label: 'Filtro por prioridad', value: null },
    { label: 'Alta', value: 'high' },
    { label: 'Media', value: 'medium' },
    { label: 'Baja', value: 'low' },
  ];
  selectedStatus: any = null;
  selectedPriority: any = null;
  constructor(
    private taskService: TaskService,
    private router: Router,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  async loadTasks(page: number = 1) {
    this.loading = true;
    const params: any = { page };
    if (this.selectedStatus?.value) params.status = this.selectedStatus.value;
    if (this.selectedPriority?.value)
      params.priority = this.selectedPriority.value;
    try {
      const response = await await firstValueFrom(
        this.taskService.list(params)
      );
      if (response) {
        this.tasks = response.results;
        this.currentPage = response.pages.current;
        this.totalPages = response.pages.total_pages;
      }
    } catch (error) {
      console.error('Error cargando tareas', error);
    } finally {
      this.loading = false;
    }
  }

  filterTasks() {
    this.loadTasks(1);
  }

  createTask() {
    this.router.navigate(['/tasks/create']);
  }

  editTask(task: Task) {
    this.router.navigate(['/tasks', task.id, 'update']);
  }

  deleteTask(task: Task) {
    this.confirmationService.confirm({
      message: `¿Estás seguro de eliminar la tarea "${task.title}"?`,
      accept: async () => {
        try {
          await firstValueFrom(this.taskService.delete(task.id!));
          this.loadTasks(this.currentPage);
        } catch (error) {
          console.error('Error eliminando tarea', error);
        }
      },
    });
  }
  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.loadTasks(this.currentPage + 1);
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.loadTasks(this.currentPage - 1);
    }
  }
}
