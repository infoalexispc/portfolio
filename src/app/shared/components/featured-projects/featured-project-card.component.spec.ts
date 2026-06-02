import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FeaturedProjectCardComponent } from './featured-project-card.component';
import { FeaturedProject } from './featured-project.model';
import { provideAnimations } from '@angular/platform-browser/animations';

describe('FeaturedProjectCardComponent', () => {
  let component: FeaturedProjectCardComponent;
  let fixture: ComponentFixture<FeaturedProjectCardComponent>;

  const mockProject: FeaturedProject = {
    id: 1,
    title: 'Test Project',
    description: 'A test project description',
    imageUrl: 'https://example.com/image.jpg',
    url: 'https://example.com/project',
    tags: ['Angular', 'TypeScript', 'Test']
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideAnimations()],
      imports: [FeaturedProjectCardComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(FeaturedProjectCardComponent);
    component = fixture.componentInstance;
    component.project = mockProject;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display project title', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('mat-card-title')?.textContent).toContain('Test Project');
  });

  it('should display project description', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.description')?.textContent).toContain('A test project description');
  });

  it('should display project image', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const img = compiled.querySelector('img');
    expect(img).toBeTruthy();
    expect(img?.getAttribute('src')).toBe('https://example.com/image.jpg');
    expect(img?.getAttribute('alt')).toBe('Test Project');
  });

  it('should display project tags', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const chips = compiled.querySelectorAll('mat-chip');
    expect(chips.length).toBe(3);
  });

  it('should have link to project', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const link = compiled.querySelector('a[href="https://example.com/project"]');
    expect(link).toBeTruthy();
  });

  it('should display all tags', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Angular');
    expect(compiled.textContent).toContain('TypeScript');
    expect(compiled.textContent).toContain('Test');
  });
});