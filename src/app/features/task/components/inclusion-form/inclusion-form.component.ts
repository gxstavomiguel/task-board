import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { IncludeTaskFormComponent } from "./include-task-form/include-task-form.component";
import { CategoryService } from '../../../category/service/category.service';
import { categoryIdBackgroundColors } from '../../../category/constants/category-colors';

const COMPONENTS = [IncludeTaskFormComponent]

@Component({
  selector: 'app-inclusion-form',
  standalone: true,
  imports: [...COMPONENTS],
  template: `
  
    <div class="grid grid-cols-12 gap-2 mt-8">
      <app-include-task-form class="col-span-11"/>

      <div class="col-span-1 flex items-start mt-2"> 
        <span class="{{
        colorVariants[selectedCategoryId()]
        }} rounded-full w-10 h-10"></span>
      </div>
    </div>
  `,
  styles: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InclusionFormComponent { 

private readonly categoryService = inject(CategoryService);

public readonly selectedCategoryId = this.categoryService.selectedCategoryId;

public colorVariants = categoryIdBackgroundColors;

ngOnInit() {
  this.categoryService.getCategories().subscribe();
}


}
