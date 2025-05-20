import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-include-task-form',
  standalone: true,
  imports: [],
  template: `
  
  <form autocomplete="off" class="flex flex-row gap-2 select-none">



  </form>
  
  
  
  `,
  styles: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IncludeTaskFormComponent { }
