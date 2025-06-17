import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { AsyncPipe, CommonModule } from '@angular/common';
import { NoTasksComponent } from '../no-tasks/no-tasks.component';
import { categoryIdTextColors } from '../../../category/constants/category-colors';
import { FormsModule, NgModel } from '@angular/forms';
import { Task } from '../../model/task.model';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [AsyncPipe, NoTasksComponent, CommonModule, FormsModule],
  template: `
    <div class="mt-8 w-1/3">
      @if (tasks$ | async) {
        @if (numberOfTasks() > 0) {
          @for (task of tasks(); track task.id) {
            <div
              [ngClass]="getCategoryTextColor(task.categoryId)"
              class="flex items-center justify-between mb-b gap-2">
              <input
                type="checkbox"
                class="w-4 h-4 border mr-2"
                [(ngModel)]="task.isCompleted"
                (click)="$event.stopPropagation()" />
              <span
                *ngIf="!isEditing(task)"
                class="italic text-xl flex items-center flex-grow mr-1"
                [ngClass]="{ 'line-through': task.isCompleted }"
                (dblclick)="onEditing(task)">
                {{ task.title }}
              </span>

              <input
                *ngIf="isEditing(task)"
                [(ngModel)]="task.title"
                (keyup.enter)="noEditing(task)"
                class="border rounded w-64"
                autofocus />

              <button (click)="deleteTask(task.id)" class="p-0">
                <img class="w-5" src="delete.png" />
              </button>
            </div>
          }
        } @else {
          <app-no-tasks
            alt="Nenhuma tarefa adicionada"
            imageUrl="no_data.svg"
            message="Nenhuma tarefa adicionada" />
        }
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskListComponent {
  private taskService = inject(TaskService);

  public tasks$ = this.taskService.getTasks();

  public tasks = this.taskService.tasks;

  public numberOfTasks = this.taskService.numberOfTasks;

  private editingTaskId: string | null = null;

  getCategoryTextColor(categoryId: string): string {
    const id = Number(categoryId);
    return categoryIdTextColors[id];
  }

  deleteTask(id: string) {
    if (this.editingTaskId === id) {
      this.editingTaskId = null;
    }

    this.taskService.deleteTask(id).subscribe();
  }

  onEditing(task: Task) {
    if (this.editingTaskId !== null) {
      return;
    }
    this.editingTaskId = task.id;
  }

  noEditing(task: Task) {
    const trimmedTitle = task.title.trim();
    if (trimmedTitle.length === 0) {
      window.alert('A tarefa não pode ficar em branco!');
      return;
    }

    task.title = trimmedTitle;
    this.editingTaskId = null;
    this.taskService.updateTask(task).subscribe();
  }

  isEditing(task: Task): boolean {
    return this.editingTaskId === task.id;
  }
}
