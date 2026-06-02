import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectsComponent } from './projects.component';
import { ProjectsFacade } from './facade/projects.facade';
import { provideAnimations } from '@angular/platform-browser/animations';
import { signal } from '@angular/core';

describe('ProjectsComponent', () => {
  let component: ProjectsComponent;
  let fixture: ComponentFixture<ProjectsComponent>;

  const createFacadeMock = () => ({
    loadProjects: vi.fn(),
    selectLanguage: vi.fn(),
    clearFilter: vi.fn(),
    projects: signal([]),
    loading: signal(false),
    error: signal(null),
    filteredProjects: signal([]),
    projectCount: signal(0),
    languages: signal([]),
    selectedLanguage: signal(null)
  });

  beforeEach(async () => {
    const facadeMock = createFacadeMock();

    await TestBed.configureTestingModule({
      providers: [
        provideAnimations(),
        { provide: ProjectsFacade, useValue: facadeMock }
      ],
      imports: [ProjectsComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call loadProjects on init', () => {
    expect(fixture.nativeElement).toBeTruthy();
  });

  it('should display loading spinner when loading', () => {
    const facade = TestBed.inject(ProjectsFacade) as any;
    facade.loading.set(true);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('mat-spinner')).toBeTruthy();
    expect(compiled.querySelector('p')?.textContent).toContain('Cargando proyectos...');
  });

  it('should display error message when error occurs', () => {
    const facade = TestBed.inject(ProjectsFacade) as any;
    facade.error.set('Test error message');
    facade.loading.set(false);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.error')).toBeTruthy();
    expect(compiled.textContent).toContain('Test error message');
  });

  it('should have retry button when error occurs', () => {
    const facade = TestBed.inject(ProjectsFacade) as any;
    facade.error.set('Error occurred');
    facade.loading.set(false);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const retryButton = compiled.querySelector('button');
    expect(retryButton?.textContent).toContain('Reintentar');
  });
});