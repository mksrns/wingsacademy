import { TestBed } from '@angular/core/testing';

import { SuperAdminService } from './super-admin.service';

describe('SuperAdminService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SuperAdminService = TestBed.get(SuperAdminService);
    expect(service).toBeTruthy();
  });
});
