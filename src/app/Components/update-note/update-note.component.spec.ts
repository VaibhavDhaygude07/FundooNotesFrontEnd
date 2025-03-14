import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UpdateNotesComponent } from './update-note.component';

describe('UpdateNoteComponent', () => {
  let component: UpdateNotesComponent;
  let fixture: ComponentFixture<UpdateNotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateNotesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
