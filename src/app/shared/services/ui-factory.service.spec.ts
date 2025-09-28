import { TestBed } from '@angular/core/testing';

import { UiFactoryService } from './ui-factory.service';

describe('UiFactoryService', () => {
  let service: UiFactoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UiFactoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
