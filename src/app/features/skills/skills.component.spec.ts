import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SkillsComponent } from './skills.component';
import { SkillBadgeComponent } from '../../shared/components/skill-badge/skill-badge.component';

describe('SkillsComponent', () => {
  let component: SkillsComponent;
  let fixture: ComponentFixture<SkillsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkillsComponent, SkillBadgeComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(SkillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have 4 skill categories', () => {
    expect(component.skills.length).toBe(4);
  });

  it('should have Frontend category', () => {
    const frontend = component.skills.find(c => c.name === 'Frontend');
    expect(frontend).toBeTruthy();
    expect(frontend!.skills.length).toBe(4);
  });

  it('should have Backend category', () => {
    const backend = component.skills.find(c => c.name === 'Backend');
    expect(backend).toBeTruthy();
    expect(backend!.skills.length).toBe(3);
  });

  it('should have Base de Datos category', () => {
    const db = component.skills.find(c => c.name === 'Base de Datos');
    expect(db).toBeTruthy();
    expect(db!.skills.length).toBe(3);
  });

  it('should have Herramientas category', () => {
    const tools = component.skills.find(c => c.name === 'Herramientas');
    expect(tools).toBeTruthy();
    expect(tools!.skills.length).toBe(3);
  });

  it('should display Angular skill in Frontend', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Angular');
  });

  it('should display TypeScript skill in Frontend', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('TypeScript');
  });

  it('should display Node.js skill in Backend', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Node.js');
  });

  it('should display PostgreSQL skill in Base de Datos', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('PostgreSQL');
  });

  it('should display Git skill in Herramientas', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Git');
  });

  it('should have correct icon for Frontend', () => {
    const frontend = component.skills.find(c => c.name === 'Frontend');
    expect(frontend?.icon).toBe('web');
  });

  it('should have correct icon for Backend', () => {
    const backend = component.skills.find(c => c.name === 'Backend');
    expect(backend?.icon).toBe('storage');
  });

  it('should have correct icon for Base de Datos', () => {
    const db = component.skills.find(c => c.name === 'Base de Datos');
    expect(db?.icon).toBe('database');
  });

  it('should have correct icon for Herramientas', () => {
    const tools = component.skills.find(c => c.name === 'Herramientas');
    expect(tools?.icon).toBe('build');
  });

  it('should display all skill badges', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const badges = compiled.querySelectorAll('app-skill-badge');
    expect(badges.length).toBe(13);
  });
});