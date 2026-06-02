import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FooterComponent } from './footer.component';
import { provideAnimations } from '@angular/platform-browser/animations';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideAnimations()],
      imports: [FooterComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display copyright text', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.footer')).toBeTruthy();
    expect(compiled.textContent).toContain('2024');
  });

  it('should have GitHub link', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const githubLink = compiled.querySelector('a[href="https://github.com/infoalexispc"]');
    expect(githubLink).toBeTruthy();
  });

  it('should have LinkedIn link', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const linkedinLink = compiled.querySelector('a[href="https://linkedin.com/in/alexisrodriguez"]');
    expect(linkedinLink).toBeTruthy();
  });

  it('should have social links section', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.social-links')).toBeTruthy();
  });
});