import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AceModuleComponent } from './ace-module.component';

describe('AceModuleComponent', () => {
  let component: AceModuleComponent;
  let fixture: ComponentFixture<AceModuleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AceModuleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AceModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
