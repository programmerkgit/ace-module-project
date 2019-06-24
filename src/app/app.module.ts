import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TestComponent } from './test/test.component';
import { AceModule } from '../../projects/ace-module/src/lib/ace.module';

@NgModule({
  declarations: [
    AppComponent,
    TestComponent
  ],
  imports: [
    BrowserModule,
    AceModule
  ],
  providers: [],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}
