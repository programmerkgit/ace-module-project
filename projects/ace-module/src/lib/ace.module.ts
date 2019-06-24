import { NgModule } from '@angular/core';
import { AceDirective } from './ace.directive';
import { AceComponent } from './ace.component';

@NgModule({
  declarations: [ AceDirective, AceComponent ],
  imports: [],
  exports: [ AceDirective, AceComponent ]
})
export class AceModule {
}
