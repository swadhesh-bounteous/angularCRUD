import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContctUsComponent } from './contct-us.component';

describe('ContctUsComponent', () => {
  let component: ContctUsComponent;
  let fixture: ComponentFixture<ContctUsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContctUsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContctUsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
