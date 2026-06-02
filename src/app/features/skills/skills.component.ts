import { Component } from '@angular/core';
import { SkillBadgeComponent } from '../../shared/components/skill-badge/skill-badge.component';
import { MatCardModule } from '@angular/material/card';

interface SkillCategory {
  name: string;
  icon: string;
  skills: { name: string; icon: string; color: string }[];
}

@Component({
  selector: 'app-skills',
  imports: [SkillBadgeComponent, MatCardModule],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss'
})
export class SkillsComponent {
  readonly skills: SkillCategory[] = [
    {
      name: 'Frontend',
      icon: 'web',
      skills: [
        { name: 'Angular', icon: '🅰️', color: '#dd0031' },
        { name: 'TypeScript', icon: '📜', color: '#3178c6' },
        { name: 'HTML/CSS', icon: '🌐', color: '#e34c26' },
        { name: 'JavaScript', icon: '📜', color: '#f7df1e' }
      ]
    },
    {
      name: 'Backend',
      icon: 'storage',
      skills: [
        { name: 'Node.js', icon: '🟢', color: '#339933' },
        { name: 'Python', icon: '🐍', color: '#3776ab' },
        { name: 'Java', icon: '☕', color: '#007396' }
      ]
    },
    {
      name: 'Base de Datos',
      icon: 'database',
      skills: [
        { name: 'PostgreSQL', icon: '🐘', color: '#336791' },
        { name: 'MongoDB', icon: '🍃', color: '#47a248' },
        { name: 'Firebase', icon: '🔥', color: '#ffca28' }
      ]
    },
    {
      name: 'Herramientas',
      icon: 'build',
      skills: [
        { name: 'Git', icon: '📦', color: '#f05032' },
        { name: 'Docker', icon: '🐳', color: '#2496ed' },
        { name: 'VS Code', icon: '💻', color: '#007acc' }
      ]
    }
  ];
}