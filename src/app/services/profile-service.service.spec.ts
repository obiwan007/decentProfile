import 'reflect-metadata';
import { TestBed } from '@angular/core/testing';

import { ProfileServiceService } from './profile-service.service';

import {
  instanceToInstance,
  classToClassFromExist,
  instanceToPlain,
  classToPlainFromExist,
  plainToInstance,
  plainToClassFromExist,
} from 'class-transformer';


import { Exclude, Expose, Type, Transform } from 'class-transformer';

describe('ProfileServiceService', () => {
  let service: ProfileServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfileServiceService);
  });

  it('should be created', () => {

    expect(service).toBeTruthy();
  });
});
