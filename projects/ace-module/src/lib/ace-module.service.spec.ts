import { TestBed } from '@angular/core/testing';

import { AceModuleService } from './ace-module.service';

describe('AceModuleService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AceModuleService = TestBed.get(AceModuleService);
    expect(service).toBeTruthy();
  });
});
