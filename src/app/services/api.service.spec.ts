import { TestBed } from '@angular/core/testing';

import { ContentAPIService } from './content.api.service';
import { HttpClientModule } from '@angular/common/http';

describe('ApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientModule],
    providers: [ContentAPIService]
  }));

  it('should be created', () => {
    const service: ContentAPIService = TestBed.get(ContentAPIService);
    expect(service).toBeTruthy();
  });
});
