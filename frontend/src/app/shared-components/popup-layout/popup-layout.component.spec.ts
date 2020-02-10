import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupLayoutComponent } from './popup-layout.component';

describe('PopupLayoutComponent', () => {
  let component: PopupLayoutComponent;
  let fixture: ComponentFixture<PopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
