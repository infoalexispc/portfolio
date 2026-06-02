import { Component, input } from '@angular/core';

@Component({
  selector: 'app-skill-badge',
  templateUrl: './skill-badge.component.html',
  styleUrl: './skill-badge.component.scss'
})
export class SkillBadgeComponent {
  name = input.required<string>();
  icon = input.required<string>();
  color = input<string>('var(--accent-color)');
}