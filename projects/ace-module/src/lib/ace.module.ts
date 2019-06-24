import { NgModule } from '@angular/core';
import { AceModuleComponent } from './ace-module.component';
import { AceDirective } from './ace.directive';

@NgModule({
  declarations: [AceModuleComponent, AceDirective],
  imports: [
  ],
  exports: [AceModuleComponent]
})
export class AceModule { }
