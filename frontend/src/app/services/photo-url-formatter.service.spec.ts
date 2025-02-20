import { TestBed } from '@angular/core/testing';

import { PhotoUrlFormatterService } from './photo-url-formatter.service';

describe('PhotoUrlFormatterService', () => {
  let service: PhotoUrlFormatterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PhotoUrlFormatterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
