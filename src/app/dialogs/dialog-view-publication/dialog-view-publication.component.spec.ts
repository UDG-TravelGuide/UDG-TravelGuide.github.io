import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogViewPublicationComponent } from './dialog-view-publication.component';

describe('DialogViewPublicationComponent', () => {
  let component: DialogViewPublicationComponent;
  let fixture: ComponentFixture<DialogViewPublicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogViewPublicationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogViewPublicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
