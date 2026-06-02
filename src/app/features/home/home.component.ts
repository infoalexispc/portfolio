import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { GithubService } from '../../core/services/github.service';
import { GithubUser } from '../../core/models/github.model';
import { FeaturedProjectCardComponent } from '../../shared/components/featured-projects/featured-project-card.component';
import { FeaturedProject } from '../../shared/components/featured-projects/featured-project.model';

@Component({
  selector: 'app-home',
  imports: [
    RouterLink,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    FeaturedProjectCardComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  private readonly githubService = inject(GithubService);

  readonly user = signal<GithubUser | null>(null);
  readonly loading = signal(true);

  readonly featuredProjects: FeaturedProject[] = [
    {
      id: 1,
      title: 'AI Coding Assistants',
      description: 'Plataforma de asistencia con IA para programadores. Herramientas inteligentes para mejorar tu productividad en el desarrollo.',
      imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=400&fit=crop',
      url: 'https://ai-coding-assistants.vercel.app/',
      tags: ['Angular', 'IA', 'Vercel']
    },
    {
      id: 2,
      title: 'LexPC',
      description: 'Sitio web de servicios tecnológicos y soluciones digitales. Portafolio profesional con demos de proyectos.',
      imageUrl: 'https://lexpc.net/.netlify/images?url=_astro%2Flexpchome.SIUz3Q1j.webp&w=600&h=400&fit=crop',
      url: 'https://lexpc.net/',
      tags: ['Astro', 'Netlify', 'Portfolio']
    }
  ];

  ngOnInit(): void {
    this.loadStats();
  }

  private loadStats(): void {
    this.githubService.getUserProfile().subscribe({
      next: (user) => {
        this.user.set(user);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
      }
    });
  }
}