import { async, ComponentFixture, TestBed } from '@angular/core/testing';


import { HeaderComponent } from './header.component';
import { Routes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

const appRoutes: Routes = [
  { path: 'routing-test', component: HeaderComponent }
];


describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [RouterTestingModule],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    //fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
