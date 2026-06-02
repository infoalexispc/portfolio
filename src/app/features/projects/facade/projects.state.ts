import { computed, inject, signal } from '@angular/core';
import { GithubRepo } from '../../../core/models/github.model';
import { GithubService } from '../../../core/services/github.service';

export class ProjectsState {
  private readonly githubService = inject(GithubService);

  readonly projects = signal<GithubRepo[]>([]);
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);

  readonly projectCount = computed(() => this.projects().length);
  readonly starredCount = computed(() =>
    this.projects().reduce((acc, repo) => acc + repo.stargazers_count, 0)
  );

  loadProjects(): void {
    this.loading.set(true);
    this.error.set(null);

    this.githubService.getUserRepositories().subscribe({
      next: (repos) => {
        this.projects.set(repos);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('Failed to load projects. Please try again later.');
        this.loading.set(false);
        console.error('Error loading projects:', err);
      }
    });
  }

  filterByLanguage(language: string | null): GithubRepo[] {
    if (!language) return this.projects();
    return this.projects().filter(repo => repo.language?.toLowerCase() === language.toLowerCase());
  }

  getLanguages(): string[] {
    const languages = this.projects()
      .map(repo => repo.language)
      .filter((lang): lang is string => lang !== null);
    return [...new Set(languages)].sort();
  }
}

export const projectsState = new ProjectsState();