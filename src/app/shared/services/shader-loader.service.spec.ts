import { TestBed } from '@angular/core/testing';

import { ShaderLoaderService } from './shader-loader.service';

describe('ShaderLoaderService', () => {
  let service: ShaderLoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShaderLoaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
