import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectCardComponent } from './project-card.component';
import { GithubRepo } from '../../../core/models/github.model';
import { provideAnimations } from '@angular/platform-browser/animations';

describe('ProjectCardComponent', () => {
  let component: ProjectCardComponent;
  let fixture: ComponentFixture<ProjectCardComponent>;

  const mockRepo: GithubRepo = {
    id: 1,
    name: 'test-repo',
    full_name: 'infoalexispc/test-repo',
    description: 'A test repository description',
    html_url: 'https://github.com/infoalexispc/test-repo',
    stargazers_count: 42,
    forks_count: 10,
    language: 'TypeScript',
    topics: ['angular', 'test'],
    visibility: 'public',
    updated_at: '2024-01-15'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideAnimations()],
      imports: [ProjectCardComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectCardComponent);
    component = fixture.componentInstance;
    component.repo = mockRepo;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display repo name', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('mat-card-title')?.textContent).toContain('test-repo');
  });

  it('should display full name', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('mat-card-subtitle')?.textContent).toContain('infoalexispc/test-repo');
  });

  it('should display description', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.description')?.textContent).toContain('A test repository description');
  });

  it('should display star count', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('42');
  });

  it('should display fork count', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('10');
  });

  it('should display language', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('TypeScript');
  });

  it('should display topics as chips', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const chips = compiled.querySelectorAll('mat-chip');
    expect(chips.length).toBe(2);
  });

  it('should have link to repository', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const link = compiled.querySelector('a[href="https://github.com/infoalexispc/test-repo"]');
    expect(link).toBeTruthy();
  });

  it('should display "No description available" when description is null', () => {
    const repoWithoutDesc: GithubRepo = { ...mockRepo, description: null };
    component.repo = repoWithoutDesc;
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.description')?.textContent).toContain('No description available');
  });

  it('should not display language section when language is null', () => {
    const repoWithoutLang: GithubRepo = { ...mockRepo, language: null };
    component.repo = repoWithoutLang;
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).not.toContain('code');
  });

  it('should display at most 5 topics', () => {
    const repoWithManyTopics: GithubRepo = {
      ...mockRepo,
      topics: ['a', 'b', 'c', 'd', 'e', 'f', 'g']
    };
    component.repo = repoWithManyTopics;
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const chips = compiled.querySelectorAll('mat-chip');
    expect(chips.length).toBe(5);
  });

  it('should not display topics section when topics is empty', () => {
    const repoWithoutTopics: GithubRepo = { ...mockRepo, topics: [] };
    component.repo = repoWithoutTopics;
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.topics')).toBeNull();
  });
});