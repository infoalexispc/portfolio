import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavbarComponent } from './navbar.component';
import { provideAnimations } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { BreakpointObserver } from '@angular/cdk/layout';
import { of } from 'rxjs';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarComponent, RouterTestingModule],
      providers: [
        provideAnimations(),
        {
          provide: BreakpointObserver,
          useValue: {
            observe: () => of({ matches: false } as any)
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have 5 nav items', () => {
    expect(component.navItems().length).toBe(5);
  });

  it('should include Home nav item', () => {
    const navItems = component.navItems();
    expect(navItems.some(item => item.label === 'Home' && item.route === '/')).toBeTrue();
  });

  it('should include Proyectos nav item', () => {
    const navItems = component.navItems();
    expect(navItems.some(item => item.label === 'Proyectos' && item.route === '/projects')).toBeTrue();
  });

  it('should include Sobre Mí nav item', () => {
    const navItems = component.navItems();
    expect(navItems.some(item => item.label === 'Sobre Mí' && item.route === '/about')).toBeTrue();
  });

  it('should include Skills nav item', () => {
    const navItems = component.navItems();
    expect(navItems.some(item => item.label === 'Skills' && item.route === '/skills')).toBeTrue();
  });

  it('should include Contacto nav item', () => {
    const navItems = component.navItems();
    expect(navItems.some(item => item.label === 'Contacto' && item.route === '/contact')).toBeTrue();
  });

  it('should display logo with portfolio text', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.logo')?.textContent).toContain('Portfolio');
  });

  it('should display nav links when not mobile', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.nav-links')).toBeTruthy();
  });

  it('should show regular nav when not mobile', () => {
    expect(component.isMobile()).toBeFalse();
  });
});