import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MainComponent } from '../../../../layout/main/main.component';
import { ColorsListComponent } from '../../components/colors-list/colors-list.component';
import { MainListComponent } from "../../components/main-list/main-list.component";
import { CategoryService } from '../../service/category.service';

const COMPONENTES = [ColorsListComponent, MainListComponent];

@Component({
    selector: 'app-category',
    imports: [...COMPONENTES],
    template: `
  
    <div class="flex flex-col justify-between h-full w-full">

       <app-main-list />
        <app-colors-list />
      
    </div>
  
  `,
    styles: ``,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryComponent { 

private readonly categoryService = inject(CategoryService)

 

}
