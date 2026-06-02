import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AboutComponent } from './about.component';
import { provideAnimations } from '@angular/platform-browser/animations';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('AboutComponent', () => {
  let component: AboutComponent;
  let fixture: ComponentFixture<AboutComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutComponent, HttpClientTestingModule],
      providers: [provideAnimations()]
    }).compileComponents();

    fixture = TestBed.createComponent(AboutComponent);
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

  it('should load profile on init', () => {
    const req = httpMock.expectOne('https://api.github.com/users/infoalexispc');
    expect(req.request.method).toBe('GET');
    req.flush({
      login: 'infoalexispc',
      name: 'Alexis Rodriguez',
      bio: 'Full Stack Developer',
      avatar_url: 'https://avatar.url',
      html_url: 'https://github.com/infoalexispc',
      followers: 100,
      following: 50,
      public_repos: 20
    });
  });

  it('should display loading state initially', () => {
    expect(component.loading()).toBeTrue();

    const req = httpMock.expectOne('https://api.github.com/users/infoalexispc');
    req.flush({
      login: 'infoalexispc',
      name: 'Alexis Rodriguez',
      bio: 'Full Stack Developer',
      avatar_url: 'https://avatar.url',
      html_url: 'https://github.com/infoalexispc',
      followers: 100,
      following: 50,
      public_repos: 20
    });
    fixture.detectChanges();

    expect(component.loading()).toBeFalse();
  });

  it('should display user avatar', () => {
    const req = httpMock.expectOne('https://api.github.com/users/infoalexispc');
    req.flush({
      login: 'infoalexispc',
      name: 'Alexis Rodriguez',
      bio: 'Full Stack Developer',
      avatar_url: 'https://avatar.url',
      html_url: 'https://github.com/infoalexispc',
      followers: 100,
      following: 50,
      public_repos: 20
    });
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const avatar = compiled.querySelector('.avatar');
    expect(avatar).toBeTruthy();
    expect(avatar?.getAttribute('src')).toBe('https://avatar.url');
  });

  it('should display user name', () => {
    const req = httpMock.expectOne('https://api.github.com/users/infoalexispc');
    req.flush({
      login: 'infoalexispc',
      name: 'Alexis Rodriguez',
      bio: 'Full Stack Developer',
      avatar_url: 'https://avatar.url',
      html_url: 'https://github.com/infoalexispc',
      followers: 100,
      following: 50,
      public_repos: 20
    });
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Alexis Rodriguez');
  });

  it('should display user bio', () => {
    const req = httpMock.expectOne('https://api.github.com/users/infoalexispc');
    req.flush({
      login: 'infoalexispc',
      name: 'Alexis Rodriguez',
      bio: 'Full Stack Developer',
      avatar_url: 'https://avatar.url',
      html_url: 'https://github.com/infoalexispc',
      followers: 100,
      following: 50,
      public_repos: 20
    });
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Full Stack Developer');
  });

  it('should handle error gracefully', () => {
    const req = httpMock.expectOne('https://api.github.com/users/infoalexispc');
    req.error(new ProgressEvent('error'));
    fixture.detectChanges();

    expect(component.loading()).toBeFalse();
    expect(component.user()).toBeNull();
  });
});