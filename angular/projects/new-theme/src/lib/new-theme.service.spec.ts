import { TestBed } from '@angular/core/testing';

import { NewThemeService } from './new-theme.service';

describe('NewThemeService', () => {
  let service: NewThemeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewThemeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
