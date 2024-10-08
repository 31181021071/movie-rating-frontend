import { TestBed } from '@angular/core/testing';

import { ShareConfirmService } from './confirm.service';

describe('ConfirmService', () => {
  let service: ShareConfirmService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShareConfirmService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
