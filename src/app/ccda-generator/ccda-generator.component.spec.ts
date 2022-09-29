import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CcdaGeneratorComponent } from './ccda-generator.component';

describe('CcdaGeneratorComponent', () => {
  let component: CcdaGeneratorComponent;
  let fixture: ComponentFixture<CcdaGeneratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CcdaGeneratorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CcdaGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
