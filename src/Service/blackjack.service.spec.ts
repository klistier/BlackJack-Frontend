import { TestBed } from '@angular/core/testing';
import { BlackjackService } from './blackjack.service';

describe('BlacjackService', () => {
  let service: BlackjackService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BlackjackService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
