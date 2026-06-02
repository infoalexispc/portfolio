import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SkillBadgeComponent } from './skill-badge.component';

describe('SkillBadgeComponent', () => {
  let component: SkillBadgeComponent;
  let fixture: ComponentFixture<SkillBadgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkillBadgeComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(SkillBadgeComponent);
    component = fixture.componentInstance;
    component.name = 'Angular';
    component.icon = '🅰️';
    component.color = '#dd0031';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display skill name', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.skill-name')?.textContent).toContain('Angular');
  });

  it('should display skill icon', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.skill-icon')?.textContent).toContain('🅰️');
  });

  it('should apply custom color', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const badge = compiled.querySelector('.skill-badge');
    expect(badge?.getAttribute('style')).toContain('#dd0031');
  });

  it('should use default color when not provided', () => {
    const defaultColorFixture = TestBed.createComponent(SkillBadgeComponent);
    const defaultComponent = defaultColorFixture.componentInstance;
    defaultComponent.name = 'Test';
    defaultComponent.icon = '🔧';
    defaultColorFixture.detectChanges();

    const compiled = defaultColorFixture.nativeElement as HTMLElement;
    const badge = compiled.querySelector('.skill-badge');
    expect(badge?.getAttribute('style')).toContain('var(--accent-color)');
  });
});