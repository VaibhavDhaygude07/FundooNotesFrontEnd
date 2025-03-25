import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchiveNoteComponent } from './archive-note.component';

describe('ArchiveNoteComponent', () => {
  let component: ArchiveNoteComponent;
  let fixture: ComponentFixture<ArchiveNoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ArchiveNoteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArchiveNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
