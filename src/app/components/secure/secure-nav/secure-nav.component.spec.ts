import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecureNavComponent } from './secure-nav.component';

describe('SecureNavComponent', () => {
  let component: SecureNavComponent;
  let fixture: ComponentFixture<SecureNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecureNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecureNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
