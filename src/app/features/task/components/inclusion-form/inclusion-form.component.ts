import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { IncludeTaskFormComponent } from './include-task-form/include-task-form.component';
import { CategoryService } from '../../../category/service/category.service';
import { categoryIdBackgroundColors } from '../../../category/constants/category-colors';
import { TaskService } from '../../services/task.service';
import { NgClass } from '@angular/common';

const COMPONENTS = [IncludeTaskFormComponent];
const COMMONS = [NgClass];
@Component({
  selector: 'app-inclusion-form',
  imports: [...COMPONENTS, ...COMMONS],
  template: `
    <div class="grid grid-cols-12 gap-2 mt-8">
      <app-include-task-form class="col-span-11" />

      <div
        [ngClass]="{
          'opacity-30': taskService.isLoadingTask(),
          'opacity-100': !taskService.isLoadingTask(),
        }"
        class="col-span-1 flex items-start mt-2">
        <span
          class="{{
            colorVariants[selectedCategoryId()]
          }} rounded-full w-10 h-10"></span>
      </div>
    </div>
  `,
  styles: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InclusionFormComponent implements OnInit {
  private readonly categoryService = inject(CategoryService);

  public readonly taskService = inject(TaskService);

  public readonly selectedCategoryId = this.categoryService.selectedCategoryId;

  public colorVariants = categoryIdBackgroundColors;

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe();
  }
}
