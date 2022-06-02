import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogChangeRoleComponent } from './dialog-change-role.component';

describe('DialogChangeRoleComponent', () => {
  let component: DialogChangeRoleComponent;
  let fixture: ComponentFixture<DialogChangeRoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogChangeRoleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogChangeRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
