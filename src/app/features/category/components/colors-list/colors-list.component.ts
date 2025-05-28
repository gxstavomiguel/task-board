import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { CategoryService } from '../../service/category.service';
import { categoryBackgroundColors } from '../../constants/category-colors';
const MODULES = [MatDividerModule];

@Component({
  selector: 'app-colors-list',
  imports: [...MODULES],
  template: `
    <section class="flex flex-col gap-4 w-full h-auto mb-4">
      <mat-divider class="opacity-50" />

      <div class="flex flex-wrap justify-center item-center px-2 mt-4 gap-4">
        @for (category of categories(); track category.id) {
          <span
            class="select-none opacity-80 hover:opacity-100 flex items-center justify-center {{
              categoryBackgroundColors[category.color]
            }} px-4 py-2 rounded-2xl w-[80px] text-center text-white font-semibold">
            {{ category.name }}
          </span>
        }
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColorsListComponent {
  private readonly categoryService = inject(CategoryService);

  public categories = this.categoryService.categories;

  public categoryBackgroundColors = categoryBackgroundColors;
}
