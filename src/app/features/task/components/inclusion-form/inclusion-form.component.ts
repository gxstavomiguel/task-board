import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IncludeTaskFormComponent } from "./include-task-form/include-task-form.component";

const COMPONENTS = [IncludeTaskFormComponent]

@Component({
  selector: 'app-inclusion-form',
  standalone: true,
  imports: [...COMPONENTS],
  template: `<
  
    <div class="grid grid-cols-12 gap-2 mt-8">
      <app-include-task-form class="col-span-11"/>

      <div class="col-span-1 flex items-start"> 
        <span class="rounded-full w-10 h-10 bg-blue-700"></span>
      </div>
    </div>
  `,
  styles: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InclusionFormComponent { }
