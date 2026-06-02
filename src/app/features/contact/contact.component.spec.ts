import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContactComponent } from './contact.component';
import { provideAnimations } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

describe('ContactComponent', () => {
  let component: ContactComponent;
  let fixture: ComponentFixture<ContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactComponent, FormsModule],
      providers: [provideAnimations()]
    }).compileComponents();

    fixture = TestBed.createComponent(ContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have empty form data initially', () => {
    expect(component.formData.name).toBe('');
    expect(component.formData.email).toBe('');
    expect(component.formData.message).toBe('');
  });

  it('should display contact form', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('form')).toBeTruthy();
    expect(compiled.querySelector('input[name="name"]')).toBeTruthy();
    expect(compiled.querySelector('input[name="email"]')).toBeTruthy();
    expect(compiled.querySelector('textarea[name="message"]')).toBeTruthy();
  });

  it('should display submit button', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const button = compiled.querySelector('button[type="submit"]');
    expect(button).toBeTruthy();
    expect(button?.textContent).toContain('Enviar Mensaje');
  });

  it('should not submit when form is empty', () => {
    component.onSubmit();

    expect(component.sending()).toBeFalse();
    expect(component.formData.name).toBe('');
  });

  it('should not submit when name is missing', () => {
    component.formData = { name: '', email: 'test@test.com', message: 'Hello' };

    component.onSubmit();

    expect(component.sending()).toBeFalse();
  });

  it('should not submit when email is missing', () => {
    component.formData = { name: 'Test', email: '', message: 'Hello' };

    component.onSubmit();

    expect(component.sending()).toBeFalse();
  });

  it('should not submit when message is missing', () => {
    component.formData = { name: 'Test', email: 'test@test.com', message: '' };

    component.onSubmit();

    expect(component.sending()).toBeFalse();
  });
});