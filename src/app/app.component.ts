import { Component, inject, OnInit } from '@angular/core';
import { ThemeToggleComponent } from './shared/components/theme-toggle/theme-toggle.component';
import { MainComponent } from './layout/main/main.component';

const COMPONENTS = [ThemeToggleComponent, MainComponent];

@Component({
  selector: 'app-root',
  imports: [...COMPONENTS],
  template: `
    <div class="relative min-h-screen w-full">
      <app-theme-toggle />

      <app-main />
    </div>
  `,
  styles: ``,
})
export class AppComponent {}
