import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { FeaturedProjectCardComponent } from '../../shared/components/featured-projects/featured-project-card.component';
import { provideAnimations } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HomeComponent,
        FeaturedProjectCardComponent,
        RouterTestingModule,
        HttpClientTestingModule
      ],
      providers: [provideAnimations()]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have 2 featured projects', () => {
    expect(component.featuredProjects.length).toBe(2);
  });

  it('should display hero section', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.hero')).toBeTruthy();
    expect(compiled.textContent).toContain('Alexis Rodriguez');
  });

  it('should display features section', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.features-section')).toBeTruthy();
  });

  it('should have correct first featured project', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('AI Coding Assistants');
  });

  it('should have correct second featured project', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('LexPC');
  });

  it('should display CTA buttons', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelectorAll('a[routerLink]').length).toBeGreaterThan(0);
  });
});