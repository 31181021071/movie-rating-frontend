import { TestBed } from '@angular/core/testing';

import { ShareDialogService } from './dialog.service';

describe('DialogService', () => {
  let service: ShareDialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShareDialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
